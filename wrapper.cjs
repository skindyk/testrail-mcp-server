#!/usr/bin/env node

// CommonJS wrapper for the ES module TestRail MCP server
async function startServer() {
  try {
    // Use dynamic import to load the ES module
    await import('./dist/index.js');
  } catch (error) {
    console.error('Failed to start TestRail MCP server:', error);
    process.exit(1);
  }
}

startServer();