import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight, MapPin, Clock, User as UserIcon, Building2 } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

/* ─── Mock Data ─────────────────────────────────────────────────── */
const BANNERS = [
  {
    bg: 'linear-gradient(135deg, #fff7ed 0%, #fed7aa 60%, #fdba74 100%)',
    label: 'Nhận ưu đãi lên đến 20% nhân dịp 8/3',
    cta: 'Mua sắm ngay',
    emoji: '🎁🛒🏪',
  },
  {
    bg: 'linear-gradient(135deg, #ecfdf5 0%, #a7f3d0 60%, #6ee7b7 100%)',
    label: 'Hàng ngàn cơ hội việc làm F&B mới nhất',
    cta: 'Tìm việc ngay',
    emoji: '💼🍜🔍',
  },
  {
    bg: 'linear-gradient(135deg, #eff6ff 0%, #bfdbfe 60%, #93c5fd 100%)',
    label: 'Sang nhượng quán đang hot — Giá tốt nhất thị trường',
    cta: 'Xem ngay',
    emoji: '🏪🔑💰',
  },
];

const CATEGORIES = [
  { icon: '🏪', label: 'Bên cho sang\nnhượng',  to: '/sang-nhuong?type=sell' },
  { icon: '🤝', label: 'Bên nhận sang\nnhượng', to: '/sang-nhuong?type=buy' },
  { icon: '🏠', label: 'Bên cho thuê',           to: '/cho-thue?type=rent' },
  { icon: '🏡', label: 'Bên nhận thuê',          to: '/cho-thue?type=find' },
  { icon: '💼', label: 'Bên tìm việc',           to: '/viec-lam?type=find' },
  { icon: '🏢', label: 'Nhà tuyển dụng',         to: '/viec-lam?type=hire' },
  { icon: '🍔', label: 'Bên cho nhượng\nquyền',  to: '/nhuong-quyen?type=give' },
  { icon: '🤲', label: 'Bên nhận\nnhượng quyền', to: '/nhuong-quyen?type=take' },
];

const HOT_COMPANIES = [
  { name: 'SAN FU LOU', sub: 'CANTONESE RESTAURANT', bg: '#f9f9f9', emoji: '🏮' },
  { name: 'YU-ME', sub: 'JAPANESE RESTAURANT', bg: '#f9f9f9', emoji: '🍱' },
  { name: 'ICHIHANA SUSHI', sub: 'Premium Omakase Sushi Buffet', bg: '#111', emoji: '🍣', dark: true },
  { name: 'AKA', sub: 'HOUSE', bg: '#f9f9f9', emoji: '🎪' },
  { name: 'SUMO YAKINIKU', sub: 'Japanese BBQ', bg: '#f9f9f9', emoji: '🥩' },
  { name: 'SUSHI TEI', sub: 'A Taste of Japan', bg: '#1a5c3a', emoji: '🍱', dark: true },
  { name: '北海道', sub: 'Japanese Cuisine', bg: '#f9f9f9', emoji: '🎋' },
  { name: '春聚', sub: 'Restaurant', bg: '#f9f9f9', emoji: '🌸' },
  { name: '牛繁', sub: 'BBQ', bg: '#f9f9f9', emoji: '🐂' },
  { name: 'TOKORI', sub: 'Japanese Restaurant', bg: '#fff', emoji: '🍶' },
  { name: 'SUMO BBQ', sub: 'Quán nướng Hàn Quốc', bg: '#111', emoji: '🔥', dark: true },
  { name: 'PACHI PACHI', sub: 'Japanese BBQ', bg: '#1a1a1a', emoji: '🌟', dark: true },
];

