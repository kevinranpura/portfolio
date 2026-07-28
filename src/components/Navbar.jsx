import { motion, AnimatePresence } from 'motion/react';
import { ThemeContext } from './../App';
import { useContext, useState, useEffect } from 'react';
import { Menu, X, Moon, Sun } from 'lucide-react';

function Navbar() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
    { label: '~/home', target: 'home' },
    { label: '~/experience', target: 'experience' },
    { label: '~/projects', target: 'projects' },
    { label: '~/about', target: 'about' },
    { label: '~/skills', target: 'skills' },
    { label: '~/contact', target: 'contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, target) => {
    e.preventDefault();
    const section = document.getElementById(target);
    if (section) {
      if (isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
        setTimeout(() => {
          section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 300);
      } else {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled
        ? theme === 'dark'
          ? 'bg-[#050806]/95 backdrop-blur-xl shadow-lg shadow-[#00e676]/8'
          : 'bg-white/95 backdrop-blur-xl shadow-lg shadow-[#86efac]/12'
        : theme === 'dark'
          ? 'bg-[#050806]/80 backdrop-blur-md'
          : 'bg-white/80 backdrop-blur-md'
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative group"
          >
            <motion.div
              className={`flex items-center text-[16px] font-medium tracking-tight ${theme === 'dark' ? 'text-[#00e676]' : 'text-[#334155]'
                }`}
            >
              <span className={`text-[18px] font-mono mr-2 ${theme === 'dark' ? 'text-[#00e676]' : 'text-green-600'}`}>
                ●
              </span>
              <span className={`font-mono mr-2 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                kevin
              </span>
              <span className={`font-mono font-light text-[#6b6b6b]`}>
                .dev
              </span>
            </motion.div>
            <motion.div
              className={`absolute -bottom-1 left-0 h-0.5 ${theme === 'dark' ? 'bg-[#00e676]' : 'bg-[#86efac]'
                }`}
              initial={{ width: 0 }}
              whileHover={{ width: '100%' }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, idx) => (
              <motion.a
                key={item.target}
                href={`#${item.target}`}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -2 }}
                onClick={(e) => handleNavClick(e, item.target)}
                className="relative group"
              >
                <span className={`text-[14px] font-medium transition-colors duration-200 ${theme === 'dark' ? 'text-[#00e676]' : 'text-[#334155]'
                  }`}>
                  {item.label}
                </span>
                <motion.div
                  className={`absolute -bottom-1 left-0 h-0.5 ${theme === 'dark' ? 'bg-[#00e676]' : 'bg-[#86efac]'
                    }`}
                  initial={{ width: 0 }}
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}

            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className={`p-2.5 rounded-xl transition-all duration-300 ${theme === 'dark'
                ? 'bg-[#00e676]/10 text-[#00e676] hover:bg-[#00e676]/20'
                : 'bg-[#86efac]/20 text-[#334155] hover:bg-[#86efac]/30'
                }`}
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait">
                {theme === 'dark' ? (
                  <motion.div
                    key="sun"
                    initial={{ rotate: -180, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 180, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Sun className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ rotate: 180, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -180, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Moon className="w-5 h-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>

          {/* Mobile Menu Buttons */}
          <div className="flex items-center gap-2 md:hidden">
            <motion.button
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className={`p-2 rounded-xl transition-all duration-300 ${theme === 'dark'
                ? 'bg-[#00e676]/10 text-[#00e676]'
                : 'bg-[#86efac]/20 text-[#334155]'
                }`}
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait">
                {theme === 'dark' ? (
                  <motion.div
                    key="sun"
                    initial={{ rotate: -180, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 180, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Sun className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ rotate: 180, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -180, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Moon className="w-5 h-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-xl transition-all duration-300 ${theme === 'dark'
                ? 'bg-[#00e676]/10 text-[#00e676]'
                : 'bg-[#86efac]/20 text-[#334155]'
                }`}
              aria-label="Toggle mobile menu"
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-6 h-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="md:hidden overflow-hidden"
            >
              <div className="flex flex-col space-y-2 py-4">
                {navItems.map((item, idx) => (
                  <motion.a
                    key={item.target}
                    href={`#${item.target}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    whileHover={{ x: 8 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => handleNavClick(e, item.target)}
                    className={`text-base font-medium px-4 py-3 rounded-xl transition-all duration-200 ${theme === 'dark'
                      ? 'text-[#00e676] hover:bg-[#00e676]/10'
                      : 'text-[#334155] hover:bg-[#86efac]/20'
                      }`}
                  >
                    {item.label}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}

export default Navbar;