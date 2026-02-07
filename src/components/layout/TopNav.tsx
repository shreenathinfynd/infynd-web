import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const TopNav = () => {
  return (
    <header className="sticky top-0 z-50 h-14 border-b bg-background/80 backdrop-blur-xl">
      <div className="flex h-full items-center justify-between px-6 max-w-7xl mx-auto">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5">
          <div className="h-7 w-7 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-display font-bold text-xs">iF</span>
          </div>
          <span className="font-display font-bold text-lg text-foreground">InFynd</span>
          <span className="text-xs text-muted-foreground font-medium hidden sm:block">Intelligence</span>
        </Link>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
          <Link to="/use-cases" className="hover:text-foreground transition-colors">Use Cases</Link>
          <Link to="/compare" className="hover:text-foreground transition-colors">Compare</Link>
          <Link to="/compliance" className="hover:text-foreground transition-colors">Trust & Compliance</Link>
        </nav>

        {/* CTAs */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="hidden sm:inline-flex text-muted-foreground">
            Request Sample
          </Button>
          <Button size="sm">Talk to Sales</Button>
        </div>
      </div>
    </header>
  );
};

export default TopNav;
