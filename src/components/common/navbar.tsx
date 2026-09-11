import { useState, useEffect } from "react";
import { NavLink } from "react-router";
import { 
  Home, 
  Heart, 
  Ticket, 
  Bell, 
  User, 
  Settings, 
  Film,
  Menu,
  X
} from "lucide-react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const navItems = [
    { label: "Home", path: "/", icon: Home },
    { label: "Favorites", path: "/favorites", icon: Heart },
    { label: "Transactions", path: "/transactions", icon: Ticket },
    { label: "Notifications", path: "/notifications", icon: Bell },
    { label: "Profile", path: "/profile", icon: User },
    { label: "Settings", path: "/settings", icon: Settings },
  ];

  // Handle scroll detection for background opacity and scroll direction (autohide)
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Toggle background opacity
      setIsScrolled(currentScrollY > 20);

      // Handle scroll direction hide/show
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setIsVisible(false); // Scrolling down -> Hide
      } else {
        setIsVisible(true);  // Scrolling up -> Show
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 text-white ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        } ${
          isScrolled 
            ? "bg-[#0b0e13]/95 backdrop-blur-md border-b border-gray-800/60 shadow-lg" 
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="container mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
          
          {/* Brand Logo */}
          <NavLink to="/" className="flex items-center gap-2 group z-50">
            <div className="text-red-600 transition-transform group-hover:scale-105">
              <Film className="w-7 h-7 fill-red-600/20" />
            </div>
            <span className="text-xl font-black tracking-wider text-white">
              CINE<span className="text-red-600">BOOK</span>
            </span>
          </NavLink>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `relative flex items-center gap-2 py-5 px-3 text-sm font-medium transition-colors ${
                      isActive ? "text-red-600" : "text-gray-400 hover:text-white"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>

                      {isActive && (
                        <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-red-600 rounded-t-full shadow-[0_-2px_8px_rgba(229,46,61,0.5)]" />
                      )}
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>

          {/* Hamburger / Close Icon Button for Mobile & iPad */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden z-50 p-2 text-gray-300 hover:text-white focus:outline-none transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6 text-red-600" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Dark Backdrop Overlay */}
      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Mobile & iPad Slide-out Drawer Menu */}
      <aside
        className={`fixed top-0 right-0 bottom-0 w-[280px] bg-[#0b0e13] border-l border-gray-800/80 z-40 lg:hidden pt-20 px-6 flex flex-col gap-2 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? "bg-red-600/10 text-red-600 border border-red-600/20"
                    : "text-gray-400 hover:bg-gray-800/50 hover:text-white"
                }`
              }
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </aside>
    </>
  );
}