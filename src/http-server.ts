#!/usr/bin/env node

import express, { Request, Response } from "express";
import cors from "cors";
import { randomUUID } from "crypto";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { TestRailMCPServer } from "./index.js";

// Configuration from environment variables
const HTTP_PORT = parseInt(process.env.MCP_HTTP_PORT || "8080", 10);
const HTTP_HOST = process.env.MCP_HTTP_HOST || "0.0.0.0";

async function main() {
  const app = express();

  // CORS configuration - allow all origins with exposed session header
  app.use(
    cors({
      origin: true,
      credentials: true,
      exposedHeaders: ["Mcp-Session-Id"],
    })
  );

  // Parse JSON bodies
  app.use(express.json());

  // Health check endpoints
  app.get("/health", (_req: Request, res: Response) => {
    res.status(200).json({
      status: "healthy",
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    });
  });

  app.get("/health/ready", (_req: Request, res: Response) => {
    res.status(200).json({
      ready: true,
      timestamp: new Date().toISOString(),
    });
  });

  // Create transport and server with JSON responses (no SSE)
  const transport = new StreamableHTTPServerTransport({
    sessionIdGenerator: () => randomUUID(),
    enableJsonResponse: true, // Use JSON responses instead of deprecated SSE
    onsessioninitialized: (sessionId: string) => {
      console.error(`[HTTP] Session initialized: ${sessionId}`);
    },
    onsessionclosed: (sessionId: string) => {
      console.error(`[HTTP] Session closed: ${sessionId}`);
    },
  });

  const server = new TestRailMCPServer();
  await server.run(transport);

  // MCP endpoint - handles GET, POST, and DELETE
  // The transport will automatically handle session management
  app.all("/mcp", async (req: Request, res: Response) => {
    try {
      await transport.handleRequest(req, res, req.body);
    } catch (error) {
      console.error("[HTTP] Error handling MCP request:", error);
      if (!res.headersSent) {
        res.status(500).json({
          error: "Internal server error",
          message: error instanceof Error ? error.message : String(error),
        });
      }
    }
  });

  // Start the server
  app.listen(HTTP_PORT, HTTP_HOST, () => {
    console.error(`[HTTP] TestRail MCP server listening on http://${HTTP_HOST}:${HTTP_PORT}`);
    console.error(`[HTTP] Health endpoint: http://${HTTP_HOST}:${HTTP_PORT}/health`);
    console.error(`[HTTP] MCP endpoint: http://${HTTP_HOST}:${HTTP_PORT}/mcp`);
  });
}

main().catch((error) => {
  console.error("Failed to start TestRail MCP server (HTTP):", error);
  process.exit(1);
});
