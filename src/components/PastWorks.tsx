"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef } from "react";

interface Project {
  id: string;
  title: string;
  description: string;
  role: string;
  company: string;
  image: string;
  video?: string;
  link?: string;
}

const projects: Project[] = [
  {
    id: "1",
    title: "Self serve returns v.1",
    description:
      "Reducing customer contact by enabling seamless, on-platform return initiation.",
    role: "Product Designer",
    company: "MPB.com",
    image: "/Project frame 1.png",
    video: "/SSR 1 recording.mp4",
    link: "/projects/self-serve-returns",
  },
  {
    id: "2",
    title: "Self serve returns v.2",
    description: "Empowering customers to complete returns end-to-end",
    role: "Product Designer",
    company: "MPB.com",
    image: "/Returns SSR 2.png",
    video: "/SSR phase 2 video.mp4",
    link: "/projects/self-serve-returns-v2",
  },
  {
    id: "3",
    title: "SwapSpace MVP",
    description: "Designing for Trust in a members-only home swapping platform",
    role: "Co-founder & Product Designer",
    company: "swap-space.com",
    image: "/Project 3 frame.png",
    video: "/SwapSpace recording.mp4",
    link: "/projects/swap-space",
  },
];

const ProjectCard = ({
  project,
  index,
}: {
  project: Project;
  index: number;
}) => {
  const [isHovering, setIsHovering] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    setIsHovering(true);
    if (videoRef.current && project.video) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

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
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="project-image-wrapper">
          {/* Static Image */}
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="project-image"
            style={{
              opacity: isHovering && project.video ? 0 : 1,
              transition: "opacity 0.3s ease",
            }}
            priority={index === 0}
          />

          {/* Video on Hover */}
          {project.video && (
            <video
              ref={videoRef}
              className="project-video"
              muted
              loop
              playsInline
              style={{
                opacity: isHovering ? 1 : 0,
                transition: "opacity 0.3s ease",
              }}
            >
              <source src={project.video} type="video/mp4" />
            </video>
          )}
        </div>
        <div className="project-info">
          <div className="project-meta">
            <h3 className="project-title">{project.title}</h3>
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
          </div>
          <p className="project-description">{project.description}</p>
          <p className="project-role">
            {project.role} | {project.company}
          </p>
        </div>
      </motion.div>
    </Link>
  );
};

export default function PastWorks() {
  return (
    <section className="past-works-section">
      <div className="past-works-container">
        <motion.h2
          className="past-works-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false, amount: 0.1 }}
        >
          Past work
        </motion.h2>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
