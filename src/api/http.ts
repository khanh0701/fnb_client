import axios, { type AxiosError } from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1';

export const http = axios.create({
  baseURL: BASE_URL,
  timeout: 15_000,
  headers: { 'Content-Type': 'application/json' },
});

// ─── Request: Attach access_token ─────────────────────────────────────────────
http.interceptors.request.use(
  (config) => {
    const raw = localStorage.getItem('auth-store');
    if (raw) {
      try {
        const state = JSON.parse(raw);
        const token = state?.state?.accessToken;
        if (token) config.headers.Authorization = `Bearer ${token}`;
      } catch {
        // silent
      }
    }
    return config;
  },
  (err) => Promise.reject(err)
);

// ─── Response: Handle 401 ──────────────────────────────────────────────────────
http.interceptors.response.use(
  (res) => res,
  async (err: AxiosError) => {
    if (err.response?.status === 401) {
      // Thử refresh token trước khi logout
      const raw = localStorage.getItem('auth-store');
      if (raw) {
        try {
          const state = JSON.parse(raw);
          const refreshToken = state?.state?.refreshToken;
          if (refreshToken && !err.config?.url?.includes('/auth/refresh')) {
            const { data } = await axios.post(`${BASE_URL}/auth/refresh`, {
              refresh_token: refreshToken,
            });
            // Lưu token mới vào store
            const newRaw = localStorage.getItem('auth-store');
            if (newRaw) {
              const parsed = JSON.parse(newRaw);
              parsed.state.accessToken = data.access_token;
              parsed.state.refreshToken = data.refresh_token;
              localStorage.setItem('auth-store', JSON.stringify(parsed));
            }
            // Retry request gốc với token mới
            if (err.config) {
              err.config.headers.Authorization = `Bearer ${data.access_token}`;
              return http(err.config);
            }
          }
        } catch {
          // Refresh thất bại → logout
        }
      }
      localStorage.removeItem('auth-store');
      if (!window.location.pathname.includes('/login')) {
        window.location.href = '/login';
      }
    }
    return Promise.reject(err);
  }
);

export default http;
