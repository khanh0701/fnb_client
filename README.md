# BizConnect — Sang nhượng & Việc làm

Ứng dụng React TypeScript full-featured, dark theme, kết nối người sang nhượng kinh doanh với người mua, và nhà tuyển dụng với ứng viên.

---

## 🛠 Công nghệ

| Layer | Thư viện |
|-------|----------|
| UI | React 18 + TypeScript |
| Routing | React Router v6 |
| Server state | TanStack Query v5 (React Query) |
| HTTP | Axios + Interceptors |
| Client state | Zustand (persist) |
| Forms | React Hook Form + Zod |
| Styling | TailwindCSS 3 + custom CSS vars |
| Build | Vite 5 |

---

## 📁 Cấu trúc

```
src/
├── api/
│   ├── http.ts            # Axios instance + interceptors (token, 401 redirect)
│   ├── authApi.ts         # Auth endpoints
│   ├── transferApi.ts     # Sang nhượng endpoints
│   └── jobApi.ts          # Việc làm endpoints
├── store/
│   ├── authStore.ts       # Zustand auth (persist localStorage)
│   └── uiStore.ts         # Zustand UI (toasts, menu)
├── hooks/
│   ├── queryKeys.ts       # React Query key factory
│   ├── useAuth.ts         # login, register, me, updateProfile, logout
│   ├── useTransfer.ts     # list, detail, create, delete, offer
│   └── useJob.ts          # list, detail, create, delete, apply
├── components/
│   ├── common/            # Input, Button, Select, Card, Pagination, Toast...
│   └── layout/            # Navbar, MainLayout, AuthLayout
├── pages/
│   ├── auth/              # LoginPage, RegisterPage
│   ├── home/              # HomePage
│   ├── transfer/          # TransferListPage, TransferDetailPage, CreateTransferPage
│   ├── jobs/              # JobListPage, JobDetailPage, CreateJobPage
│   └── user/              # ProfilePage
├── routes/
│   ├── AppRouter.tsx      # Tất cả routes
│   └── guards.tsx         # RequireAuth, GuestOnly
├── types/index.ts         # Tất cả TypeScript types
└── utils/
    ├── index.ts           # Helpers (format, truncate...)
    ├── constants.ts       # Options arrays (provinces, categories...)
    └── permissions.ts     # can.createTransfer(), can.applyJob()...
```

---

## 🔐 Phân quyền theo Role

| Role | Quyền |
|------|-------|
| `seller` | Đăng tin sang nhượng |
| `buyer` | Gửi offer sang nhượng |
| `recruiter` | Đăng tin tuyển dụng, xem đơn ứng tuyển |
| `candidate` | Nộp hồ sơ ứng tuyển |
| `admin` | Tất cả quyền trên |

---

## 🚀 Cài đặt & Chạy

```bash
# 1. Cài dependencies
npm install

# 2. Config API URL
cp .env.example .env
# Sửa VITE_API_BASE_URL=http://your-backend.com/api/v1

# 3. Chạy dev
npm run dev

# 4. Build production
npm run build
```

---

## 🌐 API Endpoints cần implement (Backend)

### Auth
```
POST   /api/v1/auth/login
POST   /api/v1/auth/register
GET    /api/v1/auth/me
PUT    /api/v1/auth/profile
PUT    /api/v1/auth/password
```

### Sang nhượng
```
GET    /api/v1/transfers              ?category,province,minPrice,maxPrice,search,sort,page,limit
GET    /api/v1/transfers/mine
GET    /api/v1/transfers/:id
POST   /api/v1/transfers
PUT    /api/v1/transfers/:id
DELETE /api/v1/transfers/:id
GET    /api/v1/transfers/:id/offers
POST   /api/v1/transfers/:id/offers
PATCH  /api/v1/transfers/:id/offers/:offerId
```

### Việc làm
```
GET    /api/v1/jobs                   ?type,level,industry,province,search,sort,page,limit
GET    /api/v1/jobs/mine
GET    /api/v1/jobs/applications/mine
GET    /api/v1/jobs/:id
POST   /api/v1/jobs
PUT    /api/v1/jobs/:id
DELETE /api/v1/jobs/:id
GET    /api/v1/jobs/:id/applications
POST   /api/v1/jobs/:id/apply
PATCH  /api/v1/jobs/:id/applications/:appId
```

### Response formats

**Paginated list:**
```json
{
  "data": [...],
  "meta": { "page": 1, "limit": 12, "total": 100, "totalPages": 9 }
}
```

**Auth:**
```json
{
  "user": { "id": "...", "name": "...", "email": "...", "role": "candidate", "createdAt": "..." },
  "token": "eyJ..."
}
```

---

## 🎨 Design System

Dark theme với màu sắc:
- **Background**: `#0e0e1a` / `#13131f` / `#1a1a2e`  
- **Volt accent**: `#c8ff1a` (CTA, highlights)
- **Teal**: `#4ecdc4` (success, salary)
- **Coral**: `#ff4757` (error, danger)
- **Fonts**: Syne (display) + DM Sans (body) + JetBrains Mono (code)
