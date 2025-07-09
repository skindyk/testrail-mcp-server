export interface TestRailCredentials {
  url: string;
  username: string;
  password: string;
  apiKey?: string;
}

export function parseCredentials(): TestRailCredentials {
  // Read credentials from environment variables
  const url = process.env.TESTRAIL_URL;
  const username = process.env.TESTRAIL_USERNAME;
  const password = process.env.TESTRAIL_PASSWORD;
  const apiKey = process.env.TESTRAIL_APIKEY; // Optional

  if (!url || !username || !password) {
    throw new Error('Missing required TestRail environment variables: TESTRAIL_URL, TESTRAIL_USERNAME, TESTRAIL_PASSWORD');
  }

  // Simple URL validation
  try {
    new URL(url);
  } catch {
    throw new Error('TESTRAIL_URL must be a valid URL');
  }

  return { url, username, password, apiKey };
}