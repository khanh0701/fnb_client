import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, ArrowRight } from 'lucide-react';
import { useRegister } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';

const schema = z.object({
  firstName:       z.string().min(1, 'Nhập họ'),
  lastName:        z.string().min(1, 'Nhập tên'),
  username:        z.string().min(3, 'Tối thiểu 3 ký tự').regex(/^\w+$/, 'Chỉ dùng chữ, số, _'),
  email:           z.string().email('Email không hợp lệ'),
  password:        z.string().min(6, 'Tối thiểu 6 ký tự'),
  confirmPassword: z.string(),
}).refine(d => d.password === d.confirmPassword, { message: 'Mật khẩu không khớp', path: ['confirmPassword'] });
type FormData = z.infer<typeof schema>;

function Field({ label, error, children }: any) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--text-3)' }}>{label}</label>
      {children}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

export default function RegisterPage() {
  const navigate = useNavigate();
  const { mutate: register_, isPending } = useRegister();
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  return (
    <div>
      <h1 className="font-display font-bold text-2xl mb-1" style={{ color: 'var(--text-1)' }}>Tạo tài khoản</h1>
      <p className="text-sm mb-6" style={{ color: 'var(--text-3)' }}>Tham gia FNB HUB ngay hôm nay</p>

      <form onSubmit={handleSubmit(d => { const { confirmPassword: _, ...p } = d; register_(p, { onSuccess: () => navigate('/') }); })} className="space-y-3.5">
        <div className="grid grid-cols-2 gap-3">
          <Field label="Họ *" error={errors.firstName?.message}>
            <input {...register('firstName')} placeholder="Nguyễn" className="fnb-input" />
          </Field>
          <Field label="Tên *" error={errors.lastName?.message}>
            <input {...register('lastName')} placeholder="Văn A" className="fnb-input" />
          </Field>
        </div>
        <Field label="Tên đăng nhập *" error={errors.username?.message}>
          <input {...register('username')} placeholder="my_username" className="fnb-input" />
        </Field>
        <Field label="Email *" error={errors.email?.message}>
          <input {...register('email')} type="email" placeholder="you@example.com" className="fnb-input" />
        </Field>
        <Field label="Mật khẩu *" error={errors.password?.message}>
          <input {...register('password')} type="password" placeholder="Tối thiểu 6 ký tự" className="fnb-input" />
        </Field>
        <Field label="Xác nhận mật khẩu *" error={errors.confirmPassword?.message}>
          <input {...register('confirmPassword')} type="password" placeholder="Nhập lại mật khẩu" className="fnb-input" />
        </Field>
        <button type="submit" disabled={isPending}
          className="btn-brand w-full h-11 text-base rounded-xl mt-1">
          {isPending ? '…' : <><span>Tạo tài khoản</span> <ArrowRight size={16} /></>}
        </button>
      </form>

      <div className="my-5 h-px" style={{ background: 'var(--border-c)' }} />
      <p className="text-center text-sm" style={{ color: 'var(--text-3)' }}>
        Đã có tài khoản?{' '}
        <Link to="/login" className="font-bold hover:underline" style={{ color: 'var(--brand)' }}>Đăng nhập</Link>
      </p>
    </div>
  );
}
