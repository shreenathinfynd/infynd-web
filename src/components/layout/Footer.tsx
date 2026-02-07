import { Link } from "react-router-dom";
import { Globe, Shield } from "lucide-react";

const Footer = () => (
  <footer className="border-t py-10 px-6">
    <div className="max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Trust badges */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Globe className="h-4 w-4 text-primary" />
            <span>32 Global Regions</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Shield className="h-4 w-4 text-orchestrator-success" />
            <span>Secure & Compliant</span>
          </div>
        </div>

        {/* Links */}
        <div className="flex items-center gap-6 text-sm text-muted-foreground">
          <Link to="/compliance" className="hover:text-foreground transition-colors">Compliance</Link>
          <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
          <a href="#" className="hover:text-foreground transition-colors">Terms</a>
        </div>
      </div>
      <div className="text-center mt-6 text-xs text-muted-foreground">
        © 2025 InFynd Intelligence. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
