import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { User, Lock, ArrowRight } from 'lucide-react';
import { useLogin } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';

const schema = z.object({
  username: z.string().min(2, 'Nhập tên đăng nhập'),
  password: z.string().min(6, 'Mật khẩu tối thiểu 6 ký tự'),
});
type FormData = z.infer<typeof schema>;

function Field({ label, error, icon, children }: any) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--text-3)' }}>{label}</label>
      <div className="relative">
        {icon && <span className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-3)' }}>{icon}</span>}
        <div className={icon ? 'pl-9' : ''}>{children}</div>
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as any)?.from?.pathname || '/';
  const { mutate: login, isPending } = useLogin();

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  return (
    <div>
      <h1 className="font-display font-bold text-2xl mb-1" style={{ color: 'var(--text-1)' }}>Đăng nhập</h1>
      <p className="text-sm mb-7" style={{ color: 'var(--text-3)' }}>Chào mừng trở lại FNB HUB</p>

      <form onSubmit={handleSubmit(d => login(d, { onSuccess: () => navigate(from, { replace: true }) }))} className="space-y-4">
        <Field label="Tên đăng nhập" error={errors.username?.message} icon={<User size={15} />}>
          <input {...register('username')} placeholder="username" autoComplete="username"
            className="fnb-input pl-9" />
        </Field>
        <Field label="Mật khẩu" error={errors.password?.message} icon={<Lock size={15} />}>
          <input {...register('password')} type="password" placeholder="••••••••" autoComplete="current-password"
            className="fnb-input pl-9" />
        </Field>
        <Button type="submit" disabled={isPending} className="w-full mt-2 h-11 text-base font-bold rounded-xl"
                style={{ background: 'var(--brand)', color: '#fff', border: 'none' }}>
          {isPending ? '…' : <><span>Đăng nhập</span> <ArrowRight size={16} /></>}
        </Button>
      </form>

      <div className="my-5 h-px" style={{ background: 'var(--border-c)' }} />
      <p className="text-center text-sm" style={{ color: 'var(--text-3)' }}>
        Chưa có tài khoản?{' '}
        <Link to="/register" className="font-bold hover:underline" style={{ color: 'var(--brand)' }}>Đăng ký ngay</Link>
      </p>
    </div>
  );
}
