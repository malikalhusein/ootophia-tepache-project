import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const Navbar = () => {
  const location = useLocation();
  
  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
    >
      <div className="max-w-7xl mx-auto">
        <div className="glass-card-strong rounded-full px-6 py-3 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full gradient-gold flex items-center justify-center">
              <span className="text-forest font-black text-lg">O</span>
            </div>
            <div className="hidden sm:block">
              <p className="text-forest font-bold text-sm leading-tight">OOTOPHIA</p>
              <p className="text-forest/60 text-xs leading-tight">BREWING LABS</p>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-2">
            <Link
              to="/"
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                location.pathname === "/"
                  ? "bg-forest text-cream"
                  : "text-forest hover:bg-forest/10"
              }`}
            >
              Home
            </Link>
            <Link
              to="/batch-tracker"
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                location.pathname === "/batch-tracker"
                  ? "bg-forest text-cream"
                  : "text-forest hover:bg-forest/10"
              }`}
            >
              Batch Tracker
            </Link>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
