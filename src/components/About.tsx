import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Code2, Zap, Users, Award } from "lucide-react";

const stats = [
  { icon: Code2, label: "Years Experience", value: "5+" },
  { icon: Zap, label: "Projects Completed", value: "30+" },
  { icon: Users, label: "Engineers Mentored", value: "15+" },
  { icon: Award, label: "Technologies Mastered", value: "25+" },
];

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="about" className="py-20 bg-card bg">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          className="max-w-4xl mx-auto"
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
              About Me
            </motion.h2>
            <motion.div
              className="w-24 h-1 bg-gradient-primary mx-auto rounded-full"
              initial={{ width: 0 }}
              animate={inView ? { width: 96 } : {}}
              transition={{ delay: 0.4, duration: 0.6 }}
            />
          </div>

          {/* Content */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <p className="text-lg leading-relaxed text-muted-foreground">
                Daisi is a multifaceted technology professional with{" "}
                <span className="text-primary font-semibold">
                  5+ years of experience
                </span>{" "}
                She has a proven expertise in project management, software
                development, Odoo customization, mobile solutions, and IoT
                systems. With hands-on experience in{" "}
                <span className="text-primary font-semibold">
                  backend development, mobile app design, and smart integrations
                </span>
                , she excels at building efficient, scalable solutions tailored
                to real-world challenges. Her portfolio includes work across
                diverse sectors ranging from education to digital visitor
                management highlighting her ability to adapt and deliver results
                in dynamic environments.
              </p>

              <p className="text-lg leading-relaxed text-muted-foreground">
                Passionate about user-centered design, Daisi integrates{" "}
                <span className="text-primary font-semibold">UX research</span>{" "}
                nto her development process to create meaningful and intuitive
                experiences.
              </p>

              <p className="text-lg leading-relaxed text-muted-foreground">
                She believes in the power of technology to bridge knowledge
                gaps,{" "}
                <span className="text-primary font-semibold">
                  empower communities
                </span>
                , and streamline operations. Whether leading a team or
                contributing as a developer, Daisi brings a solution-oriented
                mindset and a deep commitment to leveraging innovation for
                impact.
              </p>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              className="grid grid-cols-2 gap-6"
              initial={{ opacity: 0, x: 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="card-modern p-6 text-center hover-lift"
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-primary rounded-xl mb-4">
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-primary mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Call to Action */}
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            <p className="text-lg text-muted-foreground mb-6">
              Ready to bring your next project to life with cutting-edge
              technology?
            </p>
            <motion.button
              onClick={() =>
                document
                  .querySelector("#contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="btn-glow"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Let's Work Together
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
