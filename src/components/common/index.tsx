export { Button } from '@/components/ui/button';
export { Input } from '@/components/ui/input';
export { Textarea, Switch, Separator } from '@/components/ui/misc';
export { Badge } from '@/components/ui/badge';
export { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from '@/components/ui/card';
export { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
export { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';

import { useUIStore } from '@/store/uiStore';
import { X, CheckCircle2, AlertCircle, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import React from 'react';

export function Spinner({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const s = { sm: 'h-4 w-4', md: 'h-8 w-8', lg: 'h-12 w-12' }[size];
  return (
    <div className="flex justify-center items-center py-16">
      <svg className={cn('animate-spin', s)} style={{ color: 'var(--brand)' }} viewBox="0 0 24 24" fill="none">
        <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
        <path className="opacity-90" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
      </svg>
    </div>
  );
}

export function EmptyState({ title, description, icon, action }: {
  title: string; description?: string; icon?: React.ReactNode; action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      {icon && <div className="text-5xl mb-4 opacity-40">{icon}</div>}
      <p className="text-lg font-semibold font-display" style={{ color: 'var(--text-2)' }}>{title}</p>
      {description && <p className="text-sm mt-1" style={{ color: 'var(--text-3)' }}>{description}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}

export function Pagination({ page, totalPages, onChange }: {
  page: number; totalPages: number; onChange: (p: number) => void;
}) {
  if (totalPages <= 1) return null;
  const pages: (number | '...')[] = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    if (page > 3) pages.push('...');
    for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) pages.push(i);
    if (page < totalPages - 2) pages.push('...');
    pages.push(totalPages);
  }
  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <button onClick={() => onChange(page - 1)} disabled={page === 1}
        className="px-3 py-2 text-sm rounded-lg border disabled:opacity-40 hover:border-orange-400 hover:text-orange-500 transition-all"
        style={{ borderColor: 'var(--border-c)', color: 'var(--text-2)' }}>
        ←
      </button>
      {pages.map((p, i) => p === '...' ? (
        <span key={`el-${i}`} style={{ color: 'var(--text-3)' }} className="px-1">…</span>
      ) : (
        <button key={p} onClick={() => onChange(p as number)}
          className="w-9 h-9 text-sm rounded-lg border transition-all font-medium"
          style={p === page
            ? { background: 'var(--brand)', color: '#fff', borderColor: 'var(--brand)' }
            : { borderColor: 'var(--border-c)', color: 'var(--text-2)' }
          }>
          {p}
        </button>
      ))}
      <button onClick={() => onChange(page + 1)} disabled={page === totalPages}
        className="px-3 py-2 text-sm rounded-lg border disabled:opacity-40 hover:border-orange-400 hover:text-orange-500 transition-all"
        style={{ borderColor: 'var(--border-c)', color: 'var(--text-2)' }}>
        →
      </button>
    </div>
  );
}

export function ToastContainer() {
  const { toasts, removeToast } = useUIStore();
  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-2 pointer-events-none">
      {toasts.map((t) => (
        <div key={t.id}
          className={cn(
            'rounded-xl px-4 py-3 flex items-start gap-3 min-w-[280px] max-w-sm pointer-events-auto shadow-lg border animate-fade-up',
            t.type === 'success' && 'bg-green-50 border-green-200',
            t.type === 'error'   && 'bg-red-50 border-red-200',
            t.type === 'info'    && 'bg-orange-50 border-orange-200',
          )}>
          <span className="shrink-0 mt-0.5">
            {t.type === 'success' && <CheckCircle2 size={16} className="text-green-500" />}
            {t.type === 'error'   && <AlertCircle  size={16} className="text-red-500" />}
            {t.type === 'info'    && <Info          size={16} style={{ color: 'var(--brand)' }} />}
          </span>
          <p className="text-sm flex-1" style={{ color: 'var(--text-1)' }}>{t.message}</p>
          <button onClick={() => removeToast(t.id)} className="shrink-0 opacity-50 hover:opacity-100 transition-opacity"
                  style={{ color: 'var(--text-2)' }}>
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
}

export function StatCard({ value, label, icon, accent = false }: {
  value: string | number; label: string; icon?: React.ReactNode; accent?: boolean;
}) {
  return (
    <div className="rounded-xl p-4 border" style={{
      background: accent ? 'var(--brand-pale)' : 'var(--surface-0)',
      borderColor: accent ? 'rgba(249,115,22,0.3)' : 'var(--border-c)',
    }}>
      <div className="flex items-center justify-between mb-1">
        <p className="text-xs uppercase tracking-widest font-medium" style={{ color: 'var(--text-3)' }}>{label}</p>
        {icon && <span style={{ color: accent ? 'var(--brand)' : 'var(--text-3)' }}>{icon}</span>}
      </div>
      <p className="text-xl font-display font-black" style={{ color: accent ? 'var(--brand)' : 'var(--text-1)' }}>
        {value}
      </p>
    </div>
  );
}
