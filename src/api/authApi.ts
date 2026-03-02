import http from './http';
import type {
  LoginRequest,
  LoginApiResponse,
  ProfileApiResponse,
  UpdateProfileRequest,
  User,
  ApiUserProfile,
  normalizeUser as NormalizeUser,
} from '@/types';
import { normalizeUser } from '@/types';

export const authApi = {
  /**
   * Đăng nhập — chỉ trả access_token + refresh_token
   * Sau đó cần gọi getProfile() để lấy thông tin user + roles
   */
  login: (body: LoginRequest) =>
    http.post<LoginApiResponse>('/auth/login', body).then((r) => r.data),

  /**
   * Lấy thông tin user + roles — response shape: { data: ApiUserProfile }
   * Tự động chuẩn hoá thành User
   */
  getProfile: () =>
    http
      .get<ProfileApiResponse>('/users/profile')
      .then((r) => normalizeUser(r.data.data)),

  /**
   * Cập nhật hồ sơ — response shape tuỳ backend, ta normalize lại
   */
  updateProfile: (body: UpdateProfileRequest) =>
    http
      .put<ProfileApiResponse>('/users/profile', body)
      .then((r) => normalizeUser(r.data.data)),

  /**
   * Đăng ký — trả token giống login
   */
  register: (body: {
    username: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }) =>
    http.post<LoginApiResponse>('/auth/register', body).then((r) => r.data),

  /**
   * Refresh token
   */
  refreshToken: (refreshToken: string) =>
    http
      .post<LoginApiResponse>('/auth/refresh', { refresh_token: refreshToken })
      .then((r) => r.data),
};
