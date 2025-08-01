import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Calendar, MapPin, ChevronRight } from "lucide-react";
import resume from "../assets/daisi.pdf";

const Experience = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const experiences = [
    {
      title: "Lead Sofware Developer",
      company: "Scales Technology Solutions",
      location: "On Site",
      period: "Oct 2024 - Current",
      achievements: [
        "Designing and developing software solutions where hardware meets software to optimize processes, with a strong emphasis on real-time data collection and device communication",
        "Utilizing protocols such as MQTT, HTTP, and Bluetooth to enable seamless integration between devices and systems, ensuring efficient data transfer and communication.",
        "Developing cross-platform mobile applications using React Native, ensuring user-friendly interfaces and high performance for both iOS and Android devices.",
        "Continuously learning and adapting to emerging technologies, applying new methods and best practices to solve complex problems in the IoT and industrial design space.",
        "Collaborating with cross-functional teams to deliver innovative, scalable solutions that drive business success and meet client needs. ",
      ],
    },
    {
      title: "Junior Software Developer ",
      company: "BharathBrands Limited",
      location: "Remote",
      period: "March 2023 - March 2024",
      achievements: [
        "Working with other developers to plan and develop new features for existing products and creating entirely new products using existing technology. ",
        "Creating new computer applications by writing or modifying source code.",
        "Designing and developing new applications by translating user requirements into code that a computer can read. ",
      ],
    },
    {
      title: " Coding Tutor ",
      company: "Young Engineers Kenya",
      location: "On Site",
      period: "Jan 2021 - March 2023 ",
      achievements: [
        "Guided students on how to build models using legos.",
        "Teaching the Galileo technic program which investigates mechanical systems from a real engineer’s point of view. ",
        "Organized inter-school competiton for students.",
        "Reports/Documentation of students progress ",
      ],
    },
    {
      title: " Software Developer Intern ",
      company: "PhynaTech Company",
      location: "On Site",
      period: "Oct  2021 - Dec 2021",
      achievements: [
        "Created new user-facing features ",
        "Developed reusable code and libraries for later use",
        "Ensured that UI/UX designs are technically feasible ",
        "Contributed to the API design and development ",
        "Optimization of the applications for best performance and scalability",
      ],
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

  return (
    <section id="experience" className="py-20 bg-background">
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
              Work Experience
            </motion.h2>
            <motion.div
              className="w-24 h-1 bg-gradient-primary mx-auto rounded-full"
              initial={{ width: 0 }}
              animate={inView ? { width: 96 } : {}}
              transition={{ delay: 0.4, duration: 0.6 }}
            />
          </div>

          {/* Timeline */}
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-primary hidden md:block" />

              {/* Experience Items */}
              <div className="space-y-12">
                {experiences.map((exp, index) => (
                  <motion.div
                    key={index}
                    className="relative"
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.2 + index * 0.2, duration: 0.8 }}
                  >
                    {/* Timeline Dot */}
                    <div className="absolute left-6 w-4 h-4 bg-gradient-primary rounded-full border-4 border-background shadow-lg hidden md:block" />

                    {/* Content Card */}
                    <div className="md:ml-20 card-modern p-6 hover-lift">
                      {/* Header */}
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-primary mb-1">
                            {exp.title}
                          </h3>
                          <p className="text-lg font-semibold text-foreground">
                            {exp.company}
                          </p>
                        </div>
                        <div className="flex flex-col md:items-end mt-2 md:mt-0">
                          <div className="flex items-center text-muted-foreground text-sm mb-1">
                            <Calendar className="w-4 h-4 mr-2" />
                            {exp.period}
                          </div>
                          <div className="flex items-center text-muted-foreground text-sm">
                            <MapPin className="w-4 h-4 mr-2" />
                            {exp.location}
                          </div>
                        </div>
                      </div>

                      {/* Achievements */}
                      <div className="space-y-3">
                        {exp.achievements.map(
                          (achievement, achievementIndex) => (
                            <motion.div
                              key={achievementIndex}
                              className="flex items-start space-x-3 group"
                              initial={{ opacity: 0, x: -20 }}
                              animate={inView ? { opacity: 1, x: 0 } : {}}
                              transition={{
                                delay:
                                  0.4 + index * 0.2 + achievementIndex * 0.1,
                                duration: 0.6,
                              }}
                            >
                              <ChevronRight className="w-4 h-4 text-primary mt-1 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                              <p className="text-muted-foreground leading-relaxed">
                                {achievement}
                              </p>
                            </motion.div>
                          )
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            <p className="text-lg text-muted-foreground mb-6">
              Want to learn more about my professional journey?
            </p>
            <motion.button
              onClick={handleDownloadResume}
              className="btn-glow"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Download Full Resume
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
