# TestRail MCP Server

A Model Context Protocol (MCP) server that provides seamless integration between MCP clients and TestRail API. This server enables natural language interactions with TestRail for test management operations.

## Features

- **Natural Language Interface**: Interact with TestRail using conversational commands
- **Complete TestRail API Coverage**: 119 tools covering all TestRail API endpoints + custom tools!
- **Bulk Test Plan/Run Operations**: Custom bulk test plan/run closure functionality for handling up to 250 open plans/runs
- **Full File Upload Support**: Upload attachments to test cases, results, plans, and runs
- **Enterprise Support**: Advanced features including BDD, attachments, shared steps, datasets
- **Dynamic Field Filtering**: Reduce get_cases response size by 80-95% for large amounts of test cases
- **Flexible Tool Control**: Limit available tools using environment variables
- **System and User-Created MCP Prompts**: This MCP Server supports both default server prompts and provides the ability for users to create their own ones

## 📋 Prerequisites

- **Node.js**: Version 18.0.0 or higher
- **TypeScript**: Version 5.0.0 or higher
- **TestRail Account**: Active TestRail instance with API access

## 🛠️ Installation

1.  **Clone the project**:
    ```bash
    git clone https://github.com/skindyk/testrail-mcp-server.git
    cd testrail-mcp-server
    ```
    
2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Build the project**:
    ```bash
    npm run build
    ```

4.  **Test the server (optional)**:
    ```bash
    npm run start:stdio
    ```
    You should see a message indicating the server started with stdio transport

## ⚙️ Configuration

**MCP Client Configuration**
**Windows:**
```json
{
  "servers": {
    "testrail": {
      "command": "node",
      "args": ["C:\\path\\to\\your\\testrail-mcp-server\\wrapper.cjs"],
      "env": {
        "TESTRAIL_URL": "https://your-testrail-instance.testrail.io",
        "TESTRAIL_USERNAME": "your-email@company.com",
        "TESTRAIL_PASSWORD": "your-api-key-or-password"
      }
    }
  }
}
```

**macOS/Linux:**
```json
{
  "servers": {
    "testrail": {
      "command": "node",
      "args": ["/path/to/your/testrail-mcp-server/wrapper.cjs"],
      "env": {
        "TESTRAIL_URL": "https://your-testrail-instance.testrail.io",
        "TESTRAIL_USERNAME": "your-email@company.com",
        "TESTRAIL_PASSWORD": "your-api-key-or-password"
      }
    }
  }
}
```

Replace the paths and environment variables with your actual TestRail credentials and absolute path to wrapper.cjs.

### Transport Modes

This server supports two transport modes:

#### 1. Stdio Transport (Default)
For local use with Claude Desktop or other stdio-based MCP clients.

```bash
# Using npm scripts
npm run start:stdio
npm run dev:stdio

# Or set environment variable
MCP_TRANSPORT=stdio npm start
```

MCP client configuration (as shown above) remains unchanged.

#### 2. HTTP Transport
For remote deployments, Docker/Kubernetes, or web-based MCP clients. Uses JSON request/response and includes healthcheck endpoints.

```bash
# Using npm scripts
npm run start:http
npm run dev:http

# Or set environment variable
MCP_TRANSPORT=http npm start
```

**Environment Variables for HTTP Mode:**
```bash
MCP_TRANSPORT=http              # Enable HTTP transport
MCP_HTTP_PORT=8080              # Port to listen on (default: 8080)
MCP_HTTP_HOST=0.0.0.0           # Host to bind to (default: 0.0.0.0)
TESTRAIL_URL=https://...        # Your TestRail instance URL
TESTRAIL_USERNAME=your@email    # Your TestRail username
TESTRAIL_PASSWORD=your-api-key  # Your TestRail API key
```

**HTTP Endpoints:**
- `POST /mcp` - Send JSON-RPC messages and receive JSON responses
- `DELETE /mcp` - Terminate session (requires `Mcp-Session-Id` header)
- `GET /health` - Basic health check (always returns 200 OK)
- `GET /health/ready` - Readiness check (always returns 200 OK)

**Docker/Kubernetes Healthcheck Example:**
```yaml
livenessProbe:
  httpGet:
    path: /health
    port: 8080
  initialDelaySeconds: 10
  periodSeconds: 30

readinessProbe:
  httpGet:
    path: /health/ready
    port: 8080
  initialDelaySeconds: 5
  periodSeconds: 10
```

**Testing HTTP Mode:**
```bash
# Start server
npm run start:http

# Check health
curl http://localhost:8080/health

# Test MCP endpoint (creates new session)
curl -X POST http://localhost:8080/mcp \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{}}'
```

## 📚 Documentation

For detailed information, examples, and advanced usage, visit our [Wiki](https://github.com/skindyk/testrail-mcp-server/wiki).

## 🚨 Troubleshooting

### Common Issues
- **Server Won't Start**: Check Node.js version (18+) and run `npm run build`
- **Connection Issues**: Verify absolute paths in MCP configuration
- **API Errors**: Ensure TestRail API access is enabled and credentials are correct

## 📄 License

MIT License.
