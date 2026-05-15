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
    id: "1b",
    title: "Order tracking",
    description: "",
    role: "Product Designer",
    company: "MPB.com",
    image: "",
    video: "",
    link: "/projects/order-tracking",
  },
  {
    id: "2b",
    title: "Calm app",
    description: "",
    role: "Product Designer & Design Engineer",
    company: "Trycalm.app",
    image: "",
    video: "",
    link: "/apps/calm",
  },
  {
    id: "2c",
    title: "Companion",
    description: "",
    role: "Product Designer & Design Engineer",
    company: "Personal project",
    image: "",
    video: "",
    link: "",
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
          Works
        </motion.h2>

        <div className="articles-list">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link href={project.link || "#"} className="article-item">
                <div style={{ flex: 1, paddingRight: 16 }}>
                  <span className="article-title">{project.title}</span>
                  <p className="project-role" style={{ marginTop: 4 }}>
                    {project.role} | {project.company}
                  </p>
                </div>
                <div className="article-arrow">
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
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
