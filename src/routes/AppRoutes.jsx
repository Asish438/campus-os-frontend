import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layout
import AppShell from '../components/layout/AppShell';
import ProtectedRoute from './ProtectedRoute';

// Landing & Auth
import LandingPage from '../pages/landing/LandingPage';
import LoginPage from '../pages/auth/LoginPage';
import StudentRegisterPage from '../pages/auth/StudentRegisterPage';
import RoleSelectionPage from '../pages/auth/RoleSelectionPage';
import OtpVerificationPage from '../pages/auth/OtpVerificationPage';

// Student Pages
import StudentDashboard from '../pages/student/StudentDashboard';
import AcademicsPage from '../pages/student/AcademicsPage';
import AttendancePage from '../pages/student/AttendancePage';
import AiStudyPage from '../pages/student/AiStudyPage';
import AssignmentsPage from '../pages/student/AssignmentsPage';
import HostelPage from '../pages/student/HostelPage';
import ComplaintsPage from '../pages/student/ComplaintsPage';
import GatePassPage from '../pages/student/GatePassPage';
import VisitorsPage from '../pages/student/VisitorsPage';
import TransportPage from '../pages/student/TransportPage';
import FeesPage from '../pages/student/FeesPage';
import DocumentsPage from '../pages/student/DocumentsPage';
import NoticesPage from '../pages/student/NoticesPage';
import ProfilePage from '../pages/student/ProfilePage';

// Faculty Pages
import FacultyDashboard from '../pages/faculty/FacultyDashboard';
import FacultyCoursesPage from '../pages/faculty/FacultyCoursesPage';
import FacultyAttendancePage from '../pages/faculty/FacultyAttendancePage';
import FacultyModulesPage from '../pages/faculty/FacultyModulesPage';
import FacultyAssignmentsPage from '../pages/faculty/FacultyAssignmentsPage';
import FacultyStudentsPage from '../pages/faculty/FacultyStudentsPage';
import FacultyAnnouncementsPage from '../pages/faculty/FacultyAnnouncementsPage';

// Warden Pages
import WardenDashboard from '../pages/warden/WardenDashboard';
import WardenComplaintsPage from '../pages/warden/WardenComplaintsPage';
import WardenGatePassPage from '../pages/warden/WardenGatePassPage';
import WardenVisitorsPage from '../pages/warden/WardenVisitorsPage';
import WardenHostelPage from '../pages/warden/WardenHostelPage';

// Security Pages
import SecurityDashboard from '../pages/security/SecurityDashboard';
import SecurityScannerPage from '../pages/security/SecurityScannerPage';
import SecurityVisitorsPage from '../pages/security/SecurityVisitorsPage';
import SecurityLogsPage from '../pages/security/SecurityLogsPage';

// Accounts & Transport
import AccountsDashboard from '../pages/accounts/AccountsDashboard';
import TransportDashboard from '../pages/transport/TransportDashboard';

