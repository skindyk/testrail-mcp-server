# TestRail MCP Server

A Model Context Protocol (MCP) server that provides seamless integration between MCP clients and TestRail API. This server enables natural language interactions with TestRail for test management operations.

## 🚀 Features

- **Complete TestRail API Coverage**: Access all major TestRail endpoints through natural language.
- **Project Management**: Create, read, update, and delete projects.
- **Test Case Management**: Manage test cases, suites, and sections.
- **Test Execution**: Create and manage test runs, add results, and track progress.
- **Test Planning**: Handle test plans and plan entries.
- **User & Configuration**: Access user data, priorities, statuses, and custom fields.
- **Reporting**: Generate and run reports.

## 📋 Prerequisites

- **Node.js**: Version 18.0.0 or higher
- **TypeScript**: Version 5.0.0 or higher
- **TestRail Account**: Active TestRail instance with API access

## 🛠️ Installation

1.  **Clone the project**:

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

1.  **MCP Client Configuration**
    Configure the MCP server in your MCP client settings (IntelliJ IDEA GitHub Copilot example):

    ```json
    {
      "servers": {
        "testrail": {
          "command": "node",
          "args": ["C:\\path\\to\\your\\testrail-mcp\\wrapper.cjs"],
          "env": {
            "TESTRAIL_URL": "https://your-testrail-instance.testrail.io",
            "TESTRAIL_USERNAME": "your-email@company.com",
            "TESTRAIL_PASSWORD": "your-api-key-or-password"
          }
        }
      }
    }
    ```
    Set the environment variables above with your actual TestRail credentials and path to.

## 🎯 Usage Examples

Once configured, you can use natural language commands in MCP clients like IntelliJ IDEA GitHub Copilot to interact with TestRail. Here are some examples:

### Project Management
- "Get all projects from TestRail"
- "Show me details for project 5"
- "Create a new project called 'Mobile App Testing'"

### Test Case Management
- "Show me test cases for project 1"
- "Get test case details for case ID 123"
- "Create a new test case in section 45"

### Test Execution
- "Create a new test run for project 2"
- "Add a passed result for test case 789"
- "Show me all test runs for project 3"

### Test Planning
- "Get all test plans for project 1"
- "Create a new test plan called 'Release 2.0 Testing'"
- "Show me test plan details for plan 15"

### Reporting
- "Get available reports for project 2"
- "Run report template 5"

## 🔧 Available Tools

The server provides 50+ tools covering all major TestRail operations:

-   **Projects**: `get_projects`, `get_project`, `add_project`, `update_project`, `delete_project`
-   **Test Suites**: `get_suites`, `get_suite`, `add_suite`, `update_suite`, `delete_suite`
-   **Test Cases**: `get_cases`, `get_case`, `add_case`, `update_case`, `delete_case`
-   **Test Runs**: `get_runs`, `get_run`, `add_run`, `update_run`, `close_run`, `delete_run`
-   **Test Results**: `get_results`, `add_result`, `add_results`, `get_results_for_case`, `get_results_for_run`
-   **Test Plans**: `get_plans`, `get_plan`, `add_plan`, `update_plan`, `close_plan`, `delete_plan`
-   **Sections & Organization**: `get_sections`, `get_section`, `add_section`, `update_section`, `delete_section`
-   **Milestones**: `get_milestones`, `get_milestone`, `add_milestone`, `update_milestone`, `delete_milestone`
-   **Users & Configuration**: `get_users`, `get_user`, `get_user_by_email`, `get_case_fields`, `get_case_types`, `get_priorities`, `get_statuses`, `get_templates`, `get_result_fields`
-   **Reporting**: `get_reports`, `run_report`

## 🛡️ Limiting Available Tools with MCP_TOOLS

If your MCP client does not support tool list controls, you can restrict which tools are available to the client by setting the `MCP_TOOLS` environment variable. This is useful for security or to simplify the toolset for specific use cases.

- **How to use:**
  - Set `MCP_TOOLS` to a JSON array or a comma-separated list of tool names.
  - Only the tools listed will be available to clients; all others will be hidden.
  - If `MCP_TOOLS` is not set, all tools are enabled by default.

  - **Examples:**

      ```json
          {
        "servers": {
          "testrail": {
            "command": "node",
            "args": ["C:\\path\\to\\your\\testrail-mcp\\wrapper.cjs"],
            "env": {
              "TESTRAIL_URL": "https://your-testrail-instance.testrail.io",
              "TESTRAIL_USERNAME": "your-email@company.com",
              "TESTRAIL_PASSWORD": "your-api-key-or-password",
              "MCP_TOOLS": ["get_projects","get_cases","add_case"]
            }
          }
        }
      }
      ```

## 📁 Project Structure

```
testrail-mcp/
├── src/
│   ├── index.ts              # Main server entry point
│   ├── config.ts             # Configuration management
│   ├── testrail-client.ts    # TestRail API client
│   └── tools/
│       └── index.ts          # Tool definitions
├── dist/                     # Compiled JavaScript files
├── wrapper.cjs               # CommonJS wrapper for IntelliJ
├── package.json              # Node.js dependencies
├── tsconfig.json             # TypeScript configuration
└── README.md                 # This file
```

## 🚨 Troubleshooting

### Server Won't Start
-   Check Node.js version: `node --version` (should be 18+)
-   Verify build completed: `npm run build`

### MCP Client Connection Issues
-   Verify paths in MCP configuration are absolute and correct
-   Check that `wrapper.cjs` exists and is executable
-   Ensure `TESTRAIL_CONFIG_PATH` points to your `mcp.json` file
-   Restart MCP client after configuration changes

### API Errors
-   Verify TestRail instance URL is accessible
-   Check that API access is enabled in your TestRail instance
-   Ensure your user account has appropriate permissions
-   Use API key instead of password for authentication

## 📄 License

MIT License.

## 🔗 Related Links

-   [TestRail API Documentation](https://www.gurock.com/testrail/docs/api)
-   [Model Context Protocol](https://microsoft.github.io/language-server-protocol/specifications/mcp/0.9.0/specification/)
-   [IntelliJ IDEA GitHub Copilot Plugin](https://plugins.jetbrains.com/plugin/17718-github-copilot)
