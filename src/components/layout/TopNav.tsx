import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { useState } from "react";
import infyndLogo from "@/assets/infynd-logo.png";

const TopNav = () => {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 h-16 border-b bg-background/90 backdrop-blur-md">
      <div className="flex h-full items-center gap-4 px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Logo */}
        <Link to="/" className="shrink-0">
          <img src={infyndLogo} alt="InFynd" className="h-7" />
        </Link>

        {/* Search bar */}
        <div className="flex-1 max-w-lg mx-auto hidden md:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Ask anything about our data products..."
              className="pl-10 bg-secondary border-0 focus-visible:ring-1 focus-visible:ring-primary/30 h-9 rounded-full text-sm"
            />
          </div>
        </div>

        {/* Mobile search toggle */}
        <button onClick={() => setSearchOpen(!searchOpen)} className="md:hidden text-muted-foreground hover:text-foreground">
          <Search className="h-5 w-5" />
        </button>

        {/* CTAs */}
        <div className="flex items-center gap-3 shrink-0">
          <Button variant="ghost" size="sm" className="hidden lg:inline-flex text-muted-foreground" asChild>
            <Link to="/use-cases">Use Cases</Link>
          </Button>
          <Button variant="ghost" size="sm" className="hidden lg:inline-flex text-muted-foreground" asChild>
            <Link to="/compare">Compare</Link>
          </Button>
          <Button variant="ghost" size="sm" className="hidden lg:inline-flex text-muted-foreground" asChild>
            <Link to="/compliance">Compliance</Link>
          </Button>
          <Button size="sm" className="rounded-full px-5">Talk to Sales</Button>
        </div>
      </div>

      {/* Mobile search expansion */}
      {searchOpen && (
        <div className="md:hidden px-4 pb-3 bg-background border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Ask about our data..." className="pl-10 bg-secondary border-0 rounded-full" autoFocus />
          </div>
        </div>
      )}
    </header>
  );
};

export default TopNav;
