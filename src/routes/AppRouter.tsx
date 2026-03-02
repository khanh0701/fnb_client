import { Routes, Route, Navigate } from 'react-router-dom';
import { RequireAuth, GuestOnly } from './guards';
import MainLayout from '@/components/layout/MainLayout';
import AuthLayout from '@/components/layout/AuthLayout';

import HomePage          from '@/pages/home/HomePage';
import LoginPage         from '@/pages/auth/LoginPage';
import RegisterPage      from '@/pages/auth/RegisterPage';
import ProfilePage       from '@/pages/user/ProfilePage';
import TransferListPage  from '@/pages/transfer/TransferListPage';
import TransferDetailPage from '@/pages/transfer/TransferDetailPage';
import CreateTransferPage from '@/pages/transfer/CreateTransferPage';
import JobListPage       from '@/pages/jobs/JobListPage';
import JobDetailPage     from '@/pages/jobs/JobDetailPage';
import CreateJobPage     from '@/pages/jobs/CreateJobPage';

export default function AppRouter() {
  return (
    <Routes>
      {/* Guest only */}
      <Route element={<GuestOnly />}>
        <Route element={<AuthLayout />}>
          <Route path="/login"    element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
      </Route>

      {/* Main app */}
      <Route element={<MainLayout />}>
        {/* Public */}
        <Route path="/"               element={<HomePage />} />
        <Route path="/sang-nhuong"    element={<TransferListPage />} />
        <Route path="/sang-nhuong/:id" element={<TransferDetailPage />} />
        <Route path="/viec-lam"       element={<JobListPage />} />
        <Route path="/viec-lam/:id"   element={<JobDetailPage />} />

        {/* Auth required */}
        <Route element={<RequireAuth />}>
          <Route path="/ho-so" element={<ProfilePage />} />
        </Route>

        {/* Seller / Admin */}
        <Route element={<RequireAuth roles={['seller', 'admin']} />}>
          <Route path="/sang-nhuong/tao-tin" element={<CreateTransferPage />} />
        </Route>

        {/* Recruiter / Admin */}
        <Route element={<RequireAuth roles={['recruiter', 'admin']} />}>
          <Route path="/viec-lam/dang-tuyen" element={<CreateJobPage />} />
        </Route>
      </Route>

      {/* 404 fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

