import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t bg-card py-8 px-6">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
      <div className="flex items-center gap-2">
        <div className="h-6 w-6 rounded bg-primary flex items-center justify-center">
          <span className="text-primary-foreground font-display font-bold text-[10px]">iF</span>
        </div>
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
