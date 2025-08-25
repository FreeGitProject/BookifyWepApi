import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const UserLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-20">
        <Outlet /> {/* Here child pages will render */}
      </main>
      <Footer />
    </div>
  );
};

export default UserLayout;
