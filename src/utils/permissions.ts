import type { User, UserRole } from '@/types';

/**
 * Lấy tất cả role names từ user (lowercase) để check quyền
 */
function getRoles(userOrRole?: User | UserRole | null): string[] {
  if (!userOrRole) return [];
  if (typeof userOrRole === 'string') return [userOrRole.toLowerCase()];
  // Nếu là User object, dùng mảng roles (chính xác hơn user.role)
  const fromArray = userOrRole.roles?.map((r) => r.roleName.toLowerCase()) ?? [];
  const fromPrimary = userOrRole.role ? [userOrRole.role] : [];
  return [...new Set([...fromArray, ...fromPrimary])];
}

function hasRole(user: User | UserRole | null | undefined, ...roles: string[]): boolean {
  const userRoles = getRoles(user);
  return roles.some((r) => userRoles.includes(r.toLowerCase()));
}

export const can = {
  createTransfer:   (user?: User | UserRole | null) => hasRole(user, 'admin', 'seller'),
  sendOffer:        (user?: User | UserRole | null) => hasRole(user, 'admin', 'buyer'),
  createJob:        (user?: User | UserRole | null) => hasRole(user, 'admin', 'recruiter'),
  applyJob:         (user?: User | UserRole | null) => hasRole(user, 'admin', 'candidate'),
  viewApplications: (user?: User | UserRole | null) => hasRole(user, 'admin', 'recruiter'),
  manageOffers:     (user?: User | UserRole | null) => hasRole(user, 'admin', 'seller'),
  isAdmin:          (user?: User | UserRole | null) => hasRole(user, 'admin'),
};
