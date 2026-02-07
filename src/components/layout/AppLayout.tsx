import { useState } from "react";
import TopNav from "./TopNav";
import SideProductRail from "./SideProductRail";
import FloatingChat from "./FloatingChat";
import Footer from "./Footer";
import { cn } from "@/lib/utils";

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <TopNav onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} sidebarOpen={sidebarOpen} />
      <SideProductRail open={sidebarOpen} />
      <main className={cn(
        "flex-1 transition-all duration-300",
        sidebarOpen ? "ml-60" : "ml-0 lg:ml-14"
      )}>
        {children}
      </main>
      <Footer />
      <FloatingChat />
    </div>
  );
};

export default AppLayout;
