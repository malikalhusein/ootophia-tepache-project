import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-cream-dark py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full gradient-gold flex items-center justify-center">
              <span className="text-forest font-black text-xl">O</span>
            </div>
            <div>
              <p className="text-forest font-bold leading-tight">OOTOPHIA</p>
              <p className="text-forest/60 text-sm leading-tight">BREWING LABS</p>
            </div>
          </Link>

          {/* Links */}
          <div className="flex items-center gap-6">
            <Link to="/" className="text-forest/70 hover:text-forest font-medium transition-colors">
              Home
            </Link>
            <Link to="/batch-tracker" className="text-forest/70 hover:text-forest font-medium transition-colors">
              Batch Tracker
            </Link>
          </div>

          {/* Copyright */}
          <p className="text-forest/50 text-sm">
            © 2026 Ootophia Brewing Labs. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
