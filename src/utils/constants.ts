import type { TransferCategory, JobType, JobLevel, UserRole } from '@/types';

export const PROVINCES = [
  { value: 'hcm', label: 'TP. Hồ Chí Minh' },
  { value: 'hn', label: 'Hà Nội' },
  { value: 'dn', label: 'Đà Nẵng' },
  { value: 'ct', label: 'Cần Thơ' },
  { value: 'hp', label: 'Hải Phòng' },
  { value: 'bd', label: 'Bình Dương' },
  { value: 'dong-nai', label: 'Đồng Nai' },
  { value: 'other', label: 'Tỉnh/Thành khác' },
];

export const TRANSFER_CATEGORIES: { value: TransferCategory; label: string; icon: string }[] = [
  { value: 'cafe', label: 'Cà phê / Trà sữa', icon: '☕' },
  { value: 'restaurant', label: 'Nhà hàng / Quán ăn', icon: '🍜' },
  { value: 'shop', label: 'Shop / Cửa hàng', icon: '🛍️' },
  { value: 'office', label: 'Văn phòng', icon: '🏢' },
  { value: 'warehouse', label: 'Kho / Xưởng', icon: '🏭' },
  { value: 'spa', label: 'Spa / Thẩm mỹ', icon: '💆' },
  { value: 'gym', label: 'Gym / Thể thao', icon: '💪' },
  { value: 'other', label: 'Khác', icon: '📦' },
];

export const TRANSFER_CATEGORY_MAP = Object.fromEntries(
  TRANSFER_CATEGORIES.map((c) => [c.value, c])
) as Record<TransferCategory, (typeof TRANSFER_CATEGORIES)[0]>;

export const JOB_TYPES: { value: JobType; label: string; color: string }[] = [
  { value: 'fulltime', label: 'Toàn thời gian', color: 'tag-volt' },
  { value: 'parttime', label: 'Bán thời gian', color: 'tag-teal' },
  { value: 'freelance', label: 'Freelance', color: 'tag-amber' },
  { value: 'remote', label: 'Remote', color: 'tag-coral' },
  { value: 'internship', label: 'Thực tập', color: 'tag' },
];

export const JOB_TYPE_MAP = Object.fromEntries(
  JOB_TYPES.map((t) => [t.value, t])
) as Record<JobType, (typeof JOB_TYPES)[0]>;

export const JOB_LEVELS: { value: JobLevel; label: string }[] = [
  { value: 'intern', label: 'Thực tập sinh' },
  { value: 'junior', label: 'Junior (1-2 năm)' },
  { value: 'middle', label: 'Middle (2-4 năm)' },
  { value: 'senior', label: 'Senior (4+ năm)' },
  { value: 'lead', label: 'Tech Lead' },
  { value: 'manager', label: 'Manager / Director' },
];

export const USER_ROLES: { value: UserRole; label: string; desc: string; icon: string }[] = [
  { value: 'seller',    label: 'Người sang nhượng', desc: 'Đăng tin sang nhượng kinh doanh', icon: '🏪' },
  { value: 'buyer',     label: 'Người tìm mua',     desc: 'Tìm kiếm cơ hội kinh doanh',     icon: '🔍' },
  { value: 'recruiter', label: 'Nhà tuyển dụng',    desc: 'Đăng tin tuyển dụng nhân sự',    icon: '💼' },
  { value: 'candidate', label: 'Người tìm việc',    desc: 'Tìm kiếm cơ hội nghề nghiệp',   icon: '🎯' },
];

export const ROLE_LABEL_MAP: Record<UserRole, string> = {
  admin: 'Admin',
  seller: 'Người sang nhượng',
  buyer: 'Người tìm mua',
  recruiter: 'Nhà tuyển dụng',
  candidate: 'Người tìm việc',
};

export const INDUSTRIES = [
  'Công nghệ thông tin',
  'Marketing & Truyền thông',
  'Kinh doanh / Bán hàng',
  'Kế toán / Tài chính',
  'Thiết kế / Sáng tạo',
  'Xây dựng / Bất động sản',
  'Y tế / Dược phẩm',
  'Giáo dục / Đào tạo',
  'Nhà hàng / Khách sạn',
  'Logistics / Vận tải',
  'Nhân sự / Tuyển dụng',
  'Pháp lý / Luật',
  'Khác',
];
