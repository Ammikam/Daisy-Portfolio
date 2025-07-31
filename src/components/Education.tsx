import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { GraduationCap, Calendar, MapPin } from "lucide-react";

const Education = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const education = [
    {
      degree: "Diploma in Information Technology",
      school: "AkiraChix, Nairobi Karen",
      location: "Kenya",
      year: "Feb 2021 - Dec 2021",
      description: (
        <>
          Backend Development – Object-Oriented Programming in{" "}
          <strong>Python</strong> (lists, tuples, dictionaries) and using the{" "}
          <strong>Django</strong> framework to build server-side web
          applications.
          <br />
          Frontend Mobile Development – Concepts in <strong>Kotlin</strong> such
          as <strong>Retrofit</strong> (API client) and <strong>XML</strong> for
          designing Android UIs.
          <br />
          Frontend Web Development – Creating web apps using{" "}
          <strong>Ajax</strong>, <strong>promises</strong>,{" "}
          <strong>async/await</strong>, and <strong>DOM manipulation</strong>{" "}
          for object-oriented representation of web pages.
          <br />
          UX Research – Fundamentals in{" "}
          <strong>user experience research</strong> including identifying user
          needs and generating insights for product design.
          <br />
          UI/UX Design – Designing interfaces using tools like{" "}
          <strong>Figma</strong> and <strong>Adobe Illustrator</strong>.
        </>
      ),
    },
  ];

  return (
    <section id="education" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          {/* Section Title */}
          <div className="text-center mb-16">
            <motion.h2
              className="heading-lg text-primary mb-4"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Education
            </motion.h2>
            <motion.div
              className="w-24 h-1 bg-gradient-primary mx-auto rounded-full"
              initial={{ width: 0 }}
              animate={inView ? { width: 96 } : {}}
              transition={{ delay: 0.4, duration: 0.6 }}
            />
          </div>

          {/* Education Items */}
          <div className="max-w-4xl mx-auto space-y-8">
            {education.map((edu, index) => (
              <motion.div
                key={index}
                className="card-modern p-6 hover-lift"
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2 + index * 0.2, duration: 0.8 }}
              >
                <div className="flex flex-col md:flex-row md:items-start space-y-4 md:space-y-0 md:space-x-6">
                  {/* Icon */}
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center">
                      <GraduationCap className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-primary mb-2">
                          {edu.degree}
                        </h3>
                        <p className="text-lg font-semibold text-foreground">
                          {edu.school}
                        </p>
                      </div>
                      <div className="flex flex-col md:items-end mt-2 md:mt-0">
                        <div className="flex items-center text-muted-foreground text-sm mb-1">
                          <Calendar className="w-4 h-4 mr-2" />
                          {edu.year}
                        </div>
                        <div className="flex items-center text-muted-foreground text-sm">
                          <MapPin className="w-4 h-4 mr-2" />
                          {edu.location}
                        </div>
                      </div>
                    </div>

                    <p className="text-muted-foreground leading-relaxed">
                      {edu.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Additional Certifications */}
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1, duration: 0.6 }}
          >
            <h3 className="text-lg font-semibold text-primary mb-6">
              Continuous Learning & Certifications
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                "Certified Scrum Master (CSM)",
                "Odoo Technical Training",
                "UX Research Mastery – Nielsen Norman",
                "React Native Performance Optimization",
                "Bluetooth Low Energy (BLE) Integration",
                "Firebase for Scalable Apps",
                "IoT Fundamentals – Cisco",
                "Leadership Essentials – Coursera",
                "Agile Project Management – Google",
              ].map((cert, index) => (
                <motion.div
                  key={cert}
                  className="px-4 py-2 bg-gradient-card border border-border rounded-lg text-sm font-medium text-foreground hover:border-primary/50 transition-colors"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 1.2 + index * 0.1, duration: 0.3 }}
                  whileHover={{ scale: 1.05 }}
                >
                  {cert}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Education;
