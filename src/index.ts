#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  Tool,
} from "@modelcontextprotocol/sdk/types.js";
import { TestRailClient } from "./testrail-client.js";
import { parseCredentials } from "./config.js";
import { tools } from "./tools/index.js";

class TestRailMCPServer {
  private server: Server;
  private testRailClient: TestRailClient | null = null;

  constructor() {
    this.server = new Server({
      name: "testrail-mcp-server",
      version: "1.0.0",
    });

    this.setupToolHandlers();
  }

  private setupToolHandlers() {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      return {
        tools: tools as Tool[],
      };
    });

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      try {
        // Initialize TestRail client if not already done
        if (!this.testRailClient) {
          const credentials = parseCredentials();
          this.testRailClient = new TestRailClient(credentials);
        }

        // Find and execute the appropriate tool
        const tool = tools.find(t => t.name === name);
        if (!tool) {
          throw new Error(`Unknown tool: ${name}`);
        }

        const result = await this.executeToolMethod(name, args || {});

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      } catch (error) {
        return {
          content: [
            {
              type: "text",
              text: `Error: ${error instanceof Error ? error.message : String(error)}`,
            },
          ],
          isError: true,
        };
      }
    });
  }

  private async executeToolMethod(toolName: string, args: any): Promise<any> {
    if (!this.testRailClient) {
      throw new Error("TestRail client not initialized");
    }

    // Route to appropriate method based on tool name
    switch (toolName) {
        // Projects
      case "get_projects":
        return this.testRailClient.getProjects(args.is_completed);
      case "get_project":
        return this.testRailClient.getProject(args.project_id);
      case "add_project":
        return this.testRailClient.addProject(args);
      case "update_project":
        return this.testRailClient.updateProject(args.project_id, args);
      case "delete_project":
        return this.testRailClient.deleteProject(args.project_id);

        // Test Suites
      case "get_suites":
        return this.testRailClient.getSuites(args.project_id);
      case "get_suite":
        return this.testRailClient.getSuite(args.suite_id);
      case "add_suite":
        return this.testRailClient.addSuite(args.project_id, args);
      case "update_suite":
        return this.testRailClient.updateSuite(args.suite_id, args);
      case "delete_suite":
        return this.testRailClient.deleteSuite(args.suite_id);

        // Test Cases
      case "get_cases":
        return this.testRailClient.getCases(args.project_id, args);
      case "get_case":
        return this.testRailClient.getCase(args.case_id);
      case "add_case":
        return this.testRailClient.addCase(args.section_id, args);
      case "update_case":
        return this.testRailClient.updateCase(args.case_id, args);
      case "delete_case":
        return this.testRailClient.deleteCase(args.case_id);

        // Test Runs
      case "get_runs":
        return this.testRailClient.getRuns(args.project_id, args);
      case "get_run":
        return this.testRailClient.getRun(args.run_id);
      case "add_run":
        return this.testRailClient.addRun(args.project_id, args);
      case "update_run":
        return this.testRailClient.updateRun(args.run_id, args);
      case "close_run":
        return this.testRailClient.closeRun(args.run_id);
      case "delete_run":
        return this.testRailClient.deleteRun(args.run_id);

        // Test Results
      case "get_results":
        return this.testRailClient.getResults(args.test_id, args);
      case "get_results_for_case":
        return this.testRailClient.getResultsForCase(args.run_id, args.case_id, args);
      case "get_results_for_run":
        return this.testRailClient.getResultsForRun(args.run_id, args);
      case "add_result":
        return this.testRailClient.addResult(args.test_id, args);
      case "add_result_for_case":
        return this.testRailClient.addResultForCase(args.run_id, args.case_id, args);
      case "add_results":
        return this.testRailClient.addResults(args.run_id, args);
      case "add_results_for_cases":
        return this.testRailClient.addResultsForCases(args.run_id, args);

        // Test Plans
      case "get_plans":
        return this.testRailClient.getPlans(args.project_id, args);
      case "get_plan":
        return this.testRailClient.getPlan(args.plan_id);
      case "add_plan":
        return this.testRailClient.addPlan(args.project_id, args);
      case "update_plan":
        return this.testRailClient.updatePlan(args.plan_id, args);
      case "close_plan":
        return this.testRailClient.closePlan(args.plan_id);
      case "delete_plan":
        return this.testRailClient.deletePlan(args.plan_id);
      case "add_plan_entry":
        return this.testRailClient.addPlanEntry(args.plan_id, args);
      case "update_plan_entry":
        return this.testRailClient.updatePlanEntry(args.plan_id, args.entry_id, args);
      case "delete_plan_entry":
        return this.testRailClient.deletePlanEntry(args.plan_id, args.entry_id);

        // Sections
      case "get_sections":
        return this.testRailClient.getSections(args.project_id, args);
      case "get_section":
        return this.testRailClient.getSection(args.section_id);
      case "add_section":
        return this.testRailClient.addSection(args.project_id, args);
      case "update_section":
        return this.testRailClient.updateSection(args.section_id, args);
      case "delete_section":
        return this.testRailClient.deleteSection(args.section_id);

        // Milestones
      case "get_milestones":
        return this.testRailClient.getMilestones(args.project_id, args);
      case "get_milestone":
        return this.testRailClient.getMilestone(args.milestone_id);
      case "add_milestone":
        return this.testRailClient.addMilestone(args.project_id, args);
      case "update_milestone":
        return this.testRailClient.updateMilestone(args.milestone_id, args);
      case "delete_milestone":
        return this.testRailClient.deleteMilestone(args.milestone_id);

        // Users
      case "get_user":
        return this.testRailClient.getUser(args.user_id);
      case "get_user_by_email":
        return this.testRailClient.getUserByEmail(args.email);
      case "get_users":
        return this.testRailClient.getUsers(args.project_id);

        // Custom fields and configurations
      case "get_case_fields":
        return this.testRailClient.getCaseFields();
      case "get_case_types":
        return this.testRailClient.getCaseTypes();
      case "get_priorities":
        return this.testRailClient.getPriorities();
      case "get_result_fields":
        return this.testRailClient.getResultFields();
      case "get_statuses":
        return this.testRailClient.getStatuses();
      case "get_templates":
        return this.testRailClient.getTemplates(args.project_id);

        // Reports
      case "get_reports":
        return this.testRailClient.getReports(args.project_id);
      case "run_report":
        return this.testRailClient.runReport(args.report_template_id);

      default:
        throw new Error(`Unknown tool: ${toolName}`);
    }
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error("TestRail MCP server running on stdio");
  }
}

const server = new TestRailMCPServer();
server.run().catch((error) => {
  console.error("Failed to start TestRail MCP server:", error);
  process.exit(1);
});
