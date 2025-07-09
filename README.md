# TestRail MCP Server

A Model Context Protocol (MCP) server that provides seamless integration between MCP clients and TestRail API. This server enables natural language interactions with TestRail for test management operations.

## 🚀 Features

- **Complete TestRail API Coverage**: Access all TestRail endpoints through natural language.
- **Project Management**: Create, read, update, and delete projects.
- **Test Case Management**: Manage test cases, suites, and sections with advanced filtering.
- **Test Execution**: Create and manage test runs, add results, and track progress.
- **Test Planning**: Handle test plans and plan entries with full CRUD operations.
- **User & Configuration**: Access user data, priorities, statuses, custom fields, and enterprise features.
- **Reporting**: Generate and run reports including cross-project reports.
- **Advanced Features**: Support for BDD, attachments, shared steps, datasets, variables, labels, and configurations.
- **Enterprise Features**: User groups, roles, templates, and advanced administration.

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
- "Update test case 456 with new priority"
- "Get case history for case 789"

### Test Execution
- "Create a new test run for project 2"
- "Add a passed result for test case 789"
- "Show me all test runs for project 3"
- "Add multiple results for test run 123"
- "Get test results with advanced filtering"

### Test Planning
- "Get all test plans for project 1"
- "Create a new test plan called 'Release 2.0 Testing'"
- "Show me test plan details for plan 15"
- "Add a new plan entry with configurations"
- "Update plan entry runs"

### Advanced Features
- "Get BDD scenarios for project 1"
- "Create shared steps for test cases"
- "Manage datasets and variables"
- "Handle file attachments for test cases"
- "Configure test case labels"

### Enterprise & Administration
- "Get user groups and roles"
- "Manage custom field configurations"
- "Access template configurations"
- "Handle cross-project reporting"

### Reporting
- "Get available reports for project 2"
- "Run report template 5"

## 🔧 Available Tools

The server provides **119 tools** covering all TestRail API endpoints with complete feature coverage:

### Core Features
-   **Projects**: `get_projects`, `get_project`, `add_project`, `update_project`, `delete_project`
-   **Test Suites**: `get_suites`, `get_suite`, `add_suite`, `update_suite`, `delete_suite`
-   **Test Cases**: `get_cases`, `get_case`, `add_case`, `update_case`, `delete_case`, `get_history_for_case`, `copy_cases_to_section`
-   **Test Runs**: `get_runs`, `get_run`, `add_run`, `update_run`, `close_run`, `delete_run`
-   **Test Results**: `get_results`, `get_results_for_case`, `get_results_for_run`, `add_result`, `add_result_for_case`, `add_results`, `add_results_for_cases`
-   **Test Plans**: `get_plans`, `get_plan`, `add_plan`, `update_plan`, `close_plan`, `delete_plan`, `add_plan_entry`, `update_plan_entry`, `delete_plan_entry`
-   **Sections**: `get_sections`, `get_section`, `add_section`, `update_section`, `delete_section`, `move_section`
-   **Milestones**: `get_milestones`, `get_milestone`, `add_milestone`, `update_milestone`, `delete_milestone`

### User Management & Configuration
-   **Users**: `get_users`, `get_user`, `get_user_by_email`
-   **Case Fields**: `get_case_fields`, `add_case_field`
-   **Case Types**: `get_case_types`
-   **Priorities**: `get_priorities`
-   **Statuses**: `get_statuses`
-   **Templates**: `get_templates`
-   **Result Fields**: `get_result_fields`
-   **Roles**: `get_roles`

### Advanced Features
-   **Reporting**: `get_reports`, `run_report`, `get_cross_project_reports`, `run_cross_project_report`
-   **Attachments**: `get_attachments_for_case`, `get_attachments_for_plan`, `get_attachments_for_plan_entry`, `get_attachments_for_result`, `get_attachments_for_run`, `get_attachments_for_test`, `add_attachment_to_case`, `add_attachment_to_plan`, `add_attachment_to_plan_entry`, `add_attachment_to_result`, `add_attachment_to_run`, `delete_attachment`
-   **BDD**: `get_bdd`, `add_bdd`, `update_bdd`, `delete_bdd`
-   **Configurations**: `get_configs`, `add_config_group`, `add_config`, `update_config_group`, `update_config`, `delete_config_group`, `delete_config`
-   **Tests**: `get_tests`, `get_test`
-   **Labels**: `get_labels`, `add_label`, `set_case_labels`
-   **Shared Steps**: `get_shared_steps`, `get_shared_step`, `add_shared_step`, `update_shared_step`, `delete_shared_step`
-   **Datasets**: `get_datasets`, `add_dataset`, `update_dataset`, `delete_dataset`
-   **Variables**: `get_variables`, `add_variable`, `update_variable`, `delete_variable`

### Enterprise Features
-   **Groups**: `get_groups`, `get_group`, `add_group`, `update_group`, `delete_group`
-   **Plan Entry Management**: `add_run_to_plan_entry`, `update_run_in_plan_entry`, `delete_run_from_plan_entry`

### Enhanced Capabilities
- **Advanced Filtering**: Support for complex filters on cases, runs, results, and other entities
- **Bulk Operations**: Multiple result additions, case copying, and batch operations
- **Soft Deletion**: Proper handling of soft-deleted entities where supported
- **Version Requirements**: Clear indication of TestRail version requirements for specific features

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

### Key Files Overview
- **`src/tools/index.ts`**: Contains schemas for all 119 TestRail API endpoints with complete parameter validation
- **`src/testrail-client.ts`**: Implements all TestRail API client methods with proper error handling
- **`src/index.ts`**: Routes MCP tool calls to appropriate TestRail API client methods
- **`wrapper.cjs`**: CommonJS wrapper for compatibility with MCP clients like IntelliJ IDEA

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
