import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
function MainLayout() {
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;
