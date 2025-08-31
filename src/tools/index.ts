import { Tool } from "@modelcontextprotocol/sdk/types.js";

export const tools: Tool[] = [
  // Projects
  {
    name: "get_projects",
    description: "Retrieve all TestRail projects with optional filtering. Use this to get an overview of available TestRail projects, check project status, or find specific projects by completion state. Returns project details including ID, name, announcement, suite mode, and completion status.",
    inputSchema: {
      type: "object",
      properties: {
        is_completed: {
          type: "boolean",
          description: "Filter TestRail projects by completion status. Set to true to get only completed/archived projects, false for active projects only, or omit to retrieve all projects regardless of status."
        },
        limit: {
          type: "integer",
          description: "Maximum number of projects to return in a single request (default: 250). Use for pagination with large project lists. Requires TestRail 6.7 or higher."
        },
        offset: {
          type: "integer",
          description: "Starting position for pagination (0-based). Use with limit parameter to paginate through large result sets. Requires TestRail 6.7 or higher."
        }
      }
    }
  },
  {
    name: "get_project",
    description: "Retrieve detailed information about a specific TestRail project by its ID. Returns comprehensive project data including configuration, suite mode, custom fields, and administrative details. Use this when you need complete project information for analysis or reporting.",
    inputSchema: {
      type: "object",
      properties: {
        project_id: {
          type: "integer",
          description: "The unique identifier of the TestRail project to retrieve. You can find project IDs by using get_projects or checking the TestRail project URL."
        }
      },
      required: ["project_id"]
    }
  },
  {
    name: "add_project",
    description: "Create a new TestRail project with specified configuration. Use this to set up new testing initiatives, product releases, or separate testing environments. The project will be created with default settings that can be customized later.",
    inputSchema: {
      type: "object",
      properties: {
        name: {
          type: "string",
          description: "The display name for the new TestRail project. Choose a descriptive name that clearly identifies the project's purpose (e.g., 'Mobile App v2.0', 'API Integration Testing')."
        },
        announcement: {
          type: "string",
          description: "Optional project announcement or description shown to team members. Use this to communicate project goals, important information, or guidelines to the testing team."
        },
        show_announcement: {
          type: "boolean",
          description: "Whether to display the announcement to users when they access the project. Set to true to make the announcement visible, false to hide it."
        },
        suite_mode: {
          type: "integer",
          description: "Defines the test suite organization mode: 1 = Single suite (all test cases in one suite), 2 = Single suite with baselines (versioned test cases), 3 = Multiple suites (separate suites for different features/modules). Choose based on your testing workflow."
        }
      },
      required: ["name"]
    }
  },
  {
    name: "update_project",
    description: "Modify an existing TestRail project's settings, description, or configuration. Use this to rename projects, update announcements, change completion status, or modify suite modes as your testing needs evolve.",
    inputSchema: {
      type: "object",
      properties: {
        project_id: {
          type: "integer",
          description: "The unique identifier of the TestRail project to update. Must be a valid, existing project ID."
        },
        name: {
          type: "string",
          description: "New display name for the project. Update this when project scope changes or for better organization."
        },
        announcement: {
          type: "string",
          description: "Updated project announcement or description. Use this to communicate changes, new requirements, or important updates to the team."
        },
        show_announcement: {
          type: "boolean",
          description: "Control announcement visibility. Set to true to show the announcement to all project members, false to hide it."
        },
        suite_mode: {
          type: "integer",
          description: "Change the suite organization mode: 1 = Single suite, 2 = Single suite with baselines, 3 = Multiple suites. Warning: Changing suite mode may affect existing test organization."
        },
        is_completed: {
          type: "boolean",
          description: "Mark the project as completed (archived) or active. Set to true to archive the project, false to reactivate it. Completed projects are read-only."
        }
      },
      required: ["project_id"]
    }
  },
  {
    name: "delete_project",
    description: "Permanently delete a TestRail project and all its associated data. WARNING: This action cannot be undone and will remove all test cases, runs, results, and project history. Use with extreme caution and ensure you have proper backups.",
    inputSchema: {
      type: "object",
      properties: {
        project_id: {
          type: "integer",
          description: "The unique identifier of the TestRail project to permanently delete. Double-check this ID before proceeding as deletion is irreversible."
        }
      },
      required: ["project_id"]
    }
  },

  // Test Suites
  {
    name: "get_suites",
    description: "Retrieve all test suites within a TestRail project. Test suites are containers that organize test cases by feature, module, or testing phase. Use this to understand project structure, find specific suites, or get an overview of test organization.",
    inputSchema: {
      type: "object",
      properties: {
        project_id: {
          type: "integer",
          description: "The unique identifier of the TestRail project containing the test suites. All suites within this project will be returned."
        }
      },
      required: ["project_id"]
    }
  },
  {
    name: "get_suite",
    description: "Retrieve detailed information about a specific TestRail test suite by its ID. Returns suite configuration, description, and metadata. Use this when you need specific suite details for reporting or analysis.",
    inputSchema: {
      type: "object",
      properties: {
        suite_id: {
          type: "integer",
          description: "The unique identifier of the TestRail test suite to retrieve. You can find suite IDs using get_suites or from the TestRail interface."
        }
      },
      required: ["suite_id"]
    }
  },
  {
    name: "add_suite",
    description: "Create a new test suite within a TestRail project. Test suites help organize test cases by feature, component, or testing phase. Use this to establish new testing areas or reorganize existing test structure.",
    inputSchema: {
      type: "object",
      properties: {
        project_id: {
          type: "integer",
          description: "The unique identifier of the TestRail project where the new suite will be created. Must be a valid, existing project."
        },
        name: {
          type: "string",
          description: "The display name for the new test suite. Choose a descriptive name that clearly identifies the suite's purpose (e.g., 'Login & Authentication', 'Payment Processing', 'API Endpoints')."
        },
        description: {
          type: "string",
          description: "Optional detailed description of the test suite's scope and purpose. Use this to explain what functionality this suite covers and any special testing considerations."
        }
      },
      required: ["project_id", "name"]
    }
  },
  {
    name: "update_suite",
    description: "Modify an existing TestRail test suite's name, description, or configuration. Use this to keep suite information current as project requirements evolve or to improve test organization.",
    inputSchema: {
      type: "object",
      properties: {
        suite_id: {
          type: "integer",
          description: "The unique identifier of the TestRail test suite to update. Must be a valid, existing suite ID."
        },
        name: {
          type: "string",
          description: "New display name for the test suite. Update this when suite scope changes or for better organization."
        },
        description: {
          type: "string",
          description: "Updated description of the test suite's purpose and scope. Use this to reflect changes in functionality or testing approach."
        }
      },
      required: ["suite_id"]
    }
  },
  {
    name: "delete_suite",
    description: "Delete a TestRail test suite and all its associated test cases. WARNING: This action removes all test cases within the suite and cannot be undone. Use soft deletion option to preview impact before permanent removal.",
    inputSchema: {
      type: "object",
      properties: {
        suite_id: {
          type: "integer",
          description: "The unique identifier of the TestRail test suite to delete. Double-check this ID as deletion affects all test cases within the suite."
        },
        soft: {
          type: "boolean",
          description: "Preview mode: Set to true to see what would be deleted without actually removing data. Set to false or omit to perform actual deletion. Always test with soft=true first."
        }
      },
      required: ["suite_id"]
    }
  },

  // Test Cases
  {
    name: "get_cases",
    description: "Retrieve test cases from a TestRail project with advanced filtering options. Supports custom field selection to reduce response size for large datasets. When fetching many test cases (100+), specify only required fields using the 'fields' parameter to prevent context overflow. Test cases are the individual test scenarios that define what needs to be tested.",
    inputSchema: {
      type: "object",
      properties: {
        project_id: {
          type: "integer",
          description: "The unique identifier of the TestRail project containing the test cases. All filtering will be applied within this project scope."
        },
        suite_id: {
          type: "integer",
          description: "Filter by specific test suite ID. Optional for single-suite projects, required for multi-suite projects. Use get_suites to find available suite IDs."
        },
        section_id: {
          type: "integer",
          description: "Filter by specific section ID to get test cases from a particular section or folder. Use get_sections to find available section IDs."
        },
        fields: {
          type: "string",
          description: "Comma-separated list of specific fields to return (e.g., 'id,title,refs,estimate'). If not provided, returns all fields. This significantly reduces response size for large datasets. Standard fields available: id, title, section_id, template_id, type_id, priority_id, milestone_id, refs, created_by, created_on, updated_by, updated_on, estimate, estimate_forecast, suite_id, display_order, is_deleted, case_assignedto_id, comments, labels. Custom fields (custom_*) are automatically detected per project and validated dynamically."
        },
        created_after: {
          type: "integer",
          description: "Filter to test cases created after this date (UNIX timestamp). Use this to find recently added test cases or track test case creation over time."
        },
        created_before: {
          type: "integer",
          description: "Filter to test cases created before this date (UNIX timestamp). Use this to find older test cases or limit results to a specific time period."
        },
        created_by: {
          type: "array",
          items: {
            type: "integer"
          },
          description: "Filter by test case creator user IDs. Use get_users to find user IDs. Useful for tracking individual contributions or filtering by team members."
        },
        filter: {
          type: "string",
          description: "Text search filter to find test cases with matching content in the title. Use this to quickly locate specific test cases by name or keywords."
        },
        limit: {
          type: "integer",
          description: "Maximum number of test cases to return in a single request (default: 250). Use for pagination and performance optimization with large test suites."
        },
        milestone_id: {
          type: "array",
          items: {
            type: "integer"
          },
          description: "Filter by milestone IDs to get test cases associated with specific project milestones. Use get_milestones to find available milestone IDs."
        },
        offset: {
          type: "integer",
          description: "Starting position for pagination (0-based). Use with limit parameter to navigate through large result sets efficiently."
        },
        priority_id: {
          type: "array",
          items: {
            type: "integer"
          },
          description: "Filter by priority levels (e.g., Critical, High, Medium, Low). Use get_priorities to find available priority IDs in your TestRail instance."
        },
        refs: {
          type: "string",
          description: "Filter by reference ID to find test cases linked to specific requirements, tickets, or external references (e.g., 'TR-1', 'JIRA-123')."
        },
        template_id: {
          type: "array",
          items: {
            type: "integer"
          },
          description: "Filter by template IDs to get test cases using specific field layouts or formats. Use get_templates to find available template IDs."
        },
        type_id: {
          type: "array",
          items: {
            type: "integer"
          },
          description: "Filter by test case types (e.g., Functional, Regression, Smoke). Use get_case_types to find available type IDs in your TestRail instance."
        },
        updated_after: {
          type: "integer",
          description: "Filter to test cases updated after this date (UNIX timestamp). Use this to find recently modified test cases or track changes over time."
        },
        updated_before: {
          type: "integer",
          description: "Filter to test cases updated before this date (UNIX timestamp). Use this to find test cases that haven't been updated recently."
        },
        updated_by: {
          type: "array",
          items: {
            type: "integer"
          },
          description: "Filter by user IDs who last updated the test cases. Use get_users to find user IDs. Useful for tracking modifications by team members."
        },
        label_id: {
          type: "array",
          items: {
            type: "integer"
          },
          description: "Filter by label IDs to get test cases with specific labels or tags. Use get_labels to find available label IDs. Requires TestRail 7.0+ with labels feature enabled."
        }
      },
      required: ["project_id"]
    }
  },
  {
    name: "get_case",
    description: "Retrieve detailed information about a specific TestRail test case by its ID. Returns complete test case data including steps, expected results, custom fields, and metadata. Use this for detailed test case analysis, documentation, or execution preparation.",
    inputSchema: {
      type: "object",
      properties: {
        case_id: {
          type: "integer",
          description: "The unique identifier of the TestRail test case to retrieve. You can find case IDs using get_cases or from the TestRail interface URL."
        }
      },
      required: ["case_id"]
    }
  },
  {
    name: "add_case",
    description: "Create a new test case in TestRail within a specific section. Test cases define individual testing scenarios with steps, expected results, and metadata. Use this to document new test requirements, expand test coverage, or formalize manual testing procedures.",
    inputSchema: {
      type: "object",
      properties: {
        section_id: {
          type: "integer",
          description: "The unique identifier of the TestRail section where the test case will be created. Use get_sections to find available section IDs and organize your test cases properly."
        },
        title: {
          type: "string",
          description: "The descriptive title of the test case that clearly identifies what is being tested. Use a clear, concise format like 'Verify user login with valid credentials' or 'Test API response for invalid input'."
        },
        template_id: {
          type: "integer",
          description: "The template ID that defines the field layout and structure for this test case. Use get_templates to find available templates. Different templates may have different required fields."
        },
        type_id: {
          type: "integer",
          description: "The test case type ID that categorizes the testing approach (e.g., Functional, Regression, Smoke, Performance). Use get_case_types to find available types in your TestRail instance."
        },
        priority_id: {
          type: "integer",
          description: "The priority level ID that indicates the importance of this test case (e.g., Critical, High, Medium, Low). Use get_priorities to find available priority levels."
        },
        estimate: {
          type: "string",
          description: "Time estimate for executing this test case (e.g., '30s', '1m 45s', '2h'). Use realistic timing that helps with test planning and resource allocation."
        },
        milestone_id: {
          type: "integer",
          description: "The milestone ID to associate this test case with a specific project milestone or release. Use get_milestones to find available milestone IDs."
        },
        refs: {
          type: "string",
          description: "Comma-separated list of external references, requirements, or tickets (e.g., 'REQ-123,JIRA-456'). Links test cases to external tracking systems or documentation."
        },
        labels: {
          type: "array",
          items: {
            oneOf: [
              { type: "integer" },
              { type: "string" }
            ]
          },
          description: "Array of label IDs or label titles to categorize and organize test cases. Use get_labels to find available labels. Requires TestRail 7.0+ with labels feature enabled."
        },
        custom_preconds: {
          type: "string",
          description: "Preconditions that must be met before executing this test case. Describe the required system state, data setup, or environmental conditions needed for successful test execution."
        },
        custom_steps: {
          type: "string",
          description: "Detailed test steps in a single text field. Use clear, numbered steps that describe exactly what actions to perform during test execution."
        },
        custom_expected: {
          type: "string",
          description: "Expected results or outcomes for the test case. Describe what should happen when the test steps are executed correctly, including specific system behaviors or outputs."
        },
        custom_steps_separated: {
          type: "array",
          items: {
            type: "object",
            properties: {
              content: {
                type: "string",
                description: "Individual test step content describing a specific action to perform."
              },
              expected: {
                type: "string",
                description: "Expected result for this specific step, describing what should happen after performing the action."
              },
              shared_step_id: {
                type: "integer",
                description: "ID of a shared step to reuse common test procedures. Use get_shared_steps to find available shared steps."
              }
            }
          },
          description: "Structured test steps with individual content and expected results. Use this format for complex test cases with multiple verification points."
        }
      },
      required: ["section_id", "title"]
    }
  },
  {
    name: "update_case",
    description: "Modify an existing TestRail test case with updated information, requirements, or test steps. Use this to keep test cases current with changing requirements, fix errors, or enhance test coverage. Supports partial updates - only specify fields you want to change.",
    inputSchema: {
      type: "object",
      properties: {
        case_id: {
          type: "integer",
          description: "The unique identifier of the TestRail test case to update. Must be a valid, existing test case ID."
        },
        section_id: {
          type: "integer",
          description: "The section ID to move the test case to a different section or organizational structure. Use get_sections to find available section IDs."
        },
        title: {
          type: "string",
          description: "Updated title of the test case. Use clear, descriptive titles that reflect the current test objective and make the case easy to identify."
        },
        template_id: {
          type: "integer",
          description: "The template ID to change the field layout and structure of the test case. Use get_templates to find available templates. Note: Changing templates may affect field availability."
        },
        type_id: {
          type: "integer",
          description: "Updated test case type ID to categorize the testing approach (e.g., Functional, Regression, Smoke, Performance). Use get_case_types to find available types."
        },
        priority_id: {
          type: "integer",
          description: "Updated priority level ID to reflect the current importance of this test case (e.g., Critical, High, Medium, Low). Use get_priorities to find available priority levels."
        },
        estimate: {
          type: "string",
          description: "Updated time estimate for executing this test case (e.g., '30s', '1m 45s', '2h'). Use realistic timing based on current test complexity and execution requirements."
        },
        milestone_id: {
          type: "integer",
          description: "Updated milestone ID to associate this test case with a different project milestone or release. Use get_milestones to find available milestone IDs."
        },
        refs: {
          type: "string",
          description: "Updated comma-separated list of external references, requirements, or tickets (e.g., 'REQ-123,JIRA-456'). Use this to maintain traceability to external systems."
        },
        labels: {
          type: "array",
          items: {
            oneOf: [
              { type: "integer" },
              { type: "string" }
            ]
          },
          description: "Updated array of label IDs or label titles to categorize and organize test cases. Use get_labels to find available labels. Requires TestRail 7.0+ with labels feature enabled."
        },
        custom_preconds: {
          type: "string",
          description: "Updated preconditions that must be met before executing this test case. Describe the current required system state, data setup, or environmental conditions."
        },
        custom_steps: {
          type: "string",
          description: "Updated detailed test steps in a single text field. Use clear, numbered steps that describe exactly what actions to perform during test execution."
        },
        custom_expected: {
          type: "string",
          description: "Updated expected results or outcomes for the test case. Describe what should happen when the test steps are executed correctly, including current system behaviors."
        },
        custom_steps_separated: {
          type: "array",
          items: {
            type: "object",
            properties: {
              content: {
                type: "string",
                description: "Updated individual test step content describing a specific action to perform."
              },
              expected: {
                type: "string",
                description: "Updated expected result for this specific step, describing what should happen after performing the action."
              },
              shared_step_id: {
                type: "integer",
                description: "ID of a shared step to reuse common test procedures. Use get_shared_steps to find available shared steps."
              }
            }
          },
          description: "Updated structured test steps with individual content and expected results. Use this format for complex test cases with multiple verification points."
        }
      },
      required: ["case_id"]
    }
  },
  {
    name: "delete_case",
    description: "Permanently delete a test case from TestRail. WARNING: This action cannot be undone and will remove the test case and all its associated data including results, history, and attachments. Use soft deletion option to preview impact before actual deletion.",
    inputSchema: {
      type: "object",
      properties: {
        case_id: {
          type: "integer",
          description: "The unique identifier of the test case to delete. Must be a valid, existing test case ID. Double-check this ID before proceeding as deletion is irreversible."
        },
        soft: {
          type: "boolean",
          description: "Set to true to perform a dry-run that returns data on affected tests without actually deleting. Set to false or omit to perform actual deletion. Use soft deletion first to understand impact."
        }
      },
      required: ["case_id"]
    }
  },
  {
    name: "get_history_for_case",
    description: "Retrieve the complete edit history for a specific test case, showing all changes, modifications, and updates over time. Use this for audit trails, understanding test case evolution, or tracking contributions by team members.",
    inputSchema: {
      type: "object",
      properties: {
        case_id: {
          type: "integer",
          description: "The unique identifier of the test case to get history for. Must be a valid, existing test case ID."
        },
        limit: {
          type: "integer",
          description: "Maximum number of historical changes to return in a single request (default: 250). Use for pagination with extensive edit histories."
        },
        offset: {
          type: "integer",
          description: "Starting position for pagination (0-based). Use with limit parameter to navigate through large change histories efficiently."
        }
      },
      required: ["case_id"]
    }
  },
  {
    name: "copy_cases_to_section",
    description: "Create copies of existing test cases in a different section while preserving all original test case data. Use this to reuse test cases across different areas of testing, create variations for different environments, or establish baseline test suites.",
    inputSchema: {
      type: "object",
      properties: {
        section_id: {
          type: "integer",
          description: "The unique identifier of the destination section where test cases will be copied. Must be a valid, existing section ID. Use get_sections to find available sections."
        },
        case_ids: {
          type: "array",
          items: {
            type: "integer"
          },
          description: "Array of test case IDs to copy to the destination section. All IDs must be valid, existing test case IDs."
        }
      },
      required: ["section_id", "case_ids"]
    }
  },
  {
    name: "update_cases",
    description: "Perform bulk updates on multiple test cases with the same values, enabling efficient maintenance and standardization across test suites. Use this to apply consistent changes to related test cases, update metadata in batches, or reorganize test case properties.",
    inputSchema: {
      type: "object",
      properties: {
        suite_id: {
          type: "integer",
          description: "The unique identifier of the test suite containing the test cases (required only if project operates in multi-suite mode). Use get_suites to find available suite IDs."
        },
        case_ids: {
          type: "array",
          items: {
            type: "integer"
          },
          description: "Array of test case IDs to update with the same values. All specified test cases will receive identical updates. Must be valid, existing test case IDs."
        },
        section_id: {
          type: "integer",
          description: "The section ID to move all specified test cases to. Use this to reorganize test cases into different sections. Use get_sections to find available section IDs."
        },
        title: {
          type: "string",
          description: "New title to apply to all specified test cases. Use consistent naming conventions when bulk updating titles."
        },
        template_id: {
          type: "integer",
          description: "The template ID to apply to all test cases, changing their field layout and structure. Use get_templates to find available templates."
        },
        type_id: {
          type: "integer",
          description: "The test case type ID to apply to all cases (e.g., Functional, Regression, Smoke). Use get_case_types to find available types."
        },
        priority_id: {
          type: "integer",
          description: "The priority level ID to apply to all cases (e.g., Critical, High, Medium, Low). Use get_priorities to find available priority levels."
        },
        estimate: {
          type: "string",
          description: "Time estimate to apply to all test cases (e.g., '30s', '1m 45s', '2h'). Use consistent formatting for time estimates."
        },
        milestone_id: {
          type: "integer",
          description: "The milestone ID to associate with all test cases. Use get_milestones to find available milestones."
        },
        refs: {
          type: "string",
          description: "Comma-separated list of external references or requirements to apply to all test cases. Useful for linking to tickets, requirements, or documentation."
        },
        labels: {
          type: "array",
          items: {
            oneOf: [
              { type: "integer" },
              { type: "string" }
            ]
          },
          description: "Array of label IDs (integers) or label titles (strings) to apply to all test cases. Use get_labels to find available labels."
        },
        custom_preconds: {
          type: "string",
          description: "Preconditions to apply to all test cases. Describe the required system state, data setup, or environmental conditions needed for successful test execution."
        },
        custom_steps: {
          type: "string",
          description: "Detailed test steps in a single text field to apply to all test cases. Use clear, numbered steps that describe exactly what actions to perform during test execution."
        },
        custom_expected: {
          type: "string",
          description: "Expected results or outcomes to apply to all test cases. Describe what should happen when the test steps are executed correctly, including specific system behaviors or outputs."
        },
        custom_steps_separated: {
          type: "array",
          items: {
            type: "object",
            properties: {
              content: {
                type: "string",
                description: "Individual test step content describing a specific action to perform."
              },
              expected: {
                type: "string",
                description: "Expected result for this specific step, describing what should happen after performing the action."
              },
              shared_step_id: {
                type: "integer",
                description: "ID of a shared step to reuse common test procedures. Use get_shared_steps to find available shared steps."
              }
            }
          },
          description: "Structured test steps with individual content and expected results to apply to all test cases. Use this format for complex test cases with multiple verification points."
        }
      },
      required: ["case_ids"]
    }
  },
  {
    name: "move_cases_to_section",
    description: "Move test cases from their current location to a different section or suite, changing their organizational structure. Use this to reorganize test cases, restructure test suites, or move cases between different testing areas.",
    inputSchema: {
      type: "object",
      properties: {
        section_id: {
          type: "integer",
          description: "The unique identifier of the destination section where test cases will be moved. Must be a valid, existing section ID. Use get_sections to find available sections."
        },
        suite_id: {
          type: "integer",
          description: "The unique identifier of the destination suite where test cases will be moved. Must be a valid, existing suite ID. Use get_suites to find available suites."
        },
        case_ids: {
          type: "array",
          items: {
            type: "integer"
          },
          description: "Array of test case IDs to move to the destination section and suite. All IDs must be valid, existing test case IDs."
        }
      },
      required: ["section_id", "suite_id", "case_ids"]
    }
  },
  {
    name: "delete_cases",
    description: "Permanently delete multiple test cases from TestRail in a single operation. WARNING: This action cannot be undone and will remove all selected test cases along with their associated data including results, history, and attachments. Use soft deletion to preview impact before actual deletion.",
    inputSchema: {
      type: "object",
      properties: {
        project_id: {
          type: "integer",
          description: "The unique identifier of the TestRail project containing the test cases. Must be a valid, existing project ID."
        },
        suite_id: {
          type: "integer",
          description: "The unique identifier of the test suite containing the cases (required only if project operates in multi-suite mode). Use get_suites to find available suite IDs."
        },
        case_ids: {
          type: "array",
          items: {
            type: "integer"
          },
          description: "Array of test case IDs to delete permanently. All IDs must be valid, existing test case IDs. Double-check these IDs before proceeding as deletion is irreversible."
        },
        soft: {
          type: "boolean",
          description: "Set to true to perform a dry-run that returns data on affected tests without actually deleting. Set to false or omit to perform actual deletion. Use soft deletion first to understand impact on test runs and results."
        }
      },
      required: ["project_id", "case_ids"]
    }
  },

  // Test Runs
  {
    name: "get_runs",
    description: "Retrieve test runs from a TestRail project with advanced filtering options. Test runs represent actual test execution sessions containing test cases to be executed. Use this to track test execution progress, analyze test run history, or prepare test execution reports.",
    inputSchema: {
      type: "object",
      properties: {
        project_id: {
          type: "integer",
          description: "The unique identifier of the TestRail project containing the test runs. All filtering will be applied within this project scope."
        },
        created_after: {
          type: "integer",
          description: "Filter to test runs created after this date (UNIX timestamp). Use this to find recent test runs or track test execution over time."
        },
        created_before: {
          type: "integer",
          description: "Filter to test runs created before this date (UNIX timestamp). Use this to find historical test runs or limit results to a specific time period."
        },
        created_by: {
          type: "array",
          items: { type: "integer" },
          description: "Filter by test run creator user IDs. Use get_users to find user IDs. Useful for tracking individual team member contributions to test execution."
        },
        is_completed: {
          type: "boolean",
          description: "Filter by completion status: true for completed/closed test runs only, false for active/in-progress test runs only. Omit to get all test runs regardless of status."
        },
        limit: {
          type: "integer",
          description: "Maximum number of test runs to return in a single request (default: 250). Use for pagination and performance optimization with large test run lists."
        },
        offset: {
          type: "integer",
          description: "Starting position for pagination (0-based). Use with limit parameter to navigate through large result sets efficiently."
        },
        milestone_id: {
          type: "array",
          items: { type: "integer" },
          description: "Filter by milestone IDs to get test runs associated with specific project milestones or releases. Use get_milestones to find available milestone IDs."
        },
        refs_filter: {
          type: "string",
          description: "Filter by reference ID to find test runs linked to specific requirements, tickets, or external references (e.g., 'TR-1', 'JIRA-123')."
        },
        suite_id: {
          type: "array",
          items: { type: "integer" },
          description: "Filter by test suite IDs to get test runs for specific test suites. Use get_suites to find available suite IDs."
        }
      },
      required: ["project_id"]
    }
  },
  {
    name: "get_run",
    description: "Retrieve detailed information about a specific TestRail test run by its ID. Returns comprehensive test run data including configuration, progress statistics, assigned test cases, and execution metadata. Use this for detailed test run analysis, progress tracking, or execution reporting.",
    inputSchema: {
      type: "object",
      properties: {
        run_id: {
          type: "integer",
          description: "The unique identifier of the TestRail test run to retrieve. You can find run IDs using get_runs or from the TestRail interface URL."
        }
      },
      required: ["run_id"]
    }
  },
  {
    name: "add_run",
    description: "Create a new test run in TestRail for executing test cases. Test runs organize test execution sessions and track progress against specific test cases. Use this to initiate new testing cycles, regression testing, or feature validation.",
    inputSchema: {
      type: "object",
      properties: {
        project_id: {
          type: "integer",
          description: "The unique identifier of the TestRail project where the test run will be created. Must be a valid, existing project ID."
        },
        name: {
          type: "string",
          description: "Display name for the test run (e.g., 'Sprint 23 Regression', 'Feature X Testing'). Use descriptive names that clearly identify the testing scope and purpose."
        },
        description: {
          type: "string",
          description: "Detailed description of the test run's purpose, scope, or testing objectives. Include relevant context, goals, or special instructions for testers."
        },
        milestone_id: {
          type: "integer",
          description: "The milestone ID to associate this test run with for tracking against project milestones. Use get_milestones to find available milestone IDs."
        },
        assignedto_id: {
          type: "integer",
          description: "The user ID of the person responsible for this test run. Use get_users to find available user IDs."
        },
        suite_id: {
          type: "integer",
          description: "The test suite ID for this test run (optional for single-suite mode projects, required for multi-suite projects). Use get_suites to find available suite IDs."
        },
        include_all: {
          type: "boolean",
          description: "Set to true to include all test cases from the suite (default), or false to manually select specific test cases. Use false when creating focused test runs."
        },
        case_ids: {
          type: "array",
          items: {
            type: "integer"
          },
          description: "Array of specific test case IDs to include when include_all is false. Use get_cases to find available case IDs."
        },
        refs: {
          type: "string",
          description: "Comma-separated list of external references or requirements (e.g., 'REQ-123, TICKET-456'). Requires TestRail 6.1+."
        },
        start_on: {
          type: "integer",
          description: "Planned start date for the test run as UNIX timestamp. Use for scheduling and project planning."
        },
        due_on: {
          type: "integer",
          description: "Planned completion date for the test run as UNIX timestamp. Use for deadline tracking and project planning."
        }
      },
      required: ["project_id", "name"]
    }
  },
  {
    name: "update_run",
    description: "Update properties of an existing test run including name, description, milestone, and test case selection. Use this to modify test run details, adjust scope, or update metadata as testing requirements change. Note: Cannot update suite_id or assignedto_id.",
    inputSchema: {
      type: "object",
      properties: {
        run_id: {
          type: "integer",
          description: "The unique identifier of the test run to update. Must be a valid, existing test run ID."
        },
        name: {
          type: "string",
          description: "New display name for the test run (e.g., 'Sprint 23 Regression', 'Feature X Testing'). Use descriptive names that clearly identify the testing scope and purpose."
        },
        description: {
          type: "string",
          description: "Updated description of the test run's purpose, scope, or testing objectives. Include relevant context, goals, or special instructions for testers."
        },
        milestone_id: {
          type: "integer",
          description: "The milestone ID to associate this test run with for tracking against project milestones. Use get_milestones to find available milestone IDs."
        },
        include_all: {
          type: "boolean",
          description: "Set to true to include all test cases from the suite, or false to manually select specific test cases. Use false when creating focused test runs."
        },
        case_ids: {
          type: "array",
          items: {
            type: "integer"
          },
          description: "Array of specific test case IDs to include when include_all is false. Use get_cases to find available case IDs."
        },
        refs: {
          type: "string",
          description: "Comma-separated list of external references or requirements (e.g., 'REQ-123, TICKET-456'). Requires TestRail 6.1+."
        },
        start_on: {
          type: "integer",
          description: "Planned start date for the test run as UNIX timestamp. Use for scheduling and project planning."
        },
        due_on: {
          type: "integer",
          description: "Planned completion date for the test run as UNIX timestamp. Use for deadline tracking and project planning."
        }
      },
      required: ["run_id"]
    }
  },
  {
    name: "close_run",
    description: "Close and archive a test run, preventing further test result updates. WARNING: This action cannot be undone. Use this to finalize test execution, archive completed testing cycles, or lock test results for reporting.",
    inputSchema: {
      type: "object",
      properties: {
        run_id: {
          type: "integer",
          description: "The unique identifier of the test run to close and archive. Must be a valid, existing test run ID."
        }
      },
      required: ["run_id"]
    }
  },
  {
    name: "delete_run",
    description: "Permanently delete a test run and all its associated tests and results. WARNING: This action cannot be undone and will permanently remove all test data within the run. Use soft deletion to preview impact before permanent removal.",
    inputSchema: {
      type: "object",
      properties: {
        run_id: {
          type: "integer",
          description: "The unique identifier of the test run to delete permanently. Double-check this ID before proceeding as deletion affects all tests and results within the run."
        },
        soft: {
          type: "boolean",
          description: "Set to true to perform a dry-run that returns data on affected tests without actually deleting. Set to false or omit to perform actual deletion. Use soft deletion first to understand impact."
        }
      },
      required: ["run_id"]
    }
  },
  {
    name: "bulk_close_runs",
    description: "Close multiple test runs at once to efficiently archive completed testing cycles. Since TestRail doesn't provide native bulk closure functionality, this tool processes each run individually and provides comprehensive feedback. WARNING: This action cannot be undone for successfully closed runs. Use this for large-scale test run management when teams have hundreds or thousands of open test runs that need to be archived.",
    inputSchema: {
      type: "object",
      properties: {
        run_ids: {
          type: "array",
          items: {
            type: "integer"
          },
          description: "Array of test run IDs to close. Each ID must be a valid, existing test run ID. You can get run IDs using get_runs. For safety, consider testing with a small subset first."
        },
        use_batch_processing: {
          type: "boolean",
          description: "Set to true to process runs in batches with delays between batches to avoid overwhelming the TestRail API. Recommended for large numbers of runs (100+). Default: false."
        },
        batch_size: {
          type: "integer",
          description: "Number of runs to process in each batch when use_batch_processing is true. Recommended values: 10-50 depending on your TestRail instance performance. Default: 10."
        },
        delay_ms: {
          type: "integer",
          description: "Delay in milliseconds between batches when use_batch_processing is true. Higher values reduce API load but increase total processing time. Default: 1000 (1 second)."
        }
      },
      required: ["run_ids"]
    }
  },
  {
    name: "get_open_runs_for_project",
    description: "Get all open (non-completed) test runs for a project, optimized for bulk operations. This helper tool makes it easy to identify which test runs need to be closed without having to manually filter through all runs. Perfect for preparing bulk close operations on projects with many open test runs.",
    inputSchema: {
      type: "object",
      properties: {
        project_id: {
          type: "integer",
          description: "The unique identifier of the TestRail project to get open runs from. Must be a valid, existing project ID."
        },
        created_before: {
          type: "integer",
          description: "Only return test runs created before this date (UNIX timestamp). Useful for closing old runs while keeping recent ones active."
        },
        suite_id: {
          type: "array",
          items: {
            type: "integer"
          },
          description: "Filter by specific test suite IDs. Use get_suites to find available suite IDs. Useful for closing runs from specific test suites only."
        },
        limit: {
          type: "integer",
          description: "Maximum number of open runs to return. Use this to process runs in manageable chunks for very large projects."
        },
        include_run_details: {
          type: "boolean",
          description: "Set to true to include full run details, false to return only IDs and basic info (default). Use false for bulk operations to reduce response size."
        }
      },
      required: ["project_id"]
    }
  },
  {
    name: "bulk_close_plans",
    description: "Close multiple test plans at once to efficiently archive completed testing initiatives. Since TestRail doesn't provide native bulk plan closure functionality, this tool processes each plan individually and provides comprehensive feedback. WARNING: This action cannot be undone for successfully closed plans. Use this for large-scale test plan management when teams have hundreds or thousands of open test plans that need to be archived.",
    inputSchema: {
      type: "object",
      properties: {
        plan_ids: {
          type: "array",
          items: {
            type: "integer"
          },
          description: "Array of test plan IDs to close. Each ID must be a valid, existing test plan ID. You can get plan IDs using get_plans. For safety, consider testing with a small subset first."
        },
        use_batch_processing: {
          type: "boolean",
          description: "Set to true to process plans in batches with delays between batches to avoid overwhelming the TestRail API. Recommended for large numbers of plans (100+). Default: false."
        },
        batch_size: {
          type: "integer",
          description: "Number of plans to process in each batch when use_batch_processing is true. Recommended values: 10-50 depending on your TestRail instance performance. Default: 10."
        },
        delay_ms: {
          type: "integer",
          description: "Delay in milliseconds between batches when use_batch_processing is true. Higher values reduce API load but increase total processing time. Default: 1000 (1 second)."
        }
      },
      required: ["plan_ids"]
    }
  },
  {
    name: "get_open_plans_for_project",
    description: "Get all open (non-completed) test plans for a project, optimized for bulk operations. This helper tool makes it easy to identify which test plans need to be closed without having to manually filter through all plans. Perfect for preparing bulk close operations on projects with many open test plans.",
    inputSchema: {
      type: "object",
      properties: {
        project_id: {
          type: "integer",
          description: "The unique identifier of the TestRail project to get open plans from. Must be a valid, existing project ID."
        },
        created_before: {
          type: "integer",
          description: "Only return test plans created before this date (UNIX timestamp). Useful for closing old plans while keeping recent ones active."
        },
        limit: {
          type: "integer",
          description: "Maximum number of open plans to return. Use this to process plans in manageable chunks for very large projects."
        },
        include_plan_details: {
          type: "boolean",
          description: "Set to true to include full plan details, false to return only IDs and basic info (default). Use false for bulk operations to reduce response size."
        }
      },
      required: ["project_id"]
    }
  },

  // Test Results
  {
    name: "get_results",
    description: "Retrieve all test results for a specific test, including execution history, status changes, and comments. Use this to analyze test execution patterns, track result trends, or review detailed test outcomes across multiple runs.",
    inputSchema: {
      type: "object",
      properties: {
        test_id: {
          type: "integer",
          description: "The unique identifier of the test to retrieve results for. Must be a valid, existing test ID from an active test run."
        },
        limit: {
          type: "integer",
          description: "Maximum number of test results to return in a single request (default: 250, requires TestRail 6.7+). Use for pagination with extensive result histories."
        },
        offset: {
          type: "integer",
          description: "Starting position for pagination (0-based, requires TestRail 6.7+). Use with limit parameter to navigate through large result sets efficiently."
        },
        defects_filter: {
          type: "string",
          description: "Filter results by a specific defect ID (e.g., 'TR-1', '4291'). Use to find test results related to particular bugs or issues."
        },
        status_id: {
          type: "array",
          items: {
            type: "integer"
          },
          description: "Array of status IDs to filter results by (e.g., [1, 3, 5] for passed, retest, failed). Use get_statuses to find available status IDs."
        }
      },
      required: ["test_id"]
    }
  },
  {
    name: "get_results_for_case",
    description: "Retrieve all test results for a specific test case within a test run. Use this to analyze test execution history, track case-specific results over time, or investigate test case stability and failure patterns.",
    inputSchema: {
      type: "object",
      properties: {
        run_id: {
          type: "integer",
          description: "The unique identifier of the TestRail test run containing the test case. Use get_runs to find available run IDs."
        },
        case_id: {
          type: "integer",
          description: "The unique identifier of the TestRail test case to get results for. Use get_cases to find available case IDs."
        },
        defects_filter: {
          type: "string",
          description: "Filter results by defect reference ID to find results linked to specific bugs or issues (e.g., 'TR-1', 'JIRA-123')."
        },
        limit: {
          type: "integer",
          description: "Maximum number of test results to return in a single request (default: 250). Use for pagination with large result sets. Requires TestRail 6.7 or higher."
        },
        offset: {
          type: "integer",
          description: "Starting position for pagination (0-based). Use with limit parameter to navigate through large result sets. Requires TestRail 6.7 or higher."
        },
        status_id: {
          type: "array",
          items: {
            type: "integer"
          },
          description: "Filter by test result status IDs (e.g., Passed, Failed, Blocked, Retest). Use get_statuses to find available status IDs in your TestRail instance."
        }
      },
      required: ["run_id", "case_id"]
    }
  },
  {
    name: "get_results_for_run",
    description: "Retrieve all test results for a specific test run with advanced filtering options. Use this to analyze overall test run performance, generate execution reports, or track testing progress across all test cases in a run.",
    inputSchema: {
      type: "object",
      properties: {
        run_id: {
          type: "integer",
          description: "The unique identifier of the TestRail test run to get results for. Use get_runs to find available run IDs."
        },
        created_after: {
          type: "integer",
          description: "Filter to test results created after this date (UNIX timestamp). Use this to find recent test results or track execution progress over time."
        },
        created_before: {
          type: "integer",
          description: "Filter to test results created before this date (UNIX timestamp). Use this to find historical test results or limit results to a specific time period."
        },
        created_by: {
          type: "array",
          items: {
            type: "integer"
          },
          description: "Filter by user IDs who created the test results. Use get_users to find user IDs. Useful for tracking individual tester contributions."
        },
        defects_filter: {
          type: "string",
          description: "Filter results by defect reference ID to find results linked to specific bugs or issues (e.g., 'TR-1', 'JIRA-123')."
        },
        limit: {
          type: "integer",
          description: "Maximum number of test results to return in a single request (default: 250). Use for pagination and performance optimization. Requires TestRail 6.7 or higher."
        },
        offset: {
          type: "integer",
          description: "Starting position for pagination (0-based). Use with limit parameter to navigate through large result sets efficiently. Requires TestRail 6.7 or higher."
        },
        status_id: {
          type: "array",
          items: {
            type: "integer"
          },
          description: "Filter by test result status IDs (e.g., Passed, Failed, Blocked, Retest). Use get_statuses to find available status IDs in your TestRail instance."
        }
      },
      required: ["run_id"]
    }
  },
  {
    name: "add_result",
    description: "Add a new test result to a specific test within a test run. Use this to record test execution outcomes, document test findings, or update test status with detailed comments and metadata.",
    inputSchema: {
      type: "object",
      properties: {
        test_id: {
          type: "integer",
          description: "The unique identifier of the test to add a result for. Must be a valid, existing test ID from an active test run."
        },
        status_id: {
          type: "integer",
          description: "The status ID indicating the test result outcome (e.g., 1=Passed, 2=Blocked, 3=Untested, 4=Retest, 5=Failed). Use get_statuses to find available status IDs."
        },
        comment: {
          type: "string",
          description: "Detailed comment describing the test execution, findings, or any relevant notes. Include steps taken, issues found, or additional context."
        },
        version: {
          type: "string",
          description: "Version information of the application or system being tested (e.g., 'v2.1.0', 'build-1234'). Helps track results across different releases."
        },
        elapsed: {
          type: "string",
          description: "Time elapsed during test execution (e.g., '30s', '2m 15s', '1h 30m'). Use consistent time format for accurate reporting."
        },
        defects: {
          type: "string",
          description: "Comma-separated list of defect IDs or references associated with this test result (e.g., 'BUG-123, JIRA-456'). Links test results to bug tracking systems."
        },
        assignedto_id: {
          type: "integer",
          description: "User ID to assign this test result to for follow-up or review. Use get_users to find available user IDs."
        }
      },
      required: ["test_id", "status_id"]
    }
  },
  {
    name: "add_result_for_case",
    description: "Add a test result for a specific test case within a test run, automatically creating the test if it doesn't exist. Use this for direct case-to-result mapping, automated test reporting, or when you know the case ID but not the test ID.",
    inputSchema: {
      type: "object",
      properties: {
        run_id: {
          type: "integer",
          description: "The unique identifier of the test run to add the result to. Must be a valid, existing test run ID."
        },
        case_id: {
          type: "integer",
          description: "The unique identifier of the test case to add a result for. Must be a valid test case ID that exists in the test run's suite."
        },
        status_id: {
          type: "integer",
          description: "The status ID indicating the test result outcome (e.g., 1=Passed, 2=Blocked, 3=Untested, 4=Retest, 5=Failed). Use get_statuses to find available status IDs."
        },
        comment: {
          type: "string",
          description: "Detailed comment describing the test execution, findings, or any relevant notes. Include steps taken, issues found, or additional context."
        },
        version: {
          type: "string",
          description: "Version information of the application or system being tested (e.g., 'v2.1.0', 'build-1234'). Helps track results across different releases."
        },
        elapsed: {
          type: "string",
          description: "Time elapsed during test execution (e.g., '30s', '2m 15s', '1h 30m'). Use consistent time format for accurate reporting."
        },
        defects: {
          type: "string",
          description: "Comma-separated list of defect IDs or references associated with this test result (e.g., 'BUG-123, JIRA-456'). Links test results to bug tracking systems."
        },
        assignedto_id: {
          type: "integer",
          description: "User ID to assign this test result to for follow-up or review. Use get_users to find available user IDs."
        }
      },
      required: ["run_id", "case_id", "status_id"]
    }
  },
  {
    name: "add_results",
    description: "Add multiple test results to different tests within a test run in a single operation. Use this for bulk result reporting, automated test suite execution results, or efficient batch updates to minimize API calls.",
    inputSchema: {
      type: "object",
      properties: {
        run_id: {
          type: "integer",
          description: "The unique identifier of the test run to add results to. Must be a valid, existing test run ID."
        },
        results: {
          type: "array",
          items: {
            type: "object",
            properties: {
              test_id: {
                type: "integer",
                description: "The unique identifier of the test to add a result for. Must be a valid, existing test ID from the active test run."
              },
              status_id: {
                type: "integer",
                description: "The status ID indicating the test result outcome (e.g., 1=Passed, 2=Blocked, 3=Untested, 4=Retest, 5=Failed). Use get_statuses to find available status IDs."
              },
              comment: {
                type: "string",
                description: "Detailed comment describing the test execution, findings, or any relevant notes. Include steps taken, issues found, or additional context."
              },
              version: {
                type: "string",
                description: "Version information of the application or system being tested (e.g., 'v2.1.0', 'build-1234'). Helps track results across different releases."
              },
              elapsed: {
                type: "string",
                description: "Time elapsed during test execution (e.g., '30s', '2m 15s', '1h 30m'). Use consistent time format for accurate reporting."
              },
              defects: {
                type: "string",
                description: "Comma-separated list of defect IDs or references associated with this test result (e.g., 'BUG-123, JIRA-456'). Links test results to bug tracking systems."
              },
              assignedto_id: {
                type: "integer",
                description: "User ID to assign this test result to for follow-up or review. Use get_users to find available user IDs."
              }
            },
            required: ["test_id", "status_id"]
          },
          description: "Array of test results"
        }
      },
      required: ["run_id", "results"]
    }
  },
  {
    name: "add_results_for_cases",
    description: "Add multiple test results for specific test cases within a test run, automatically creating tests if they don't exist. Use this for bulk case-to-result mapping, automated test reporting, or when you have case IDs but not test IDs.",
    inputSchema: {
      type: "object",
      properties: {
        run_id: {
          type: "integer",
          description: "The unique identifier of the test run to add results to. Must be a valid, existing test run ID."
        },
        results: {
          type: "array",
          items: {
            type: "object",
            properties: {
              case_id: {
                type: "integer",
                description: "The unique identifier of the test case to add a result for. Must be a valid test case ID that exists in the test run's suite."
              },
              status_id: {
                type: "integer",
                description: "The status ID indicating the test result outcome (e.g., 1=Passed, 2=Blocked, 3=Untested, 4=Retest, 5=Failed). Use get_statuses to find available status IDs."
              },
              comment: {
                type: "string",
                description: "Detailed comment describing the test execution, findings, or any relevant notes. Include steps taken, issues found, or additional context."
              },
              version: {
                type: "string",
                description: "Version information of the application or system being tested (e.g., 'v2.1.0', 'build-1234'). Helps track results across different releases."
              },
              elapsed: {
                type: "string",
                description: "Time elapsed during test execution (e.g., '30s', '2m 15s', '1h 30m'). Use consistent time format for accurate reporting."
              },
              defects: {
                type: "string",
                description: "Comma-separated list of defect IDs or references associated with this test result (e.g., 'BUG-123, JIRA-456'). Links test results to bug tracking systems."
              },
              assignedto_id: {
                type: "integer",
                description: "User ID to assign this test result to for follow-up or review. Use get_users to find available user IDs."
              }
            },
            required: ["case_id", "status_id"]
          },
          description: "Array of test results to add for specific test cases. Each result object must contain at least case_id and status_id. Use this for bulk result reporting where you have case IDs but not test IDs."
        }
      },
      required: ["run_id", "results"]
    }
  },

  // Test Plans
  {
    name: "get_plans",
    description: "Retrieve all test plans for a TestRail project with optional filtering by creation date, completion status, or milestone. Use this to get an overview of testing initiatives, track project progress, or find specific test plans for reporting and analysis.",
    inputSchema: {
      type: "object",
      properties: {
        project_id: {
          type: "integer",
          description: "The unique identifier of the TestRail project to retrieve test plans from. Must be a valid, existing project ID."
        },
        created_after: {
          type: "integer",
          description: "Only return test plans created after this date (as UNIX timestamp)"
        },
        created_before: {
          type: "integer",
          description: "Only return test plans created before this date (as UNIX timestamp)"
        },
        created_by: {
          type: "array",
          items: {
            type: "integer"
          },
          description: "A comma-separated list of creators (user IDs) to filter by"
        },
        is_completed: {
          type: "boolean",
          description: "1 to return completed test plans only. 0 to return active test plans only"
        },
        limit: {
          type: "integer",
          description: "Limit the result to :limit test plans (default: 250)"
        },
        offset: {
          type: "integer",
          description: "Use :offset to skip records for pagination"
        },
        milestone_id: {
          type: "array",
          items: {
            type: "integer"
          },
          description: "A comma-separated list of milestone IDs to filter by"
        }
      },
      required: ["project_id"]
    }
  },
  {
    name: "get_plan",
    description: "Retrieve detailed information about a specific test plan including its test runs, configurations, and progress. Use this to analyze test plan structure, review execution status, or get comprehensive test plan data for reporting.",
    inputSchema: {
      type: "object",
      properties: {
        plan_id: {
          type: "integer",
          description: "The unique identifier of the test plan to retrieve. Must be a valid, existing test plan ID."
        }
      },
      required: ["plan_id"]
    }
  },
  {
    name: "add_plan",
    description: "Create a new test plan to organize multiple test runs and coordinate complex testing initiatives. Test plans are ideal for managing releases, feature testing across multiple configurations, or comprehensive testing campaigns.",
    inputSchema: {
      type: "object",
      properties: {
        project_id: {
          type: "integer",
          description: "The unique identifier of the TestRail project where the test plan should be created. Must be a valid, existing project ID."
        },
        name: {
          type: "string",
          description: "The descriptive name of the test plan. Use clear, meaningful names that identify the testing initiative (e.g., 'Release 2.0 Testing', 'Sprint 23 Validation', 'Feature X Comprehensive Testing')."
        },
        description: {
          type: "string",
          description: "Optional detailed description of the test plan's purpose, scope, or testing objectives. Include relevant context, goals, or special instructions for the testing team."
        },
        milestone_id: {
          type: "integer",
          description: "The milestone ID to associate this test plan with a specific project milestone or release. Use get_milestones to find available milestone IDs."
        },
        start_on: {
          type: "integer",
          description: "The planned start date for the test plan execution as UNIX timestamp. Use for scheduling and project planning."
        },
        due_on: {
          type: "integer",
          description: "The planned completion date for the test plan as UNIX timestamp. Use for deadline tracking and project planning."
        },
        refs: {
          type: "string",
          description: "Comma-separated list of external requirement IDs or references (e.g., 'REQ-123,TICKET-456'). Requires TestRail 6.3+. Links test plan to requirements or tickets."
        },
        entries: {
          type: "array",
          items: {
            type: "object",
            properties: {
              suite_id: {
                type: "integer",
                description: "The unique identifier of the test suite for this plan entry. Must be a valid, existing suite ID from the project."
              },
              name: {
                type: "string",
                description: "The display name for this test plan entry (e.g., 'Browser Testing', 'Mobile Validation'). Use descriptive names that clearly identify the testing scope."
              },
              description: {
                type: "string",
                description: "Optional detailed description of the test plan entry's purpose, scope, or testing objectives. Include relevant context or special instructions."
              },
              assignedto_id: {
                type: "integer",
                description: "The user ID of the person responsible for this test plan entry. Use get_users to find available user IDs."
              },
              include_all: {
                type: "boolean",
                description: "Set to true to include all test cases from the suite, false to specify custom case selection via case_ids. Use false for focused testing of specific features."
              },
              case_ids: {
                type: "array",
                items: {
                  type: "integer"
                },
                description: "Array of specific test case IDs to include when include_all is false. Use get_cases to find available case IDs."
              },
              config_ids: {
                type: "array",
                items: {
                  type: "integer"
                },
                description: "Array of configuration IDs for test environment variations (e.g., browser, OS, device combinations). Use get_configs to find available configuration IDs."
              },
              runs: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    include_all: {
                      type: "boolean",
                      description: "Override the entry-level include_all setting for this specific run. Use to customize case selection per run configuration."
                    },
                    case_ids: {
                      type: "array",
                      items: {
                        type: "integer"
                      },
                      description: "Array of specific test case IDs for this run, overriding the entry-level case selection. Use when different runs need different test cases."
                    },
                    assignedto_id: {
                      type: "integer",
                      description: "Override the entry-level assignee for this specific run. Use to assign different runs to different team members."
                    },
                    config_ids: {
                      type: "array",
                      items: {
                        type: "integer"
                      },
                      description: "Array of configuration IDs specific to this run, enabling different environment combinations per run."
                    }
                  }
                },
                description: "Array of individual test runs within this plan entry. Each run can have different configurations, assignments, or test case selections."
              }
            },
            required: ["suite_id"]
          },
          description: "Array of test plan entries to create within this plan. Each entry can contain multiple test runs with different configurations and assignments."
        }
      },
      required: ["project_id", "name"]
    }
  },
  {
    name: "update_plan",
    description: "Update properties of an existing test plan including name, description, and milestone associations. Use this to modify test plan details, adjust scope, or update metadata as project requirements evolve. Supports partial updates.",
    inputSchema: {
      type: "object",
      properties: {
        plan_id: {
          type: "integer",
          description: "The unique identifier of the test plan to update. Must be a valid, existing test plan ID."
        },
        name: {
          type: "string",
          description: "Updated display name for the test plan (e.g., 'Release 2.0 Testing', 'Sprint 23 Validation'). Use descriptive names that clearly identify the testing initiative."
        },
        description: {
          type: "string",
          description: "Updated detailed description of the test plan's purpose, scope, or testing objectives. Include relevant context, goals, or special instructions for the testing team."
        },
        milestone_id: {
          type: "integer",
          description: "The milestone ID to associate this test plan with a specific project milestone or release. Use get_milestones to find available milestone IDs."
        },
        start_on: {
          type: "integer",
          description: "The updated planned start date for the test plan execution as UNIX timestamp. Use for rescheduling and project planning."
        },
        due_on: {
          type: "integer",
          description: "The updated planned completion date for the test plan as UNIX timestamp. Use for deadline tracking and project planning."
        },
        refs: {
          type: "string",
          description: "Updated comma-separated list of external requirement IDs or references (e.g., 'REQ-123,TICKET-456'). Requires TestRail 6.3+. Links test plan to requirements or tickets."
        }
      },
      required: ["plan_id"]
    }
  },
  {
    name: "close_plan",
    description: "Close and archive a test plan, preventing further modifications to its test runs and results. Use this to finalize completed testing initiatives, archive finished releases, or lock test plan data for reporting and compliance.",
    inputSchema: {
      type: "object",
      properties: {
        plan_id: {
          type: "integer",
          description: "The unique identifier of the test plan to close and archive. Must be a valid, existing test plan ID."
        }
      },
      required: ["plan_id"]
    }
  },
  {
    name: "delete_plan",
    description: "Permanently delete a test plan and all its associated test runs, tests, and results. WARNING: This action cannot be undone and will remove all test data within the plan. Use with extreme caution for major testing initiatives.",
    inputSchema: {
      type: "object",
      properties: {
        plan_id: {
          type: "integer",
          description: "The unique identifier of the test plan to delete permanently. Double-check this ID before proceeding as deletion affects all test runs and results within the plan."
        }
      },
      required: ["plan_id"]
    }
  },
  {
    name: "add_plan_entry",
    description: "Add one or more new test runs to an existing test plan, organizing them into logical groups or configurations. Use this to expand test plan scope, add new testing phases, or create test runs for different environments or configurations.",
    inputSchema: {
      type: "object",
      properties: {
        plan_id: {
          type: "integer",
          description: "The unique identifier of the test plan where new test runs should be added. Must be a valid, existing test plan ID."
        },
        suite_id: {
          type: "integer",
          description: "The unique identifier of the test suite for the test run(s) (required for multi-suite projects, optional for single-suite projects). Use get_suites to find available suite IDs."
        },
        name: {
          type: "string",
          description: "The descriptive name for the test run(s) in this entry (e.g., 'Browser Testing', 'Mobile Validation'). Use clear names that identify the testing scope."
        },
        description: {
          type: "string",
          description: "Optional detailed description of the test run(s) purpose, scope, or testing objectives. Include relevant context or special instructions for testers."
        },
        assignedto_id: {
          type: "integer",
          description: "The user ID of the person responsible for the test run(s) in this entry. Use get_users to find available user IDs."
        },
        start_on: {
          type: "integer",
          description: "The planned start date for the test run(s) as UNIX timestamp. Use for scheduling and project planning."
        },
        due_on: {
          type: "integer",
          description: "The planned completion date for the test run(s) as UNIX timestamp. Use for deadline tracking and project planning."
        },
        include_all: {
          type: "boolean",
          description: "Set to true to include all test cases from the suite, false to specify custom case selection via case_ids. Use false for focused testing of specific features."
        },
        case_ids: {
          type: "array",
          items: {
            type: "integer"
          },
          description: "Array of specific test case IDs to include when include_all is false. Use get_cases to find available case IDs."
        },
        config_ids: {
          type: "array",
          items: {
            type: "integer"
          },
          description: "Array of configuration IDs for test environment variations (e.g., browser, OS, device combinations). Use get_configs to find available configuration IDs."
        },
        refs: {
          type: "string",
          description: "Comma-separated list of external references or requirements (e.g., 'REQ-123,TICKET-456'). Requires TestRail 6.3+. Links runs to requirements or tickets."
        },
        runs: {
          type: "array",
          items: {
            type: "object",
            properties: {
              include_all: {
                type: "boolean",
                description: "Override the entry-level include_all setting for this specific run. Use to customize case selection per run configuration."
              },
              case_ids: {
                type: "array",
                items: {
                  type: "integer"
                },
                description: "Array of specific test case IDs for this run, overriding the entry-level case selection. Use when different runs need different test cases."
              },
              assignedto_id: {
                type: "integer",
                description: "Override the entry-level assignee for this specific run. Use to assign different runs to different team members."
              },
              config_ids: {
                type: "array",
                items: {
                  type: "integer"
                },
                description: "Array of configuration IDs specific to this run, enabling different environment combinations per run."
              }
            }
          },
          description: "Array of individual test runs within this plan entry. Each run can have different configurations, assignments, or test case selections for multi-environment testing."
        }
      },
      required: ["plan_id", "suite_id"]
    }
  },
  {
    name: "update_plan_entry",
    description: "Update properties of one or more test run groups within a test plan including names, assignments, and test case selections. Use this to modify test plan entries, adjust run configurations, or update metadata as testing requirements change. Supports partial updates.",
    inputSchema: {
      type: "object",
      properties: {
        plan_id: {
          type: "integer",
          description: "The unique identifier of the test plan containing the entries to update. Must be a valid, existing test plan ID."
        },
        entry_id: {
          type: "string",
          description: "The unique identifier of the test plan entry to update (note: not the test run ID). Must be a valid, existing entry ID within the specified plan."
        },
        name: {
          type: "string",
          description: "Updated display name for the test run(s) in this entry (e.g., 'Browser Testing', 'Mobile Validation'). Use descriptive names that clearly identify the testing scope."
        },
        description: {
          type: "string",
          description: "The description of the test run(s) (requires TestRail 5.2+)"
        },
        assignedto_id: {
          type: "integer",
          description: "The ID of the user the test run should be assigned to"
        },
        start_on: {
          type: "integer",
          description: "The start date of the test run (as UNIX timestamp)"
        },
        due_on: {
          type: "integer",
          description: "The due date of the test run (as UNIX timestamp)"
        },
        include_all: {
          type: "boolean",
          description: "True for including all test cases of the test suite and false for a custom case selection (default: true)"
        },
        case_ids: {
          type: "array",
          items: {
            type: "integer"
          },
          description: "Array of case IDs for the custom case selection (required if include_all is false)"
        },
        refs: {
          type: "string",
          description: "A string of external requirement IDs, separated by commas (requires TestRail 6.3+)"
        }
      },
      required: ["plan_id", "entry_id"]
    }
  },
  {
    name: "delete_plan_entry",
    description: "Remove a test run entry from a test plan, deleting all associated test runs and results within that entry. WARNING: This action cannot be undone and will permanently remove all test data within the entry.",
    inputSchema: {
      type: "object",
      properties: {
        plan_id: {
          type: "integer",
          description: "The unique identifier of the test plan containing the entry to delete. Must be a valid, existing test plan ID."
        },
        entry_id: {
          type: "string",
          description: "The unique identifier of the test plan entry to delete permanently. Double-check this ID before proceeding as deletion affects all test runs and results within the entry."
        }
      },
      required: ["plan_id", "entry_id"]
    }
  },
  {
    name: "add_run_to_plan_entry",
    description: "Add a new test run to an existing test plan entry with specific configuration settings. Requires TestRail 6.4+. Use this to expand test plan entries with additional runs for different environment configurations or testing phases.",
    inputSchema: {
      type: "object",
      properties: {
        plan_id: {
          type: "integer",
          description: "The unique identifier of the test plan containing the target entry. Must be a valid, existing test plan ID."
        },
        entry_id: {
          type: "string",
          description: "The unique identifier of the test plan entry where the new run will be added. Must be a valid, existing entry ID within the specified plan."
        },
        config_ids: {
          type: "array",
          items: {
            type: "integer"
          },
          description: "Array of configuration IDs for test environment variations (e.g., browser, OS, device combinations). Use get_configs to find available configuration IDs. Required for configuration-based test runs."
        },
        description: {
          type: "string",
          description: "Optional detailed description of the test run's purpose, scope, or testing objectives. Include relevant context or special instructions for testers."
        },
        assignedto_id: {
          type: "integer",
          description: "The user ID of the person responsible for this test run. Use get_users to find available user IDs."
        },
        start_on: {
          type: "integer",
          description: "The planned start date for the test run as UNIX timestamp. Use for scheduling and project planning."
        },
        due_on: {
          type: "integer",
          description: "The planned completion date for the test run as UNIX timestamp. Use for deadline tracking and project planning."
        },
        include_all: {
          type: "boolean",
          description: "Set to true to include all test cases from the suite (default), false to specify custom case selection via case_ids. Use false for focused testing."
        },
        case_ids: {
          type: "array",
          items: {
            type: "integer"
          },
          description: "Array of specific test case IDs to include when include_all is false. Use get_cases to find available case IDs."
        },
        refs: {
          type: "string",
          description: "Comma-separated list of external references or requirements (e.g., 'REQ-123,TICKET-456'). Requires TestRail 6.3+. Links run to requirements or tickets."
        }
      },
      required: ["plan_id", "entry_id", "config_ids"]
    }
  },
  {
    name: "update_run_in_plan_entry",
    description: "Update properties of a test run within a test plan entry that uses configuration settings. Requires TestRail 6.4+. Use this to modify run details, adjust assignments, or update test case selections for configuration-based runs.",
    inputSchema: {
      type: "object",
      properties: {
        run_id: {
          type: "integer",
          description: "The unique identifier of the test run to update. Must be a valid, existing test run ID that belongs to a test plan entry."
        },
        description: {
          type: "string",
          description: "Updated detailed description of the test run's purpose, scope, or testing objectives. Include relevant context or special instructions for testers."
        },
        assignedto_id: {
          type: "integer",
          description: "The user ID of the person responsible for this test run. Use get_users to find available user IDs."
        },
        start_on: {
          type: "integer",
          description: "The updated planned start date for the test run as UNIX timestamp. Use for rescheduling and project planning."
        },
        due_on: {
          type: "integer",
          description: "The updated planned completion date for the test run as UNIX timestamp. Use for deadline tracking and project planning."
        },
        include_all: {
          type: "boolean",
          description: "Set to true to include all test cases from the suite (default), false to specify custom case selection via case_ids. Use false for focused testing."
        },
        case_ids: {
          type: "array",
          items: {
            type: "integer"
          },
          description: "Array of specific test case IDs to include when include_all is false. Use get_cases to find available case IDs."
        },
        refs: {
          type: "string",
          description: "Updated comma-separated list of external references or requirements (e.g., 'REQ-123,TICKET-456'). Requires TestRail 6.3+. Links run to requirements or tickets."
        }
      },
      required: ["run_id"]
    }
  },
  {
    name: "delete_run_from_plan_entry",
    description: "Delete a specific test run from a test plan entry, removing it from the plan's execution scope. Requires TestRail 6.4+. Use this to remove unwanted test runs from plan entries or adjust plan configurations after creation.",
    inputSchema: {
      type: "object",
      properties: {
        run_id: {
          type: "integer",
          description: "The unique identifier of the test run to delete from the plan entry. Must be a valid, existing test run ID that belongs to a test plan entry."
        }
      },
      required: ["run_id"]
    }
  },

  // Sections
  {
    name: "get_sections",
    description: "Retrieve all sections (folders) within a TestRail project and test suite, showing the hierarchical organization of test cases. Use this to understand test structure, navigate test organization, or find specific sections for test case management.",
    inputSchema: {
      type: "object",
      properties: {
        project_id: {
          type: "integer",
          description: "The unique identifier of the TestRail project to retrieve sections from. Must be a valid, existing project ID."
        },
        suite_id: {
          type: "integer",
          description: "The unique identifier of the test suite to retrieve sections from (optional for single-suite mode projects, required for multi-suite projects). Use get_suites to find available suite IDs."
        },
        limit: {
          type: "integer",
          description: "Maximum number of sections to return in a single request (default: 250). Requires TestRail 6.7+. Use for pagination with large section hierarchies."
        },
        offset: {
          type: "integer",
          description: "Starting position for pagination (0-based). Requires TestRail 6.7+. Use with limit parameter to navigate through large section lists efficiently."
        }
      },
      required: ["project_id"]
    }
  },
  {
    name: "get_section",
    description: "Retrieve detailed information about a specific section including its properties, hierarchy, and parent/child relationships. Use this to understand section structure, get section metadata, or verify section details for test case organization.",
    inputSchema: {
      type: "object",
      properties: {
        section_id: {
          type: "integer",
          description: "The unique identifier of the section to retrieve. Must be a valid, existing section ID."
        }
      },
      required: ["section_id"]
    }
  },
  {
    name: "add_section",
    description: "Create a new section (folder) within a TestRail test suite to organize test cases hierarchically. Use this to establish logical groupings, create feature-based organization, or structure test cases by functional areas.",
    inputSchema: {
      type: "object",
      properties: {
        project_id: {
          type: "integer",
          description: "The unique identifier of the TestRail project where the section should be created. Must be a valid, existing project ID."
        },
        name: {
          type: "string",
          description: "The descriptive name of the section. Use clear, hierarchical names that reflect the section's purpose and content (e.g., 'Login Features', 'Payment Processing', 'User Management')."
        },
        description: {
          type: "string",
          description: "Optional detailed description of the section's scope and purpose. Use this to explain what functionality this section covers and any special testing considerations."
        },
        suite_id: {
          type: "integer",
          description: "The unique identifier of the test suite where the section will be created (required for multi-suite projects, ignored for single-suite projects). Use get_suites to find available suite IDs."
        },
        parent_id: {
          type: "integer",
          description: "The unique identifier of the parent section to create a hierarchical structure. Leave null/omit for root-level sections. Use get_sections to find available parent section IDs."
        }
      },
      required: ["project_id", "name"]
    }
  },
  {
    name: "update_section",
    description: "Update an existing section's name, description, or organizational properties. Use this to rename sections, update descriptions, or modify section details as test organization evolves. Supports partial updates - only specify fields you want to change.",
    inputSchema: {
      type: "object",
      properties: {
        section_id: {
          type: "integer",
          description: "The unique identifier of the section to update. Must be a valid, existing section ID."
        },
        name: {
          type: "string",
          description: "Updated name for the section. Use clear, hierarchical names that reflect the section's current purpose and content."
        },
        description: {
          type: "string",
          description: "Updated description of the section's scope and purpose. Use this to reflect changes in functionality or testing approach."
        }
      },
      required: ["section_id"]
    }
  },
  {
    name: "move_section",
    description: "Move a section to a different location within the test hierarchy, changing its parent or position. Requires TestRail 6.5.2+. Use this to reorganize test structure, create new hierarchies, or adjust section relationships as project organization evolves.",
    inputSchema: {
      type: "object",
      properties: {
        section_id: {
          type: "integer",
          description: "The unique identifier of the section to move. Must be a valid, existing section ID."
        },
        parent_id: {
          type: "integer",
          description: "The unique identifier of the new parent section (use null to move to root level). Must be in the same project and suite, and cannot be a child of the section being moved."
        },
        after_id: {
          type: "integer",
          description: "The unique identifier of the section after which this section should be positioned (use null for first position). Helps control the exact ordering within the parent section."
        }
      },
      required: ["section_id"]
    }
  },
  {
    name: "delete_section",
    description: "Permanently delete a section and all its contained test cases, subsections, and associated data. WARNING: This action cannot be undone and will remove all test cases within the section plus any active tests and results. Use soft deletion to preview impact before permanent removal.",
    inputSchema: {
      type: "object",
      properties: {
        section_id: {
          type: "integer",
          description: "The unique identifier of the section to delete permanently. Double-check this ID before proceeding as deletion affects all test cases and subsections within."
        },
        soft: {
          type: "boolean",
          description: "Set to true to perform a dry-run that returns data on affected tests and cases without actually deleting. Set to false or omit to perform actual deletion. Use soft deletion first to understand the full impact."
        }
      },
      required: ["section_id"]
    }
  },

  // Milestones
  {
    name: "get_milestones",
    description: "Retrieve project milestones from TestRail with filtering options. Milestones represent key project deliverables, release dates, or important deadlines. Use this to track project progress, plan test execution timing, or organize testing activities around releases.",
    inputSchema: {
      type: "object",
      properties: {
        project_id: {
          type: "integer",
          description: "The unique identifier of the TestRail project containing the milestones. All milestones within this project will be considered for filtering."
        },
        is_completed: {
          type: "boolean",
          description: "Filter by completion status: true to return only completed milestones, false to return only active/upcoming milestones. Omit to get all milestones regardless of completion status."
        },
        is_started: {
          type: "boolean",
          description: "Filter by start status: true to return only started milestones, false to return only upcoming milestones. Requires TestRail 5.3 or higher."
        },
        limit: {
          type: "integer",
          description: "Maximum number of milestones to return in a single request (default: 250). Use for pagination with large milestone lists. Requires TestRail 6.7 or higher."
        },
        offset: {
          type: "integer",
          description: "Starting position for pagination (0-based). Use with limit parameter to navigate through large milestone lists. Requires TestRail 6.7 or higher."
        }
      },
      required: ["project_id"]
    }
  },
  {
    name: "get_milestone",
    description: "Retrieve detailed information about a specific TestRail milestone by its ID. Returns comprehensive milestone data including dates, description, completion status, and associated test cases. Use this for milestone reporting, progress tracking, or detailed milestone analysis.",
    inputSchema: {
      type: "object",
      properties: {
        milestone_id: {
          type: "integer",
          description: "The unique identifier of the TestRail milestone to retrieve. You can find milestone IDs using get_milestones or from the TestRail interface."
        }
      },
      required: ["milestone_id"]
    }
  },
  {
    name: "add_milestone",
    description: "Create a new milestone in TestRail to track project deliverables, release dates, or important deadlines. Milestones help organize testing activities and provide timeline context for test execution planning.",
    inputSchema: {
      type: "object",
      properties: {
        project_id: {
          type: "integer",
          description: "The unique identifier of the TestRail project where the milestone will be created. Must be a valid, existing project ID."
        },
        name: {
          type: "string",
          description: "The descriptive name of the milestone. Use clear, meaningful names that identify the deliverable or deadline (e.g., 'Release 2.0', 'Beta Testing Complete', 'Sprint 5 End')."
        },
        description: {
          type: "string",
          description: "Optional detailed description of the milestone's purpose, scope, or deliverables. Use this to provide context about what should be accomplished by this milestone."
        },
        due_on: {
          type: "integer",
          description: "The target completion date for the milestone as UNIX timestamp. Use this to set deadline expectations and track progress against timelines."
        },
        parent_id: {
          type: "integer",
          description: "The ID of the parent milestone, if any (for sub-milestones, requires TestRail 5.3+)"
        },
        refs: {
          type: "string",
          description: "A comma-separated list of references/requirements (requires TestRail 6.4+)"
        },
        start_on: {
          type: "integer",
          description: "The scheduled start date of the milestone (as UNIX timestamp, requires TestRail 5.3+)"
        }
      },
      required: ["project_id", "name"]
    }
  },
  {
    name: "update_milestone",
    description: "Update an existing TestRail milestone's details, timeline, or completion status. Use this to modify milestone properties as project requirements change, update due dates, mark milestones as completed or started, or reorganize milestone hierarchies. Supports partial updates - only provide the fields you want to change.",
    inputSchema: {
      type: "object",
      properties: {
        milestone_id: {
          type: "integer",
          description: "The unique identifier of the TestRail milestone to update. Must be a valid, existing milestone ID."
        },
        name: {
          type: "string",
          description: "Updated name for the milestone. Use clear, descriptive names that reflect the milestone's purpose or deliverable (e.g., 'Release 2.1', 'UAT Complete', 'Sprint 6 End')."
        },
        description: {
          type: "string",
          description: "Updated description providing additional context about the milestone's objectives, scope, or requirements. Use this to communicate important details to the team."
        },
        due_on: {
          type: "integer",
          description: "Updated due date as a UNIX timestamp. Set realistic deadlines that align with project timelines and resource availability."
        },
        is_completed: {
          type: "boolean",
          description: "Mark the milestone as completed (true) or active (false). Completed milestones are typically used for reporting and historical tracking."
        },
        is_started: {
          type: "boolean",
          description: "Mark the milestone as started (true) or not started (false). Requires TestRail 5.3+. Use this to track milestone progress and timeline adherence."
        },
        parent_id: {
          type: "integer",
          description: "The ID of the parent milestone for creating sub-milestone hierarchies. Requires TestRail 5.3+. Use null to remove parent relationship or change milestone hierarchy."
        },
        refs: {
          type: "string",
          description: "Comma-separated list of external references, requirements, or ticket IDs related to this milestone. Requires TestRail 6.4+. Helps link milestones to external project management tools."
        },
        start_on: {
          type: "integer",
          description: "Scheduled start date as a UNIX timestamp. Requires TestRail 5.3+. Use this to define milestone timeline boundaries and project planning."
        }
      },
      required: ["milestone_id"]
    }
  },
  {
    name: "delete_milestone",
    description: "Permanently delete a TestRail milestone. WARNING: This action cannot be undone and will remove all milestone data including timeline information and references. Use with caution - consider marking milestones as completed instead of deleting them to preserve project history.",
    inputSchema: {
      type: "object",
      properties: {
        milestone_id: {
          type: "integer",
          description: "The unique identifier of the TestRail milestone to delete. Must be a valid, existing milestone ID. Ensure this milestone is no longer needed before deletion."
        }
      },
      required: ["milestone_id"]
    }
  },

  // Users
  {
    name: "get_user",
    description: "Retrieve detailed information about a specific TestRail user by their ID. Returns user profile data including name, email, roles, and access permissions. Use this to identify team members, check user permissions, or gather user details for reporting and assignment purposes.",
    inputSchema: {
      type: "object",
      properties: {
        user_id: {
          type: "integer",
          description: "The unique identifier of the TestRail user to retrieve. You can find user IDs from test assignments, user lists, or the TestRail interface."
        }
      },
      required: ["user_id"]
    }
  },
  {
    name: "get_user_by_email",
    description: "Retrieve TestRail user information by their email address. This is useful when you know a user's email but not their ID, or when integrating with external systems that use email as the primary identifier. Returns the same detailed user information as get_user.",
    inputSchema: {
      type: "object",
      properties: {
        email: {
          type: "string",
          description: "The email address of the TestRail user to retrieve. Must be a valid email address registered in TestRail."
        }
      },
      required: ["email"]
    }
  },
  {
    name: "get_users",
    description: "Retrieve all users who have access to a specific TestRail project. Returns a list of team members including their roles, permissions, and activity status within the project. Use this to see who can access project data, assign test cases, or review project team composition.",
    inputSchema: {
      type: "object",
      properties: {
        project_id: {
          type: "integer",
          description: "The unique identifier of the TestRail project to get users for. Must be a valid, existing project ID."
        }
      },
      required: ["project_id"]
    }
  },

  // Custom fields and configurations
  {
    name: "get_case_fields",
    description: "Retrieve all custom fields configured for test cases in TestRail. Returns field definitions including data types, validation rules, and configuration options. Use this to understand available custom fields for test case creation, reporting, or integration with external systems.",
    inputSchema: { type: "object", properties: {} }
  },
  {
    name: "add_case_field",
    description: "Create a new custom field for test cases in TestRail. Custom fields allow you to capture additional test case metadata beyond standard fields, such as business requirements, test environments, or custom classifications. Configure field behavior, validation, and project scope during creation.",
    inputSchema: {
      type: "object",
      properties: {
        type: {
          type: "string",
          description: "The field type identifier determining data storage and UI behavior. Options: 'String' (single-line text), 'Integer' (numeric), 'Text' (multi-line text), 'URL' (web links), 'Checkbox' (boolean), 'Dropdown' (single selection), 'User' (user picker), 'Date' (date picker), 'Milestone' (milestone picker), 'Steps' (test steps), 'Multiselect' (multiple selections), or numeric types 1-12 for system types."
        },
        name: {
          type: "string",
          description: "The internal name for the custom field (without 'custom_' prefix). Use descriptive, lowercase names with underscores (e.g., 'business_priority', 'test_environment', 'requirement_id')."
        },
        label: {
          type: "string",
          description: "The display label shown to users in the TestRail interface. Use clear, user-friendly labels that explain the field's purpose (e.g., 'Business Priority', 'Test Environment', 'Requirement ID')."
        },
        description: {
          type: "string",
          description: "Detailed description explaining the field's purpose, expected values, or usage guidelines. This helps users understand when and how to use the field correctly."
        },
        include_all: {
          type: "boolean",
          description: "Set to true to include this field in all test case templates, false to specify specific templates via template_ids. Global fields appear in all test cases, while template-specific fields only appear in selected templates."
        },
        template_ids: {
          type: "array",
          items: {
            type: "integer"
          },
          description: "Array of template IDs where this field should be available (required if include_all is false). Use get_templates to find available templates for your project."
        },
        configs: {
          type: "array",
          items: {
            type: "object",
            properties: {
              context: {
                type: "object",
                properties: {
                  is_global: {
                    type: "boolean",
                    description: "Set to true for global fields available across all projects, false for project-specific fields. Global fields provide consistency across projects, while project-specific fields allow customization per project."
                  },
                  project_ids: {
                    type: "array",
                    items: {
                      type: "integer"
                    },
                    description: "Array of project IDs where this field is available (required if is_global is false). Allows selective field deployment across specific projects."
                  }
                },
                required: ["is_global"]
              },
              options: {
                type: "object",
                properties: {
                  is_required: {
                    type: "boolean",
                    description: "Whether this field is required for test case creation/updates. Required fields must be populated before test cases can be saved."
                  },
                  default_value: {
                    type: "string",
                    description: "Default value automatically populated when creating new test cases. Not allowed for Multiselect, Milestone, or Date field types."
                  },
                  items: {
                    type: "string",
                    description: "Dropdown or multiselect options formatted as 'ID, Label' pairs separated by newlines (e.g., '1, High Priority\\n2, Medium Priority\\n3, Low Priority'). Use for Dropdown and Multiselect field types."
                  },
                  format: {
                    type: "string",
                    description: "Text formatting option for Text field types: 'plain' for plain text or 'markdown' for Markdown formatting support."
                  },
                  rows: {
                    type: "string",
                    description: "Number of visible rows for Text field types (e.g., '5'). Controls the height of the text input area in the UI."
                  }
                },
                required: ["is_required"]
              }
            },
            required: ["context", "options"]
          },
          description: "Array of field configurations defining context (global vs project-specific) and options (validation, defaults, formatting). Each configuration creates a field instance with specific behavior."
        }
      },
      required: ["type", "name", "label", "configs"]
    }
  },
  {
    name: "get_case_types",
    description: "Retrieve all test case types configured in TestRail. Case types categorize test cases by their purpose and testing approach (e.g., 'Functional', 'Performance', 'Security', 'Usability'). Use this to understand available categorizations for test case creation and reporting filters.",
    inputSchema: { type: "object", properties: {} }
  },
  {
    name: "get_priorities",
    description: "Retrieve all test case priorities configured in TestRail. Priorities help teams categorize test cases by importance and execution order (e.g., 'Critical', 'High', 'Medium', 'Low'). Use this information for test case creation, filtering, and execution planning.",
    inputSchema: { type: "object", properties: {} }
  },
  {
    name: "get_result_fields",
    description: "Retrieve all custom fields configured for test results in TestRail. Result fields allow capturing additional information during test execution beyond standard pass/fail status, such as environment details, defect links, or execution notes. Use this to understand available result data capture options.",
    inputSchema: { type: "object", properties: {} }
  },
  {
    name: "get_statuses",
    description: "Retrieve all test result statuses configured in TestRail. Statuses define the possible outcomes of test execution (e.g., 'Passed', 'Failed', 'Blocked', 'Retest', 'Skipped'). Use this to understand available result classifications and their system IDs for automated test reporting.",
    inputSchema: { type: "object", properties: {} }
  },
  {
    name: "get_templates",
    description: "Retrieve all test case templates configured for a specific TestRail project. Templates define the field layout, required fields, and structure for test cases. Different templates allow teams to standardize test case formats for different testing types (e.g., functional, API, performance). Use this to find available templates when creating or updating test cases.",
    inputSchema: {
      type: "object",
      properties: {
        project_id: {
          type: "integer",
          description: "The unique identifier of the TestRail project to get templates for. Must be a valid, existing project ID."
        }
      },
      required: ["project_id"]
    }
  },
  {
    name: "get_roles",
    description: "Retrieve all user roles configured in TestRail. Roles define permission levels and access rights for users (e.g., 'Administrator', 'Lead', 'Member', 'Viewer'). Requires TestRail 7.3+. Use this to understand available role assignments for user management and access control.",
    inputSchema: {
      type: "object",
      properties: {}
    }
  },

  // Reports
  {
    name: "get_reports",
    description: "Retrieve all API-accessible report templates available for a specific TestRail project. Reports provide insights into test execution progress, coverage, and quality metrics. Use this to discover available report types before generating specific reports for analysis or stakeholder communication.",
    inputSchema: {
      type: "object",
      properties: {
        project_id: {
          type: "integer",
          description: "The unique identifier of the TestRail project to get available reports for. Must be a valid, existing project ID."
        }
      },
      required: ["project_id"]
    }
  },
  {
    name: "run_report",
    description: "Execute a specific report template and return URLs for accessing the generated report. Requires TestRail 5.7+. Use this to generate real-time reports for project analysis, progress tracking, or stakeholder updates. The returned URLs provide access to the report data in various formats.",
    inputSchema: {
      type: "object",
      properties: {
        report_template_id: {
          type: "integer",
          description: "The unique identifier of the report template to execute. Use get_reports to find available report template IDs for your project."
        }
      },
      required: ["report_template_id"]
    }
  },
  {
    name: "get_cross_project_reports",
    description: "Retrieve all API-accessible cross-project report templates available in TestRail. Cross-project reports provide insights spanning multiple projects, useful for organization-wide analysis, resource planning, and executive reporting. Requires TestRail Enterprise license. Use this to discover available cross-project report types.",
    inputSchema: {
      type: "object",
      properties: {}
    }
  },
  {
    name: "run_cross_project_report",
    description: "Execute a cross-project report template and return URLs for accessing the generated report. Cross-project reports aggregate data from multiple projects for comprehensive analysis. Requires TestRail Enterprise license. Use this for organization-wide reporting and strategic decision-making.",
    inputSchema: {
      type: "object",
      properties: {
        report_template_id: {
          type: "integer",
          description: "The unique identifier of the cross-project report template to execute. Use get_cross_project_reports to find available template IDs."
        }
      },
      required: ["report_template_id"]
    }
  },

  // Attachments
  {
    name: "add_attachment_to_case",
    description: "Upload and attach a file to a test case in TestRail. Attachments support documentation, screenshots, test data, or any files relevant to test case execution. Requires TestRail 6.5.2+. Maximum file size is 256MB. IMPORTANT: Always use the full absolute file path (e.g., 'C:\\Users\\user\\file.png' or '/home/user/file.png') - relative paths may fail. Use this to provide additional context or resources for test execution.",
    inputSchema: {
      type: "object",
      properties: {
        case_id: {
          type: "integer",
          description: "The unique identifier of the test case to attach the file to. Must be a valid, existing test case ID."
        },
        attachment: {
          type: "string",
          description: "The file to upload - MUST be a full absolute file path (e.g., 'C:\\Users\\user\\screenshot.png' on Windows or '/home/user/document.pdf' on Linux/Mac). Do NOT use relative paths like 'file.txt' as they will fail. Also supports base64 encoded content. Supported formats include images, documents, spreadsheets, and other common file types."
        }
      },
      required: ["case_id", "attachment"]
    }
  },
  {
    name: "add_attachment_to_plan",
    description: "Upload and attach a file to a test plan in TestRail. Plan attachments can include test strategies, requirements documents, or any files relevant to the overall test plan. Requires TestRail 6.3+. Maximum file size is 256MB. IMPORTANT: Always use the full absolute file path (e.g., 'C:\\Users\\user\\file.png' or '/home/user/file.png') - relative paths may fail. Use this to provide planning context or reference materials.",
    inputSchema: {
      type: "object",
      properties: {
        plan_id: {
          type: "integer",
          description: "The unique identifier of the test plan to attach the file to. Must be a valid, existing test plan ID."
        },
        attachment: {
          type: "string",
          description: "The file to upload - MUST be a full absolute file path (e.g., 'C:\\Users\\user\\test-plan.pdf' on Windows or '/home/user/strategy.docx' on Linux/Mac). Do NOT use relative paths like 'file.txt' as they will fail. Also supports base64 encoded content. Supported formats include images, documents, spreadsheets, and other common file types."
        }
      },
      required: ["plan_id", "attachment"]
    }
  },
  {
    name: "add_attachment_to_plan_entry",
    description: "Upload and attach a file to a specific test plan entry (test run within a plan). Plan entry attachments can include configuration files, environment details, or execution-specific documentation. Requires TestRail 6.3+. Maximum file size is 256MB. IMPORTANT: Always use the full absolute file path (e.g., 'C:\\Users\\user\\file.png' or '/home/user/file.png') - relative paths may fail. Use this to provide context for specific test run configurations.",
    inputSchema: {
      type: "object",
      properties: {
        plan_id: {
          type: "integer",
          description: "The unique identifier of the test plan containing the entry. Must be a valid, existing test plan ID."
        },
        entry_id: {
          type: "string",
          description: "The unique identifier of the test plan entry (test run) to attach the file to. Must be a valid entry within the specified plan."
        },
        attachment: {
          type: "string",
          description: "The file to upload - MUST be a full absolute file path (e.g., 'C:\\Users\\user\\config.json' on Windows or '/home/user/environment.yml' on Linux/Mac). Do NOT use relative paths like 'file.txt' as they will fail. Also supports base64 encoded content. Supported formats include images, documents, spreadsheets, and other common file types."
        }
      },
      required: ["plan_id", "entry_id", "attachment"]
    }
  },
  {
    name: "add_attachment_to_result",
    description: "Upload and attach a file to a test result. Result attachments typically include screenshots, logs, defect evidence, or any files generated during test execution. Requires TestRail 5.7+. Maximum file size is 256MB. Requires 'edit test results' permission. IMPORTANT: Always use the full absolute file path (e.g., 'C:\\Users\\user\\file.png' or '/home/user/file.png') - relative paths may fail. Use this to provide execution evidence and debugging information.",
    inputSchema: {
      type: "object",
      properties: {
        result_id: {
          type: "integer",
          description: "The unique identifier of the test result to attach the file to. Must be a valid, existing test result ID."
        },
        attachment: {
          type: "string",
          description: "The file to upload - MUST be a full absolute file path (e.g., 'C:\\Users\\user\\screenshot.png' on Windows or '/home/user/error.log' on Linux/Mac). Do NOT use relative paths like 'file.txt' as they will fail. Also supports base64 encoded content. Common formats include screenshots (PNG, JPG), logs (TXT, LOG), or reports (PDF, HTML)."
        }
      },
      required: ["result_id", "attachment"]
    }
  },
  {
    name: "add_attachment_to_run",
    description: "Upload and attach a file to a test run. Run attachments can include execution reports, environment configurations, or any files relevant to the entire test run. Requires TestRail 6.3+. Maximum file size is 256MB. IMPORTANT: Always use the full absolute file path (e.g., 'C:\\Users\\user\\file.png' or '/home/user/file.png') - relative paths may fail. Use this to provide run-level context and documentation.",
    inputSchema: {
      type: "object",
      properties: {
        run_id: {
          type: "integer",
          description: "The unique identifier of the test run to attach the file to. Must be a valid, existing test run ID."
        },
        attachment: {
          type: "string",
          description: "The file to upload - MUST be a full absolute file path (e.g., 'C:\\Users\\user\\test-report.pdf' on Windows or '/home/user/execution-log.txt' on Linux/Mac). Do NOT use relative paths like 'file.txt' as they will fail. Also supports base64 encoded content. Supported formats include images, documents, spreadsheets, and other common file types."
        }
      },
      required: ["run_id", "attachment"]
    }
  },
  {
    name: "get_attachments_for_case",
    description: "Retrieve all attachments associated with a specific test case. Returns attachment metadata including file names, sizes, and download URLs. Requires TestRail 5.7+. Use this to discover available case documentation, review attached files, or integrate with external systems.",
    inputSchema: {
      type: "object",
      properties: {
        case_id: {
          type: "integer",
          description: "The unique identifier of the test case to retrieve attachments from. Must be a valid, existing test case ID."
        },
        limit: {
          type: "integer",
          description: "Maximum number of attachments to return in a single request (default: 250). Use for pagination with large attachment lists."
        },
        offset: {
          type: "integer",
          description: "Starting position for pagination (0-based). Use with limit parameter to paginate through large attachment lists."
        }
      },
      required: ["case_id"]
    }
  },
  {
    name: "get_attachments_for_plan",
    description: "Retrieve all attachments associated with a specific test plan. Returns attachment metadata including file names, sizes, and download URLs. Requires TestRail 6.3+. Use this to discover available plan documentation, review attached files, or integrate with external systems.",
    inputSchema: {
      type: "object",
      properties: {
        plan_id: {
          type: "integer",
          description: "The unique identifier of the test plan to retrieve attachments from. Must be a valid, existing test plan ID."
        },
        limit: {
          type: "integer",
          description: "Maximum number of attachments to return in a single request (default: 250). Use for pagination with large attachment lists."
        },
        offset: {
          type: "integer",
          description: "Starting position for pagination (0-based). Use with limit parameter to paginate through large attachment lists."
        }
      },
      required: ["plan_id"]
    }
  },
  {
    name: "get_attachments_for_plan_entry",
    description: "Retrieve all attachments associated with a specific test plan entry (test run within a plan). Returns attachment metadata including file names, sizes, and download URLs. Requires TestRail 6.3+. Use this to discover available entry-specific documentation and files.",
    inputSchema: {
      type: "object",
      properties: {
        plan_id: {
          type: "integer",
          description: "The unique identifier of the test plan containing the entry. Must be a valid, existing test plan ID."
        },
        entry_id: {
          type: "string",
          description: "The unique identifier of the test plan entry to retrieve attachments from. Must be a valid entry within the specified plan."
        }
      },
      required: ["plan_id", "entry_id"]
    }
  },
  {
    name: "get_attachments_for_run",
    description: "Retrieve all attachments associated with a specific test run. Returns attachment metadata including file names, sizes, and download URLs. Requires TestRail 6.3+. Use this to discover available run documentation, execution reports, or debugging files.",
    inputSchema: {
      type: "object",
      properties: {
        run_id: {
          type: "integer",
          description: "The unique identifier of the test run to retrieve attachments from. Must be a valid, existing test run ID."
        },
        limit: {
          type: "integer",
          description: "Maximum number of attachments to return in a single request (default: 250). Use for pagination with large attachment lists."
        },
        offset: {
          type: "integer",
          description: "Starting position for pagination (0-based). Use with limit parameter to paginate through large attachment lists."
        }
      },
      required: ["run_id"]
    }
  },
  {
    name: "get_attachments_for_test",
    description: "Retrieve all attachments associated with a specific test's results. Returns attachment metadata for all files attached to the test's result history. Requires TestRail 5.7+. Use this to gather execution evidence, screenshots, or logs from test result attachments.",
    inputSchema: {
      type: "object",
      properties: {
        test_id: {
          type: "integer",
          description: "The unique identifier of the test to retrieve attachments from. Must be a valid, existing test ID."
        }
      },
      required: ["test_id"]
    }
  },
  {
    name: "get_attachment",
    description: "Download a specific attachment file from TestRail. Returns the actual file content for local processing or storage. Requires TestRail 5.7+. Use this to retrieve files for analysis, backup, or integration with external systems.",
    inputSchema: {
      type: "object",
      properties: {
        attachment_id: {
          type: "string",
          description: "The unique identifier of the attachment to download. Can be integer or UUID format depending on TestRail version. Found in attachment metadata from other attachment endpoints."
        }
      },
      required: ["attachment_id"]
    }
  },
  {
    name: "delete_attachment",
    description: "Permanently delete an attachment from TestRail. WARNING: This action cannot be undone and will permanently remove the file. Requires TestRail 5.7+. Use with caution - ensure the attachment is no longer needed before deletion.",
    inputSchema: {
      type: "object",
      properties: {
        attachment_id: {
          type: "string",
          description: "The unique identifier of the attachment to delete. Can be integer or UUID format depending on TestRail version. Must be a valid, existing attachment ID."
        }
      },
      required: ["attachment_id"]
    }
  },

  // BDD (Behavior Driven Development)
  {
    name: "get_bdd",
    description: "Export a test case as a BDD scenario in Gherkin format (.feature file). Converts TestRail test case steps into standardized Given-When-Then format for BDD workflows and external tool integration. Use this to bridge TestRail with BDD frameworks like Cucumber or SpecFlow.",
    inputSchema: {
      type: "object",
      properties: {
        case_id: {
          type: "integer",
          description: "The unique identifier of the test case to export as a BDD scenario. Must be a valid, existing test case ID with structured test steps."
        }
      },
      required: ["case_id"]
    }
  },
  {
    name: "add_bdd",
    description: "Import BDD scenarios from Gherkin format into TestRail as test cases. Requires TestRail 6.7+. Converts Given-When-Then format into TestRail test case steps, enabling BDD-first development workflows and automated scenario synchronization from external BDD tools.",
    inputSchema: {
      type: "object",
      properties: {
        project_id: {
          type: "integer",
          description: "The unique identifier of the TestRail project to import BDD scenarios into. Must be a valid, existing project ID."
        },
        file_content: {
          type: "string",
          description: "The BDD Gherkin content as a string, containing Feature, Scenario, and Given-When-Then statements. Must follow standard Gherkin syntax for proper parsing and import."
        }
      },
      required: ["project_id", "file_content"]
    }
  },

  // Configurations
  {
    name: "get_configs",
    description: "Retrieve all configuration groups and their configurations for a specific TestRail project. Configurations define test environment variations (e.g., browsers, operating systems, devices) that can be applied to test runs. Use this to understand available test configurations for planning and execution.",
    inputSchema: {
      type: "object",
      properties: {
        project_id: {
          type: "integer",
          description: "The unique identifier of the TestRail project to get configurations for. Must be a valid, existing project ID."
        }
      },
      required: ["project_id"]
    }
  },
  {
    name: "add_config_group",
    description: "Create a new configuration group to organize related test configurations. Requires TestRail 5.2+. Configuration groups categorize configurations by type (e.g., 'Browsers', 'Operating Systems', 'Devices'). Use this to establish configuration structure for multi-environment testing.",
    inputSchema: {
      type: "object",
      properties: {
        project_id: {
          type: "integer",
          description: "The unique identifier of the TestRail project to add the configuration group to. Must be a valid, existing project ID."
        },
        name: {
          type: "string",
          description: "The descriptive name of the configuration group. Use clear, categorizing names (e.g., 'Browsers', 'Mobile Devices', 'Test Environments')."
        }
      },
      required: ["project_id", "name"]
    }
  },
  {
    name: "add_config",
    description: "Create a new configuration within a configuration group. Requires TestRail 5.2+. Configurations represent specific test environment variations (e.g., 'Chrome', 'Firefox', 'Safari' within a 'Browsers' group). Use this to define test execution contexts.",
    inputSchema: {
      type: "object",
      properties: {
        config_group_id: {
          type: "integer",
          description: "The unique identifier of the configuration group to add the configuration to. Must be a valid, existing configuration group ID."
        },
        name: {
          type: "string",
          description: "The descriptive name of the configuration. Use specific, identifiable names (e.g., 'Chrome 120', 'Windows 11', 'iPhone 15')."
        }
      },
      required: ["config_group_id", "name"]
    }
  },
  {
    name: "update_config_group",
    description: "Update an existing configuration group's name or properties. Requires TestRail 5.2+. Use this to rename configuration groups or modify their settings as testing requirements evolve.",
    inputSchema: {
      type: "object",
      properties: {
        config_group_id: {
          type: "integer",
          description: "The unique identifier of the configuration group to update. Must be a valid, existing configuration group ID."
        },
        name: {
          type: "string",
          description: "The updated name for the configuration group. Use clear, categorizing names that reflect the group's purpose."
        }
      },
      required: ["config_group_id"]
    }
  },
  {
    name: "update_config",
    description: "Update an existing configuration's name or properties. Requires TestRail 5.2+. Use this to rename configurations or modify their settings as test environments change.",
    inputSchema: {
      type: "object",
      properties: {
        config_id: {
          type: "integer",
          description: "The unique identifier of the configuration to update. Must be a valid, existing configuration ID."
        },
        name: {
          type: "string",
          description: "The updated name for the configuration. Use specific, identifiable names that reflect the test environment."
        }
      },
      required: ["config_id"]
    }
  },
  {
    name: "delete_config_group",
    description: "Permanently delete a configuration group and all its configurations. Requires TestRail 5.2+. WARNING: This action cannot be undone and will remove all configurations within the group. Use with extreme caution - consider renaming instead of deleting to preserve test history.",
    inputSchema: {
      type: "object",
      properties: {
        config_group_id: {
          type: "integer",
          description: "The unique identifier of the configuration group to delete. Must be a valid, existing configuration group ID. Ensure this group is no longer needed before deletion."
        }
      },
      required: ["config_group_id"]
    }
  },
  {
    name: "delete_config",
    description: "Permanently delete a configuration. Requires TestRail 5.2+. WARNING: This action cannot be undone and may affect test runs that reference this configuration. Use with extreme caution - consider renaming instead of deleting to preserve test history.",
    inputSchema: {
      type: "object",
      properties: {
        config_id: {
          type: "integer",
          description: "The unique identifier of the configuration to delete. Must be a valid, existing configuration ID. Ensure this configuration is no longer needed before deletion."
        }
      },
      required: ["config_id"]
    }
  },

  // Tests
  {
    name: "get_test",
    description: "Retrieve detailed information about a specific test by its ID. Tests are individual test case instances within a test run, containing execution status, results, and configuration details. Use this to get test-specific information for reporting, status tracking, or result analysis.",
    inputSchema: {
      type: "object",
      properties: {
        test_id: {
          type: "integer",
          description: "The unique identifier of the test to retrieve. Must be a valid, existing test ID from an active test run."
        },
        with_data: {
          type: "string",
          description: "Optional parameter to include additional data in the response. Available options may vary by TestRail version."
        }
      },
      required: ["test_id"]
    }
  },
  {
    name: "get_tests",
    description: "Retrieve all tests within a specific test run, with optional filtering by status, labels, or other criteria. Tests represent individual test case instances that can be executed and have results recorded. Use this to get a complete list of tests for execution planning or progress monitoring.",
    inputSchema: {
      type: "object",
      properties: {
        run_id: {
          type: "integer",
          description: "The unique identifier of the test run to get tests from. Must be a valid, existing test run ID."
        },
        status_id: {
          type: "string",
          description: "Comma-separated list of status IDs to filter tests by execution status (e.g., '1,2,3' for passed, failed, blocked). Use get_statuses to find available status IDs."
        },
        limit: {
          type: "integer",
          description: "Maximum number of tests to return in a single request (default: 250). Requires TestRail 6.7+. Use for pagination with large test runs."
        },
        offset: {
          type: "integer",
          description: "Starting position for pagination (0-based). Requires TestRail 6.7+. Use with limit parameter to paginate through large test lists."
        },
        label_id: {
          type: "string",
          description: "Comma-separated list of label IDs to filter tests by assigned labels. Use get_labels to find available label IDs."
        }
      },
      required: ["run_id"]
    }
  },
  {
    name: "update_test",
    description: "Update labels assigned to a specific test within a test run. Labels help categorize and organize tests for better tracking and filtering during execution. Use this to apply or modify test categorization dynamically.",
    inputSchema: {
      type: "object",
      properties: {
        test_id: {
          type: "integer",
          description: "The unique identifier of the test to update. Must be a valid, existing test ID from an active test run."
        },
        labels: {
          type: "array",
          items: {
            oneOf: [
              { type: "integer" },
              { type: "string" }
            ]
          },
          description: "Array of label IDs (integers) or label titles (strings) to assign to the test. Use get_labels to find available labels."
        }
      },
      required: ["test_id", "labels"]
    }
  },
  {
    name: "update_tests",
    description: "Update labels assigned to multiple tests with the same label values. This bulk operation allows consistent labeling across multiple tests for efficient organization and categorization. Use this to apply standard labels to groups of related tests.",
    inputSchema: {
      type: "object",
      properties: {
        test_ids: {
          type: "array",
          items: { type: "integer" },
          description: "Array of test IDs to update with the same labels. All IDs must be valid, existing test IDs from active test runs."
        },
        labels: {
          type: "array",
          items: {
            oneOf: [
              { type: "integer" },
              { type: "string" }
            ]
          },
          description: "Array of label IDs (integers) or label titles (strings) to assign to all specified tests. Use get_labels to find available labels."
        }
      },
      required: ["test_ids", "labels"]
    }
  },

  // Labels
  {
    name: "get_label",
    description: "Retrieve detailed information about a specific TestRail label by its ID. Labels are used to tag and categorize test cases for better organization and filtering. Use this to get label details for reporting, validation, or when working with label-based test case management. Requires TestRail 7.0+ with labels feature enabled.",
    inputSchema: {
      type: "object",
      properties: {
        label_id: {
          type: "integer",
          description: "The unique identifier of the TestRail label to retrieve. You can find label IDs using get_labels or from the TestRail interface."
        }
      },
      required: ["label_id"]
    }
  },
  {
    name: "get_labels",
    description: "Retrieve labels from a TestRail project for organizing and categorizing test cases. Labels provide a flexible tagging system to group related test cases across different test suites and sections. Use this to understand available labels, implement test case organization, or prepare label-based filtering. Requires TestRail 7.0+ with labels feature enabled.",
    inputSchema: {
      type: "object",
      properties: {
        project_id: {
          type: "integer",
          description: "The unique identifier of the TestRail project to retrieve labels from. All labels within this project will be returned based on the filtering criteria."
        },
        offset: {
          type: "integer",
          description: "Starting position for pagination (0-based). Use with limit parameter to navigate through large label sets efficiently."
        },
        limit: {
          type: "integer",
          description: "Maximum number of labels to return in a single request (default: 250). Use for pagination and performance optimization with large label lists."
        }
      },
      required: ["project_id"]
    }
  },
  {
    name: "update_label",
    description: "Update the title of an existing TestRail label. Use this to rename labels, fix typos, or improve label naming conventions for better test case organization. Requires TestRail 7.0+ with labels feature enabled.",
    inputSchema: {
      type: "object",
      properties: {
        label_id: {
          type: "integer",
          description: "The unique identifier of the TestRail label to update. You can find label IDs using get_labels or from the TestRail interface."
        },
        title: {
          type: "string",
          description: "The new title/name for the label (maximum 20 characters). Choose clear, descriptive names that help with test case organization and filtering."
        }
      },
      required: ["label_id", "title"]
    }
  },

  // Shared Steps
  {
    name: "get_shared_step",
    description: "Retrieve a specific set of shared steps by ID. Shared steps are reusable test step sequences that can be referenced across multiple test cases, promoting consistency and reducing maintenance overhead. Requires TestRail 7.0+. Use this to get shared step details for test case creation or step sequence analysis.",
    inputSchema: {
      type: "object",
      properties: {
        shared_step_id: {
          type: "integer",
          description: "The unique identifier of the shared step set to retrieve. You can find shared step IDs using get_shared_steps or from the TestRail interface."
        }
      },
      required: ["shared_step_id"]
    }
  },
  {
    name: "get_shared_step_history",
    description: "Retrieve the change history for a specific shared step set, showing modifications, updates, and version information. Requires TestRail 7.3+. Use this to track shared step evolution, understand changes, or audit step sequence modifications for compliance purposes.",
    inputSchema: {
      type: "object",
      properties: {
        shared_step_id: {
          type: "integer",
          description: "The unique identifier of the shared step set to get history for. Must be a valid, existing shared step ID."
        }
      },
      required: ["shared_step_id"]
    }
  },
  {
    name: "get_shared_steps",
    description: "Retrieve all shared steps for a TestRail project with optional filtering by creation date, creator, or other criteria. Shared steps promote test case reusability and consistency. Requires TestRail 7.0+. Use this to discover available shared steps for test case creation or analyze shared step usage patterns.",
    inputSchema: {
      type: "object",
      properties: {
        project_id: {
          type: "integer",
          description: "The unique identifier of the TestRail project to retrieve shared steps from. Must be a valid, existing project ID."
        },
        created_after: {
          type: "integer",
          description: "Only return shared steps created after this date (as UNIX timestamp). Use for filtering recent shared steps or incremental synchronization."
        },
        created_before: {
          type: "integer",
          description: "Only return shared steps created before this date (as UNIX timestamp). Use for filtering older shared steps or historical analysis."
        },
        created_by: {
          type: "array",
          items: { type: "integer" },
          description: "Array of user IDs to filter shared steps by creator. Use to find shared steps created by specific team members."
        },
        limit: {
          type: "integer",
          description: "Maximum number of shared steps to return (maximum 250). Use for pagination with large shared step collections."
        },
        offset: {
          type: "integer",
          description: "Starting position for pagination (0-based). Use with limit parameter to navigate through large shared step lists."
        },
        updated_after: {
          type: "integer",
          description: "Only return shared steps updated after this date (as UNIX timestamp). Use for filtering recently modified shared steps or incremental synchronization."
        },
        updated_before: {
          type: "integer",
          description: "Only return shared steps updated before this date (as UNIX timestamp). Use for filtering older shared steps or historical analysis."
        },
        refs: {
          type: "string",
          description: "A single reference ID to filter by (e.g., 'TR-a', '4291'). Use to find shared steps linked to specific requirements or tickets."
        }
      },
      required: ["project_id"]
    }
  },
  {
    name: "add_shared_step",
    description: "Create a new set of shared steps to promote test case reusability and consistency across the project. Requires TestRail 7.0+ and permission to add test cases within the project. Use this to establish reusable step sequences that can be referenced by multiple test cases.",
    inputSchema: {
      type: "object",
      properties: {
        project_id: {
          type: "integer",
          description: "The unique identifier of the TestRail project to create shared steps in. Must be a valid, existing project ID."
        },
        title: {
          type: "string",
          description: "The descriptive title for the shared step set. Use clear, meaningful titles that describe the step sequence purpose (e.g., 'Login Process', 'Navigation Setup', 'Data Validation')."
        },
        custom_steps_separated: {
          type: "array",
          items: {
            type: "object",
            properties: {
              content: { type: "string", description: "The text contents of the 'Step' field describing the action to perform." },
              additional_info: { type: "string", description: "The text contents of the 'Additional Info' field providing extra context or details." },
              expected: { type: "string", description: "The text contents of the 'Expected Result' field describing the expected outcome." },
              refs: { type: "string", description: "Reference information for the 'References' field linking to requirements or external resources." }
            }
          },
          description: "An array of step objects defining the shared step sequence. Each object represents one step in the sequence with its action, expected result, and optional additional information."
        }
      },
      required: ["project_id", "title"]
    }
  },
  {
    name: "update_shared_step",
    description: "Update an existing set of shared steps, allowing modification of title or step sequence. Requires TestRail 7.0+ and permission to edit test cases within the project. Supports partial updates - only provide fields you want to change. WARNING: Updating custom_steps_separated will replace ALL existing steps.",
    inputSchema: {
      type: "object",
      properties: {
        shared_step_id: {
          type: "integer",
          description: "The unique identifier of the shared step set to update. Must be a valid, existing shared step ID."
        },
        title: {
          type: "string",
          description: "The updated title for the shared step set. Use descriptive titles that clearly indicate the step sequence purpose."
        },
        custom_steps_separated: {
          type: "array",
          items: {
            type: "object",
            properties: {
              content: { type: "string", description: "The text contents of the 'Step' field describing the action to perform." },
              additional_info: { type: "string", description: "The text contents of the 'Additional Info' field providing extra context or details." },
              expected: { type: "string", description: "The text contents of the 'Expected Result' field describing the expected outcome." },
              refs: { type: "string", description: "Reference information for the 'References' field linking to requirements or external resources." }
            }
          },
          description: "An array of step objects that will REPLACE all existing steps in the shared step set. Use with caution as this completely overwrites the current step sequence."
        }
      },
      required: ["shared_step_id"]
    }
  },
  {
    name: "delete_shared_step",
    description: "Permanently delete a set of shared steps from TestRail. Requires TestRail 7.0+ and permission to delete test cases within the project. WARNING: This action cannot be undone! Consider the impact on test cases that reference these shared steps.",
    inputSchema: {
      type: "object",
      properties: {
        shared_step_id: {
          type: "integer",
          description: "The unique identifier of the shared step set to delete. Must be a valid, existing shared step ID."
        },
        keep_in_cases: {
          type: "boolean",
          description: "Default is true. Set to false to also remove these steps from all test cases that reference them (in addition to removing from the shared step repository). Use with extreme caution."
        }
      },
      required: ["shared_step_id"]
    }
  },

  // Datasets
  {
    name: "get_dataset",
    description: "Retrieve a specific dataset by ID from TestRail. Datasets provide structured test data for data-driven testing scenarios. Requires TestRail Enterprise license. Use this to get dataset details for test case parameterization or data validation.",
    inputSchema: {
      type: "object",
      properties: {
        dataset_id: {
          type: "integer",
          description: "The unique identifier of the dataset to retrieve. You can find dataset IDs using get_datasets or from the TestRail interface."
        }
      },
      required: ["dataset_id"]
    }
  },
  {
    name: "get_datasets",
    description: "Retrieve all datasets for a specific TestRail project. Datasets enable data-driven testing by providing structured test data that can be used across multiple test cases. Requires TestRail Enterprise license. Use this to discover available datasets for test parameterization.",
    inputSchema: {
      type: "object",
      properties: {
        project_id: {
          type: "integer",
          description: "The unique identifier of the TestRail project to retrieve datasets from. Must be a valid, existing project ID."
        }
      },
      required: ["project_id"]
    }
  },
  {
    name: "add_dataset",
    description: "Create a new dataset for data-driven testing within a TestRail project. Datasets provide structured test data that can be referenced by multiple test cases. Requires TestRail Enterprise license. Use this to establish reusable test data sets for parameterized testing.",
    inputSchema: {
      type: "object",
      properties: {
        project_id: {
          type: "integer",
          description: "The unique identifier of the TestRail project to create the dataset in. Must be a valid, existing project ID."
        },
        name: {
          type: "string",
          description: "The descriptive name for the dataset. Use clear, meaningful names that describe the data's purpose (e.g., 'User Login Data', 'Product Catalog', 'Test Environments')."
        },
        variables: {
          type: "object",
          description: "Key/value pairs where each key represents a variable name and each value represents the dataset value. Example: {'browser': 'Chrome', 'username': 'testuser', 'environment': 'staging'}. Define variables that will be used in test cases."
        }
      },
      required: ["project_id", "name"]
    }
  },
  {
    name: "update_dataset",
    description: "Update an existing dataset's name or variables. Requires TestRail Enterprise license. Use this to modify dataset properties, add new variables, or update existing data values as testing requirements change.",
    inputSchema: {
      type: "object",
      properties: {
        dataset_id: {
          type: "integer",
          description: "The unique identifier of the dataset to update. Must be a valid, existing dataset ID."
        },
        name: {
          type: "string",
          description: "The updated name for the dataset. Use descriptive names that clearly indicate the dataset's purpose and content."
        },
        variables: {
          type: "object",
          description: "Updated key/value pairs where each key represents a variable name and each value represents the dataset value. This will replace existing variables, so include all variables you want to keep."
        }
      },
      required: ["dataset_id"]
    }
  },
  {
    name: "delete_dataset",
    description: "Permanently delete a dataset from TestRail. Requires TestRail Enterprise license. WARNING: This action cannot be undone and will remove all dataset values! The Default dataset cannot be deleted. Use with caution as this may affect test cases that reference this dataset.",
    inputSchema: {
      type: "object",
      properties: {
        dataset_id: {
          type: "integer",
          description: "The unique identifier of the dataset to delete. Must be a valid, existing dataset ID. Cannot be the Default dataset."
        }
      },
      required: ["dataset_id"]
    }
  },

  // Variables
  {
    name: "get_variables",
    description: "Retrieve all variables for a TestRail project. Variables define the structure and names of data fields used in datasets for data-driven testing. Requires TestRail Enterprise license. Use this to understand available data parameters for test case parameterization.",
    inputSchema: {
      type: "object",
      properties: {
        project_id: {
          type: "integer",
          description: "The unique identifier of the TestRail project to retrieve variables from. Must be a valid, existing project ID."
        }
      },
      required: ["project_id"]
    }
  },
  {
    name: "add_variable",
    description: "Create a new variable for data-driven testing within a TestRail project. Variables define the structure of dataset fields and enable parameterized test execution. Requires TestRail Enterprise license. Use this to establish new data parameters for test cases.",
    inputSchema: {
      type: "object",
      properties: {
        project_id: {
          type: "integer",
          description: "The unique identifier of the TestRail project to create the variable in. Must be a valid, existing project ID."
        },
        name: {
          type: "string",
          description: "The descriptive name for the variable. Use clear, meaningful names that describe the data parameter (e.g., 'username', 'browser', 'test_environment')."
        }
      },
      required: ["project_id", "name"]
    }
  },
  {
    name: "update_variable",
    description: "Update an existing variable's name within a TestRail project. Requires TestRail Enterprise license. Use this to rename variables or improve naming conventions for better test data organization.",
    inputSchema: {
      type: "object",
      properties: {
        variable_id: {
          type: "integer",
          description: "The unique identifier of the variable to update. Must be a valid, existing variable ID."
        },
        name: {
          type: "string",
          description: "The new name for the variable. Use descriptive names that clearly indicate the data parameter's purpose."
        }
      },
      required: ["variable_id", "name"]
    }
  },
  {
    name: "delete_variable",
    description: "Permanently delete a variable from TestRail. Requires TestRail Enterprise license. WARNING: This action cannot be undone and will also delete corresponding values from all datasets! Use with extreme caution as this affects all datasets that use this variable.",
    inputSchema: {
      type: "object",
      properties: {
        variable_id: {
          type: "integer",
          description: "The unique identifier of the variable to delete. Must be a valid, existing variable ID. Ensure this variable is no longer needed before deletion."
        }
      },
      required: ["variable_id"]
    }
  },

  // Groups
  {
    name: "get_group",
    description: "Retrieve detailed information about a specific TestRail user group by its ID. Groups organize users for permission management and team collaboration. Requires TestRail 7.5+. Use this to get group details for user management or permission analysis.",
    inputSchema: {
      type: "object",
      properties: {
        group_id: {
          type: "integer",
          description: "The unique identifier of the TestRail group to retrieve. You can find group IDs using get_groups or from the TestRail interface."
        }
      },
      required: ["group_id"]
    }
  },
  {
    name: "get_groups",
    description: "Retrieve all user groups configured in TestRail. Groups enable organized user management and permission assignment for team collaboration. Requires TestRail 7.5+. Use this to understand available groups for user assignment and permission management.",
    inputSchema: {
      type: "object",
      properties: {}
    }
  },
  {
    name: "add_group",
    description: "Create a new user group in TestRail for organizing team members and managing permissions. Requires TestRail 7.5+. Use this to establish team structures, role-based access, or project-specific user organizations.",
    inputSchema: {
      type: "object",
      properties: {
        name: {
          type: "string",
          description: "The descriptive name for the group. Use clear, meaningful names that describe the group's purpose (e.g., 'QA Team', 'Development Leads', 'Project Managers')."
        },
        user_ids: {
          type: "array",
          items: { type: "integer" },
          description: "An array of user IDs to add to this group initially. Users can be added or removed later using update_group."
        }
      },
      required: ["name", "user_ids"]
    }
  },
  {
    name: "update_group",
    description: "Update an existing user group's name or membership. Requires TestRail 7.5+. WARNING: The user_ids parameter replaces the complete user list, not incremental changes. Use this to modify group membership or rename groups.",
    inputSchema: {
      type: "object",
      properties: {
        group_id: {
          type: "integer",
          description: "The unique identifier of the group to update. Must be a valid, existing group ID."
        },
        name: {
          type: "string",
          description: "The updated name for the group. Use descriptive names that clearly indicate the group's purpose and membership."
        },
        user_ids: {
          type: "array",
          items: { type: "integer" },
          description: "The complete array of user IDs for this group. This REPLACES all existing members - include all users you want to keep in the group."
        }
      },
      required: ["group_id"]
    }
  },
  {
    name: "delete_group",
    description: "Permanently delete a user group from TestRail. Requires TestRail 7.5+. WARNING: This action cannot be undone! Use with caution as this may affect permission assignments and team organization.",
    inputSchema: {
      type: "object",
      properties: {
        group_id: {
          type: "integer",
          description: "The unique identifier of the group to delete. Must be a valid, existing group ID. Ensure this group is no longer needed before deletion."
        }
      },
      required: ["group_id"]
    }
  }
];
