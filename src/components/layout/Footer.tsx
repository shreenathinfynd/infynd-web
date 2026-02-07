import { Link } from "react-router-dom";
import infyndLogo from "@/assets/infynd-logo.png";

const Footer = () => (
  <footer className="border-t py-8 px-6">
    <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
      <div className="flex items-center gap-3">
        <img src={infyndLogo} alt="InFynd" className="h-5" />
        <span>© 2025 InFynd. All rights reserved.</span>
      </div>
      <div className="flex gap-6">
        <Link to="/compliance" className="hover:text-foreground transition-colors">Compliance</Link>
        <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
        <a href="#" className="hover:text-foreground transition-colors">Terms</a>
        <a href="#" className="hover:text-foreground transition-colors">Contact</a>
      </div>
    </div>
  </footer>
);

export default Footer;
