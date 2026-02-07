import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import infyndLogo from "@/assets/infynd-logo.png";

const TopNav = () => {
  return (
    <header className="sticky top-0 z-50 h-16 border-b bg-background/90 backdrop-blur-md">
      <div className="flex h-full items-center gap-4 px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Logo */}
        <Link to="/" className="shrink-0">
          <img src={infyndLogo} alt="InFynd" className="h-10" />
        </Link>

        <div className="flex-1" />

        {/* CTAs */}
        <div className="flex items-center gap-3 shrink-0">
          <Button variant="ghost" size="sm" className="hidden lg:inline-flex text-muted-foreground" asChild>
            <Link to="/#products">Products</Link>
          </Button>
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
    </header>
  );
};

export default TopNav;
