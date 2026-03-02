import http from './http';
import type {
  Transfer,
  CreateTransferRequest,
  TransferOffer,
  CreateOfferRequest,
  TransferFilter,
  PaginatedResponse,
} from '@/types';

export const transferApi = {
  getList: (params: TransferFilter) =>
    http.get<PaginatedResponse<Transfer>>('/transfers', { params }).then((r) => r.data),

  getById: (id: string) =>
    http.get<Transfer>(`/transfers/${id}`).then((r) => r.data),

  getMine: () =>
    http.get<Transfer[]>('/transfers/mine').then((r) => r.data),

  create: (body: CreateTransferRequest) =>
    http.post<Transfer>('/transfers', body).then((r) => r.data),

  update: (id: string, body: Partial<CreateTransferRequest>) =>
    http.put<Transfer>(`/transfers/${id}`, body).then((r) => r.data),

  remove: (id: string) =>
    http.delete(`/transfers/${id}`).then((r) => r.data),

  // Offers
  getOffers: (id: string) =>
    http.get<TransferOffer[]>(`/transfers/${id}/offers`).then((r) => r.data),

  sendOffer: (id: string, body: CreateOfferRequest) =>
    http.post<TransferOffer>(`/transfers/${id}/offers`, body).then((r) => r.data),

  respondOffer: (transferId: string, offerId: string, status: 'accepted' | 'rejected') =>
    http.patch<TransferOffer>(`/transfers/${transferId}/offers/${offerId}`, { status }).then((r) => r.data),
};
