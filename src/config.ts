import { readFileSync } from 'fs';
import { z } from 'zod';

const TestRailCredentialsSchema = z.object({
  url: z.string().url(),
  username: z.string(),
  password: z.string(),
  apiKey: z.string().optional(),
});

export type TestRailCredentials = z.infer<typeof TestRailCredentialsSchema>;

export function parseCredentials(): TestRailCredentials {
  const configPath = process.env.TESTRAIL_CONFIG_PATH || './mcp.json';

  try {
    const configContent = readFileSync(configPath, 'utf-8');
    const config = JSON.parse(configContent);

    // Look for TestRail configuration in the MCP config
    const testRailConfig = config.testRail || config.testrail || config.TestRail;

    if (!testRailConfig) {
      throw new Error('TestRail configuration not found in mcp.json. Please add a "testRail" section with url, username, and password/apiKey');
    }

    return TestRailCredentialsSchema.parse(testRailConfig);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to parse TestRail credentials: ${error.message}`);
    }
    throw error;
  }
}