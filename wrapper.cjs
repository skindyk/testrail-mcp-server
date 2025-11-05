#!/usr/bin/env node

// CommonJS wrapper for the ES module TestRail MCP server
async function startServer() {
  try {
    // Use dynamic import to load the ES module
    // main.js will select the appropriate transport based on MCP_TRANSPORT env var
    await import('./dist/main.js');
  } catch (error) {
    console.error('Failed to start TestRail MCP server:', error);
    process.exit(1);
  }
}

startServer();