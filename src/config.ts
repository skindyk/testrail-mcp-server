import { z } from 'zod';

const TestRailCredentialsSchema = z.object({
  url: z.string().url(),
  username: z.string(),
  password: z.string(),
  apiKey: z.string().optional(),
});

export type TestRailCredentials = z.infer<typeof TestRailCredentialsSchema>;

export function parseCredentials(): TestRailCredentials {
  // Read credentials from environment variables
  const url = process.env.TESTRAIL_URL;
  const username = process.env.TESTRAIL_USERNAME;
  const password = process.env.TESTRAIL_PASSWORD;
  const apiKey = process.env.TESTRAIL_APIKEY; // Optional

  if (!url || !username || !password) {
    throw new Error('Missing required TestRail environment variables: TESTRAIL_URL, TESTRAIL_USERNAME, TESTRAIL_PASSWORD');
  }

  return TestRailCredentialsSchema.parse({ url, username, password, apiKey });
}