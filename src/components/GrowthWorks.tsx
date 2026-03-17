"use client";

import { motion } from "motion/react";
import Link from "next/link";

interface GrowthProject {
  id: string;
  title: string;
  description: string;
  role: string;
  company: string;
  link?: string;
}

const projects: GrowthProject[] = [
  {
    id: "1",
    title: "Testing trust signals to increase shopping conversion",
    description: "Driving Add-to-Basket growth by 15% through strategic USP messaging across 5 markets.",
    role: "Product Designer",
    company: "MPB.com",
    link: "/projects/trust-signals",
  },
  {
    id: "2",
    title: "Reducing product discovery friction to increase conversion",
    description: "Redesigning shop navigation from search-first to category-first experience.",
    role: "Product Designer",
    company: "MPB.com",
    link: "/projects/discovery-friction",
  },
];

const GrowthProjectCard = ({
  project,
  index,
}: {
  project: GrowthProject;
  index: number;
}) => {
  return (
    <Link
      href={project.link || "#"}
      key={project.id}
      className="project-card-link"
    >
      <motion.div
        className="project-card"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: index * 0.1 }}
        viewport={{ once: false, amount: 0.1 }}
      >
        <div className="project-info">
          <div className="project-meta">
            <h3 className="project-title">{project.title}</h3>
          </div>
          <p className="project-description">{project.description}</p>
          <p className="project-role">
            {project.role} | {project.company}
          </p>
        </div>
        <div className="project-arrow">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 17L17 7M17 7H7M17 7V17"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </motion.div>
    </Link>
  );
};

export default function GrowthWorks() {
  return (
    <section className="past-works-section" style={{ paddingTop: '0px' }}>
      <div className="past-works-container">
        <motion.h2
          className="past-works-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false, amount: 0.1 }}
        >
          Growth design and experimentations
        </motion.h2>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <GrowthProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
