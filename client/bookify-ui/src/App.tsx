import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserLayout from "./layouts/UserLayout";
import HomePage from "./pages/HomePage";
import ApartmentListPage from "./features/apartments/pages/ApartmentListPage";
import ApartmentDetailPage from "./features/apartments/pages/ApartmentDetailPage";
import RegisterPage from "./features/auth/pages/RegisterPage";
import LoginPage from "./features/auth/pages/LoginPage";
import PrivateRoute from "./components/common/PrivateRoute";
import ProfilePage from "./features/user/pages/ProfilePage";
import { AuthProvider } from "./contexts/AuthContext";
import PublicOnlyRoute from "./components/common/PublicOnlyRoute";
import AdminApartmentDashboard from "./pages/AdminApartmentDashboard";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* User Layout Routes */}
          <Route path="/" element={<UserLayout />}>
            <Route index element={<HomePage />} />
            <Route path="apartments" element={<ApartmentListPage />} />
            <Route path="apartments/:id" element={<ApartmentDetailPage />} />

            {/* Auth Routes */}
            <Route path="register" element={

              <PublicOnlyRoute>
                <RegisterPage />
              </PublicOnlyRoute>

            } />
            <Route path="login" element={
              <PublicOnlyRoute>
                <LoginPage />
              </PublicOnlyRoute>

            } />
            {/* Later add apartments, bookings, profile pages here */}
          </Route>
          {/* Protected routes (outside UserLayout) */}
          <Route
            path="/profile"
            element={
              <PrivateRoute>

                <ProfilePage />

              </PrivateRoute>
            }
          />
          <Route path="admin" element={
            <AdminApartmentDashboard/>
          }/>
          {/* TODO: Add Admin Routes with AdminLayout */}
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
