import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type Theme = 'dark' | 'light';

interface Toast {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

interface UIState {
  toasts: Toast[];
  mobileMenuOpen: boolean;
  theme: Theme;

  addToast: (type: Toast['type'], message: string) => void;
  removeToast: (id: string) => void;
  setMobileMenuOpen: (v: boolean) => void;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

/** Apply theme class lên <html> và lưu vào localStorage */
function applyTheme(theme: Theme) {
  const html = document.documentElement;
  html.classList.remove('dark', 'light');
  html.classList.add(theme);
  html.setAttribute('data-theme', theme);
}

export const useUIStore = create<UIState>()(
  persist(
    (set, get) => ({
      toasts: [],
      mobileMenuOpen: false,
      theme: 'dark',

      addToast: (type, message) => {
        const id = Math.random().toString(36).slice(2);
        set((s) => ({ toasts: [...s.toasts, { id, type, message }] }));
        setTimeout(() => {
          set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) }));
        }, 3500);
      },

      removeToast: (id) =>
        set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),

      setMobileMenuOpen: (v) => set({ mobileMenuOpen: v }),

      setTheme: (theme) => {
        applyTheme(theme);
        set({ theme });
      },

      toggleTheme: () => {
        const next: Theme = get().theme === 'dark' ? 'light' : 'dark';
        applyTheme(next);
        set({ theme: next });
      },
    }),
    {
      name: 'ui-store',
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ theme: s.theme }),
      // Khi hydrate từ localStorage, apply theme ngay lập tức
      onRehydrateStorage: () => (state) => {
        if (state) applyTheme(state.theme);
      },
    }
  )
);

/** Gọi 1 lần ở main.tsx trước khi React render để tránh FOUC */
export function initTheme() {
  try {
    const raw = localStorage.getItem('ui-store');
    const theme: Theme = raw ? (JSON.parse(raw)?.state?.theme ?? 'dark') : 'dark';
    applyTheme(theme);
  } catch {
    applyTheme('dark');
  }
}
