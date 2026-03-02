import type { TransferFilter, JobFilter } from '@/types';

export const QK = {
  // Auth
  ME: ['me'] as const,

  // Transfers
  TRANSFERS_LIST: (f: TransferFilter) => ['transfers', 'list', f] as const,
  TRANSFER:       (id: string)        => ['transfers', id] as const,
  TRANSFER_OFFERS:(id: string)        => ['transfers', id, 'offers'] as const,
  TRANSFERS_MINE: ['transfers', 'mine'] as const,

  // Jobs
  JOBS_LIST: (f: JobFilter) => ['jobs', 'list', f] as const,
  JOB:       (id: string)   => ['jobs', id] as const,
  JOB_APPS:  (id: string)   => ['jobs', id, 'applications'] as const,
  JOBS_MINE:           ['jobs', 'mine'] as const,
  MY_APPLICATIONS:     ['jobs', 'applications', 'mine'] as const,
} as const;
