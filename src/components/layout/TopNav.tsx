import { Search, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { useState } from "react";

interface TopNavProps {
  onToggleSidebar: () => void;
  sidebarOpen: boolean;
}

const TopNav = ({ onToggleSidebar, sidebarOpen }: TopNavProps) => {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 h-16 border-b bg-card/80 backdrop-blur-md">
      <div className="flex h-full items-center gap-4 px-4 lg:px-6">
        {/* Sidebar toggle */}
        <button onClick={onToggleSidebar} className="shrink-0 text-muted-foreground hover:text-foreground transition-colors">
          {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-display font-bold text-sm">iF</span>
          </div>
          <span className="font-display font-bold text-xl text-foreground hidden sm:block">InFynd</span>
        </Link>

        {/* Search bar */}
        <div className="flex-1 max-w-xl mx-auto hidden md:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Ask anything about our data products..."
              className="pl-10 bg-muted/50 border-0 focus-visible:ring-1 focus-visible:ring-primary/30 h-10 rounded-full"
            />
          </div>
        </div>

        {/* Mobile search toggle */}
        <button onClick={() => setSearchOpen(!searchOpen)} className="md:hidden text-muted-foreground hover:text-foreground">
          <Search className="h-5 w-5" />
        </button>

        {/* CTAs */}
        <div className="flex items-center gap-2 shrink-0">
          <Button variant="ghost" size="sm" className="hidden lg:inline-flex" asChild>
            <Link to="/use-cases">Explore</Link>
          </Button>
          <Button variant="outline" size="sm" className="hidden sm:inline-flex">
            Request Sample
          </Button>
          <Button size="sm">Talk to Sales</Button>
        </div>
      </div>

      {/* Mobile search expansion */}
      {searchOpen && (
        <div className="md:hidden px-4 pb-3 bg-card border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Ask about our data..." className="pl-10 bg-muted/50 border-0 rounded-full" autoFocus />
          </div>
        </div>
      )}
    </header>
  );
};

export default TopNav;
