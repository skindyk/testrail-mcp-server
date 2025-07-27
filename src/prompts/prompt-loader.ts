import { Prompt } from "@modelcontextprotocol/sdk/types.js";
import { prompts as defaultPrompts } from "./index.js";
import { UserPromptsLoader } from "./user-prompts.js";

export class PromptLoader {
  private userPromptsLoader: UserPromptsLoader;
  private allPrompts: Prompt[] = [];

  constructor() {
    this.userPromptsLoader = new UserPromptsLoader();
    this.loadAllPrompts();
  }

  /**
   * Load and combine default and user prompts
   */
  private loadAllPrompts(): void {
    // Start with default prompts
    this.allPrompts = [...defaultPrompts];

    // Add user prompts
    const userPrompts = this.userPromptsLoader.loadUserPrompts();
    
    // Check for name conflicts and warn
    const defaultNames = new Set(defaultPrompts.map(p => p.name));
    const conflictingPrompts = userPrompts.filter(p => defaultNames.has(p.name));
    
    if (conflictingPrompts.length > 0) {
      // Note: In MCP servers, we avoid console output as it interferes with the protocol
      // Conflicts are handled by allowing user prompts to override defaults
    }

    // Add user prompts (they will override defaults if names conflict)
    this.allPrompts = this.allPrompts.filter(p => !userPrompts.some(up => up.name === p.name));
    this.allPrompts.push(...userPrompts);

    // Note: Logging removed to avoid MCP protocol interference
    // Loaded ${defaultPrompts.length} default prompts and ${userPrompts.length} user prompts
  }

  /**
   * Get all available prompts (default + user)
   */
  getAllPrompts(): Prompt[] {
    return this.allPrompts;
  }

  /**
   * Find a specific prompt by name
   */
  findPrompt(name: string): Prompt | undefined {
    return this.allPrompts.find(p => p.name === name);
  }

  /**
   * Check if a prompt is user-created
   */
  isUserPrompt(name: string): boolean {
    return this.userPromptsLoader.isUserPrompt(name);
  }

  /**
   * Generate content for any prompt (default or user)
   */
  async generatePromptContent(name: string, args: any, defaultGenerator: (name: string, args: any) => Promise<string>): Promise<string> {
    if (this.isUserPrompt(name)) {
      return this.userPromptsLoader.generateUserPromptContent(name, args);
    } else {
      return defaultGenerator(name, args);
    }
  }

  /**
   * Reload all prompts (useful for development or if user adds new prompts)
   */
  reload(): void {
    this.allPrompts = [];
    this.loadAllPrompts();
  }

  /**
   * Get prompts by category
   */
  getPromptsByCategory(): { default: Prompt[], user: Prompt[] } {
    const defaultNames = new Set(defaultPrompts.map(p => p.name));
    
    return {
      default: this.allPrompts.filter(p => defaultNames.has(p.name)),
      user: this.allPrompts.filter(p => !defaultNames.has(p.name))
    };
  }

  /**
   * Initialize user prompts directory
   */
  initializeUserPrompts(): void {
    this.userPromptsLoader.ensureUserPromptsDirectory();
  }
}