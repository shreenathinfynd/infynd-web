import TopNav from "./TopNav";
import FloatingChat from "./FloatingChat";
import Footer from "./Footer";

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <TopNav />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <FloatingChat />
    </div>
  );
};

export default AppLayout;
