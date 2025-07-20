# TestRail MCP Server

A Model Context Protocol (MCP) server that provides seamless integration between MCP clients and TestRail API. This server enables natural language interactions with TestRail for test management operations.

## Features

- **Natural Language Interface**: Interact with TestRail using conversational commands
- **Complete TestRail API Coverage**: 119 tools covering all TestRail endpoints
- **Enterprise Support**: Advanced features including BDD, attachments, shared steps, datasets
- **Dynamic Field Filtering**: Reduce get_cases response size by 80-95% for large amounts of test cases
- **Flexible Tool Control**: Limit available tools using environment variables

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
    node dist/index.js
    ```
    You should see: `TestRail MCP server running on stdio`

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

## 📚 Documentation

For detailed information, examples, and advanced usage, visit our [Wiki](https://github.com/skindyk/testrail-mcp-server/wiki).

## 🚨 Troubleshooting

### Common Issues
- **Server Won't Start**: Check Node.js version (18+) and run `npm run build`
- **Connection Issues**: Verify absolute paths in MCP configuration
- **API Errors**: Ensure TestRail API access is enabled and credentials are correct

## 📄 License

MIT License.
