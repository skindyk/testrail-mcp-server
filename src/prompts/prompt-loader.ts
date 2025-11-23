import { Prompt } from "@modelcontextprotocol/sdk/types.js";
import { FilePromptsLoader } from "./file-prompts.js";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export class PromptLoader {
  private promptsLoader: FilePromptsLoader;
  private legacyUserPromptsLoader: FilePromptsLoader;
  private allPrompts: Prompt[] = [];

  constructor() {
    // Main prompts directory
    this.promptsLoader = new FilePromptsLoader(join(__dirname, '../../prompts'));
    // Legacy user prompts directory (for backward compatibility)
    this.legacyUserPromptsLoader = new FilePromptsLoader(join(__dirname, '../../user-prompts'));

    this.loadAllPrompts();
  }

  /**
   * Load and combine prompts
   */
  private loadAllPrompts(): void {
    // Load main prompts
    const mainPrompts = this.promptsLoader.loadPrompts();
    this.allPrompts = [...mainPrompts];

    // Load legacy user prompts
    const legacyPrompts = this.legacyUserPromptsLoader.loadPrompts();

    // Add legacy prompts (only if they don't exist in main prompts)
    // This gives preference to the new 'prompts' folder if a user moves their files there
    const mainNames = new Set(mainPrompts.map(p => p.name));
    const uniqueLegacyPrompts = legacyPrompts.filter(p => !mainNames.has(p.name));

    this.allPrompts.push(...uniqueLegacyPrompts);
  }

  /**
   * Get all available prompts
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
   * Check if a prompt is user-created (legacy check, now all are file-based)
   */
  isUserPrompt(name: string): boolean {
    return this.promptsLoader.hasPrompt(name) || this.legacyUserPromptsLoader.hasPrompt(name);
  }

  /**
   * Generate content for any prompt
   */
  async generatePromptContent(name: string, args: any): Promise<string> {
    if (this.promptsLoader.hasPrompt(name)) {
      return this.promptsLoader.generatePromptContent(name, args);
    } else if (this.legacyUserPromptsLoader.hasPrompt(name)) {
      return this.legacyUserPromptsLoader.generatePromptContent(name, args);
    } else {
      throw new Error(`Prompt not found: ${name}`);
    }
  }

  /**
   * Reload all prompts
   */
  reload(): void {
    this.allPrompts = [];
    this.loadAllPrompts();
  }

  /**
   * Get prompts by category
   */
  getPromptsByCategory(): { default: Prompt[], user: Prompt[] } {
    // In the new unified structure, we can distinguish by checking if it came from the legacy folder
    // or we can just consider everything as "available prompts"
    // For now, let's return everything as default to simplify
    return {
      default: this.allPrompts,
      user: []
    };
  }

  /**
   * Initialize user prompts directory
   */
  initializeUserPrompts(): void {
    this.promptsLoader.ensurePromptsDirectory();
  }
}