const HOT_TRANSFERS = [
  { id: '1', title: 'Chính chủ nhượng quán cà phê view đẹp, gần sân bay Bạch...', price: '480.000.000 đ', area: '80 m²', city: 'Hồ Chí Minh', addr: '54 Lê Lợi', type: 'Cafe', posted: '2 giờ trước', user: 'Trần Công Minh' },
  { id: '2', title: 'Sang nhượng quán nhậu đang hoạt động, doanh thu tốt', price: '350.000.000 đ', area: '120 m²', city: 'Hà Nội', addr: '12 Nguyễn Trãi', type: 'Nhà hàng', posted: '5 giờ trước', user: 'Nguyễn Văn A' },
  { id: '3', title: 'Nhượng lại shop thời trang mặt phố, vị trí đắc địa', price: '320.000.000 đ', area: '60 m²', city: 'Đà Nẵng', addr: '88 Trần Phú', type: 'Shop', posted: '1 ngày trước', user: 'Lê Thị Hoa' },
  { id: '4', title: 'Sang nhượng spa 5 phòng, đầy đủ trang thiết bị', price: '280.000.000 đ', area: '90 m²', city: 'TP.HCM', addr: '33 Điện Biên Phủ', type: 'Spa', posted: '1 ngày trước', user: 'Phạm Minh T' },
  { id: '5', title: 'Nhượng quán trà sữa thương hiệu, khách quen nhiều', price: '180.000.000 đ', area: '45 m²', city: 'Cần Thơ', addr: '5 Hai Bà Trưng', type: 'Trà sữa', posted: '2 ngày trước', user: 'Trần Ngọc L' },
  { id: '6', title: 'Cho thuê/sang nhượng gym 200m², máy móc đầy đủ', price: '550.000.000 đ', area: '200 m²', city: 'Hà Nội', addr: '101 Xuân Thủy', type: 'Gym', posted: '3 ngày trước', user: 'Hoàng Đức M' },
];

const HOT_JOBS = [
  { id: '1', title: 'Bếp trưởng nhà hàng Nhật', company: 'SUMO YAKINIKU', salary: '25-40tr', type: 'Toàn thời gian', loc: 'TP.HCM', img: '🍱' },
  { id: '2', title: 'Quản lý chuỗi cafe', company: 'The Coffee House', salary: '20-35tr', type: 'Toàn thời gian', loc: 'Hà Nội', img: '☕' },
  { id: '3', title: 'Nhân viên phục vụ cuối tuần', company: 'ICHIHANA SUSHI', salary: '8-12tr', type: 'Bán thời gian', loc: 'TP.HCM', img: '🍣' },
  { id: '4', title: 'Marketing Manager F&B', company: 'FNB Corp', salary: '30-50tr', type: 'Toàn thời gian', loc: 'Đà Nẵng', img: '📊' },
];

