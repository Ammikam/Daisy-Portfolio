import React from "react";
import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { FaLinkedin, FaGithub, } from "react-icons/fa";
import XLogo from "./ui/six";
import { Coffee, Code, AlertTriangle } from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const socialLinks = [
    {
      name: "LinkedIn",
      icon: FaLinkedin,
      href: "https://www.linkedin.com/in/daisicaroliine/",
      color: "hover:text-blue-600",
    },
    {
      name: "GitHub",
      icon: FaGithub,
      href: "https://github.com/daisy-carolin",
      color: "hover:text-gray-800",
    },
    {
      name: "x",
      icon: XLogo,
      href: "https://twitter.com/daisi-odawa",
      color: "hover:text-blue-400",
    },
  ];

  const quickLinks = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  const handleQuickLinkClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <motion.div
              className="mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-primary mb-4">
                Daisi Odawa
              </h3>
              <p className="text-muted-foreground leading-relaxed max-w-md">
                Senior Fullstack Software & DevOps Engineer passionate about
                building scalable, innovative solutions that make a difference.
                Specialized in React, Node.js, and modern cloud technologies.
              </p>
            </motion.div>

            {/* Social Links */}
            <motion.div
              className="flex space-x-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
            >
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 bg-muted rounded-lg flex items-center justify-center text-muted-foreground ${social.color} transition-all duration-300 hover:scale-110 hover:shadow-lg`}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold text-foreground mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={link.name}>
                  <motion.button
                    onClick={() => handleQuickLinkClick(link.href)}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300"
                    whileHover={{ x: 4 }}
                  >
                    {link.name}
                  </motion.button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold text-foreground mb-4">
              Get In Touch
            </h4>
            <div className="space-y-3">
              <a
                href="mailto:daisi@gmail.com"
                className="block text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                daissiodawa@gmail.com
              </a>
              <p className="text-muted-foreground">
                Available for freelance work
              </p>
              <p className="text-muted-foreground">Remote & On-site projects</p>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center flex-wrap gap-1 text-muted-foreground mb-4 md:mb-0 text-sm">
            <span>© 2025 Daisi Odawa. • Made with code</span>
            <Code className="w-4 h-4 text-blue-500 inline-block" />
            <span>, coffee</span>
            <Coffee className="w-4 h-4 text-amber-500 inline-block" />
            <span>, and mild panic</span>
            <AlertTriangle className="w-4 h-4 text-yellow-400 inline-block animate-pulse" />
          </div>

          {/* Back to Top Button */}
          <motion.button
            onClick={scrollToTop}
            className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors duration-300 group"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-sm font-medium">Back to top</span>
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
          </motion.button>
        </motion.div>
      </div>

      {/* Floating Back to Top Button */}
      <motion.button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-primary text-white rounded-full shadow-lg hover:shadow-xl z-40 flex items-center justify-center group"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ delay: 2 }}
      >
        <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
      </motion.button>
    </footer>
  );
};

export default Footer;
