#!/usr/bin/env node

import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { TestRailMCPServer } from "./index.js";

async function main() {
  const server = new TestRailMCPServer();
  const transport = new StdioServerTransport();

  await server.run(transport);
}

main().catch((error) => {
  console.error("Failed to start TestRail MCP server (stdio):", error);
  process.exit(1);
});
