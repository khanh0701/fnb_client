// ─── Auth & User ───────────────────────────────────────────────────────────────

/** Tên role thực tế từ API (roleName field) */
export type ApiRoleName =
  | "Admin"
  | "Seller"
  | "Buyer"
  | "Recruiter"
  | "Candidate"
  | string;

/** Role nội bộ dùng trong app (lowercase) */
export type UserRole = "admin" | "seller" | "buyer" | "recruiter" | "candidate";

/** Một role entry trong mảng roles[] từ API */
export interface ApiRole {
  id: string;
  roleName: ApiRoleName;
  description: string;
  createdAt: string;
  updatedAt: string;
  UserRole: {
    id: string;
    userId: string;
    roleId: string;
    createdAt: string;
    updatedAt: string;
  };
}

/** Shape của /users/profile trả về (bọc trong { data: ... }) */
export interface ApiUserProfile {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  company?: string;
  title?: string;
  note?: string;
  createdBy?: string;
  updatedBy?: string;
  approvedBy?: string | null;
  createdAt: string;
  updatedAt: string;
  approvedAt?: string | null;
  approvalStatus: "approved" | "pending" | "rejected";
  isActive: boolean;
  roles: ApiRole[];
}

/** Shape chuẩn hoá dùng trong toàn bộ app */
export interface User {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  /** firstName + lastName ghép lại */
  fullName: string;
  company?: string;
  title?: string;
  /** Role primary (đầu tiên trong mảng, lowercase) */
  role: UserRole;
  /** Tất cả roles thô từ API */
  roles: ApiRole[];
  isActive: boolean;
  approvalStatus: string;
  createdAt: string;
  updatedAt: string;
}

/** Hàm helper: chuyển ApiUserProfile → User */
export function normalizeUser(profile: ApiUserProfile): User {
  const primaryRoleName = profile.roles?.[0]?.roleName ?? "candidate";
  return {
    id: profile.id,
    username: profile.username,
    email: profile.email,
    firstName: profile.firstName,
    lastName: profile.lastName,
    fullName: `${profile.firstName} ${profile.lastName}`.trim(),
    company: profile.company,
    title: profile.title,
    role: primaryRoleName.toLowerCase() as UserRole,
    roles: profile.roles,
    isActive: profile.isActive,
    approvalStatus: profile.approvalStatus,
    createdAt: profile.createdAt,
    updatedAt: profile.updatedAt,
  };
}

export interface LoginRequest {
  email: string;
  username: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface UpdateProfileRequest {
  firstName?: string;
  lastName?: string;
  company?: string;
  title?: string;
  note?: string;
}

/** Login chỉ trả access_token + refresh_token */
export interface LoginApiResponse {
  access_token: string;
  refresh_token: string;
}

/** Profile API trả { data: ApiUserProfile } */
export interface ProfileApiResponse {
  data: ApiUserProfile;
}

// ─── Common ────────────────────────────────────────────────────────────────────
export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
  statusCode?: number;
}

// ─── Transfer (Sang nhượng) ────────────────────────────────────────────────────
export type TransferCategory =
  | "restaurant"
  | "cafe"
  | "shop"
  | "office"
  | "warehouse"
  | "spa"
  | "gym"
  | "other";

export type TransferStatus = "active" | "pending" | "sold" | "closed";

export interface Transfer {
  id: string;
  title: string;
  description: string;
  price: number;
  address: string;
  province: string;
  district?: string;
  category: TransferCategory;
  area?: number;
  images: string[];
  status: TransferStatus;
  contactName: string;
  contactPhone: string;
  author: User;
  offerCount: number;
  viewCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTransferRequest {
  title: string;
  description: string;
  price: number;
  address: string;
  province: string;
  category: TransferCategory;
  area?: number;
  contactName: string;
  contactPhone: string;
}

export interface TransferOffer {
  id: string;
  transferId: string;
  offerPrice: number;
  message: string;
  status: "pending" | "accepted" | "rejected";
  author: User;
  createdAt: string;
}

export interface CreateOfferRequest {
  offerPrice: number;
  message: string;
}

export interface TransferFilter {
  category?: TransferCategory;
  province?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  status?: TransferStatus;
  page?: number;
  limit?: number;
  sort?: "newest" | "price_asc" | "price_desc";
}

// ─── Job (Việc làm) ────────────────────────────────────────────────────────────
export type JobType =
  | "fulltime"
  | "parttime"
  | "freelance"
  | "internship"
  | "remote";
export type JobLevel =
  | "intern"
  | "junior"
  | "middle"
  | "senior"
  | "lead"
  | "manager";

export interface Job {
  id: string;
  title: string;
  description: string;
  requirements: string;
  benefits?: string;
  salary: string;
  salaryMin?: number;
  salaryMax?: number;
  address: string;
  province: string;
  type: JobType;
  level: JobLevel;
  industry: string;
  skills?: string[];
  deadline: string;
  status: "active" | "closed" | "draft";
  author: User;
  applicationCount: number;
  viewCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateJobRequest {
  title: string;
  description: string;
  requirements: string;
  benefits?: string;
  salary: string;
  address: string;
  province: string;
  type: JobType;
  level: JobLevel;
  industry: string;
  skills?: string[];
  deadline: string;
}

export interface JobApplication {
  id: string;
  jobId: string;
  coverLetter: string;
  cvUrl?: string;
  status: "pending" | "reviewing" | "shortlisted" | "accepted" | "rejected";
  author: User;
  createdAt: string;
  updatedAt: string;
}

export interface ApplyJobRequest {
  coverLetter: string;
  cvUrl?: string;
}

export interface JobFilter {
  industry?: string;
  province?: string;
  type?: JobType;
  level?: JobLevel;
  search?: string;
  page?: number;
  limit?: number;
  sort?: "newest" | "salary_asc" | "salary_desc";
}
