import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserLayout from "./layouts/UserLayout";
import HomePage from "./pages/HomePage";
import ApartmentListPage from "./features/apartments/pages/ApartmentListPage";
import ApartmentDetailPage from "./features/apartments/pages/ApartmentDetailPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* User Layout Routes */}
        <Route path="/" element={<UserLayout />}>
          <Route index element={<HomePage />} />
          <Route path="apartments" element={<ApartmentListPage />} />
          <Route path="apartments/:id" element={<ApartmentDetailPage />} />
          {/* Later add apartments, bookings, profile pages here */}
        </Route>

        {/* TODO: Add Admin Routes with AdminLayout */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
