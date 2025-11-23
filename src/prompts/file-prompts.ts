import { Prompt } from "@modelcontextprotocol/sdk/types.js";
import { readFileSync, existsSync, readdirSync } from "fs";
import { join } from "path";

export interface PromptConfig {
    name: string;
    description: string;
    arguments?: Array<{
        name: string;
        description: string;
        required?: boolean;
    }>;
    template: string;
}

export class FilePromptsLoader {
    private promptsDir: string;

    constructor(promptsDir: string) {
        this.promptsDir = promptsDir;
    }

    /**
     * Load all prompts from the directory
     */
    loadPrompts(): Prompt[] {
        const prompts: Prompt[] = [];

        if (!existsSync(this.promptsDir)) {
            return prompts;
        }

        try {
            const files = readdirSync(this.promptsDir).filter(file =>
                file.endsWith('.json')
            );

            for (const file of files) {
                try {
                    const promptConfig = this.loadPromptFile(join(this.promptsDir, file));
                    if (promptConfig) {
                        prompts.push(this.convertToMCPPrompt(promptConfig));
                    }
                } catch (error) {
                    // Skip invalid prompt files silently
                }
            }
        } catch (error) {
            // Skip directory read errors silently
        }

        return prompts;
    }

    /**
     * Load a single prompt configuration file
     */
    private loadPromptFile(filePath: string): PromptConfig | null {
        try {
            if (filePath.endsWith('.json')) {
                const content = readFileSync(filePath, 'utf-8');
                return JSON.parse(content) as PromptConfig;
            }
        } catch (error) {
            // Skip invalid prompt files silently
        }
        return null;
    }

    /**
     * Convert prompt config to MCP Prompt format
     */
    private convertToMCPPrompt(config: PromptConfig): Prompt {
        return {
            name: config.name,
            description: config.description,
            arguments: config.arguments || []
        };
    }

    /**
     * Generate prompt content
     */
    async generatePromptContent(promptName: string, args: any): Promise<string> {
        const promptFile = this.findPromptFile(promptName);
        if (!promptFile) {
            throw new Error(`Prompt not found: ${promptName}`);
        }

        const config = this.loadPromptFile(promptFile);
        if (!config) {
            throw new Error(`Failed to load prompt: ${promptName}`);
        }

        return this.processTemplate(config.template, args);
    }

    /**
     * Find the file for a specific prompt
     */
    private findPromptFile(promptName: string): string | null {
        if (!existsSync(this.promptsDir)) {
            return null;
        }

        const files = readdirSync(this.promptsDir);
        for (const file of files) {
            if (file.endsWith('.json')) {
                const filePath = join(this.promptsDir, file);
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
     * Check if a prompt exists in this loader
     */
    hasPrompt(promptName: string): boolean {
        return this.findPromptFile(promptName) !== null;
    }

    /**
     * Create the prompts directory if it doesn't exist
     */
    ensurePromptsDirectory(): void {
        if (!existsSync(this.promptsDir)) {
            try {
                const fs = require('fs');
                fs.mkdirSync(this.promptsDir, { recursive: true });
            } catch (error) {
                // Failed to create directory
            }
        }
    }
}
