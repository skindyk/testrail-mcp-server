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
import { tools as allTools } from "./tools/index.js";

function getAllowedTools(): string[] | null {
  const allowed = process.env.MCP_TOOLS;
  if (!allowed) return null;
  try {
    return JSON.parse(allowed);
  } catch {
    return allowed.split(',').map(t => t.trim());
  }
}

class TestRailMCPServer {
  private server: Server;
  private testRailClient: TestRailClient | null = null;
  private tools: Tool[];

  constructor() {
    const allowedTools = getAllowedTools();
    this.tools = allowedTools
        ? allTools.filter(t => allowedTools.includes(t.name))
        : allTools;
    this.server = new Server({
      name: "testrail-mcp-server",
      version: "1.0.0",
    });

    this.setupToolHandlers();
  }

  private setupToolHandlers() {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      return {
        tools: this.tools as Tool[],
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
        const tool = this.tools.find(t => t.name === name);
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
        return this.testRailClient.getProjects(args.is_completed, args.limit, args.offset);
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
        return this.testRailClient.deleteSuite(args.suite_id, args.soft);

        // Test Cases
      case "get_cases":
        return this.testRailClient.getCases(args.project_id, args);
      case "get_case":
        return this.testRailClient.getCase(args.case_id);
      case "get_history_for_case":
        return this.testRailClient.getHistoryForCase(args.case_id, args.limit, args.offset);
      case "add_case":
        return this.testRailClient.addCase(args.section_id, args);
      case "update_case":
        return this.testRailClient.updateCase(args.case_id, args);
      case "delete_case":
        return this.testRailClient.deleteCase(args.case_id, args.soft);
      case "copy_cases_to_section":
        return this.testRailClient.copyCasesToSection(args.section_id, args.case_ids);
      case "update_cases":
        return this.testRailClient.updateCases(args.suite_id, args);
      case "move_cases_to_section":
        return this.testRailClient.moveCasesToSection(args.section_id, args.suite_id, args.case_ids);
      case "delete_cases":
        return this.testRailClient.deleteCases(args.project_id, args.case_ids, args.suite_id, args.soft);

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
        return this.testRailClient.deleteRun(args.run_id, args.soft);

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
      case "add_run_to_plan_entry":
        return this.testRailClient.addRunToPlanEntry(args.plan_id, args.entry_id, args);
      case "update_run_in_plan_entry":
        return this.testRailClient.updateRunInPlanEntry(args.run_id, args);
      case "delete_run_from_plan_entry":
        return this.testRailClient.deleteRunFromPlanEntry(args.run_id);

        // Sections
      case "get_sections":
        return this.testRailClient.getSections(args.project_id, args);
      case "get_section":
        return this.testRailClient.getSection(args.section_id);
      case "add_section":
        return this.testRailClient.addSection(args.project_id, args);
      case "update_section":
        return this.testRailClient.updateSection(args.section_id, args);
      case "move_section":
        return this.testRailClient.moveSection(args.section_id, args.parent_id, args.after_id);
      case "delete_section":
        return this.testRailClient.deleteSection(args.section_id, args.soft);

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
      case "add_case_field":
        return this.testRailClient.addCaseField(args);
      case "get_case_types":
        return this.testRailClient.getCaseTypes();
      case "get_priorities":
        return this.testRailClient.getPriorities();
      case "get_result_fields":
        return this.testRailClient.getResultFields();
      case "get_roles":
        return this.testRailClient.getRoles();
      case "get_statuses":
        return this.testRailClient.getStatuses();
      case "get_templates":
        return this.testRailClient.getTemplates(args.project_id);

        // Reports
      case "get_reports":
        return this.testRailClient.getReports(args.project_id);
      case "run_report":
        return this.testRailClient.runReport(args.report_template_id);
      case "get_cross_project_reports":
        return this.testRailClient.getCrossProjectReports();
      case "run_cross_project_report":
        return this.testRailClient.runCrossProjectReport(args.report_template_id);

        // Attachments
      case "add_attachment_to_case":
        return this.testRailClient.addAttachmentToCase(args.case_id, args.attachment);
      case "add_attachment_to_plan":
        return this.testRailClient.addAttachmentToPlan(args.plan_id, args.attachment);
      case "add_attachment_to_plan_entry":
        return this.testRailClient.addAttachmentToPlanEntry(args.plan_id, args.entry_id, args.attachment);
      case "add_attachment_to_result":
        return this.testRailClient.addAttachmentToResult(args.result_id, args.attachment);
      case "add_attachment_to_run":
        return this.testRailClient.addAttachmentToRun(args.run_id, args.attachment);
      case "get_attachments_for_case":
        return this.testRailClient.getAttachmentsForCase(args.case_id, args.limit, args.offset);
      case "get_attachments_for_plan":
        return this.testRailClient.getAttachmentsForPlan(args.plan_id, args.limit, args.offset);
      case "get_attachments_for_plan_entry":
        return this.testRailClient.getAttachmentsForPlanEntry(args.plan_id, args.entry_id);
      case "get_attachments_for_run":
        return this.testRailClient.getAttachmentsForRun(args.run_id, args.limit, args.offset);
      case "get_attachments_for_test":
        return this.testRailClient.getAttachmentsForTest(args.test_id);
      case "get_attachment":
        return this.testRailClient.getAttachment(args.attachment_id);
      case "delete_attachment":
        return this.testRailClient.deleteAttachment(args.attachment_id);

        // BDD (Behavior Driven Development)
      case "get_bdd":
        return this.testRailClient.getBdd(args.case_id);
      case "add_bdd":
        return this.testRailClient.addBdd(args.project_id, args.file_content);

        // Configurations
      case "get_configs":
        return this.testRailClient.getConfigs(args.project_id);
      case "add_config_group":
        return this.testRailClient.addConfigGroup(args.project_id, args.name);
      case "add_config":
        return this.testRailClient.addConfig(args.config_group_id, args.name);
      case "update_config_group":
        return this.testRailClient.updateConfigGroup(args.config_group_id, args.name);
      case "update_config":
        return this.testRailClient.updateConfig(args.config_id, args.name);
      case "delete_config_group":
        return this.testRailClient.deleteConfigGroup(args.config_group_id);
      case "delete_config":
        return this.testRailClient.deleteConfig(args.config_id);

        // Tests
      case "get_test":
        return this.testRailClient.getTest(args.test_id, args.with_data);
      case "get_tests":
        return this.testRailClient.getTests(args.run_id, {
          statusId: args.status_id,
          limit: args.limit,
          offset: args.offset,
          labelId: args.label_id
        });
      case "update_test":
        return this.testRailClient.updateTest(args.test_id, args.labels);
      case "update_tests":
        return this.testRailClient.updateTests(args.test_ids, args.labels);

        // Labels
      case "get_label":
        return this.testRailClient.getLabel(args.label_id);
      case "get_labels":
        return this.testRailClient.getLabels(args.project_id, {
          offset: args.offset,
          limit: args.limit
        });
      case "update_label":
        return this.testRailClient.updateLabel(args.label_id, args.title);

        // Shared Steps
      case "get_shared_step":
        return this.testRailClient.getSharedStep(args.shared_step_id);
      case "get_shared_step_history":
        return this.testRailClient.getSharedStepHistory(args.shared_step_id);
      case "get_shared_steps":
        return this.testRailClient.getSharedSteps(args.project_id, {
          created_after: args.created_after,
          created_before: args.created_before,
          created_by: args.created_by,
          limit: args.limit,
          offset: args.offset,
          updated_after: args.updated_after,
          updated_before: args.updated_before,
          refs: args.refs
        });
      case "add_shared_step":
        return this.testRailClient.addSharedStep(args.project_id, args.title, args.custom_steps_separated);
      case "update_shared_step":
        return this.testRailClient.updateSharedStep(args.shared_step_id, args.title, args.custom_steps_separated);
      case "delete_shared_step":
        return this.testRailClient.deleteSharedStep(args.shared_step_id, args.keep_in_cases);

        // Datasets
      case "get_dataset":
        return this.testRailClient.getDataset(args.dataset_id);
      case "get_datasets":
        return this.testRailClient.getDatasets(args.project_id);
      case "add_dataset":
        return this.testRailClient.addDataset(args.project_id, args.name, args.variables);
      case "update_dataset":
        return this.testRailClient.updateDataset(args.dataset_id, args.name, args.variables);
      case "delete_dataset":
        return this.testRailClient.deleteDataset(args.dataset_id);

        // Variables
      case "get_variables":
        return this.testRailClient.getVariables(args.project_id);
      case "add_variable":
        return this.testRailClient.addVariable(args.project_id, args.name);
      case "update_variable":
        return this.testRailClient.updateVariable(args.variable_id, args.name);
      case "delete_variable":
        return this.testRailClient.deleteVariable(args.variable_id);

        // Groups
      case "get_group":
        return this.testRailClient.getGroup(args.group_id);
      case "get_groups":
        return this.testRailClient.getGroups();
      case "add_group":
        return this.testRailClient.addGroup(args.name, args.user_ids);
      case "update_group":
        return this.testRailClient.updateGroup(args.group_id, args.name, args.user_ids);
      case "delete_group":
        return this.testRailClient.deleteGroup(args.group_id);

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