#!/usr/bin/env node

/**
 * Main entry point for TestRail MCP Server
 * Selects transport based on MCP_TRANSPORT environment variable
 *
 * Supported transports:
 * - stdio: Standard input/output transport (default) - for local Claude Desktop
 * - http: HTTP/SSE transport with healthcheck endpoints - for remote deployment
 */

const transport = (process.env.MCP_TRANSPORT || "stdio").toLowerCase();

async function main() {
  switch (transport) {
    case "stdio":
      console.error("[Main] Starting TestRail MCP server with stdio transport...");
      await import("./stdio-server.js");
      break;

    case "http":
      console.error("[Main] Starting TestRail MCP server with HTTP transport...");
      await import("./http-server.js");
      break;

    default:
      console.error(`[Main] Error: Invalid transport type: "${transport}"`);
      console.error('[Main] Supported transports: "stdio", "http"');
      console.error('[Main] Set MCP_TRANSPORT environment variable to select transport');
      process.exit(1);
  }
}

main().catch((error) => {
  console.error("[Main] Failed to start TestRail MCP server:", error);
  process.exit(1);
});
