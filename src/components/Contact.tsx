import React, { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Mail,
  Linkedin,
  Github,
  Download,
  Send,
  AlertCircle,
  CheckCircle,
  X,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import resume from "../assets/daisi.pdf";

// Custom mobile-friendly notification component
const MobileNotification = ({ notification, onClose }) => {
  if (!notification) return null;

  const isError = notification.variant === "destructive";

  return (
    <motion.div
      initial={{ opacity: 0, y: -100, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -100, scale: 0.95 }}
      className={`fixed top-4 left-4 right-4 z-50 p-4 rounded-lg shadow-lg border backdrop-blur-sm ${
        isError
          ? "bg-red-50/95 border-red-200 text-red-800"
          : "bg-green-50/95 border-green-200 text-green-800"
      } sm:max-w-md sm:left-auto sm:right-4`}
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          {isError ? (
            <AlertCircle className="w-5 h-5 text-red-600" />
          ) : (
            <CheckCircle className="w-5 h-5 text-green-600" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-sm mb-1">{notification.title}</h4>
          <p className="text-sm opacity-90 leading-relaxed">
            {notification.description}
          </p>
        </div>
        <button
          onClick={onClose}
          className="flex-shrink-0 p-1 hover:bg-black/10 rounded-full transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
};

const Contact = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { toast } = useToast();
  const [mobileNotification, setMobileNotification] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  // Enhanced mobile-friendly toast function
  const showNotification = (notification) => {
    // Use regular toast for desktop, custom notification for mobile
    const isMobile = window.innerWidth < 768;

    if (isMobile) {
      setMobileNotification(notification);
      // Auto-hide after 5 seconds
      setTimeout(() => {
        setMobileNotification(null);
      }, 5000);
    } else {
      toast(notification);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "daissiodawa@gmail.com",
      href: "mailto:daissiodawa@gmail.com",
      animationType: "email",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "linkedin.com/in/daisicaroliine/",
      href: "https://www.linkedin.com/in/daisicaroliine/",
      animationType: "linkedin",
    },
    {
      icon: Github,
      label: "GitHub",
      value: "github.com/daisy-carolin",
      href: "https://github.com/daisy-carolin",
      animationType: "github",
    },
  ];

  const handleDownloadResume = () => {
    try {
      const link = document.createElement("a");
      link.href = resume;
      link.download = "Daisi_Odawa_Resume.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      showNotification({
        title: "Resume Downloaded",
        description: "The resume has been downloaded successfully.",
        variant: "default",
      });
    } catch (error) {
      console.error("Download error:", error);
      showNotification({
        title: "Download Failed",
        description: "Unable to download resume. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Enhanced form validation
  const validateForm = () => {
    const errors = {};

    // Name validation
    if (!formData.name.trim()) {
      errors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      errors.name = "Name must be at least 2 characters";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(formData.email.trim())) {
      errors.email = "Please enter a valid email address";
    }

    // Message validation
    if (!formData.message.trim()) {
      errors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      errors.message = "Message must be at least 10 characters";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Dancing animation variants for different social icons
  const getAnimationVariants = (type) => {
    const baseVariants = {
      email: {
        dance: {
          rotate: [0, -10, 10, -5, 5, -3, 3, 0],
          scale: [1, 1.1, 0.95, 1.05, 0.98, 1.02, 1],
          y: [0, -5, 2, -3, 1, -1, 0],
          transition: {
            duration: 2,
            repeat: Infinity,
            repeatDelay: 3,
            ease: "easeInOut",
          },
        },
        hover: {
          rotate: [0, -15, 15, -10, 10, -5, 5, 0],
          scale: [1, 1.2, 0.9, 1.1, 0.95, 1.05, 1],
          y: [0, -8, 3, -5, 2, -2, 0],
          transition: {
            duration: 0.8,
            ease: "easeInOut",
          },
        },
      },
      linkedin: {
        dance: {
          rotate: [0, 8, -8, 5, -5, 3, -3, 0],
          scale: [1, 0.9, 1.15, 0.95, 1.08, 0.97, 1.03, 1],
          x: [0, 3, -3, 2, -2, 1, -1, 0],
          transition: {
            duration: 2.2,
            repeat: Infinity,
            repeatDelay: 4,
            ease: "easeInOut",
          },
        },
        hover: {
          rotate: [0, 12, -12, 8, -8, 4, -4, 0],
          scale: [1, 0.85, 1.25, 0.9, 1.15, 0.95, 1.1, 1],
          x: [0, 5, -5, 3, -3, 2, -2, 0],
          transition: {
            duration: 0.9,
            ease: "easeInOut",
          },
        },
      },
      github: {
        dance: {
          rotate: [0, -12, 12, -8, 8, -4, 4, 0],
          scale: [1, 1.05, 0.92, 1.12, 0.96, 1.06, 0.98, 1],
          y: [0, 2, -4, 3, -2, 1, -1, 0],
          x: [0, -2, 2, -1, 1, -0.5, 0.5, 0],
          transition: {
            duration: 2.5,
            repeat: Infinity,
            repeatDelay: 3.5,
            ease: "easeInOut",
          },
        },
        hover: {
          rotate: [0, -18, 18, -12, 12, -6, 6, 0],
          scale: [1, 1.1, 0.88, 1.18, 0.92, 1.12, 0.96, 1],
          y: [0, 4, -6, 4, -3, 2, -1, 0],
          x: [0, -4, 4, -2, 2, -1, 1, 0],
          transition: {
            duration: 1,
            ease: "easeInOut",
          },
        },
      },
    };

    return baseVariants[type] || baseVariants.email;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear field error when user starts typing
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous errors
    setFieldErrors({});

    // Validate form
    if (!validateForm()) {
      showNotification({
        title: "Form validation failed",
        description: "Please check the highlighted fields and try again.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Check if API URL is configured
      const apiUrl = import.meta.env.VITE_API_URL;
      if (!apiUrl) {
        throw new Error(
          "API URL not configured. Please contact the administrator."
        );
      }

      console.log("API URL:", apiUrl);
      console.log("Request body:", JSON.stringify(formData));

      // Sanitize form data
      const sanitizedFormData = {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        subject: formData.subject.trim() || "Contact Form Submission",
        message: formData.message.trim(),
      };

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

      const response = await fetch(`${apiUrl}/api/send-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sanitizedFormData),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        let errorMessage = "Failed to send message";

        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch (parseError) {
          console.error("Error parsing response:", parseError);
        }

        // Handle specific HTTP status codes
        switch (response.status) {
          case 400:
            errorMessage = "Invalid form data. Please check your inputs.";
            break;
          case 429:
            errorMessage = "Too many requests. Please try again later.";
            break;
          case 500:
            errorMessage = "Server error. Please try again later.";
            break;
          case 503:
            errorMessage =
              "Service temporarily unavailable. Please try again later.";
            break;
        }

        throw new Error(errorMessage);
      }

      const data = await response.json();

      showNotification({
        title: "Message sent successfully!",
        description: "Thank you for reaching out. I'll get back to you soon.",
        variant: "default",
      });

      // Reset form
      setFormData({ name: "", email: "", subject: "", message: "" });
      setFieldErrors({});
    } catch (error) {
      console.error("Form submission error:", error);

      let errorTitle = "Error sending message";
      let errorDescription =
        "Please try again or contact me directly at daissiodawa@gmail.com.";

      if (error.name === "AbortError") {
        errorTitle = "Request timeout";
        errorDescription =
          "The request took too long. Please check your connection and try again.";
      } else if (
        error.message.includes("Failed to fetch") ||
        error.message.includes("NetworkError")
      ) {
        errorTitle = "Network error";
        errorDescription =
          "Please check your internet connection and try again.";
      } else if (error.message) {
        errorDescription = error.message;
      }

      showNotification({
        title: errorTitle,
        description: errorDescription,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Mobile notification overlay */}
      <MobileNotification
        notification={mobileNotification}
        onClose={() => setMobileNotification(null)}
      />

      <section
        id="contact"
        className="py-20 bg-muted/30 relative overflow-hidden z-0"
      >
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-transparent to-accent" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="text-center mb-16">
              <motion.h2
                className="heading-lg text-primary mb-4"
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                Get In Touch
              </motion.h2>
              <motion.div
                className="w-24 h-1 bg-gradient-primary mx-auto rounded-full mb-6"
                initial={{ width: 0 }}
                animate={inView ? { width: 96 } : {}}
                transition={{ delay: 0.4, duration: 0.6 }}
              />
              <motion.p
                className="text-lg text-muted-foreground max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                Ready to collaborate on your next project? Let's build something
                amazing together!
              </motion.p>
            </div>

            <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
              <motion.div
                className="space-y-8"
                initial={{ opacity: 0, x: -50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                <div>
                  <h3 className="text-2xl font-bold text-primary mb-4">
                    Let's Start a Conversation
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-8">
                    Whether you're looking to build a new application, optimize
                    your existing systems, or need technical consultation, I'm
                    here to help. With 8+ years of experience in full-stack
                    development and DevOps, I can bring your vision to life.
                  </p>
                </div>

                <div className="space-y-4">
                  {contactInfo.map((info, index) => (
                    <motion.a
                      key={info.label}
                      href={info.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="card-modern p-4 flex items-center space-x-4 hover-lift group"
                      initial={{ opacity: 0, y: 20 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.6 + index * 0.1, duration: 0.6 }}
                      whileHover="hover"
                    >
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform overflow-hidden">
                        <motion.div
                          variants={getAnimationVariants(info.animationType)}
                          animate="dance"
                          whileHover="hover"
                          className="flex items-center justify-center"
                        >
                          <info.icon className="w-6 h-6 text-white" />
                        </motion.div>
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">
                          {info.label}
                        </p>
                        <p className="text-muted-foreground group-hover:text-primary transition-colors">
                          {info.value}
                        </p>
                      </div>
                    </motion.a>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 1, duration: 0.6 }}
                >
                  <button
                    onClick={handleDownloadResume}
                    className="btn-ghost w-full group inline-flex items-center justify-center"
                  >
                    <Download className="w-5 h-5 mr-2 group-hover:translate-y-1 transition-transform" />
                    Download Full Resume
                  </button>
                </motion.div>
              </motion.div>

              <motion.div
                className="card-modern p-8"
                initial={{ opacity: 0, x: 50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-foreground mb-2"
                      >
                        Your Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors bg-background ${
                          fieldErrors.name
                            ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                            : "border-border"
                        }`}
                        placeholder="John Doe"
                        aria-describedby={
                          fieldErrors.name ? "name-error" : undefined
                        }
                      />
                      {fieldErrors.name && (
                        <p
                          id="name-error"
                          className="mt-1 text-sm text-red-600 flex items-center gap-1"
                        >
                          <AlertCircle className="w-4 h-4" />
                          {fieldErrors.name}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-foreground mb-2"
                      >
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors bg-background ${
                          fieldErrors.email
                            ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                            : "border-border"
                        }`}
                        placeholder="john@example.com"
                        aria-describedby={
                          fieldErrors.email ? "email-error" : undefined
                        }
                      />
                      {fieldErrors.email && (
                        <p
                          id="email-error"
                          className="mt-1 text-sm text-red-600 flex items-center gap-1"
                        >
                          <AlertCircle className="w-4 h-4" />
                          {fieldErrors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors bg-background"
                      placeholder="Project Discussion"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors bg-background resize-none ${
                        fieldErrors.message
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                          : "border-border"
                      }`}
                      placeholder="Tell me about your project..."
                      aria-describedby={
                        fieldErrors.message ? "message-error" : undefined
                      }
                    />
                    {fieldErrors.message && (
                      <p
                        id="message-error"
                        className="mt-1 text-sm text-red-600 flex items-center gap-1"
                      >
                        <AlertCircle className="w-4 h-4" />
                        {fieldErrors.message}
                      </p>
                    )}
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-glow w-full group disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin mr-2" />
                        Sending...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <Send className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" />
                        Send Message
                      </div>
                    )}
                  </motion.button>
                </form>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Contact;