// Admin Pages
import AdminDashboard from '../pages/admin/AdminDashboard';
import AdminStudentsPage from '../pages/admin/AdminStudentsPage';
import AdminDepartmentsPage from '../pages/admin/AdminDepartmentsPage';
import AdminAcademicsPage from '../pages/admin/AdminAcademicsPage';
import AdminAttendancePage from '../pages/admin/AdminAttendancePage';
import AdminRequestsPage from '../pages/admin/AdminRequestsPage';
import AdminComplaintsPage from '../pages/admin/AdminComplaintsPage';
import AdminHostelPage from '../pages/admin/AdminHostelPage';
import AdminFeesPage from '../pages/admin/AdminFeesPage';
import AdminTransportPage from '../pages/admin/AdminTransportPage';
import AdminCommunicationPage from '../pages/admin/AdminCommunicationPage';
import AdminAnalyticsPage from '../pages/admin/AdminAnalyticsPage';
import AdminReportsPage from '../pages/admin/AdminReportsPage';
import AdminAuditLogsPage from '../pages/admin/AdminAuditLogsPage';
import AdminSettingsPage from '../pages/admin/AdminSettingsPage';

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Pages */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register-student" element={<StudentRegisterPage />} />
      <Route path="/role-selection" element={<RoleSelectionPage />} />
      <Route path="/otp-verification" element={<OtpVerificationPage />} />

      {/* Authenticated Application Shell */}
      <Route element={<AppShell />}>
        {/* Student Routes */}
        <Route element={<ProtectedRoute allowedRoles={['STUDENT', 'ADMIN']} />}>
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="/student/academics" element={<AcademicsPage />} />
          <Route path="/student/attendance" element={<AttendancePage />} />
          <Route path="/student/ai-study" element={<AiStudyPage />} />
          <Route path="/student/assignments" element={<AssignmentsPage />} />
          <Route path="/student/hostel" element={<HostelPage />} />
          <Route path="/student/complaints" element={<ComplaintsPage />} />
          <Route path="/student/gate-pass" element={<GatePassPage />} />
          <Route path="/student/visitors" element={<VisitorsPage />} />
          <Route path="/student/transport" element={<TransportPage />} />
          <Route path="/student/fees" element={<FeesPage />} />
          <Route path="/student/documents" element={<DocumentsPage />} />
          <Route path="/student/notices" element={<NoticesPage />} />
          <Route path="/student/notifications" element={<NoticesPage />} />
          <Route path="/student/profile" element={<ProfilePage />} />
        </Route>

        {/* Faculty Routes */}
        <Route element={<ProtectedRoute allowedRoles={['FACULTY', 'ADMIN']} />}>
          <Route path="/faculty/dashboard" element={<FacultyDashboard />} />
          <Route path="/faculty/courses" element={<FacultyCoursesPage />} />
          <Route path="/faculty/attendance" element={<FacultyAttendancePage />} />
          <Route path="/faculty/modules" element={<FacultyModulesPage />} />
          <Route path="/faculty/assignments" element={<FacultyAssignmentsPage />} />
          <Route path="/faculty/students" element={<FacultyStudentsPage />} />
          <Route path="/faculty/announcements" element={<FacultyAnnouncementsPage />} />
        </Route>

        {/* Warden Routes */}
        <Route element={<ProtectedRoute allowedRoles={['WARDEN', 'ADMIN']} />}>
          <Route path="/warden/dashboard" element={<WardenDashboard />} />
          <Route path="/warden/complaints" element={<WardenComplaintsPage />} />
          <Route path="/warden/gate-pass" element={<WardenGatePassPage />} />
          <Route path="/warden/visitors" element={<WardenVisitorsPage />} />
          <Route path="/warden/hostel" element={<WardenHostelPage />} />
        </Route>

        {/* Security Routes */}
        <Route element={<ProtectedRoute allowedRoles={['SECURITY', 'ADMIN']} />}>
          <Route path="/security/dashboard" element={<SecurityDashboard />} />
          <Route path="/security/scanner" element={<SecurityScannerPage />} />
          <Route path="/security/visitors" element={<SecurityVisitorsPage />} />
          <Route path="/security/logs" element={<SecurityLogsPage />} />
        </Route>

        {/* Accounts Routes */}
        <Route element={<ProtectedRoute allowedRoles={['ACCOUNTS', 'ADMIN']} />}>
          <Route path="/accounts/dashboard" element={<AccountsDashboard />} />
        </Route>

        {/* Transport Routes */}
        <Route element={<ProtectedRoute allowedRoles={['TRANSPORT', 'ADMIN']} />}>
          <Route path="/transport/dashboard" element={<TransportDashboard />} />
        </Route>

        {/* Admin Routes */}
        <Route element={<ProtectedRoute allowedRoles={['ADMIN']} />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/students" element={<AdminStudentsPage />} />
          <Route path="/admin/departments" element={<AdminDepartmentsPage />} />
          <Route path="/admin/academics" element={<AdminAcademicsPage />} />
          <Route path="/admin/attendance" element={<AdminAttendancePage />} />
          <Route path="/admin/requests" element={<AdminRequestsPage />} />
          <Route path="/admin/complaints" element={<AdminComplaintsPage />} />
          <Route path="/admin/hostel" element={<AdminHostelPage />} />
          <Route path="/admin/fees" element={<AdminFeesPage />} />
          <Route path="/admin/transport" element={<AdminTransportPage />} />
          <Route path="/admin/communication" element={<AdminCommunicationPage />} />
          <Route path="/admin/analytics" element={<AdminAnalyticsPage />} />
          <Route path="/admin/reports" element={<AdminReportsPage />} />
          <Route path="/admin/audit-logs" element={<AdminAuditLogsPage />} />
          <Route path="/admin/settings" element={<AdminSettingsPage />} />
        </Route>
      </Route>

      {/* Fallback to root */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
