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
  async getProjects(isCompleted?: boolean, limit?: number, offset?: number): Promise<any> {
    let endpoint = 'get_projects';
    const params: string[] = [];
    
    if (isCompleted !== undefined) {
      params.push(`is_completed=${isCompleted ? 1 : 0}`);
    }
    if (limit !== undefined) {
      params.push(`limit=${limit}`);
    }
    if (offset !== undefined) {
      params.push(`offset=${offset}`);
    }
    
    if (params.length > 0) {
      endpoint += '&' + params.join('&');
    }
    
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

  async deleteSuite(suiteId: number, soft?: boolean): Promise<any> {
    let endpoint = `delete_suite/${suiteId}`;
    if (soft !== undefined) {
      endpoint += `&soft=${soft ? 1 : 0}`;
    }
    return this.request('POST', endpoint);
  }

  // Test Cases
  async getCases(projectId: number, options?: { 
    suite_id?: number; 
    section_id?: number; 
    created_after?: number;
    created_before?: number;
    created_by?: number[];
    filter?: string;
    limit?: number; 
    milestone_id?: number[];
    offset?: number;
    priority_id?: number[];
    refs?: string;
    template_id?: number[];
    type_id?: number[];
    updated_after?: number;
    updated_before?: number;
    updated_by?: number[];
    label_id?: number[];
  }): Promise<any> {
    let endpoint = `get_cases/${projectId}`;
    const params = new URLSearchParams();

    if (options?.suite_id) params.append('suite_id', options.suite_id.toString());
    if (options?.section_id) params.append('section_id', options.section_id.toString());
    if (options?.created_after) params.append('created_after', options.created_after.toString());
    if (options?.created_before) params.append('created_before', options.created_before.toString());
    if (options?.created_by) params.append('created_by', options.created_by.join(','));
    if (options?.filter) params.append('filter', options.filter);
    if (options?.limit) params.append('limit', options.limit.toString());
    if (options?.milestone_id) params.append('milestone_id', options.milestone_id.join(','));
    if (options?.offset) params.append('offset', options.offset.toString());
    if (options?.priority_id) params.append('priority_id', options.priority_id.join(','));
    if (options?.refs) params.append('refs', options.refs);
    if (options?.template_id) params.append('template_id', options.template_id.join(','));
    if (options?.type_id) params.append('type_id', options.type_id.join(','));
    if (options?.updated_after) params.append('updated_after', options.updated_after.toString());
    if (options?.updated_before) params.append('updated_before', options.updated_before.toString());
    if (options?.updated_by) params.append('updated_by', options.updated_by.join(','));
    if (options?.label_id) params.append('label_id', options.label_id.join(','));

    if (params.toString()) {
      endpoint += `&${params.toString()}`;
    }

    return this.request('GET', endpoint);
  }

  async getCase(caseId: number): Promise<any> {
    return this.request('GET', `get_case/${caseId}`);
  }

  async getHistoryForCase(caseId: number, limit?: number, offset?: number): Promise<any> {
    let endpoint = `get_history_for_case/${caseId}`;
    const params = new URLSearchParams();

    if (limit) params.append('limit', limit.toString());
    if (offset) params.append('offset', offset.toString());

    if (params.toString()) {
      endpoint += `&${params.toString()}`;
    }

    return this.request('GET', endpoint);
  }

  async addCase(sectionId: number, testCase: any): Promise<any> {
    return this.request('POST', `add_case/${sectionId}`, testCase);
  }

  async updateCase(caseId: number, testCase: any): Promise<any> {
    return this.request('POST', `update_case/${caseId}`, testCase);
  }

  async deleteCase(caseId: number, soft?: boolean): Promise<any> {
    let endpoint = `delete_case/${caseId}`;
    if (soft !== undefined) {
      endpoint += `&soft=${soft ? 1 : 0}`;
    }
    return this.request('POST', endpoint);
  }

  async copyCasesToSection(sectionId: number, caseIds: number[]): Promise<any> {
    return this.request('POST', `copy_cases_to_section/${sectionId}`, { case_ids: caseIds });
  }

  async updateCases(suiteId: number, data: any): Promise<any> {
    return this.request('POST', `update_cases/${suiteId}`, data);
  }

  async moveCasesToSection(sectionId: number, suiteId: number, caseIds: number[]): Promise<any> {
    return this.request('POST', `move_cases_to_section/${sectionId}`, { 
      suite_id: suiteId, 
      case_ids: caseIds 
    });
  }

  async deleteCases(projectId: number, caseIds: number[], suiteId?: number, soft?: boolean): Promise<any> {
    let endpoint = `delete_cases/${projectId}`;
    const params = new URLSearchParams();
    
    if (suiteId) params.append('suite_id', suiteId.toString());
    if (soft !== undefined) params.append('soft', soft ? '1' : '0');
    
    if (params.toString()) {
      endpoint += `&${params.toString()}`;
    }
    
    return this.request('POST', endpoint, { case_ids: caseIds });
  }

  // Test Runs
  async getRuns(projectId: number, options?: { 
    created_after?: number;
    created_before?: number;
    created_by?: number[];
    is_completed?: boolean; 
    limit?: number; 
    offset?: number; 
    milestone_id?: number[];
    refs_filter?: string;
    suite_id?: number[];
  }): Promise<any> {
    let endpoint = `get_runs/${projectId}`;
    const params = new URLSearchParams();

    if (options?.created_after) params.append('created_after', options.created_after.toString());
    if (options?.created_before) params.append('created_before', options.created_before.toString());
    if (options?.created_by) params.append('created_by', options.created_by.join(','));
    if (options?.is_completed !== undefined) params.append('is_completed', options.is_completed ? '1' : '0');
    if (options?.limit) params.append('limit', options.limit.toString());
    if (options?.offset) params.append('offset', options.offset.toString());
    if (options?.milestone_id) params.append('milestone_id', options.milestone_id.join(','));
    if (options?.refs_filter) params.append('refs_filter', options.refs_filter);
    if (options?.suite_id) params.append('suite_id', options.suite_id.join(','));

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

  async deleteRun(runId: number, soft?: boolean): Promise<any> {
    let endpoint = `delete_run/${runId}`;
    if (soft !== undefined) {
      endpoint += `&soft=${soft ? 1 : 0}`;
    }
    return this.request('POST', endpoint, {});
  }

  // Test Results
  async getResults(testId: number, options?: { 
    limit?: number; 
    offset?: number; 
    defects_filter?: string; 
    status_id?: number[] 
  }): Promise<any> {
    let endpoint = `get_results/${testId}`;
    const params = new URLSearchParams();

    if (options?.limit) params.append('limit', options.limit.toString());
    if (options?.offset) params.append('offset', options.offset.toString());
    if (options?.defects_filter) params.append('defects_filter', options.defects_filter);
    if (options?.status_id) params.append('status_id', options.status_id.join(','));

    if (params.toString()) {
      endpoint += `&${params.toString()}`;
    }

    return this.request('GET', endpoint);
  }

  async getResultsForCase(runId: number, caseId: number, options?: { 
    defects_filter?: string; 
    limit?: number; 
    offset?: number; 
    status_id?: number[] 
  }): Promise<any> {
    let endpoint = `get_results_for_case/${runId}/${caseId}`;
    const params = new URLSearchParams();

    if (options?.defects_filter) params.append('defects_filter', options.defects_filter);
    if (options?.limit) params.append('limit', options.limit.toString());
    if (options?.offset) params.append('offset', options.offset.toString());
    if (options?.status_id) params.append('status_id', options.status_id.join(','));

    if (params.toString()) {
      endpoint += `&${params.toString()}`;
    }

    return this.request('GET', endpoint);
  }

  async getResultsForRun(runId: number, options?: { 
    created_after?: number; 
    created_before?: number; 
    created_by?: number[]; 
    defects_filter?: string; 
    limit?: number; 
    offset?: number; 
    status_id?: number[] 
  }): Promise<any> {
    let endpoint = `get_results_for_run/${runId}`;
    const params = new URLSearchParams();

    if (options?.created_after) params.append('created_after', options.created_after.toString());
    if (options?.created_before) params.append('created_before', options.created_before.toString());
    if (options?.created_by) params.append('created_by', options.created_by.join(','));
    if (options?.defects_filter) params.append('defects_filter', options.defects_filter);
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
  async getPlans(projectId: number, options?: { 
    created_after?: number; 
    created_before?: number; 
    created_by?: number[]; 
    is_completed?: boolean; 
    limit?: number; 
    offset?: number; 
    milestone_id?: number[] 
  }): Promise<any> {
    let endpoint = `get_plans/${projectId}`;
    const params = new URLSearchParams();

    if (options?.created_after) params.append('created_after', options.created_after.toString());
    if (options?.created_before) params.append('created_before', options.created_before.toString());
    if (options?.created_by) params.append('created_by', options.created_by.join(','));
    if (options?.is_completed !== undefined) params.append('is_completed', options.is_completed ? '1' : '0');
    if (options?.limit) params.append('limit', options.limit.toString());
    if (options?.offset) params.append('offset', options.offset.toString());
    if (options?.milestone_id) params.append('milestone_id', options.milestone_id.join(','));

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

  async addRunToPlanEntry(planId: number, entryId: string, run: any): Promise<any> {
    return this.request('POST', `add_run_to_plan_entry/${planId}/${entryId}`, run);
  }

  async updateRunInPlanEntry(runId: number, run: any): Promise<any> {
    return this.request('POST', `update_run_in_plan_entry/${runId}`, run);
  }

  async deleteRunFromPlanEntry(runId: number): Promise<any> {
    return this.request('POST', `delete_run_from_plan_entry/${runId}`);
  }

  // Sections
  async getSections(projectId: number, options?: { 
    suite_id?: number;
    limit?: number;
    offset?: number;
  }): Promise<any> {
    let endpoint = `get_sections/${projectId}`;
    const params = new URLSearchParams();
    
    if (options?.suite_id) params.append('suite_id', options.suite_id.toString());
    if (options?.limit) params.append('limit', options.limit.toString());
    if (options?.offset) params.append('offset', options.offset.toString());
    
    if (params.toString()) {
      endpoint += `&${params.toString()}`;
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

  async moveSection(sectionId: number, parentId?: number, afterId?: number): Promise<any> {
    const data: any = {};
    if (parentId !== undefined) data.parent_id = parentId;
    if (afterId !== undefined) data.after_id = afterId;
    return this.request('POST', `move_section/${sectionId}`, data);
  }

  async deleteSection(sectionId: number, soft?: boolean): Promise<any> {
    let endpoint = `delete_section/${sectionId}`;
    if (soft !== undefined) {
      endpoint += `&soft=${soft ? 1 : 0}`;
    }
    return this.request('POST', endpoint, {});
  }

  // Milestones
  async getMilestones(projectId: number, options?: { is_completed?: boolean; is_started?: boolean; limit?: number; offset?: number }): Promise<any> {
    let endpoint = `get_milestones/${projectId}`;
    const params = new URLSearchParams();

    if (options?.is_completed !== undefined) params.append('is_completed', options.is_completed ? '1' : '0');
    if (options?.is_started !== undefined) params.append('is_started', options.is_started ? '1' : '0');
    if (options?.limit !== undefined) params.append('limit', options.limit.toString());
    if (options?.offset !== undefined) params.append('offset', options.offset.toString());

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

  async addCaseField(fieldData: any): Promise<any> {
    return this.request('POST', 'add_case_field', fieldData);
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

  async getCrossProjectReports(): Promise<any> {
    return this.request('GET', 'get_cross_project_reports');
  }

  async runCrossProjectReport(reportTemplateId: number): Promise<any> {
    return this.request('GET', `run_cross_project_report/${reportTemplateId}`);
  }

  // Attachments
  async addAttachmentToCase(caseId: number, attachment: any): Promise<any> {
    // Note: attachment uploads require multipart/form-data and special handling
    // This is a simplified implementation - full implementation would need FormData handling
    return this.request('POST', `add_attachment_to_case/${caseId}`, attachment);
  }

  async addAttachmentToPlan(planId: number, attachment: any): Promise<any> {
    return this.request('POST', `add_attachment_to_plan/${planId}`, attachment);
  }

  async addAttachmentToPlanEntry(planId: number, entryId: string, attachment: any): Promise<any> {
    return this.request('POST', `add_attachment_to_plan_entry/${planId}/${entryId}`, attachment);
  }

  async addAttachmentToResult(resultId: number, attachment: any): Promise<any> {
    return this.request('POST', `add_attachment_to_result/${resultId}`, attachment);
  }

  async addAttachmentToRun(runId: number, attachment: any): Promise<any> {
    return this.request('POST', `add_attachment_to_run/${runId}`, attachment);
  }

  async getAttachmentsForCase(caseId: number, limit?: number, offset?: number): Promise<any> {
    let endpoint = `get_attachments_for_case/${caseId}`;
    const params = new URLSearchParams();

    if (limit) params.append('limit', limit.toString());
    if (offset) params.append('offset', offset.toString());

    if (params.toString()) {
      endpoint += `&${params.toString()}`;
    }

    return this.request('GET', endpoint);
  }

  async getAttachmentsForPlan(planId: number, limit?: number, offset?: number): Promise<any> {
    let endpoint = `get_attachments_for_plan/${planId}`;
    const params = new URLSearchParams();

    if (limit) params.append('limit', limit.toString());
    if (offset) params.append('offset', offset.toString());

    if (params.toString()) {
      endpoint += `&${params.toString()}`;
    }

    return this.request('GET', endpoint);
  }

  async getAttachmentsForPlanEntry(planId: number, entryId: string): Promise<any> {
    return this.request('GET', `get_attachments_for_plan_entry/${planId}/${entryId}`);
  }

  async getAttachmentsForRun(runId: number, limit?: number, offset?: number): Promise<any> {
    let endpoint = `get_attachments_for_run/${runId}`;
    const params = new URLSearchParams();

    if (limit) params.append('limit', limit.toString());
    if (offset) params.append('offset', offset.toString());

    if (params.toString()) {
      endpoint += `&${params.toString()}`;
    }

    return this.request('GET', endpoint);
  }

  async getAttachmentsForTest(testId: number): Promise<any> {
    return this.request('GET', `get_attachments_for_test/${testId}`);
  }

  async getAttachment(attachmentId: string): Promise<any> {
    return this.request('GET', `get_attachment/${attachmentId}`);
  }

  async deleteAttachment(attachmentId: string): Promise<any> {
    return this.request('POST', `delete_attachment/${attachmentId}`);
  }

  // BDD (Behavior Driven Development)
  async getBdd(caseId: number): Promise<any> {
    return this.request('GET', `get_bdd/${caseId}`);
  }

  async addBdd(projectId: number, fileContent: string): Promise<any> {
    return this.request('POST', `add_bdd/${projectId}`, { file_content: fileContent });
  }

  // Configurations API
  async getConfigs(projectId: number): Promise<any> {
    return this.request('GET', `get_configs/${projectId}`);
  }

  async addConfigGroup(projectId: number, name: string): Promise<any> {
    return this.request('POST', `add_config_group/${projectId}`, { name });
  }

  async addConfig(configGroupId: number, name: string): Promise<any> {
    return this.request('POST', `add_config/${configGroupId}`, { name });
  }

  async updateConfigGroup(configGroupId: number, name?: string): Promise<any> {
    const data: any = {};
    if (name) data.name = name;
    return this.request('POST', `update_config_group/${configGroupId}`, data);
  }

  async updateConfig(configId: number, name?: string): Promise<any> {
    const data: any = {};
    if (name) data.name = name;
    return this.request('POST', `update_config/${configId}`, data);
  }

  async deleteConfigGroup(configGroupId: number): Promise<any> {
    return this.request('POST', `delete_config_group/${configGroupId}`, {});
  }

  async deleteConfig(configId: number): Promise<any> {
    return this.request('POST', `delete_config/${configId}`, {});
  }

  // Tests API
  async getTest(testId: number, withData?: string): Promise<any> {
    let endpoint = `get_test/${testId}`;
    const params: string[] = [];
    
    if (withData) {
      params.push(`with_data=${withData}`);
    }
    
    if (params.length > 0) {
      endpoint += '&' + params.join('&');
    }
    
    return this.request('GET', endpoint);
  }

  async getTests(runId: number, options: {
    statusId?: string;
    limit?: number;
    offset?: number;
    labelId?: string;
  } = {}): Promise<any> {
    let endpoint = `get_tests/${runId}`;
    const params: string[] = [];
    
    if (options.statusId) params.push(`status_id=${options.statusId}`);
    if (options.limit) params.push(`limit=${options.limit}`);
    if (options.offset) params.push(`offset=${options.offset}`);
    if (options.labelId) params.push(`label_id=${options.labelId}`);
    
    if (params.length > 0) {
      endpoint += '&' + params.join('&');
    }
    
    return this.request('GET', endpoint);
  }

  async updateTest(testId: number, labels: (number | string)[]): Promise<any> {
    return this.request('POST', `update_test/${testId}`, { labels });
  }

  async updateTests(testIds: number[], labels: (number | string)[]): Promise<any> {
    return this.request('POST', `update_tests`, { test_ids: testIds, labels });
  }

  // Labels API
  async getLabel(labelId: number): Promise<any> {
    return this.request('GET', `get_label/${labelId}`);
  }

  async getLabels(projectId: number, options: {
    offset?: number;
    limit?: number;
  } = {}): Promise<any> {
    let endpoint = `get_labels/${projectId}`;
    const params: string[] = [];
    
    if (options.offset) params.push(`offset=${options.offset}`);
    if (options.limit) params.push(`limit=${options.limit}`);
    
    if (params.length > 0) {
      endpoint += '&' + params.join('&');
    }
    
    return this.request('GET', endpoint);
  }

  async updateLabel(labelId: number, title: string): Promise<any> {
    return this.request('POST', `update_label/${labelId}`, { title });
  }

  // Shared Steps API
  async getSharedStep(sharedStepId: number): Promise<any> {
    return this.request('GET', `get_shared_step/${sharedStepId}`);
  }

  async getSharedStepHistory(sharedStepId: number): Promise<any> {
    return this.request('GET', `get_shared_step_history/${sharedStepId}`);
  }

  async getSharedSteps(projectId: number, options: {
    created_after?: number;
    created_before?: number;
    created_by?: number[];
    limit?: number;
    offset?: number;
    updated_after?: number;
    updated_before?: number;
    refs?: string;
  } = {}): Promise<any> {
    let endpoint = `get_shared_steps/${projectId}`;
    const params: string[] = [];
    
    if (options.created_after) params.push(`created_after=${options.created_after}`);
    if (options.created_before) params.push(`created_before=${options.created_before}`);
    if (options.created_by) params.push(`created_by=${options.created_by.join(',')}`);
    if (options.limit) params.push(`limit=${options.limit}`);
    if (options.offset) params.push(`offset=${options.offset}`);
    if (options.updated_after) params.push(`updated_after=${options.updated_after}`);
    if (options.updated_before) params.push(`updated_before=${options.updated_before}`);
    if (options.refs) params.push(`refs=${options.refs}`);
    
    if (params.length > 0) {
      endpoint += '&' + params.join('&');
    }
    
    return this.request('GET', endpoint);
  }

  async addSharedStep(projectId: number, title: string, customStepsSeparated?: Array<{
    content?: string;
    additional_info?: string;
    expected?: string;
    refs?: string;
  }>): Promise<any> {
    const data: any = { title };
    if (customStepsSeparated) data.custom_steps_separated = customStepsSeparated;
    return this.request('POST', `add_shared_step/${projectId}`, data);
  }

  async updateSharedStep(sharedStepId: number, title?: string, customStepsSeparated?: Array<{
    content?: string;
    additional_info?: string;
    expected?: string;
    refs?: string;
  }>): Promise<any> {
    const data: any = {};
    if (title) data.title = title;
    if (customStepsSeparated) data.custom_steps_separated = customStepsSeparated;
    return this.request('POST', `update_shared_step/${sharedStepId}`, data);
  }

  async deleteSharedStep(sharedStepId: number, keepInCases: boolean = true): Promise<any> {
    return this.request('POST', `delete_shared_step/${sharedStepId}`, { keep_in_cases: keepInCases ? 1 : 0 });
  }

  // Datasets API
  async getDataset(datasetId: number): Promise<any> {
    return this.request('GET', `get_dataset/${datasetId}`);
  }

  async getDatasets(projectId: number): Promise<any> {
    return this.request('GET', `get_datasets/${projectId}`);
  }

  async addDataset(projectId: number, name: string, variables?: Record<string, string>): Promise<any> {
    const data: any = { name };
    if (variables) {
      // Convert variables object to the format expected by TestRail API
      Object.assign(data, variables);
    }
    return this.request('POST', `add_dataset/${projectId}`, data);
  }

  async updateDataset(datasetId: number, name?: string, variables?: Record<string, string>): Promise<any> {
    const data: any = {};
    if (name) data.name = name;
    if (variables) {
      // Convert variables object to the format expected by TestRail API
      Object.assign(data, variables);
    }
    return this.request('POST', `update_dataset/${datasetId}`, data);
  }

  async deleteDataset(datasetId: number): Promise<any> {
    return this.request('POST', `delete_dataset/${datasetId}`, {});
  }

  // Variables API
  async getVariables(projectId: number): Promise<any> {
    return this.request('GET', `get_variables/${projectId}`);
  }

  async addVariable(projectId: number, name: string): Promise<any> {
    return this.request('POST', `add_variable/${projectId}`, { name });
  }

  async updateVariable(variableId: number, name: string): Promise<any> {
    return this.request('POST', `update_variable/${variableId}`, { name });
  }

  async deleteVariable(variableId: number): Promise<any> {
    return this.request('POST', `delete_variable/${variableId}`, {});
  }

  // Groups API
  async getGroup(groupId: number): Promise<any> {
    return this.request('GET', `get_group/${groupId}`);
  }

  async getGroups(): Promise<any> {
    return this.request('GET', 'get_groups');
  }

  async addGroup(name: string, userIds: number[]): Promise<any> {
    return this.request('POST', 'add_group', { name, user_ids: userIds });
  }

  async updateGroup(groupId: number, name?: string, userIds?: number[]): Promise<any> {
    const data: any = {};
    if (name) data.name = name;
    if (userIds) data.user_ids = userIds;
    return this.request('POST', `update_group/${groupId}`, data);
  }

  async deleteGroup(groupId: number): Promise<any> {
    return this.request('POST', `delete_group/${groupId}`, {});
  }

  // Roles
  async getRoles(): Promise<any> {
    return this.request('GET', 'get_roles');
  }
}