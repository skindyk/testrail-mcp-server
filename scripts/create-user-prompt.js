#!/usr/bin/env node

/**
 * Interactive script to help users create custom prompts for TestRail MCP Server
 */

import { writeFileSync, existsSync } from 'fs';
import { join } from 'path';
import { createInterface } from 'readline';

const rl = createInterface({
    input: process.stdin,
    output: process.stdout
});

function question(prompt) {
    return new Promise((resolve) => {
        rl.question(prompt, resolve);
    });
}

function validatePromptName(name) {
    if (!name || name.trim().length === 0) {
        return 'Prompt name is required';
    }
    if (!/^[a-z0-9-]+$/.test(name)) {
        return 'Prompt name must contain only lowercase letters, numbers, and hyphens';
    }
    return null;
}

function validateRequired(value, fieldName) {
    if (!value || value.trim().length === 0) {
        return `${fieldName} is required`;
    }
    return null;
}

async function collectArguments() {
    const args = [];

    console.log('\n📝 Define prompt arguments, for example argument_name (press Enter with empty name to finish):');

    while (true) {
        const argName = await question('  Argument name (or Enter to finish): ');
        if (!argName.trim()) break;

        const argDescription = await question('  Argument description: ');
        const isRequired = await question('  Is this argument required? (y/N): ');

        args.push({
            name: argName.trim(),
            description: argDescription.trim(),
            required: isRequired.toLowerCase().startsWith('y')
        });

        console.log(`  ✅ Added argument: ${argName}`);
    }

    return args;
}



async function createPrompt() {
    console.log('🚀 TestRail MCP Server - Custom User Prompt Creator\n');
    console.log('This tool will help you create a custom prompt for the TestRail MCP Server.\n');

    try {
        // Collect basic information
        let promptName;
        while (true) {
            promptName = await question('📛 Prompt name (kebab-case, e.g., my-custom-prompt): ');
            const error = validatePromptName(promptName);
            if (error) {
                console.log(`❌ ${error}`);
                continue;
            }

            // Check if file already exists
            const filePath = join('user-prompts', `${promptName}.json`);
            if (existsSync(filePath)) {
                const overwrite = await question(`⚠️  Prompt '${promptName}' already exists. Overwrite? (y/N): `);
                if (!overwrite.toLowerCase().startsWith('y')) {
                    continue;
                }
            }
            break;
        }

        let description;
        while (true) {
            description = await question('📄 Description: ');
            const error = validateRequired(description, 'Description');
            if (error) {
                console.log(`❌ ${error}`);
                continue;
            }
            break;
        }

        // Collect arguments
        const argumentsList = await collectArguments();

        // Collect template
        console.log('\n📝 Template (multi-line, end with a line containing only "END"):');
        console.log('   Use {{variable_name}} for argument substitution');
        console.log('   Use markdown formatting for better readability\n');

        const templateLines = [];
        while (true) {
            const line = await question('');
            if (line.trim() === 'END') break;
            templateLines.push(line);
        }
        const template = templateLines.join('\n');

        if (!template.trim()) {
            console.log('❌ Template cannot be empty');
            return;
        }

        // Create prompt object
        const promptConfig = {
            name: promptName,
            description: description.trim(),
            arguments: argumentsList,
            template
        };

        // Write to file
        const filePath = join('user-prompts', `${promptName}.json`);
        writeFileSync(filePath, JSON.stringify(promptConfig, null, 2));

        console.log(`\n✅ Successfully created prompt: ${filePath}`);
        console.log('\n📋 Summary:');
        console.log(`   Name: ${promptName}`);
        console.log(`   Description: ${description}`);
        console.log(`   Arguments: ${argumentsList.length}`);


        console.log('\n🔄 To use your new prompt:');
        console.log('   1. Restart the MCP client');
        console.log(`   2. The prompt "${promptName}" will be available in your MCP client`);

    } catch (error) {
        console.error('❌ Error creating prompt:', error.message);
    } finally {
        rl.close();
    }
}

// Show examples if requested
if (process.argv.includes('--examples')) {
    console.log('📚 Example Prompts:\n');

    const examples = [
        {
            name: 'bug-analysis',
            description: 'Analyze failed test results to identify common bug patterns',
            args: ['project_name', 'time_period?']
        },
        {
            name: 'coverage-report',
            description: 'Generate test coverage report for specific features',
            args: ['project_name', 'feature_area']
        },
        {
            name: 'automation-roadmap',
            description: 'Create automation roadmap based on test case analysis',
            args: ['project_name', 'priority_level?']
        }
    ];

    examples.forEach(example => {
        console.log(`🔹 ${example.name}`);
        console.log(`   ${example.description}`);
        console.log(`   Arguments: ${example.args.join(', ')}`);
        console.log('');
    });

    process.exit(0);
}

// Show help if requested
if (process.argv.includes('--help') || process.argv.includes('-h')) {
    console.log(`
🚀 TestRail MCP Server - Custom Prompt Creator

Usage:
  node scripts/create-user-prompt.js          Create a new prompt interactively
  node scripts/create-user-prompt.js --examples    Show example prompt ideas
  node scripts/create-user-prompt.js --help        Show this help message

The script will guide you through creating a custom prompt with:
- Name and description
- Arguments (required/optional)
- Template with variable substitution

Created prompts are saved to user-prompts/ directory and automatically
loaded by the MCP server on restart.
`);
    process.exit(0);
}

// Run the main function
createPrompt();