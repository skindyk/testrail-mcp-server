import axios, { AxiosInstance, AxiosResponse } from 'axios';
import type { TestRailCredentials } from './config.js';

export class TestRailClient {
  private client: AxiosInstance;

  constructor(credentials: TestRailCredentials) {
    this.client = axios.create({
      baseURL: credentials.url.endsWith('/') ? credentials.url : credentials.url + '/',
      auth: {
        username: credentials.username,
        password: credentials.apiKey || credentials.password,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  private async request<T>(method: string, endpoint: string, data?: any): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.client.request({
        method,
        url: `index.php?/api/v2/${endpoint}`,
        data,
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`TestRail API Error: ${error.response?.status} ${error.response?.statusText} - ${JSON.stringify(error.response?.data)}`);
      }
      throw error;
    }
  }

  // Projects
  async getProjects(isCompleted?: boolean): Promise<any> {
    const endpoint = isCompleted !== undefined ? `get_projects&is_completed=${isCompleted ? 1 : 0}` : 'get_projects';
    return this.request('GET', endpoint);
  }

  async getProject(projectId: number): Promise<any> {
    return this.request('GET', `get_project/${projectId}`);
  }

  async addProject(project: any): Promise<any> {
    return this.request('POST', 'add_project', project);
  }

  async updateProject(projectId: number, project: any): Promise<any> {
    return this.request('POST', `update_project/${projectId}`, project);
  }

  async deleteProject(projectId: number): Promise<any> {
    return this.request('POST', `delete_project/${projectId}`);
  }

  // Test Suites
  async getSuites(projectId: number): Promise<any> {
    return this.request('GET', `get_suites/${projectId}`);
  }

  async getSuite(suiteId: number): Promise<any> {
    return this.request('GET', `get_suite/${suiteId}`);
  }

  async addSuite(projectId: number, suite: any): Promise<any> {
    return this.request('POST', `add_suite/${projectId}`, suite);
  }

  async updateSuite(suiteId: number, suite: any): Promise<any> {
    return this.request('POST', `update_suite/${suiteId}`, suite);
  }

  async deleteSuite(suiteId: number): Promise<any> {
    return this.request('POST', `delete_suite/${suiteId}`);
  }

  // Test Cases
  async getCases(projectId: number, options?: { suite_id?: number; section_id?: number; limit?: number; offset?: number }): Promise<any> {
    let endpoint = `get_cases/${projectId}`;
    const params = new URLSearchParams();

    if (options?.suite_id) params.append('suite_id', options.suite_id.toString());
    if (options?.section_id) params.append('section_id', options.section_id.toString());
    if (options?.limit) params.append('limit', options.limit.toString());
    if (options?.offset) params.append('offset', options.offset.toString());

    if (params.toString()) {
      endpoint += `&${params.toString()}`;
    }

    return this.request('GET', endpoint);
  }

  async getCase(caseId: number): Promise<any> {
    return this.request('GET', `get_case/${caseId}`);
  }

  async addCase(sectionId: number, testCase: any): Promise<any> {
    return this.request('POST', `add_case/${sectionId}`, testCase);
  }

  async updateCase(caseId: number, testCase: any): Promise<any> {
    return this.request('POST', `update_case/${caseId}`, testCase);
  }

  async deleteCase(caseId: number): Promise<any> {
    return this.request('POST', `delete_case/${caseId}`);
  }

  // Test Runs
  async getRuns(projectId: number, options?: { is_completed?: boolean; limit?: number; offset?: number; milestone_id?: number; suite_id?: number }): Promise<any> {
    let endpoint = `get_runs/${projectId}`;
    const params = new URLSearchParams();

    if (options?.is_completed !== undefined) params.append('is_completed', options.is_completed ? '1' : '0');
    if (options?.limit) params.append('limit', options.limit.toString());
    if (options?.offset) params.append('offset', options.offset.toString());
    if (options?.milestone_id) params.append('milestone_id', options.milestone_id.toString());
    if (options?.suite_id) params.append('suite_id', options.suite_id.toString());

    if (params.toString()) {
      endpoint += `&${params.toString()}`;
    }

    return this.request('GET', endpoint);
  }

  async getRun(runId: number): Promise<any> {
    return this.request('GET', `get_run/${runId}`);
  }

  async addRun(projectId: number, run: any): Promise<any> {
    return this.request('POST', `add_run/${projectId}`, run);
  }

  async updateRun(runId: number, run: any): Promise<any> {
    return this.request('POST', `update_run/${runId}`, run);
  }

  async closeRun(runId: number): Promise<any> {
    return this.request('POST', `close_run/${runId}`);
  }

  async deleteRun(runId: number): Promise<any> {
    return this.request('POST', `delete_run/${runId}`);
  }

  // Test Results
  async getResults(testId: number, options?: { limit?: number; offset?: number; status_id?: number[] }): Promise<any> {
    let endpoint = `get_results/${testId}`;
    const params = new URLSearchParams();

    if (options?.limit) params.append('limit', options.limit.toString());
    if (options?.offset) params.append('offset', options.offset.toString());
    if (options?.status_id) params.append('status_id', options.status_id.join(','));

    if (params.toString()) {
      endpoint += `&${params.toString()}`;
    }

    return this.request('GET', endpoint);
  }

  async getResultsForCase(runId: number, caseId: number, options?: { limit?: number; offset?: number; status_id?: number[] }): Promise<any> {
    let endpoint = `get_results_for_case/${runId}/${caseId}`;
    const params = new URLSearchParams();

    if (options?.limit) params.append('limit', options.limit.toString());
    if (options?.offset) params.append('offset', options.offset.toString());
    if (options?.status_id) params.append('status_id', options.status_id.join(','));

    if (params.toString()) {
      endpoint += `&${params.toString()}`;
    }

    return this.request('GET', endpoint);
  }

  async getResultsForRun(runId: number, options?: { limit?: number; offset?: number; status_id?: number[] }): Promise<any> {
    let endpoint = `get_results_for_run/${runId}`;
    const params = new URLSearchParams();

    if (options?.limit) params.append('limit', options.limit.toString());
    if (options?.offset) params.append('offset', options.offset.toString());
    if (options?.status_id) params.append('status_id', options.status_id.join(','));

    if (params.toString()) {
      endpoint += `&${params.toString()}`;
    }

    return this.request('GET', endpoint);
  }

  async addResult(testId: number, result: any): Promise<any> {
    return this.request('POST', `add_result/${testId}`, result);
  }

  async addResultForCase(runId: number, caseId: number, result: any): Promise<any> {
    return this.request('POST', `add_result_for_case/${runId}/${caseId}`, result);
  }

  async addResults(runId: number, results: any): Promise<any> {
    return this.request('POST', `add_results/${runId}`, results);
  }

  async addResultsForCases(runId: number, results: any): Promise<any> {
    return this.request('POST', `add_results_for_cases/${runId}`, results);
  }

  // Test Plans
  async getPlans(projectId: number, options?: { is_completed?: boolean; limit?: number; offset?: number; milestone_id?: number }): Promise<any> {
    let endpoint = `get_plans/${projectId}`;
    const params = new URLSearchParams();

    if (options?.is_completed !== undefined) params.append('is_completed', options.is_completed ? '1' : '0');
    if (options?.limit) params.append('limit', options.limit.toString());
    if (options?.offset) params.append('offset', options.offset.toString());
    if (options?.milestone_id) params.append('milestone_id', options.milestone_id.toString());

    if (params.toString()) {
      endpoint += `&${params.toString()}`;
    }

    return this.request('GET', endpoint);
  }

  async getPlan(planId: number): Promise<any> {
    return this.request('GET', `get_plan/${planId}`);
  }

  async addPlan(projectId: number, plan: any): Promise<any> {
    return this.request('POST', `add_plan/${projectId}`, plan);
  }

  async updatePlan(planId: number, plan: any): Promise<any> {
    return this.request('POST', `update_plan/${planId}`, plan);
  }

  async closePlan(planId: number): Promise<any> {
    return this.request('POST', `close_plan/${planId}`);
  }

  async deletePlan(planId: number): Promise<any> {
    return this.request('POST', `delete_plan/${planId}`);
  }

  async addPlanEntry(planId: number, entry: any): Promise<any> {
    return this.request('POST', `add_plan_entry/${planId}`, entry);
  }

  async updatePlanEntry(planId: number, entryId: string, entry: any): Promise<any> {
    return this.request('POST', `update_plan_entry/${planId}/${entryId}`, entry);
  }

  async deletePlanEntry(planId: number, entryId: string): Promise<any> {
    return this.request('POST', `delete_plan_entry/${planId}/${entryId}`);
  }

  // Sections
  async getSections(projectId: number, options?: { suite_id?: number }): Promise<any> {
    let endpoint = `get_sections/${projectId}`;
    if (options?.suite_id) {
      endpoint += `&suite_id=${options.suite_id}`;
    }
    return this.request('GET', endpoint);
  }

  async getSection(sectionId: number): Promise<any> {
    return this.request('GET', `get_section/${sectionId}`);
  }

  async addSection(projectId: number, section: any): Promise<any> {
    return this.request('POST', `add_section/${projectId}`, section);
  }

  async updateSection(sectionId: number, section: any): Promise<any> {
    return this.request('POST', `update_section/${sectionId}`, section);
  }

  async deleteSection(sectionId: number): Promise<any> {
    return this.request('POST', `delete_section/${sectionId}`);
  }

  // Milestones
  async getMilestones(projectId: number, options?: { is_completed?: boolean; is_started?: boolean }): Promise<any> {
    let endpoint = `get_milestones/${projectId}`;
    const params = new URLSearchParams();

    if (options?.is_completed !== undefined) params.append('is_completed', options.is_completed ? '1' : '0');
    if (options?.is_started !== undefined) params.append('is_started', options.is_started ? '1' : '0');

    if (params.toString()) {
      endpoint += `&${params.toString()}`;
    }

    return this.request('GET', endpoint);
  }

  async getMilestone(milestoneId: number): Promise<any> {
    return this.request('GET', `get_milestone/${milestoneId}`);
  }

  async addMilestone(projectId: number, milestone: any): Promise<any> {
    return this.request('POST', `add_milestone/${projectId}`, milestone);
  }

  async updateMilestone(milestoneId: number, milestone: any): Promise<any> {
    return this.request('POST', `update_milestone/${milestoneId}`, milestone);
  }

  async deleteMilestone(milestoneId: number): Promise<any> {
    return this.request('POST', `delete_milestone/${milestoneId}`);
  }

  // Users
  async getUser(userId: number): Promise<any> {
    return this.request('GET', `get_user/${userId}`);
  }

  async getUserByEmail(email: string): Promise<any> {
    return this.request('GET', `get_user_by_email&email=${encodeURIComponent(email)}`);
  }

  async getUsers(projectId?: number): Promise<any> {
    const endpoint = projectId ? `get_users/${projectId}` : 'get_users';
    return this.request('GET', endpoint);
  }

  // Configuration and Field Information
  async getCaseFields(): Promise<any> {
    return this.request('GET', 'get_case_fields');
  }

  async getCaseTypes(): Promise<any> {
    return this.request('GET', 'get_case_types');
  }

  async getPriorities(): Promise<any> {
    return this.request('GET', 'get_priorities');
  }

  async getResultFields(): Promise<any> {
    return this.request('GET', 'get_result_fields');
  }

  async getStatuses(): Promise<any> {
    return this.request('GET', 'get_statuses');
  }

  async getTemplates(projectId: number): Promise<any> {
    return this.request('GET', `get_templates/${projectId}`);
  }

  // Reports
  async getReports(projectId: number): Promise<any> {
    return this.request('GET', `get_reports/${projectId}`);
  }

  async runReport(reportTemplateId: number): Promise<any> {
    return this.request('GET', `run_report/${reportTemplateId}`);
  }
}