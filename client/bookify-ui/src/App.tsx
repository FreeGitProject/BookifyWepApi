import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserLayout from "./layouts/UserLayout";
import HomePage from "./pages/HomePage";
import ApartmentListPage from "./features/apartments/pages/ApartmentListPage";
import ApartmentDetailPage from "./features/apartments/pages/ApartmentDetailPage";
import RegisterPage from "./features/auth/pages/RegisterPage";
import LoginPage from "./features/auth/pages/LoginPage";
import PrivateRoute from "./components/common/PrivateRoute";
import ProfilePage from "./features/user/pages/ProfilePage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* User Layout Routes */}
        <Route path="/" element={<UserLayout />}>
          <Route index element={<HomePage />} />
          <Route path="apartments" element={<ApartmentListPage />} />
          <Route path="apartments/:id" element={<ApartmentDetailPage />} />

           {/* Auth Routes */}
        <Route path="register" element={<RegisterPage />} />
        <Route path="login" element={<LoginPage />} />
          {/* Later add apartments, bookings, profile pages here */}
        </Route>
 {/* Protected routes */}
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          }
        />
        {/* TODO: Add Admin Routes with AdminLayout */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
