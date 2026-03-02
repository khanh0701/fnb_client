import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { jobApi } from '@/api/jobApi';
import { useUIStore } from '@/store/uiStore';
import { QK } from './queryKeys';
import type { CreateJobRequest, ApplyJobRequest, JobFilter } from '@/types';

export function useJobs(filters: JobFilter) {
  return useQuery({
    queryKey: QK.JOBS_LIST(filters),
    queryFn: () => jobApi.getList(filters),
    keepPreviousData: true,
    staleTime: 1000 * 60 * 2,
  });
}

export function useJob(id: string) {
  return useQuery({
    queryKey: QK.JOB(id),
    queryFn: () => jobApi.getById(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
}

export function useJobApplications(id: string) {
  return useQuery({
    queryKey: QK.JOB_APPS(id),
    queryFn: () => jobApi.getApplications(id),
    enabled: !!id,
  });
}

export function useMyJobs() {
  return useQuery({
    queryKey: QK.JOBS_MINE,
    queryFn: jobApi.getMine,
  });
}

export function useMyApplications() {
  return useQuery({
    queryKey: QK.MY_APPLICATIONS,
    queryFn: jobApi.getMyApplications,
  });
}

export function useCreateJob() {
  const qc = useQueryClient();
  const { addToast } = useUIStore();

  return useMutation({
    mutationFn: (data: CreateJobRequest) => jobApi.create(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['jobs'] });
      addToast('success', 'Đăng tin tuyển dụng thành công!');
    },
    onError: () => addToast('error', 'Đăng tin thất bại'),
  });
}

export function useApplyJob() {
  const qc = useQueryClient();
  const { addToast } = useUIStore();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: ApplyJobRequest }) =>
      jobApi.apply(id, data),
    onSuccess: (_, { id }) => {
      qc.invalidateQueries({ queryKey: QK.JOB_APPS(id) });
      qc.invalidateQueries({ queryKey: QK.MY_APPLICATIONS });
      addToast('success', 'Nộp hồ sơ thành công!');
    },
    onError: () => addToast('error', 'Nộp hồ sơ thất bại'),
  });
}

export function useDeleteJob() {
  const qc = useQueryClient();
  const { addToast } = useUIStore();

  return useMutation({
    mutationFn: (id: string) => jobApi.remove(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['jobs'] });
      addToast('success', 'Đã xóa tin tuyển dụng');
    },
    onError: () => addToast('error', 'Xóa tin thất bại'),
  });
}
