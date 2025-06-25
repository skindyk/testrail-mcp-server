import { Tool } from "@modelcontextprotocol/sdk/types.js";

export const tools: Tool[] = [
  // Projects
  {
    name: "get_projects",
    description: "Get all projects from TestRail",
    inputSchema: {
      type: "object",
      properties: {
        is_completed: {
          type: "boolean",
          description: "Filter by completed projects (true) or active projects (false). If omitted, returns all projects."
        }
      }
    }
  },
  {
    name: "get_project",
    description: "Get a specific project by ID",
    inputSchema: {
      type: "object",
      properties: {
        project_id: {
          type: "integer",
          description: "The ID of the project to retrieve"
        }
      },
      required: ["project_id"]
    }
  },
  {
    name: "add_project",
    description: "Create a new project",
    inputSchema: {
      type: "object",
      properties: {
        name: {
          type: "string",
          description: "The name of the project"
        },
        announcement: {
          type: "string",
          description: "The announcement/description of the project"
        },
        show_announcement: {
          type: "boolean",
          description: "Whether to show the announcement"
        },
        suite_mode: {
          type: "integer",
          description: "The suite mode (1 = single suite, 2 = single suite with baselines, 3 = multiple suites)"
        }
      },
      required: ["name"]
    }
  },
  {
    name: "update_project",
    description: "Update an existing project",
    inputSchema: {
      type: "object",
      properties: {
        project_id: {
          type: "integer",
          description: "The ID of the project to update"
        },
        name: {
          type: "string",
          description: "The name of the project"
        },
        announcement: {
          type: "string",
          description: "The announcement/description of the project"
        },
        show_announcement: {
          type: "boolean",
          description: "Whether to show the announcement"
        },
        is_completed: {
          type: "boolean",
          description: "Whether the project is completed"
        }
      },
      required: ["project_id"]
    }
  },
  {
    name: "delete_project",
    description: "Delete a project",
    inputSchema: {
      type: "object",
      properties: {
        project_id: {
          type: "integer",
          description: "The ID of the project to delete"
        }
      },
      required: ["project_id"]
    }
  },

  // Test Suites
  {
    name: "get_suites",
    description: "Get all test suites for a project",
    inputSchema: {
      type: "object",
      properties: {
        project_id: {
          type: "integer",
          description: "The ID of the project"
        }
      },
      required: ["project_id"]
    }
  },
  {
    name: "get_suite",
    description: "Get a specific test suite by ID",
    inputSchema: {
      type: "object",
      properties: {
        suite_id: {
          type: "integer",
          description: "The ID of the test suite"
        }
      },
      required: ["suite_id"]
    }
  },
  {
    name: "add_suite",
    description: "Create a new test suite",
    inputSchema: {
      type: "object",
      properties: {
        project_id: {
          type: "integer",
          description: "The ID of the project"
        },
        name: {
          type: "string",
          description: "The name of the test suite"
        },
        description: {
          type: "string",
          description: "The description of the test suite"
        }
      },
      required: ["project_id", "name"]
    }
  },
  {
    name: "update_suite",
    description: "Update an existing test suite",
    inputSchema: {
      type: "object",
      properties: {
        suite_id: {
          type: "integer",
          description: "The ID of the test suite"
        },
        name: {
          type: "string",
          description: "The name of the test suite"
        },
        description: {
          type: "string",
          description: "The description of the test suite"
        }
      },
      required: ["suite_id"]
    }
  },
  {
    name: "delete_suite",
    description: "Delete a test suite",
    inputSchema: {
      type: "object",
      properties: {
        suite_id: {
          type: "integer",
          description: "The ID of the test suite to delete"
        }
      },
      required: ["suite_id"]
    }
  },

  // Test Cases
  {
    name: "get_cases",
    description: "Get test cases for a project",
    inputSchema: {
      type: "object",
      properties: {
        project_id: {
          type: "integer",
          description: "The ID of the project"
        },
        suite_id: {
          type: "integer",
          description: "The ID of the test suite (optional)"
        },
        section_id: {
          type: "integer",
          description: "The ID of the section (optional)"
        },
        limit: {
          type: "integer",
          description: "The maximum number of test cases to return"
        },
        offset: {
          type: "integer",
          description: "The offset for pagination"
        }
      },
      required: ["project_id"]
    }
  },
  {
    name: "get_case",
    description: "Get a specific test case by ID",
    inputSchema: {
      type: "object",
      properties: {
        case_id: {
          type: "integer",
          description: "The ID of the test case"
        }
      },
      required: ["case_id"]
    }
  },
  {
    name: "add_case",
    description: "Create a new test case",
    inputSchema: {
      type: "object",
      properties: {
        section_id: {
          type: "integer",
          description: "The ID of the section to add the test case to"
        },
        title: {
          type: "string",
          description: "The title of the test case"
        },
        type_id: {
          type: "integer",
          description: "The ID of the test case type"
        },
        priority_id: {
          type: "integer",
          description: "The ID of the priority"
        },
        estimate: {
          type: "string",
          description: "The time estimate for the test case"
        },
        milestone_id: {
          type: "integer",
          description: "The ID of the milestone"
        },
        refs: {
          type: "string",
          description: "References/links for the test case"
        },
        template_id: {
          type: "integer",
          description: "The ID of the template"
        },
        custom_preconds: {
          type: "string",
          description: "Preconditions for the test case"
        },
        custom_steps: {
          type: "string",
          description: "Test steps"
        },
        custom_expected: {
          type: "string",
          description: "Expected results"
        }
      },
      required: ["section_id", "title"]
    }
  },
  {
    name: "update_case",
    description: "Update an existing test case",
    inputSchema: {
      type: "object",
      properties: {
        case_id: {
          type: "integer",
          description: "The ID of the test case"
        },
        title: {
          type: "string",
          description: "The title of the test case"
        },
        type_id: {
          type: "integer",
          description: "The ID of the test case type"
        },
        priority_id: {
          type: "integer",
          description: "The ID of the priority"
        },
        estimate: {
          type: "string",
          description: "The time estimate for the test case"
        },
        milestone_id: {
          type: "integer",
          description: "The ID of the milestone"
        },
        refs: {
          type: "string",
          description: "References/links for the test case"
        },
        template_id: {
          type: "integer",
          description: "The ID of the template"
        },
        custom_preconds: {
          type: "string",
          description: "Preconditions for the test case"
        },
        custom_steps: {
          type: "string",
          description: "Test steps"
        },
        custom_expected: {
          type: "string",
          description: "Expected results"
        }
      },
      required: ["case_id"]
    }
  },
  {
    name: "delete_case",
    description: "Delete a test case",
    inputSchema: {
      type: "object",
      properties: {
        case_id: {
          type: "integer",
          description: "The ID of the test case to delete"
        }
      },
      required: ["case_id"]
    }
  },

  // Test Runs
  {
    name: "get_runs",
    description: "Get test runs for a project",
    inputSchema: {
      type: "object",
      properties: {
        project_id: {
          type: "integer",
          description: "The ID of the project"
        },
        is_completed: {
          type: "boolean",
          description: "Filter by completed runs"
        },
        limit: {
          type: "integer",
          description: "The maximum number of test runs to return"
        },
        offset: {
          type: "integer",
          description: "The offset for pagination"
        },
        milestone_id: {
          type: "integer",
          description: "Filter by milestone ID"
        },
        suite_id: {
          type: "integer",
          description: "Filter by suite ID"
        }
      },
      required: ["project_id"]
    }
  },
  {
    name: "get_run",
    description: "Get a specific test run by ID",
    inputSchema: {
      type: "object",
      properties: {
        run_id: {
          type: "integer",
          description: "The ID of the test run"
        }
      },
      required: ["run_id"]
    }
  },
  {
    name: "add_run",
    description: "Create a new test run",
    inputSchema: {
      type: "object",
      properties: {
        project_id: {
          type: "integer",
          description: "The ID of the project"
        },
        name: {
          type: "string",
          description: "The name of the test run"
        },
        description: {
          type: "string",
          description: "The description of the test run"
        },
        milestone_id: {
          type: "integer",
          description: "The ID of the milestone"
        },
        assignedto_id: {
          type: "integer",
          description: "The ID of the user to assign the test run to"
        },
        suite_id: {
          type: "integer",
          description: "The ID of the test suite"
        },
        include_all: {
          type: "boolean",
          description: "Whether to include all test cases"
        },
        case_ids: {
          type: "array",
          items: {
            type: "integer"
          },
          description: "Array of test case IDs to include (if include_all is false)"
        }
      },
      required: ["project_id", "name"]
    }
  },
  {
    name: "update_run",
    description: "Update an existing test run",
    inputSchema: {
      type: "object",
      properties: {
        run_id: {
          type: "integer",
          description: "The ID of the test run"
        },
        name: {
          type: "string",
          description: "The name of the test run"
        },
        description: {
          type: "string",
          description: "The description of the test run"
        },
        milestone_id: {
          type: "integer",
          description: "The ID of the milestone"
        },
        include_all: {
          type: "boolean",
          description: "Whether to include all test cases"
        },
        case_ids: {
          type: "array",
          items: {
            type: "integer"
          },
          description: "Array of test case IDs to include"
        }
      },
      required: ["run_id"]
    }
  },
  {
    name: "close_run",
    description: "Close a test run",
    inputSchema: {
      type: "object",
      properties: {
        run_id: {
          type: "integer",
          description: "The ID of the test run to close"
        }
      },
      required: ["run_id"]
    }
  },
  {
    name: "delete_run",
    description: "Delete a test run",
    inputSchema: {
      type: "object",
      properties: {
        run_id: {
          type: "integer",
          description: "The ID of the test run to delete"
        }
      },
      required: ["run_id"]
    }
  },

  // Test Results
  {
    name: "get_results",
    description: "Get test results for a test",
    inputSchema: {
      type: "object",
      properties: {
        test_id: {
          type: "integer",
          description: "The ID of the test"
        },
        limit: {
          type: "integer",
          description: "The maximum number of results to return"
        },
        offset: {
          type: "integer",
          description: "The offset for pagination"
        },
        status_id: {
          type: "array",
          items: {
            type: "integer"
          },
          description: "Filter by status IDs"
        }
      },
      required: ["test_id"]
    }
  },
  {
    name: "get_results_for_case",
    description: "Get test results for a test case in a test run",
    inputSchema: {
      type: "object",
      properties: {
        run_id: {
          type: "integer",
          description: "The ID of the test run"
        },
        case_id: {
          type: "integer",
          description: "The ID of the test case"
        },
        limit: {
          type: "integer",
          description: "The maximum number of results to return"
        },
        offset: {
          type: "integer",
          description: "The offset for pagination"
        },
        status_id: {
          type: "array",
          items: {
            type: "integer"
          },
          description: "Filter by status IDs"
        }
      },
      required: ["run_id", "case_id"]
    }
  },
  {
    name: "get_results_for_run",
    description: "Get test results for a test run",
    inputSchema: {
      type: "object",
      properties: {
        run_id: {
          type: "integer",
          description: "The ID of the test run"
        },
        limit: {
          type: "integer",
          description: "The maximum number of results to return"
        },
        offset: {
          type: "integer",
          description: "The offset for pagination"
        },
        status_id: {
          type: "array",
          items: {
            type: "integer"
          },
          description: "Filter by status IDs"
        }
      },
      required: ["run_id"]
    }
  },
  {
    name: "add_result",
    description: "Add a test result",
    inputSchema: {
      type: "object",
      properties: {
        test_id: {
          type: "integer",
          description: "The ID of the test"
        },
        status_id: {
          type: "integer",
          description: "The ID of the test status"
        },
        comment: {
          type: "string",
          description: "Comment for the result"
        },
        version: {
          type: "string",
          description: "Version information"
        },
        elapsed: {
          type: "string",
          description: "Time elapsed for the test"
        },
        defects: {
          type: "string",
          description: "Defects found"
        },
        assignedto_id: {
          type: "integer",
          description: "ID of the assigned user"
        }
      },
      required: ["test_id", "status_id"]
    }
  },
  {
    name: "add_result_for_case",
    description: "Add a test result for a test case",
    inputSchema: {
      type: "object",
      properties: {
        run_id: {
          type: "integer",
          description: "The ID of the test run"
        },
        case_id: {
          type: "integer",
          description: "The ID of the test case"
        },
        status_id: {
          type: "integer",
          description: "The ID of the test status"
        },
        comment: {
          type: "string",
          description: "Comment for the result"
        },
        version: {
          type: "string",
          description: "Version information"
        },
        elapsed: {
          type: "string",
          description: "Time elapsed for the test"
        },
        defects: {
          type: "string",
          description: "Defects found"
        },
        assignedto_id: {
          type: "integer",
          description: "ID of the assigned user"
        }
      },
      required: ["run_id", "case_id", "status_id"]
    }
  },
  {
    name: "add_results",
    description: "Add multiple test results",
    inputSchema: {
      type: "object",
      properties: {
        run_id: {
          type: "integer",
          description: "The ID of the test run"
        },
        results: {
          type: "array",
          items: {
            type: "object",
            properties: {
              test_id: {
                type: "integer",
                description: "The ID of the test"
              },
              status_id: {
                type: "integer",
                description: "The ID of the test status"
              },
              comment: {
                type: "string",
                description: "Comment for the result"
              },
              version: {
                type: "string",
                description: "Version information"
              },
              elapsed: {
                type: "string",
                description: "Time elapsed for the test"
              },
              defects: {
                type: "string",
                description: "Defects found"
              },
              assignedto_id: {
                type: "integer",
                description: "ID of the assigned user"
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
    description: "Add multiple test results for test cases",
    inputSchema: {
      type: "object",
      properties: {
        run_id: {
          type: "integer",
          description: "The ID of the test run"
        },
        results: {
          type: "array",
          items: {
            type: "object",
            properties: {
              case_id: {
                type: "integer",
                description: "The ID of the test case"
              },
              status_id: {
                type: "integer",
                description: "The ID of the test status"
              },
              comment: {
                type: "string",
                description: "Comment for the result"
              },
              version: {
                type: "string",
                description: "Version information"
              },
              elapsed: {
                type: "string",
                description: "Time elapsed for the test"
              },
              defects: {
                type: "string",
                description: "Defects found"
              },
              assignedto_id: {
                type: "integer",
                description: "ID of the assigned user"
              }
            },
            required: ["case_id", "status_id"]
          },
          description: "Array of test results for cases"
        }
      },
      required: ["run_id", "results"]
    }
  },

  // Test Plans
  {
    name: "get_plans",
    description: "Get test plans for a project",
    inputSchema: {
      type: "object",
      properties: {
        project_id: {
          type: "integer",
          description: "The ID of the project"
        },
        is_completed: {
          type: "boolean",
          description: "Filter by completed plans"
        },
        limit: {
          type: "integer",
          description: "The maximum number of test plans to return"
        },
        offset: {
          type: "integer",
          description: "The offset for pagination"
        },
        milestone_id: {
          type: "integer",
          description: "Filter by milestone ID"
        }
      },
      required: ["project_id"]
    }
  },
  {
    name: "get_plan",
    description: "Get a specific test plan by ID",
    inputSchema: {
      type: "object",
      properties: {
        plan_id: {
          type: "integer",
          description: "The ID of the test plan"
        }
      },
      required: ["plan_id"]
    }
  },
  {
    name: "add_plan",
    description: "Create a new test plan",
    inputSchema: {
      type: "object",
      properties: {
        project_id: {
          type: "integer",
          description: "The ID of the project"
        },
        name: {
          type: "string",
          description: "The name of the test plan"
        },
        description: {
          type: "string",
          description: "The description of the test plan"
        },
        milestone_id: {
          type: "integer",
          description: "The ID of the milestone"
        },
        entries: {
          type: "array",
          items: {
            type: "object",
            properties: {
              suite_id: {
                type: "integer",
                description: "The ID of the test suite"
              },
              name: {
                type: "string",
                description: "The name of the entry"
              },
              assignedto_id: {
                type: "integer",
                description: "The ID of the assigned user"
              },
              include_all: {
                type: "boolean",
                description: "Whether to include all test cases"
              },
              case_ids: {
                type: "array",
                items: {
                  type: "integer"
                },
                description: "Array of test case IDs to include"
              }
            },
            required: ["suite_id"]
          },
          description: "Array of test plan entries"
        }
      },
      required: ["project_id", "name"]
    }
  },
  {
    name: "update_plan",
    description: "Update an existing test plan",
    inputSchema: {
      type: "object",
      properties: {
        plan_id: {
          type: "integer",
          description: "The ID of the test plan"
        },
        name: {
          type: "string",
          description: "The name of the test plan"
        },
        description: {
          type: "string",
          description: "The description of the test plan"
        },
        milestone_id: {
          type: "integer",
          description: "The ID of the milestone"
        }
      },
      required: ["plan_id"]
    }
  },
  {
    name: "close_plan",
    description: "Close a test plan",
    inputSchema: {
      type: "object",
      properties: {
        plan_id: {
          type: "integer",
          description: "The ID of the test plan to close"
        }
      },
      required: ["plan_id"]
    }
  },
  {
    name: "delete_plan",
    description: "Delete a test plan",
    inputSchema: {
      type: "object",
      properties: {
        plan_id: {
          type: "integer",
          description: "The ID of the test plan to delete"
        }
      },
      required: ["plan_id"]
    }
  },
  {
    name: "add_plan_entry",
    description: "Add an entry to a test plan",
    inputSchema: {
      type: "object",
      properties: {
        plan_id: {
          type: "integer",
          description: "The ID of the test plan"
        },
        suite_id: {
          type: "integer",
          description: "The ID of the test suite"
        },
        name: {
          type: "string",
          description: "The name of the entry"
        },
        assignedto_id: {
          type: "integer",
          description: "The ID of the assigned user"
        },
        include_all: {
          type: "boolean",
          description: "Whether to include all test cases"
        },
        case_ids: {
          type: "array",
          items: {
            type: "integer"
          },
          description: "Array of test case IDs to include"
        },
        config_ids: {
          type: "array",
          items: {
            type: "integer"
          },
          description: "Array of configuration IDs"
        },
        runs: {
          type: "array",
          items: {
            type: "object",
            properties: {
              config_ids: {
                type: "array",
                items: {
                  type: "integer"
                },
                description: "Configuration IDs for this run"
              },
              include_all: {
                type: "boolean",
                description: "Whether to include all test cases"
              },
              case_ids: {
                type: "array",
                items: {
                  type: "integer"
                },
                description: "Test case IDs for this run"
              }
            }
          },
          description: "Array of test runs for the entry"
        }
      },
      required: ["plan_id", "suite_id"]
    }
  },
  {
    name: "update_plan_entry",
    description: "Update an entry in a test plan",
    inputSchema: {
      type: "object",
      properties: {
        plan_id: {
          type: "integer",
          description: "The ID of the test plan"
        },
        entry_id: {
          type: "string",
          description: "The ID of the plan entry"
        },
        name: {
          type: "string",
          description: "The name of the entry"
        },
        assignedto_id: {
          type: "integer",
          description: "The ID of the assigned user"
        },
        include_all: {
          type: "boolean",
          description: "Whether to include all test cases"
        },
        case_ids: {
          type: "array",
          items: {
            type: "integer"
          },
          description: "Array of test case IDs to include"
        }
      },
      required: ["plan_id", "entry_id"]
    }
  },
  {
    name: "delete_plan_entry",
    description: "Delete an entry from a test plan",
    inputSchema: {
      type: "object",
      properties: {
        plan_id: {
          type: "integer",
          description: "The ID of the test plan"
        },
        entry_id: {
          type: "string",
          description: "The ID of the plan entry to delete"
        }
      },
      required: ["plan_id", "entry_id"]
    }
  },

  // Sections
  {
    name: "get_sections",
    description: "Get sections for a project",
    inputSchema: {
      type: "object",
      properties: {
        project_id: {
          type: "integer",
          description: "The ID of the project"
        },
        suite_id: {
          type: "integer",
          description: "The ID of the test suite (optional)"
        }
      },
      required: ["project_id"]
    }
  },
  {
    name: "get_section",
    description: "Get a specific section by ID",
    inputSchema: {
      type: "object",
      properties: {
        section_id: {
          type: "integer",
          description: "The ID of the section"
        }
      },
      required: ["section_id"]
    }
  },
  {
    name: "add_section",
    description: "Create a new section",
    inputSchema: {
      type: "object",
      properties: {
        project_id: {
          type: "integer",
          description: "The ID of the project"
        },
        name: {
          type: "string",
          description: "The name of the section"
        },
        description: {
          type: "string",
          description: "The description of the section"
        },
        suite_id: {
          type: "integer",
          description: "The ID of the test suite"
        },
        parent_id: {
          type: "integer",
          description: "The ID of the parent section"
        }
      },
      required: ["project_id", "name"]
    }
  },
  {
    name: "update_section",
    description: "Update an existing section",
    inputSchema: {
      type: "object",
      properties: {
        section_id: {
          type: "integer",
          description: "The ID of the section"
        },
        name: {
          type: "string",
          description: "The name of the section"
        },
        description: {
          type: "string",
          description: "The description of the section"
        }
      },
      required: ["section_id"]
    }
  },
  {
    name: "delete_section",
    description: "Delete a section",
    inputSchema: {
      type: "object",
      properties: {
        section_id: {
          type: "integer",
          description: "The ID of the section to delete"
        }
      },
      required: ["section_id"]
    }
  },

  // Milestones
  {
    name: "get_milestones",
    description: "Get milestones for a project",
    inputSchema: {
      type: "object",
      properties: {
        project_id: {
          type: "integer",
          description: "The ID of the project"
        },
        is_completed: {
          type: "boolean",
          description: "Filter by completed milestones"
        },
        is_started: {
          type: "boolean",
          description: "Filter by started milestones"
        }
      },
      required: ["project_id"]
    }
  },
  {
    name: "get_milestone",
    description: "Get a specific milestone by ID",
    inputSchema: {
      type: "object",
      properties: {
        milestone_id: {
          type: "integer",
          description: "The ID of the milestone"
        }
      },
      required: ["milestone_id"]
    }
  },
  {
    name: "add_milestone",
    description: "Create a new milestone",
    inputSchema: {
      type: "object",
      properties: {
        project_id: {
          type: "integer",
          description: "The ID of the project"
        },
        name: {
          type: "string",
          description: "The name of the milestone"
        },
        description: {
          type: "string",
          description: "The description of the milestone"
        },
        due_on: {
          type: "integer",
          description: "The due date timestamp"
        },
        parent_id: {
          type: "integer",
          description: "The ID of the parent milestone"
        },
        start_on: {
          type: "integer",
          description: "The start date timestamp"
        }
      },
      required: ["project_id", "name"]
    }
  },
  {
    name: "update_milestone",
    description: "Update an existing milestone",
    inputSchema: {
      type: "object",
      properties: {
        milestone_id: {
          type: "integer",
          description: "The ID of the milestone"
        },
        name: {
          type: "string",
          description: "The name of the milestone"
        },
        description: {
          type: "string",
          description: "The description of the milestone"
        },
        due_on: {
          type: "integer",
          description: "The due date timestamp"
        },
        is_completed: {
          type: "boolean",
          description: "Whether the milestone is completed"
        },
        is_started: {
          type: "boolean",
          description: "Whether the milestone is started"
        },
        start_on: {
          type: "integer",
          description: "The start date timestamp"
        }
      },
      required: ["milestone_id"]
    }
  },
  {
    name: "delete_milestone",
    description: "Delete a milestone",
    inputSchema: {
      type: "object",
      properties: {
        milestone_id: {
          type: "integer",
          description: "The ID of the milestone to delete"
        }
      },
      required: ["milestone_id"]
    }
  },

  // Users
  {
    name: "get_user",
    description: "Get a user by ID",
    inputSchema: {
      type: "object",
      properties: {
        user_id: {
          type: "integer",
          description: "The ID of the user"
        }
      },
      required: ["user_id"]
    }
  },
  {
    name: "get_user_by_email",
    description: "Get a user by email",
    inputSchema: {
      type: "object",
      properties: {
        email: {
          type: "string",
          description: "The email of the user"
        }
      },
      required: ["email"]
    }
  },
  {
    name: "get_users",
    description: "Get users for a project",
    inputSchema: {
      type: "object",
      properties: {
        project_id: {
          type: "integer",
          description: "The ID of the project"
        }
      },
      required: ["project_id"]
    }
  },

  // Custom fields and configurations
  {
    name: "get_case_fields",
    description: "Get all case fields",
    inputSchema: { type: "object", properties: {} }
  },
  {
    name: "get_case_types",
    description: "Get all case types",
    inputSchema: { type: "object", properties: {} }
  },
  {
    name: "get_priorities",
    description: "Get all priorities",
    inputSchema: { type: "object", properties: {} }
  },
  {
    name: "get_result_fields",
    description: "Get all result fields",
    inputSchema: { type: "object", properties: {} }
  },
  {
    name: "get_statuses",
    description: "Get all statuses",
    inputSchema: { type: "object", properties: {} }
  },
  {
    name: "get_templates",
    description: "Get all templates for a project",
    inputSchema: {
      type: "object",
      properties: {
        project_id: {
          type: "integer",
          description: "The ID of the project"
        }
      },
      required: ["project_id"]
    }
  },

  // Reports
  {
    name: "get_reports",
    description: "Get all reports for a project",
    inputSchema: {
      type: "object",
      properties: {
        project_id: {
          type: "integer",
          description: "The ID of the project"
        }
      },
      required: ["project_id"]
    }
  },
  {
    name: "run_report",
    description: "Run a report by template ID",
    inputSchema: {
      type: "object",
      properties: {
        report_template_id: {
          type: "integer",
          description: "The ID of the report template"
        }
      },
      required: ["report_template_id"]
    }
  }
];
