import React, { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Mail, Linkedin, Github, Download, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import resume from "../assets/daisi.pdf"

const Contact = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      const link = document.createElement("a");
      link.href = resume;
      link.download = "Daisi_Odawa_Resume.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      console.log("API URL:", import.meta.env.VITE_API_URL);

      if (!formData.email.includes("@") || !formData.email.includes(".")) {
        toast({
          title: "Invalid email",
          description: "Please enter a valid email address.",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/send-email`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();
      if (response.ok) {
        toast({
          title: "Message sent successfully!",
          description: "Thank you for reaching out. I'll get back to you soon.",
        });
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        throw new Error(data.message || "Failed to send email");
      }
    } catch (error: any) {
      toast({
        title: "Error sending message",
        description:
          error.message ||
          "Please try again or contact me directly at devammikam@gmail.com.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
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
                <a
                  onClick={handleDownloadResume}
                  className="btn-ghost w-full group inline-flex items-center justify-center"
                >
                  <Download className="w-5 h-5 mr-2 group-hover:translate-y-1 transition-transform" />
                  Download Full Resume
                </a>
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
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors bg-background"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors bg-background"
                      placeholder="john@example.com"
                    />
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
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors bg-background resize-none"
                    placeholder="Tell me about your project..."
                  />
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
  );
};

export default Contact;
