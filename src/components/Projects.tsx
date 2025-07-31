import React, { useState, useEffect } from "react";
import {
  ExternalLink,
  Github,
  X,
  Users,
  TrendingUp,
  Heart,
  PackageCheck,
} from "lucide-react";

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (selectedProject !== null) {
      // Disable scroll
      document.body.style.overflow = "hidden";
    } else {
      // Re-enable scroll
      document.body.style.overflow = "unset";
    }

    // Cleanup function to re-enable scroll when component unmounts
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedProject]);

  const projects = [
    {
      title: "MobiClinic – Rural Healthcare Ethiopia",
      purpose:
        "Mobile-first app for appointment booking and health triage in low-connectivity zones",
      stack: [
        "React Native",
        "Expo",
        "Firebase",
        "Node.js",
        "Twilio SMS",
        "Figma",
      ],
      impact:
        "Enabled 5,000+ rural patients to book consultations. Clinic congestion reduced by 40%, no-show rates dropped by 25%",
      icon: Heart,
      gradient: "from-red-500 to-pink-500",
      description:
        "A comprehensive healthcare solution designed specifically for rural Ethiopian communities with limited internet connectivity. The app features offline-first architecture, SMS integration for low-data environments, and intelligent health triage algorithms.",
      features: [
        "Offline-first appointment booking system",
        "SMS-based notifications via Twilio",
        "Health symptom checker and triage",
        "Multi-language support (Amharic, English)",
        "Low-bandwidth optimized interface",
        "Real-time sync when connectivity available",
      ],
      challenges:
        "Working with intermittent connectivity, cultural adaptation, and ensuring HIPAA compliance in a resource-constrained environment.",
      results: [
        "5,000+ patients successfully onboarded",
        "40% reduction in clinic congestion",
        "25% decrease in no-show rates",
        "60% improvement in appointment efficiency",
      ],
    },
    {
      title: "Field Collection System",
      purpose:
        "Mobile and web-based solution for real-time data collection, Bluetooth printing, and centralized admin oversight.",
      stack: [
        "React Native",
        "TypeScript",
        "Redux Toolkit",
        "Node.js",
        "SQLite & Firebase",
        "Bluetooth Serial API",
        "Thermal Printer SDK",
        "React.js (Admin Dashboard)",
        "Chart.js",
      ],
      impact:
        "Transformed manual field operations into a smart, paperless system with real-time Bluetooth scale readings, instant receipt generation, and centralized data access. Enabled better decision-making and accountability.",
      icon: PackageCheck,
      gradient: "from-green-600 to-emerald-400",
      description:
        "A scalable Field Collection System comprising a mobile app and a powerful admin dashboard. The mobile app connects via Bluetooth to digital scales and thermal printers, capturing weights and other customizable inputs in real time. Built with TypeScript and Redux for robust state management and strong typing, the system ensures consistency and maintainability across devices.",
      features: [
        "Bluetooth integration with digital weight scales and printers",
        "Custom input fields based on use case (e.g., client ID, product type)",
        "Offline-first architecture with sync to Firebase",
        "Automatic receipt printing via Bluetooth thermal printers",
        "TypeScript for enhanced reliability and code safety",
        "Redux Toolkit for scalable state management",
        "Admin dashboard for real-time data viewing and user management",
        "Interactive analytics using Chart.js for trends and reporting",
      ],
      challenges:
        "Handling intermittent Bluetooth connections, managing local and cloud data consistency, and implementing a dynamic schema to support various field requirements without code duplication.",
      results: [
        "90% reduction in manual errors and paperwork",
        "Real-time oversight of all field transactions",
        "Trusted, verifiable data through digital scale integration",
        "Faster service with on-site receipt generation",
        "Improved scalability and maintainability with TypeScript and Redux",
      ],
    },

    {
      title: "FleetTracker Pro",
      purpose:
        "Real-time vehicle tracking, maintenance alerts, and route optimization",
      stack: [
        "NestJS",
        "React",
        "Firebase Realtime DB",
        "IoT GPS APIs",
        "Docker",
      ],
      impact:
        "Deployed across 150+ vehicles. Fleet downtime reduced by 25% through predictive maintenance",
      icon: TrendingUp,
      gradient: "from-green-500 to-emerald-500",
      description:
        "A comprehensive fleet management solution that combines IoT sensors, GPS tracking, and predictive analytics to optimize fleet operations and reduce maintenance costs.",
      features: [
        "Real-time GPS tracking",
        "Predictive maintenance alerts",
        "Route optimization algorithms",
        "Fuel consumption monitoring",
        "Driver behavior analytics",
        "Comprehensive reporting dashboard",
      ],
      challenges:
        "Integrating various IoT devices, ensuring real-time data accuracy, and building scalable infrastructure for large fleets.",
      results: [
        "150+ vehicles successfully tracked",
        "25% reduction in fleet downtime",
        "30% improvement in route efficiency",
        "20% decrease in fuel costs",
      ],
    },
    {
      title: "EventConnect",
      purpose:
        "Vendor discovery, booking, and communication platform for weddings and parties",
      stack: [
        "React Native",
        "Firebase",
        "Stripe",
        "WebRTC (SimplePeer.js)",
        "PHP",
      ],
      impact:
        "Facilitated 2,000+ vendor bookings. Integrated live video chat, increasing vendor trust scores by 60%",
      icon: Users,
      gradient: "from-purple-500 to-pink-500",
      description:
        "A marketplace platform connecting event organizers with service vendors, featuring integrated video communication, secure payments, and comprehensive event planning tools.",
      features: [
        "Vendor discovery and filtering",
        "Integrated video chat (WebRTC)",
        "Secure payment processing",
        "Event planning timeline",
        "Review and rating system",
        "Real-time messaging",
      ],
      challenges:
        "Building stable video chat functionality, ensuring secure payments, and creating an intuitive matching algorithm for vendors and clients.",
      results: [
        "2,000+ successful vendor bookings",
        "60% increase in vendor trust scores",
        "40% reduction in booking time",
        "35% improvement in client satisfaction",
      ],
    },
  ];

  return (
    <section id="projects" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div>
          {/* Section Title */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-green-800 mb-4">
              Featured Projects
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-green-600 to-green-500 mx-auto rounded-full" />
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {projects.map((project, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-6 cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group border border-gray-100"
                onClick={() => setSelectedProject(index)}
              >
                {/* Project Icon */}
                <div
                  className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${project.gradient} rounded-xl mb-4 group-hover:scale-110 transition-transform`}
                >
                  <project.icon className="w-6 h-6 text-white" />
                </div>

                {/* Project Title */}
                <h3 className="text-xl font-bold text-green-800 mb-3 group-hover:text-green-600 transition-colors">
                  {project.title}
                </h3>

                {/* Purpose */}
                <p className="text-gray-600 mb-4 leading-relaxed">
                  <span className="font-semibold text-green-800">Purpose:</span>{" "}
                  {project.purpose}
                </p>

                {/* Tech Stack */}
                <div className="mb-4">
                  <p className="font-semibold text-green-800 mb-2">
                    Tech Stack:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.slice(0, 4).map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.stack.length > 4 && (
                      <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                        +{project.stack.length - 4} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Impact */}
                <p className="text-green-700 font-semibold">{project.impact}</p>

                {/* View Details Button */}
                <div className="mt-4 flex items-center text-gray-700 font-medium group-hover:text-green-600 group-hover:translate-x-2 transition-all">
                  <span>View Details</span>
                  <ExternalLink className="w-4 h-4 ml-2" />
                </div>
              </div>
            ))}
          </div>

          {/* Project Modal */}
          {selectedProject !== null && (
            <div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedProject(null)}
            >
              <div
                className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between rounded-t-2xl">
                  <div className="flex items-center space-x-4">
                    <div
                      className={`flex items-center justify-center w-12 h-12 bg-gradient-to-r ${projects[selectedProject].gradient} rounded-xl`}
                    >
                      {React.createElement(projects[selectedProject].icon, {
                        className: "w-6 h-6 text-white",
                      })}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      {projects[selectedProject].title}
                    </h3>
                  </div>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-6 h-6 text-gray-600" />
                  </button>
                </div>

                {/* Modal Content */}
                <div className="p-6 space-y-6">
                  {/* Description */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">
                      Overview
                    </h4>
                    <p className="text-gray-600 leading-relaxed">
                      {projects[selectedProject].description}
                    </p>
                  </div>

                  {/* Features */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">
                      Key Features
                    </h4>
                    <div className="grid md:grid-cols-2 gap-3">
                      {projects[selectedProject].features.map(
                        (feature, index) => (
                          <div
                            key={index}
                            className="flex items-start space-x-3"
                          >
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                            <span className="text-gray-600">{feature}</span>
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  {/* Tech Stack */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">
                      Technology Stack
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {projects[selectedProject].stack.map((tech, index) => (
                        <span
                          key={index}
                          className="px-3 py-2 bg-blue-50 text-blue-700 font-medium rounded-lg border border-blue-200"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Challenges */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">
                      Challenges & Solutions
                    </h4>
                    <p className="text-gray-600 leading-relaxed">
                      {projects[selectedProject].challenges}
                    </p>
                  </div>

                  {/* Results */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">
                      Results & Impact
                    </h4>
                    <div className="grid md:grid-cols-2 gap-3">
                      {projects[selectedProject].results.map(
                        (result, index) => (
                          <div
                            key={index}
                            className="flex items-start space-x-3"
                          >
                            <TrendingUp className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-600">{result}</span>
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  {/* <div className="flex space-x-4 pt-4">
                    <button className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-200 flex items-center justify-center">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Live Demo
                    </button>
                    <button className="flex-1 border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:border-gray-400 hover:bg-gray-50 transition-all duration-200 flex items-center justify-center">
                      <Github className="w-4 h-4 mr-2" />
                      View Code
                    </button>
                  </div> */}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Projects;
