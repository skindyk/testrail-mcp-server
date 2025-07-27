import { Prompt } from "@modelcontextprotocol/sdk/types.js";
import { readFileSync, existsSync, readdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export interface UserPromptConfig {
    name: string;
    description: string;
    arguments?: Array<{
        name: string;
        description: string;
        required?: boolean;
    }>;
    template: string;
}

export class UserPromptsLoader {
    private userPromptsDir: string;

    constructor() {
        // Look for user prompts in a 'user-prompts' directory next to the built server
        this.userPromptsDir = join(__dirname, '../../user-prompts');
    }

    /**
     * Load all user-created prompts from the user-prompts directory
     */
    loadUserPrompts(): Prompt[] {
        const userPrompts: Prompt[] = [];

        if (!existsSync(this.userPromptsDir)) {
            // User prompts directory not found - return empty array
            return userPrompts;
        }

        try {
            const files = readdirSync(this.userPromptsDir).filter(file =>
                file.endsWith('.json') || file.endsWith('.js') || file.endsWith('.ts')
            );

            for (const file of files) {
                try {
                    const promptConfig = this.loadPromptFile(join(this.userPromptsDir, file));
                    if (promptConfig) {
                        userPrompts.push(this.convertToMCPPrompt(promptConfig));
                    }
                } catch (error) {
                    // Skip invalid prompt files silently to avoid MCP protocol interference
                }
            }
        } catch (error) {
            // Skip directory read errors silently to avoid MCP protocol interference
        }

        return userPrompts;
    }

    /**
     * Load a single prompt configuration file
     */
    private loadPromptFile(filePath: string): UserPromptConfig | null {
        try {
            if (filePath.endsWith('.json')) {
                const content = readFileSync(filePath, 'utf-8');
                return JSON.parse(content) as UserPromptConfig;
            } else if (filePath.endsWith('.js') || filePath.endsWith('.ts')) {
                // For JS/TS files, we expect them to export a default config object
                // This is more complex and would require dynamic imports
                // JS/TS prompt files not yet supported - skip silently
                return null;
            }
        } catch (error) {
            // Skip invalid prompt files silently to avoid MCP protocol interference
        }
        return null;
    }

    /**
     * Convert user prompt config to MCP Prompt format
     */
    private convertToMCPPrompt(config: UserPromptConfig): Prompt {
        return {
            name: config.name,
            description: config.description,
            arguments: config.arguments || []
        };
    }

    /**
     * Generate prompt content for a user-created prompt
     */
    async generateUserPromptContent(promptName: string, args: any): Promise<string> {
        const promptFile = this.findPromptFile(promptName);
        if (!promptFile) {
            throw new Error(`User prompt not found: ${promptName}`);
        }

        const config = this.loadPromptFile(promptFile);
        if (!config) {
            throw new Error(`Failed to load user prompt: ${promptName}`);
        }

        return this.processTemplate(config.template, args);
    }

    /**
     * Find the file for a specific prompt
     */
    private findPromptFile(promptName: string): string | null {
        if (!existsSync(this.userPromptsDir)) {
            return null;
        }

        const files = readdirSync(this.userPromptsDir);
        for (const file of files) {
            if (file.endsWith('.json')) {
                const filePath = join(this.userPromptsDir, file);
                try {
                    const config = this.loadPromptFile(filePath);
                    if (config && config.name === promptName) {
                        return filePath;
                    }
                } catch (error) {
                    // Continue searching
                }
            }
        }
        return null;
    }

    /**
     * Simple template processing - replace {{variable}} with values from args
     */
    private processTemplate(template: string, args: any): string {
        let processed = template;

        // Replace {{variable}} patterns with values from args
        processed = processed.replace(/\{\{(\w+)\}\}/g, (match, variable) => {
            return args[variable] || match;
        });

        return processed;
    }

    /**
     * Check if a prompt is a user-created prompt
     */
    isUserPrompt(promptName: string): boolean {
        return this.findPromptFile(promptName) !== null;
    }

    /**
     * Create the user prompts directory if it doesn't exist
     */
    ensureUserPromptsDirectory(): void {
        if (!existsSync(this.userPromptsDir)) {
            try {
                const fs = require('fs');
                fs.mkdirSync(this.userPromptsDir, { recursive: true });
                // Directory created successfully - no console output to avoid MCP protocol interference
            } catch (error) {
                // Failed to create directory - handle silently to avoid MCP protocol interference
            }
        }
    }
}