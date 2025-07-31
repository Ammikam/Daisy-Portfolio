import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FaReact,
  FaNodeJs,
  FaPython,
  FaAngular,
  FaPhp,
  FaDatabase,
  FaUsers,
  FaClipboardCheck,
  FaPaintBrush,
  FaLightbulb,
  FaTasks,
  FaTrello,
  FaComments,
  FaUserTie,
  FaCode,
} from "react-icons/fa";
import {
  SiTypescript,
  SiHivemq,
  SiNextdotjs,
  SiNestjs,
  SiMongodb,
  SiPostgresql,
  SiRedux,
  SiTailwindcss,
  SiFirebase,
  SiExpo,
} from "react-icons/si";
import {MdBluetooth} from "react-icons/md";

const Skills = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const skillCategories = [
    {
      title: "Frontend & Mobile",
      skills: [
        { name: "React.js", icon: FaReact, level: 95 },
        { name: "React Native", icon: FaReact, level: 90 },
        { name: "Next.js", icon: SiNextdotjs, level: 90 },
        { name: "TypeScript", icon: SiTypescript, level: 85 },
        { name: "Angular", icon: FaAngular, level: 80 },
        { name: "Redux", icon: SiRedux, level: 85 },
        { name: "Expo", icon: SiExpo, level: 85 },
        { name: "Tailwind CSS", icon: SiTailwindcss, level: 90 },
      ],
    },
    {
      title: "Backend & Databases",
      skills: [
        { name: "Node.js", icon: FaNodeJs, level: 95 },
        { name: "NestJS", icon: SiNestjs, level: 90 },
        { name: "PHP", icon: FaPhp, level: 85 },
        { name: "Python", icon: FaPython, level: 80 },
        { name: "PostgreSQL", icon: SiPostgresql, level: 85 },
        { name: "MongoDB", icon: SiMongodb, level: 85 },
        { name: "Firebase", icon: SiFirebase, level: 80 },
        { name: "MySQL", icon: FaDatabase, level: 85 },
      ],
    },
    {
      title: "Mobile & IoT Solutions",
      skills: [
        { name: "Bluetooth Integration", icon: MdBluetooth, level: 90 }, 
        { name: "IoT Protocols (e.g., MQTT)", icon: SiHivemq, level: 80 }, 
        { name: "BLE Printing", icon: MdBluetooth, level: 85 },
        { name: "Sensor Integration", icon: MdBluetooth, level: 75 }, 
      ],
    },
    {
      title: "ERP & Business Automation",
      skills: [
        { name: "Odoo", icon: FaDatabase, level: 90 },
        { name: "Python (Odoo Scripting)", icon: FaPython, level: 85 },
        { name: "PostgreSQL (Odoo DB)", icon: SiPostgresql, level: 85 },
        { name: "XML & QWeb Templates", icon: FaCode, level: 80 }, 
      ],
    },
    {
      title: "UX Research & Design",
      skills: [
        { name: "User Interviews", icon: FaUsers, level: 90 }, 
        { name: "Usability Testing", icon: FaClipboardCheck, level: 85 }, 
        { name: "Figma", icon: FaPaintBrush, level: 80 }, 
        { name: "Heuristic Evaluation", icon: FaLightbulb, level: 75 }, 
      ],
    },
    {
      title: "Project Management",
      skills: [
        { name: "Scrum & Kanban", icon: FaTasks, level: 90 }, 
        { name: "Jira & Trello", icon: FaTrello, level: 85 }, 
        { name: "Client Communication", icon: FaComments, level: 95 }, 
        { name: "Leadership", icon: FaUserTie, level: 90 }, 
      ],
    },
  ];

  return (
    <section id="skills" className="py-20 bg-muted/30 relative z-0">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          style={{ willChange: "transform, opacity" }}
          initial={{ opacity: 0, y: 48 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          {/* Section Title */}
          <div className="text-center mb-16">
            <motion.h2
              className="heading-lg text-primary mb-4"
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Technical Skills
            </motion.h2>
            <motion.div
              className="w-24 h-1 bg-gradient-primary mx-auto rounded-full"
              initial={{ width: 0 }}
              animate={inView ? { width: 96 } : {}}
              transition={{ delay: 0.4, duration: 0.6 }}
            />
          </div>

          {/* Skills Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.title}
                className="card-modern p-8"
                style={{ willChange: "transform, opacity" }}
                initial={{ opacity: 0, y: 48 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + categoryIndex * 0.2, duration: 0.6 }}
              >
                <h3 className="text-xl font-bold text-primary mb-6 text-center">
                  {category.title}
                </h3>

                <div className="space-y-4">
                  {category.skills.map((skill) => (
                    <div key={skill.name} className="group">
                      {/* Skill Header */}
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                         <div className="text-green-700 group-hover:text-green-500 transition-colors">
                            <skill.icon size={20} />
                          </div>
                          <span className="font-medium text-foreground">
                            {skill.name}
                          </span>
                        </div>
                        <span className="text-sm text-muted-foreground font-medium">
                          {skill.level}%
                        </span>
                      </div>

                      {/* Progress Bar */}
                      <div className="w-full bg-border rounded-full h-2 overflow-hidden">
                        <div
                          className="h-full bg-gradient-primary rounded-full transition-all duration-700 ease-out"
                          style={{ width: inView ? `${skill.level}%` : 0 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Additional Skills Tags */}
          <motion.div
            className="mt-12 text-center"
            style={{ willChange: "transform, opacity" }}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1, duration: 0.6 }}
          >
            <h3 className="text-lg font-semibold text-primary mb-6">
              Additional Technologies & Tools
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                "RESTful APIs",
                "GraphQL",
                "WebRTC",
                "Microservices",
                "CI/CD",
                "Scrum/Kanban",
                "Mentoring",
                "Leadership",
                "GPT Integration",
                "GitHub Copilot",
                "AWS Textract",
                "LLM APIs",
                "Twilio",
                "Zoom",
              ].map((tech, index) => (
                <motion.span
                  key={tech}
                  className="px-4 py-2 bg-card border border-border rounded-lg text-sm font-medium text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors cursor-default"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 1.2 + index * 0.05, duration: 0.3 }}
                  whileHover={{ scale: 1.05 }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