/* ─── Component ─────────────────────────────────────────────────── */
export default function HomePage() {
  const { isAuthenticated, user } = useAuthStore();
  const [bannerIdx, setBannerIdx] = useState(0);
  const banner = BANNERS[bannerIdx];

  return (
    <div className="space-y-10">

      {/* ══════ HERO BANNER ══════ */}
      <section className="relative rounded-2xl overflow-hidden h-52 sm:h-64 flex items-center shadow-md"
               style={{ background: banner.bg }}>
        <div className="absolute left-0 top-0 h-full w-1/3 flex items-center justify-center text-6xl pointer-events-none select-none opacity-80">
          {banner.emoji.split('').map((e, i) => (
            <span key={i} className={cn('absolute', i === 0 && 'left-4 top-6', i === 1 && 'left-12 bottom-6', i === 2 && 'left-24 top-10')} style={{ fontSize: 40 + i*10 }}>
              {e}
            </span>
          ))}
        </div>

        <div className="ml-auto mr-8 sm:mr-20 text-center z-10 max-w-md">
          <h2 className="font-display font-black text-2xl sm:text-3xl text-gray-800 mb-3 leading-tight">
            {banner.label}
          </h2>
          <Link to="/sang-nhuong" className="btn-ghost-brand text-base font-bold" style={{ color: 'var(--brand)' }}>
            {banner.cta} <ArrowRight size={16} />
          </Link>
        </div>

        {/* Dots + arrows */}
        <button onClick={() => setBannerIdx(i => (i - 1 + BANNERS.length) % BANNERS.length)}
          className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-white/70 hover:bg-white shadow text-gray-600">
          <ChevronLeft size={18} />
        </button>
        <button onClick={() => setBannerIdx(i => (i + 1) % BANNERS.length)}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-white/70 hover:bg-white shadow text-gray-600">
          <ChevronRight size={18} />
        </button>
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
          {BANNERS.map((_, i) => (
            <button key={i} onClick={() => setBannerIdx(i)}
              className={cn('h-1.5 rounded-full transition-all', i === bannerIdx ? 'w-5 bg-orange-500' : 'w-1.5 bg-white/60')} />
          ))}
        </div>
      </section>

      {/* ══════ CATEGORY GRID ══════ */}
      <section>
        <h2 className="font-display font-bold text-xl mb-5" style={{ color: 'var(--text-1)' }}>
          Khám phá danh mục
        </h2>
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
          {CATEGORIES.map((cat) => (
            <Link key={cat.label} to={cat.to}
              className="flex flex-col items-center gap-2 p-3 rounded-xl border hover:border-orange-300 hover:shadow-md transition-all group cursor-pointer"
              style={{ background: 'var(--surface-0)', borderColor: 'var(--border-c)' }}>
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center text-3xl sm:text-4xl group-hover:scale-110 transition-transform"
                   style={{ background: 'var(--brand-pale)' }}>
                {cat.icon}
              </div>
              <span className="text-center text-[11px] sm:text-xs font-medium leading-tight whitespace-pre-line"
                    style={{ color: 'var(--text-2)' }}>
                {cat.label}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ══════ SANG NHƯỢNG HOT ══════ */}
      <section>
        <SectionHeader label="Sang nhượng" title="Sang nhượng HOT" to="/sang-nhuong" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {HOT_TRANSFERS.map((item, i) => (
            <Link key={item.id} to={`/sang-nhuong/${item.id}`}
              className={cn('fnb-card block animate-fade-up')}
              style={{ animationDelay: `${i * 60}ms` }}>
              {/* Posted + user */}
              <div className="flex items-center justify-between px-4 pt-3 pb-2">
                <span className="text-xs flex items-center gap-1" style={{ color: 'var(--brand)' }}>
                  <Clock size={11} /> Đăng {item.posted}
                </span>
                <span className="flex items-center gap-1.5 text-xs px-2 py-1 rounded-full bg-blue-500 text-white font-medium">
                  <UserIcon size={10} /> Người đăng: {item.user}
                </span>
              </div>

              {/* Title */}
              <h3 className="px-4 pb-3 font-semibold text-sm leading-snug line-clamp-2" style={{ color: 'var(--text-1)' }}>
                {item.title}
              </h3>

              {/* Image + price */}
              <div className="flex gap-3 px-4 pb-3">
                <div className="w-24 h-20 rounded-lg overflow-hidden shrink-0 bg-amber-50 flex items-center justify-center text-5xl border" style={{ borderColor: 'var(--border-c)' }}>
                  🏪
                </div>
                <div className="text-sm space-y-1">
                  <p className="font-semibold" style={{ color: 'var(--text-1)' }}>Giá sang nhượng:</p>
                  <p className="font-bold text-base" style={{ color: 'var(--text-1)' }}>{item.price}</p>
                  <p className="text-xs" style={{ color: 'var(--text-2)' }}>Diện tích: {item.area}</p>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 px-4 pb-4 border-t pt-3" style={{ borderColor: 'var(--border-c)' }}>
                <span className="fnb-tag"><MapPin size={10} /> Tỉnh/TP: {item.city}</span>
                <span className="fnb-tag"><MapPin size={10} /> Địa chỉ: {item.addr}</span>
                <span className="fnb-tag">Loại: {item.type}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ══════ HOT COMPANIES ══════ */}
      <section>
        <SectionHeader label="Việc làm" title="Danh sách công ty HOT" to="/viec-lam" />
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3">
          {HOT_COMPANIES.map((co) => (
            <Link key={co.name} to="/viec-lam"
              className="fnb-card flex flex-col items-center justify-center gap-1.5 p-4 aspect-[4/3] text-center cursor-pointer"
              style={{ background: co.dark ? co.bg : 'var(--surface-0)' }}>
              <span className="text-3xl">{co.emoji}</span>
              <p className={cn('text-xs font-bold leading-tight', co.dark ? 'text-white' : '')} style={!co.dark ? { color: 'var(--text-1)' } : {}}>
                {co.name}
              </p>
              {co.sub && (
                <p className="text-[9px] leading-tight opacity-60 truncate w-full text-center"
                   style={{ color: co.dark ? '#ccc' : 'var(--text-3)' }}>
                  {co.sub}
                </p>
              )}
            </Link>
          ))}
        </div>
      </section>

      {/* ══════ VIỆC LÀM HOT ══════ */}
      <section>
        <SectionHeader label="Việc làm" title="Danh sách việc làm HOT" to="/viec-lam" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {HOT_JOBS.map((job, i) => (
            <Link key={job.id} to={`/viec-lam/${job.id}`}
              className={cn('fnb-card flex gap-4 p-4 animate-fade-up')}
              style={{ animationDelay: `${i * 70}ms` }}>
              {/* Thumb */}
              <div className="w-16 h-16 rounded-xl shrink-0 flex items-center justify-center text-4xl border"
                   style={{ background: 'var(--brand-pale)', borderColor: 'var(--border-c)' }}>
                {job.img}
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-sm mb-0.5 truncate" style={{ color: 'var(--text-1)' }}>{job.title}</h3>
                <p className="text-xs font-medium mb-2" style={{ color: 'var(--text-2)' }}>{job.company}</p>
                <div className="flex flex-wrap gap-1.5">
                  <span className="fnb-tag-brand fnb-tag font-semibold">{job.salary}</span>
                  <span className="fnb-tag">{job.type}</span>
                  <span className="fnb-tag"><MapPin size={10} />{job.loc}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ══════ CTA guests ══════ */}
      {!isAuthenticated && (
        <section className="rounded-2xl p-8 sm:p-12 text-center border"
                 style={{ background: 'var(--navbar-top)', borderColor: 'transparent' }}>
          <h2 className="font-display font-black text-3xl text-white mb-3">
            Tham gia <span style={{ color: 'var(--brand)' }}>FNB HUB</span> ngay hôm nay
          </h2>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">
            Nền tảng sang nhượng, cho thuê và tuyển dụng ngành F&B hàng đầu Việt Nam
          </p>
          <Link to="/register"
            className="btn-brand inline-flex items-center gap-2 px-8 py-3 text-base rounded-xl">
            Đăng ký miễn phí <ArrowRight size={18} />
          </Link>
        </section>
      )}

      {/* ══════ DỊCH VỤ HỖ TRỢ ══════ */}
      <ServicesSection />
    </div>
  );
}

/* ─── Reusable section header ─── */
function SectionHeader({ label, title, to }: { label: string; title: string; to: string }) {
  return (
    <div className="flex items-end justify-between mb-5">
      <div>
        <div className="section-label">{label}</div>
        <h2 className="section-title">{title}</h2>
      </div>
      <Link to={to} className="flex items-center gap-1 text-sm font-semibold hover:opacity-80 transition-opacity"
            style={{ color: 'var(--brand)' }}>
        Xem thêm <ArrowRight size={14} />
      </Link>
    </div>
  );
}

/* ─── Services Section ─── */
const SERVICE_BUTTONS = [
  { icon: '⚖️', label: 'Tư vấn pháp lý',             bg: '#f97316' },
  { icon: '🛡️', label: 'Dịch vụ hỗ trợ\nATPF',       bg: '#22c55e' },
  { icon: '🧾', label: 'Hỗ trợ kế toán\nnhà hàng',   bg: '#06b6d4' },
  { icon: '🛒', label: 'Đặt hàng\nnguyên liệu',       bg: '#3b82f6' },
  { icon: '📦', label: 'Các dịch vụ\nkhác...',        bg: '#6b7280' },
];

const SERVICE_INFO = [
  {
    IconSvg: 'users',
    pre:   'Giới thiệu các doanh nghiệp thành viên của',
    title: 'Danh sách hội viên',
    sub:   'Hiệp hội F&B Việt Nam',
  },
  {
    IconSvg: 'bar-chart',
    pre:   'Thống kê số liệu về',
    title: 'Khảo sát chuỗi nhà hàng F&B',
    sub:   'Chuỗi, cửa hàng, doanh thu',
  },
  {
    IconSvg: 'mail',
    pre:   'Đăng ký nhận',
    title: 'Tài liệu & Báo cáo ngành',
    sub:   'Gửi yêu cầu qua email',
  },
  {
    IconSvg: 'info',
    pre:   'Hướng dẫn quyền lợi hội viên',
    title: 'Thủ tục đăng ký thành viên',
    sub:   'Quy trình, thủ tục tham gia',
  },
  {
    IconSvg: 'clock',
    pre:   'Lịch cập nhật dữ liệu tiếp theo',
    title: 'Khảo sát cửa hàng tiện lợi F&B',
    sub:   'Cập nhật tiếp: Thứ Sáu, 21/03',
  },
  {
    IconSvg: 'phone',
    pre:   'Tổng đài tư vấn toàn diện về',
    title: 'Trung tâm hỗ trợ F&B',
    sub:   'Kinh doanh F&B, nhượng quyền',
  },
];

/* Minimal SVG icons matching the screenshot's square-icon style */
function ServiceIcon({ type }: { type: string }) {
  const icons: Record<string, JSX.Element> = {
    'users': (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    'bar-chart': (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
        <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/>
        <line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/>
      </svg>
    ),
    'mail': (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
        <rect x="2" y="4" width="20" height="16" rx="2"/>
        <path d="M22 7l-10 7L2 7"/>
      </svg>
    ),
    'info': (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
        <circle cx="12" cy="12" r="10"/>
        <line x1="12" y1="8" x2="12" y2="8"/><line x1="12" y1="12" x2="12" y2="16"/>
      </svg>
    ),
    'clock': (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    'phone': (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12 19.79 19.79 0 0 1 1.08 3.4 2 2 0 0 1 3.06 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 9.1A16 16 0 0 0 13 15l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16v.92z"/>
      </svg>
    ),
  };
  return icons[type] ?? null;
}

function ServicesSection() {
  return (
    <section className="overflow-hidden rounded-2xl border" style={{ borderColor: 'var(--border-c)', background: 'var(--surface-0)' }}>

      {/* ── Row 1: Coloured service buttons ── */}
      <div className="flex flex-wrap">
        {SERVICE_BUTTONS.map((s, i) => (
          <button
            key={i}
            className="flex-1 min-w-[120px] flex items-center gap-3 px-5 py-4 text-white font-semibold text-sm text-left
                       transition-all hover:brightness-110 active:scale-95"
            style={{ background: s.bg }}
          >
            {/* White square icon bg */}
            <span className="w-9 h-9 shrink-0 rounded-lg bg-white/25 flex items-center justify-center text-lg leading-none">
              {s.icon}
            </span>
            <span className="whitespace-pre-line leading-snug">{s.label}</span>
          </button>
        ))}
      </div>

      {/* ── Row 2: 3×2 info grid ── */}
      <div
        className="grid grid-cols-1 sm:grid-cols-3"
        style={{ borderTop: '1px solid var(--border-c)' }}
      >
        {SERVICE_INFO.map((item, i) => (
          <div
            key={i}
            className="flex gap-3 px-5 py-4 cursor-pointer transition-colors hover:bg-orange-50"
            style={{
              borderRight:  i % 3 !== 2 ? '1px solid var(--border-c)' : undefined,
              borderBottom: i < 3        ? '1px solid var(--border-c)' : undefined,
            }}
          >
            {/* Square icon — blue pastel */}
            <div className="w-11 h-11 shrink-0 rounded-xl flex items-center justify-center text-blue-500"
                 style={{ background: '#dbeafe', border: '1px solid #bfdbfe' }}>
              <ServiceIcon type={item.IconSvg} />
            </div>

            <div className="min-w-0">
              {/* Blue dot + small grey text */}
              <p className="flex items-start gap-1 text-xs leading-snug mb-0.5" style={{ color: 'var(--text-3)' }}>
                <span className="mt-[5px] w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                {item.pre}
              </p>
              {/* Bold blue title */}
              <p className="text-sm font-bold leading-snug text-blue-600 hover:underline">
                {item.title}
              </p>
              {/* Subtitle tag */}
              {item.sub && (
                <p className="text-xs mt-0.5" style={{ color: 'var(--text-3)' }}>{item.sub}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
