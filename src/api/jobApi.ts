import http from './http';
import type {
  Job,
  CreateJobRequest,
  JobApplication,
  ApplyJobRequest,
  JobFilter,
  PaginatedResponse,
} from '@/types';

export const jobApi = {
  getList: (params: JobFilter) =>
    http.get<PaginatedResponse<Job>>('/jobs', { params }).then((r) => r.data),

  getById: (id: string) =>
    http.get<Job>(`/jobs/${id}`).then((r) => r.data),

  getMine: () =>
    http.get<Job[]>('/jobs/mine').then((r) => r.data),

  create: (body: CreateJobRequest) =>
    http.post<Job>('/jobs', body).then((r) => r.data),

  update: (id: string, body: Partial<CreateJobRequest>) =>
    http.put<Job>(`/jobs/${id}`, body).then((r) => r.data),

  remove: (id: string) =>
    http.delete(`/jobs/${id}`).then((r) => r.data),

  // Applications
  getApplications: (id: string) =>
    http.get<JobApplication[]>(`/jobs/${id}/applications`).then((r) => r.data),

  apply: (id: string, body: ApplyJobRequest) =>
    http.post<JobApplication>(`/jobs/${id}/apply`, body).then((r) => r.data),

  getMyApplications: () =>
    http.get<JobApplication[]>('/jobs/applications/mine').then((r) => r.data),

  updateApplicationStatus: (jobId: string, appId: string, status: string) =>
    http.patch(`/jobs/${jobId}/applications/${appId}`, { status }).then((r) => r.data),
};
