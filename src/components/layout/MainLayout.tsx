import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";

const DRAWER_WIDTH = 260;
const HEADER_HEIGHT = 64; // 4rem = 64px

const MainLayout: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header - Full width at top */}
      <Header handleDrawerToggle={handleDrawerToggle} />

      {/* Sidebar - Below header */}
      <Sidebar
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
      />

      {/* Main Content Area */}
      <main
        className="min-h-screen flex flex-col"
        style={{
          paddingTop: HEADER_HEIGHT,
          marginLeft: 0,
        }}
      >
        {/* Desktop: offset by sidebar width */}
        <div
          className="hidden md:flex md:flex-col flex-1"
          style={{ marginLeft: DRAWER_WIDTH }}
        >
          <div className="flex-1 p-6">
            <Outlet />
          </div>
          <Footer />
        </div>

        {/* Mobile: full width */}
        <div className="md:hidden flex-1 flex flex-col">
          <div className="flex-1 p-4">
            <Outlet />
          </div>
          <Footer />
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
