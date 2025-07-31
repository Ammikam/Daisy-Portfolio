import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Code,
  Home,
  User,
  Briefcase,
  FolderOpen,
  Mail,
  Award,
} from "lucide-react";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isDarkSection, setIsDarkSection] = useState(true); 

  const navItems = [
    { name: "Home", href: "#home", icon: Home },
    { name: "About", href: "#about", icon: User },
    { name: "Skills", href: "#skills", icon: Code },
    { name: "Experience", href: "#experience", icon: Briefcase },
    { name: "Projects", href: "#projects", icon: FolderOpen },
    { name: "Contact", href: "#contact", icon: Mail },
  ];

  // Define which sections have dark backgrounds
  const darkSections = ["home"];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = navItems.map((item) => item.href.substring(1));
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i]);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          // Update isDarkSection based on current section
          setIsDarkSection(darkSections.includes(sections[i]));
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navItems]);

  const handleNavClick = (href) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const logoVariants = {
    hover: {
      scale: 1.1,
      rotate: [0, -10, 10, -10, 0],
      transition: { duration: 0.5 },
    },
  };

  const navItemVariants = {
    hover: {
      y: -3,
      transition: { type: "spring", stiffness: 300, damping: 20 },
    },
  };

  // Dynamic color classes based on section
  const getTextColor = () => {
    if (isDarkSection) {
      return "text-white";
    }
    return isScrolled ? "text-gray-800" : "text-gray-800";
  };

  const getTextColorSecondary = () => {
    if (isDarkSection) {
      return "text-white/80";
    }
    return isScrolled ? "text-gray-600" : "text-gray-600";
  };

  const getBackgroundColor = () => {
    if (isDarkSection) {
      return isScrolled
        ? "bg-white/10 backdrop-blur-xl border-white/20"
        : "bg-transparent";
    }
    return isScrolled
      ? "bg-white/95 backdrop-blur-xl border-gray-200 shadow-lg"
      : "bg-white/90 backdrop-blur-xl border-gray-200";
  };

  const getBorderColor = () => {
    return isDarkSection ? "border-white/20" : "border-gray-200";
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${getBackgroundColor()} ${
        isDarkSection ? "" : "border-b"
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
    >
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Enhanced Logo */}
          <motion.div
            className={`relative text-2xl font-bold transition-all duration-300 ${getTextColor()}`}
            variants={logoVariants}
            whileHover="hover"
          >
            <div className="relative">
              <span className="relative z-10">DO</span>
              <motion.div
                className={`absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-lg blur-lg ${
                  isDarkSection ? "opacity-30" : "opacity-20"
                }`}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: isDarkSection ? [0.3, 0.5, 0.3] : [0.2, 0.3, 0.2],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item, index) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <motion.button
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  className={`relative px-4 py-2 rounded-full font-medium transition-all duration-300 group overflow-hidden ${
                    isActive
                      ? isDarkSection
                        ? "text-white bg-white/20 backdrop-blur-sm"
                        : "text-gray-800 bg-gray-200/80 backdrop-blur-sm"
                      : isDarkSection
                      ? "text-white/80 hover:text-white hover:bg-white/10"
                      : "text-gray-600 hover:text-gray-800 hover:bg-gray-100/80"
                  }`}
                  variants={navItemVariants}
                  whileHover="hover"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                >
                  <div className="flex items-center gap-2 relative z-10">
                    <item.icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </div>

                  {/* Active indicator */}
                  {isActive && (
                    <motion.div
                      className={`absolute inset-0 rounded-full border ${
                        isDarkSection
                          ? "bg-gradient-to-r from-green-400/20 to-emerald-500/20 border-white/20"
                          : "bg-gradient-to-r from-green-400/10 to-emerald-500/10 border-green-300/50"
                      }`}
                      layoutId="activeTab"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}

                  {/* Enhanced hover glow effect - Sharp green border glow */}
                  <motion.div
                    className={`absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 ${
                      isDarkSection ? "bg-white/5" : "bg-gray-100/50"
                    }`}
                    style={{
                      boxShadow: isDarkSection
                        ? "0 0 0 1px rgba(34, 197, 94, 0.4), 0 0 8px rgba(34, 197, 94, 0.3), 0 0 16px rgba(34, 197, 94, 0.2)"
                        : "0 0 0 1px rgba(34, 197, 94, 0.5), 0 0 8px rgba(34, 197, 94, 0.3), 0 0 16px rgba(34, 197, 94, 0.2)",
                    }}
                  />

                  {/* Additional inner glow for more definition */}
                  <motion.div
                    className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"
                    style={{
                      background: isDarkSection
                        ? "linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(16, 185, 129, 0.1))"
                        : "linear-gradient(135deg, rgba(34, 197, 94, 0.08), rgba(16, 185, 129, 0.08))",
                      border: "1px solid rgba(34, 197, 94, 0.3)",
                    }}
                  />
                </motion.button>
              );
            })}
          </div>

          {/* Enhanced Mobile Menu Button */}
          <motion.button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-3 rounded-full transition-all duration-300 border ${
              isDarkSection
                ? isScrolled || isMobileMenuOpen
                  ? "bg-white/20 backdrop-blur-sm text-white border-white/20"
                  : "bg-white/10 text-white border-white/20"
                : "bg-white/90 text-gray-800 border-gray-200 hover:bg-white"
            }`}
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
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
                  <X size={20} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={20} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Enhanced Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className={`md:hidden absolute top-full left-4 right-4 mt-2 backdrop-blur-xl border rounded-2xl shadow-xl overflow-hidden ${
                isDarkSection
                  ? "bg-white/10 border-white/20"
                  : "bg-white/95 border-gray-200"
              }`}
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
            >
              <div className="p-4">
                {navItems.map((item, index) => {
                  const isActive = activeSection === item.href.substring(1);
                  return (
                    <motion.button
                      key={item.name}
                      onClick={() => handleNavClick(item.href)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 group ${
                        isActive
                          ? isDarkSection
                            ? "bg-white/20 text-white border border-white/20"
                            : "bg-gray-100 text-gray-800 border border-gray-200"
                          : isDarkSection
                          ? "text-white/80 hover:text-white hover:bg-white/10"
                          : "text-gray-600 hover:text-gray-800 hover:bg-gray-100/50"
                      }`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <item.icon className="w-5 h-5" />
                      <span>{item.name}</span>

                      {/* Active indicator */}
                      {isActive && (
                        <motion.div
                          className={`ml-auto w-2 h-2 rounded-full ${
                            isDarkSection ? "bg-green-400" : "bg-green-500"
                          }`}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        />
                      )}
                    </motion.button>
                  );
                })}
              </div>

              {/* Mobile menu footer */}
              <div className={`border-t p-4 ${getBorderColor()}`}>
                <div
                  className={`flex items-center justify-center gap-2 text-sm ${
                    isDarkSection ? "text-white/60" : "text-gray-500"
                  }`}
                >
                  <Award className="w-4 h-4" />
                  <span>Daisi Odawa Portfolio</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
};

export default Navigation;
