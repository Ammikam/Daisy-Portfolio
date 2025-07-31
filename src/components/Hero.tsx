import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import {
  Download,
  Mail,
  ArrowDown,
  Github,
  Linkedin,
  Code,
  Cpu,
  ClipboardList,
} from "lucide-react";
import ParticleBackground from "./ParticleBackground";
import tx from "../assets/tx.jpg";
import daisi from "../assets/daisi.jpg";
import resume from "../assets/daisi.pdf";
import XLogo from "./ui/six";

const Hero = () => {
  const [currentRole, setCurrentRole] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const roles = [
    "Software Developer",
    "UX Researcher",
    "Project Manager",
    "Odoo Specialist",
    "Mobile & IoT Solutions Expert",
    "Founder",
  ];

  const skills = [
    { icon: Code, text: "Full Stack Development" },
    { icon: Cpu, text: "Mobile & IoT" },
    { icon: ClipboardList, text: "Project Management" },
  ];

  useEffect(() => {
    setIsLoaded(true);
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 4500);

    return () => clearInterval(interval);
  }, [roles.length]);

  const handleScrollToAbout = () => {
    const aboutSection = document.querySelector("#about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleContactClick = () => {
    const contactSection = document.querySelector("#contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleDownloadResume = () => {
    const link = document.createElement("a");
    link.href = resume;
    link.download = "Daisi_Odawa_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
      },
    },
  };

  const buttonHoverVariants: Variants = {
    hover: {
      scale: 1.05,
      y: -3,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
    tap: {
      scale: 0.98,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
  };

  const skillPillHoverVariants: Variants = {
    hover: {
      scale: 1.03,
      y: -2,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 12,
      },
    },
    tap: {
      scale: 0.97,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 12,
      },
    },
  };

  const socialHoverVariants: Variants = {
    hover: {
      scale: 1.1,
      y: -3,
      rotate: 3,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15,
      },
    },
    tap: {
      scale: 0.95,
      y: 0,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15,
      },
    },
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Refined Background - Less Green Dominant */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${tx})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-gray-900/90 to-slate-800/95" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-br from-green-600/5 via-transparent to-emerald-600/5" />
      </div>

      {/* Particle Background */}
      <ParticleBackground />

      {/* Refined Animated Background Elements - Less Intense */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-green-400/5 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-400/8 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-400/6 rounded-full blur-3xl"
          animate={{
            x: [-50, 50, -50],
            y: [-30, 30, -30],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 pt-16 md:pt-20 text-center">
        <motion.div
          className="max-w-5xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
        >
          {/* Profile Image with Refined Styling and Floating Animation */}
          <motion.div className="mb-8 relative" variants={itemVariants}>
            <div className="relative inline-block">
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-green-400/20 to-emerald-600/20 blur-lg"
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
              <motion.img
                src={daisi}
                alt="Daisi Odawa"
                className="relative w-36 h-36 md:w-44 md:h-44 rounded-full mx-auto border-4 border-white/30 shadow-2xl object-cover backdrop-blur-sm"
                style={{ objectFit: "cover" }}
                animate={{
                  y: [0, -8, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.3 },
                }}
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          </motion.div>

          {/* Name with More Refined Font Size and Elegant Gradient */}
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent"
            variants={itemVariants}
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            Daisi Odawa
          </motion.h1>

          {/* Animated Role Title with Smoother Transitions */}
          <motion.div
            className="h-16 md:h-20 mb-8 flex items-center justify-center"
            variants={itemVariants}
          >
            <AnimatePresence mode="wait">
              <motion.h2
                key={currentRole}
                className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-300"
                initial={{
                  y: 30,
                  opacity: 0,
                  rotateX: 45,
                  scale: 0.95,
                }}
                animate={{
                  y: 0,
                  opacity: 1,
                  rotateX: 0,
                  scale: 1,
                }}
                exit={{
                  y: -30,
                  opacity: 0,
                  rotateX: -45,
                  scale: 0.95,
                }}
                transition={{
                  duration: 0.9,
                  type: "spring",
                  stiffness: 120,
                  damping: 25,
                  ease: "easeInOut",
                }}
              >
                {roles[currentRole]}
              </motion.h2>
            </AnimatePresence>
          </motion.div>

          {/* Skills Pills with Refined Styling and Staggered Animation */}
          <motion.div
            className="flex flex-wrap justify-center gap-4 mb-10"
            variants={itemVariants}
          >
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-gray-200 hover:bg-green-500/20 hover:border-green-400/30 transition-all duration-300 cursor-pointer"
                variants={skillPillHoverVariants}
                whileHover="hover"
                whileTap="tap"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  transition: {
                    delay: index * 0.1,
                    duration: 0.5,
                    type: "spring",
                    stiffness: 200,
                  },
                }}
              >
                <motion.div
                  animate={{
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.3,
                  }}
                >
                  <skill.icon className="w-4 h-4" />
                </motion.div>
                <span className="text-sm font-medium">{skill.text}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Action Buttons with Enhanced Animations */}
          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
            variants={itemVariants}
          >
            {/* Hire Me Button with Glowing Effect */}
            <motion.button
              onClick={handleContactClick}
              className="group relative px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl overflow-hidden transition-all duration-300"
              variants={buttonHoverVariants}
              whileHover="hover"
              whileTap="tap"
              animate={{
                boxShadow: [
                  "0 4px 15px rgba(34, 197, 94, 0.2)",
                  "0 8px 25px rgba(34, 197, 94, 0.4)",
                  "0 4px 15px rgba(34, 197, 94, 0.2)",
                ],
              }}
              transition={{
                boxShadow: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                whileHover={{ scale: 1.05 }}
              />
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-700"
                animate={{
                  translateX: ["-100%", "200%"],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3,
                  ease: "easeInOut",
                }}
              />
              <div className="relative flex items-center gap-2">
                <motion.div
                  whileHover={{ rotate: 12, scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                  animate={{
                    rotate: [0, 3, -3, 0],
                  }}
                  style={{
                    transformOrigin: "center",
                  }}
                >
                  <Mail className="w-5 h-5" />
                </motion.div>
                <motion.span
                  animate={{
                    scale: [1, 1.02, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  Hire me
                </motion.span>
              </div>
            </motion.button>

            {/* Download CV Button with Pulse Effect */}
            <motion.button
              onClick={handleDownloadResume}
              className="group relative px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-full border border-white/20 hover:bg-white/15 hover:border-green-400/30 transition-all duration-300 overflow-hidden"
              variants={buttonHoverVariants}
              whileHover="hover"
              whileTap="tap"
              animate={{
                borderColor: [
                  "rgba(255, 255, 255, 0.2)",
                  "rgba(34, 197, 94, 0.3)",
                  "rgba(255, 255, 255, 0.2)",
                ],
              }}
              transition={{
                borderColor: {
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-emerald-400/10 rounded-full opacity-0 group-hover:opacity-100"
                initial={{ scale: 0 }}
                whileHover={{
                  scale: 1,
                  transition: { duration: 0.4, ease: "easeOut" },
                }}
              />
              <div className="relative flex items-center gap-2">
                <motion.div
                  whileHover={{ y: 2, scale: 1.1 }}
                  animate={{
                    y: [0, -2, 0],
                  }}
                  transition={{
                    y: {
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                    scale: {
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                    hover: {
                      y: { duration: 0.3 },
                      scale: { duration: 0.3 },
                    },
                  }}
                >
                  <Download className="w-5 h-5" />
                </motion.div>
                <motion.span
                  animate={{
                    opacity: [0.9, 1, 0.9],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  Download CV
                </motion.span>
              </div>
            </motion.button>
          </motion.div>

          {/* Social Links with Enhanced Staggered Animation */}
          <motion.div
            className="flex justify-center gap-6 mb-12"
            variants={itemVariants}
          >
            {[
              {
                icon: Github,
                href: "https://github.com/daisy-carolin",
                label: "GitHub",
              },
              {
                icon: Linkedin,
                href: "https://www.linkedin.com/in/daisicaroliine/",
                label: "LinkedIn",
              },
              {
                icon: Mail,
                label: "Email",
                onClick: handleContactClick,
              },
              {
                icon: XLogo,
                href: "https://x.com/DaisyOdawa",
                label: "X",
              },
            ].map((social, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    delay: 1.5 + index * 0.1,
                    duration: 0.5,
                    type: "spring",
                    stiffness: 200,
                  },
                }}
              >
                {social.onClick ? (
                  <motion.button
                    onClick={social.onClick}
                    className="p-3 bg-white/8 backdrop-blur-sm rounded-full border border-white/15 text-gray-300 hover:text-white hover:bg-green-500/20 hover:border-green-400/40 transition-all duration-300"
                    variants={socialHoverVariants}
                    whileHover="hover"
                    whileTap="tap"
                    aria-label={social.label}
                    animate={{
                      y: [0, -3, 0],
                    }}
                    transition={{
                      y: {
                        duration: 2 + index * 0.2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.3,
                      },
                    }}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.button>
                ) : (
                  <motion.a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white/8 backdrop-blur-sm rounded-full border border-white/15 text-gray-300 hover:text-white hover:bg-green-500/20 hover:border-green-400/40 transition-all duration-300"
                    variants={socialHoverVariants}
                    whileHover="hover"
                    whileTap="tap"
                    aria-label={social.label}
                    animate={{
                      y: [0, -3, 0],
                    }}
                    transition={{
                      y: {
                        duration: 2 + index * 0.2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.3,
                      },
                    }}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                )}
              </motion.div>
            ))}
          </motion.div>

          {/* Enhanced Scroll Indicator */}
          <motion.div
            className="flex flex-col items-center"
            variants={itemVariants}
          >
            <motion.p
              className="text-gray-400 text-sm mb-4 font-medium tracking-wide uppercase"
              animate={{
                opacity: [0.4, 0.8, 0.4],
                y: [0, -2, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              Scroll to explore
            </motion.p>
            <motion.button
              onClick={handleScrollToAbout}
              className="relative p-3 rounded-full bg-white/8 backdrop-blur-sm border border-white/15 text-gray-300 hover:text-white hover:bg-green-500/20 hover:border-green-400/40 transition-all duration-300 group overflow-hidden"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.9, y: 0 }}
              animate={{ y: [0, 10, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            >
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-green-400/30"
                animate={{
                  scale: [1, 1.5, 2],
                  opacity: [0.5, 0.2, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
              />
              <motion.div
                whileHover={{ scale: 1.2 }}
                animate={{
                  y: [0, 3, 0],
                }}
                transition={{
                  default: {
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                  hover: {
                    duration: 0.3,
                  },
                }}
              >
                <ArrowDown className="w-6 h-6 relative z-10" />
              </motion.div>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
    </section>
  );
};

export default Hero;
