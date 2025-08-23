import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const UserLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto p-4">
        <Outlet /> {/* Here child pages will render */}
      </main>
      <Footer />
    </div>
  );
};

export default UserLayout;
