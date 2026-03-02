import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { transferApi } from '@/api/transferApi';
import { useUIStore } from '@/store/uiStore';
import { QK } from './queryKeys';
import type { CreateTransferRequest, CreateOfferRequest, TransferFilter } from '@/types';

export function useTransfers(filters: TransferFilter) {
  return useQuery({
    queryKey: QK.TRANSFERS_LIST(filters),
    queryFn: () => transferApi.getList(filters),
    keepPreviousData: true,
    staleTime: 1000 * 60 * 2,
  });
}

export function useTransfer(id: string) {
  return useQuery({
    queryKey: QK.TRANSFER(id),
    queryFn: () => transferApi.getById(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
}

export function useTransferOffers(id: string) {
  return useQuery({
    queryKey: QK.TRANSFER_OFFERS(id),
    queryFn: () => transferApi.getOffers(id),
    enabled: !!id,
  });
}

export function useMyTransfers() {
  return useQuery({
    queryKey: QK.TRANSFERS_MINE,
    queryFn: transferApi.getMine,
  });
}

export function useCreateTransfer() {
  const qc = useQueryClient();
  const { addToast } = useUIStore();

  return useMutation({
    mutationFn: (data: CreateTransferRequest) => transferApi.create(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['transfers'] });
      addToast('success', 'Đăng tin sang nhượng thành công!');
    },
    onError: () => addToast('error', 'Đăng tin thất bại'),
  });
}

export function useDeleteTransfer() {
  const qc = useQueryClient();
  const { addToast } = useUIStore();

  return useMutation({
    mutationFn: (id: string) => transferApi.remove(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['transfers'] });
      addToast('success', 'Đã xóa tin');
    },
    onError: () => addToast('error', 'Xóa tin thất bại'),
  });
}

export function useSendOffer() {
  const qc = useQueryClient();
  const { addToast } = useUIStore();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: CreateOfferRequest }) =>
      transferApi.sendOffer(id, data),
    onSuccess: (_, { id }) => {
      qc.invalidateQueries({ queryKey: QK.TRANSFER_OFFERS(id) });
      qc.invalidateQueries({ queryKey: QK.TRANSFER(id) });
      addToast('success', 'Đã gửi đề nghị thành công!');
    },
    onError: () => addToast('error', 'Gửi đề nghị thất bại'),
  });
}
