import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, Building2, Briefcase, Shield, Calendar, User } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { useUpdateProfile, useProfile } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/misc';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/misc';
import { Spinner, StatCard } from '@/components/common';
import { formatDate, getInitials } from '@/utils';

const schema = z.object({
  firstName: z.string().min(1, 'Nhập họ'),
  lastName:  z.string().min(1, 'Nhập tên'),
  company:   z.string().optional(),
  title:     z.string().optional(),
});
type FormData = z.infer<typeof schema>;

export default function ProfilePage() {
  const { user } = useAuthStore();
  const { isFetching } = useProfile();
  const { mutate: update, isPending } = useUpdateProfile();

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: user?.firstName ?? '',
      lastName:  user?.lastName  ?? '',
      company:   user?.company   ?? '',
      title:     user?.title     ?? '',
    },
  });

  if (!user) return <Spinner />;

  const onSubmit = (data: FormData) => update(data);

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-3xl text-[var(--text-1)]">Hồ sơ cá nhân</h1>
          <p className="text-sm text-[var(--text-3)] mt-1">Quản lý thông tin tài khoản</p>
        </div>
        {isFetching && <span className="text-xs animate-pulse" style={{ color: 'var(--brand)' }}>Đang đồng bộ…</span>}
      </div>

      {/* Profile header card */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-5">
            <Avatar className="h-20 w-20 rounded-2xl">
              <AvatarFallback className="rounded-2xl text-2xl font-black">
                {getInitials(user.fullName || user.username)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="font-display font-bold text-xl text-[var(--text-1)]">
                {user.fullName || user.username}
              </h2>
              <p className="text-sm text-[var(--text-3)]">@{user.username}</p>
              <p className="text-sm text-[var(--text-3)]">{user.email}</p>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {user.roles.map((r) => (
                  <Badge key={r.id} variant="brand">{r.roleName}</Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatCard
          value={user.roles.map((r) => r.roleName).join(', ')}
          label="Quyền hạn"
          icon={<Shield size={16} />}
          accent
        />
        <StatCard
          value={user.approvalStatus === 'approved' ? '✓ Đã duyệt' : user.approvalStatus}
          label="Trạng thái"
        />
        <StatCard
          value={user.isActive ? '✓ Hoạt động' : '✗ Vô hiệu'}
          label="Tài khoản"
        />
        <StatCard
          value={formatDate(user.createdAt)}
          label="Ngày tham gia"
          icon={<Calendar size={16} />}
        />
      </div>

      {/* Edit form */}
      <Card>
        <CardHeader>
          <CardTitle>Cập nhật thông tin</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {/* Readonly fields */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-widest text-[var(--text-3)]">Tên đăng nhập</label>
                <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[var(--border-c)] bg-[var(--bg-3)] opacity-50 cursor-not-allowed">
                  <User size={14} className="text-[var(--text-3)] shrink-0" />
                  <span className="text-sm text-[var(--text-1)] truncate">{user.username}</span>
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-widest text-[var(--text-3)]">Email</label>
                <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[var(--border-c)] bg-[var(--bg-3)] opacity-50 cursor-not-allowed">
                  <Mail size={14} className="text-[var(--text-3)] shrink-0" />
                  <span className="text-sm text-[var(--text-1)] truncate">{user.email}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Input label="Họ *" placeholder="Nguyễn" error={errors.firstName?.message} {...register('firstName')} />
              <Input label="Tên *" placeholder="Văn A" error={errors.lastName?.message} {...register('lastName')} />
            </div>
            <Input
              label="Công ty"
              placeholder="Tên công ty / tổ chức"
              icon={<Building2 size={15} />}
              error={errors.company?.message}
              {...register('company')}
            />
            <Input
              label="Chức danh"
              placeholder="VD: Senior Developer, Marketing Manager"
              icon={<Briefcase size={15} />}
              error={errors.title?.message}
              {...register('title')}
            />
            <Button type="submit" variant="brand" loading={isPending}>
              Lưu thay đổi
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Roles detail */}
      <Card>
        <CardHeader><CardTitle>Chi tiết quyền hạn</CardTitle></CardHeader>
        <CardContent className="space-y-2.5">
          {user.roles.map((r) => (
            <div key={r.id} className="flex items-center justify-between p-3 rounded-xl bg-[var(--bg-3)] border border-[var(--border-c)]">
              <div>
                <p className="font-semibold text-sm text-[var(--text-1)]">{r.roleName}</p>
                <p className="text-xs text-[var(--text-3)] mt-0.5">{r.description}</p>
              </div>
              <Badge variant="brand">{r.roleName}</Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Account info */}
      <Card>
        <CardHeader><CardTitle>Thông tin tài khoản</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-0.5 text-sm">
            {[
              ['ID', user.id],
              ['Username', user.username],
              ['Email', user.email],
              ['Ngày tạo', formatDate(user.createdAt)],
              ['Cập nhật', formatDate(user.updatedAt)],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between items-center py-2 border-b border-[var(--border-c)] last:border-0">
                <span className="text-[var(--text-3)]">{k}</span>
                <span className="font-mono text-xs text-[var(--text-2)] break-all text-right max-w-[60%]">{v}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
