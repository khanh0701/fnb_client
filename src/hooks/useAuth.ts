import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authApi } from '@/api/authApi';
import { useAuthStore } from '@/store/authStore';
import { useUIStore } from '@/store/uiStore';
import { QK } from './queryKeys';
import type { LoginRequest, UpdateProfileRequest } from '@/types';
import { useNavigate } from 'react-router-dom';

/**
 * LOGIN — 2 bước:
 * 1. POST /auth/login  → nhận access_token + refresh_token
 * 2. GET  /users/profile → nhận thông tin user + roles, chuẩn hoá thành User
 */
export function useLogin() {
  const { setTokens, setUser } = useAuthStore();
  const { addToast } = useUIStore();

  return useMutation({
    mutationFn: async (data: LoginRequest) => {
      // Bước 1: đăng nhập lấy tokens
      const tokens = await authApi.login(data);

      // Lưu tokens tạm vào store (để interceptor gắn vào header bước 2)
      setTokens(tokens.access_token, tokens.refresh_token);

      // Bước 2: lấy profile + roles
      const user = await authApi.getProfile();

      return { tokens, user };
    },
    onSuccess: ({ user }) => {
      setUser(user);
      addToast('success', `Chào mừng, ${user.fullName || user.username}!`);
    },
    onError: () => {
      // Nếu thất bại thì xoá token đã lưu tạm
      useAuthStore.getState().logout();
      addToast('error', 'Sai thông tin đăng nhập');
    },
  });
}

/**
 * REGISTER — gọi API đăng ký, sau đó tự đăng nhập để lấy profile
 */
export function useRegister() {
  const { setTokens, setUser } = useAuthStore();
  const { addToast } = useUIStore();

  return useMutation({
    mutationFn: async (data: {
      username: string;
      email: string;
      password: string;
      firstName: string;
      lastName: string;
    }) => {
      const tokens = await authApi.register(data);
      setTokens(tokens.access_token, tokens.refresh_token);
      const user = await authApi.getProfile();
      return { tokens, user };
    },
    onSuccess: ({ user }) => {
      setUser(user);
      addToast('success', 'Tạo tài khoản thành công!');
    },
    onError: () => addToast('error', 'Đăng ký thất bại. Vui lòng thử lại'),
  });
}

/**
 * GET PROFILE — refetch profile từ server (dùng khi app mount để sync)
 */
export function useProfile() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const updateUser = useAuthStore((s) => s.updateUser);

  return useQuery({
    queryKey: QK.ME,
    queryFn: authApi.getProfile,
    enabled: isAuthenticated,
    staleTime: 1000 * 60 * 10,
    onSuccess: updateUser,
  });
}

/**
 * UPDATE PROFILE
 */
export function useUpdateProfile() {
  const { updateUser } = useAuthStore();
  const { addToast } = useUIStore();
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateProfileRequest) => authApi.updateProfile(data),
    onSuccess: (user) => {
      updateUser(user);
      qc.setQueryData(QK.ME, user);
      addToast('success', 'Cập nhật hồ sơ thành công!');
    },
    onError: () => addToast('error', 'Cập nhật thất bại'),
  });
}

/**
 * LOGOUT
 */
export function useLogout() {
  const { logout } = useAuthStore();
  const { addToast } = useUIStore();
  const qc = useQueryClient();
  const navigate = useNavigate();

  return () => {
    logout();
    qc.clear();
    addToast('info', 'Đã đăng xuất');
    navigate('/login');
  };
}
