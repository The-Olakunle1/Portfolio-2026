"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef } from "react";
import "./page.css";

const projectData = {
  title: "Reducing product discovery friction",
  role: "Product Designer (Growth)",
  duration: "3 weeks",
  tools: "Kameleoon, Fullstory, Tableau",
  description:
    "Testing a structured shop landing page to improve product discovery and increase conversion.",
  background:
    "When customers clicked the shop CTA on the MPB homepage, they landed on an unfiltered search results page sorted by price high to low. Fullstory analysis showed users performing multiple search actions to find what they were looking for, with the search bar and menu being the most used elements on the page.\n\nThis suggested the experience wasn't helping users find kit quickly. We wanted to understand whether a structured, category-led landing page would reduce that friction.",
  goal: "Improve product discovery and increase Add to Basket rate across all markets, with secondary goals of improving Buy CVR and purchase conversion in GBP, USD, and EUR.",
  hypothesis:
    "We believe that replacing the unfiltered search results page with a focused shop landing page, organised by top-level categories, would make it easier for customers to find kit and increase Add to Basket rate.",
  whatWeTested: [
    "Control (50% traffic allocation): All search results page, sorted by price high to low",
    "Variation (50% traffic allocation): A category-led shop landing page with visual cards linking to top-level product categories",
  ],
  resultsRanFor: "The experiment ran for 3 weeks across five markets.",
  resultsP1: "The shop page meaningfully improved how users navigated the buy funnel. Across markets, 61% of users who landed on the shop page continued to a category or model page, compared to 24.5% in the control, confirming that buyers needed to be guided rather than dropped into an unfiltered results page.",
  resultsP2: "Users on the shop page were also far less likely to rely on the search bar or menu to find what they were looking for, with usage dropping to between 4.3% and 12.6% across markets, down from 41.4% to 46.8% in the control.",
  resultsP3: "On Add to Basket, the variation performed positively in the UK (+11.75%), US (+2.23%), and FR (+14.41%), reaching statistical significance in France at 98.32%. On purchase conversion, the UK, EU, and FR all improved, with EU (+37.79%) and FR (+24.84%) reaching statistical significance.",
  resultsP4: "DE and EU showed negative Add to Basket results, pointing to potential differences in how users in those markets prefer to navigate and search for products.",
  image: "/Shop page landing.png",
};

export default function DiscoveryFrictionPage() {
  const sidebarRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    container: sidebarRef,
  });

  // Text highlighting based on scroll
  const sectionOpacity = useTransform(scrollYProgress, [0, 0.2], [0.6, 1]);

  return (
    <main className="project-page">
      {/* Back link — outside sidebar so it can float independently on mobile */}
      <Link href="/" className="back-link">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M10 12L6 8L10 4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Home
      </Link>

      {/* Left Sidebar */}
      <aside className="project-sidebar" ref={sidebarRef}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="project-detail-title">{projectData.title}</h1>
          <p className="project-detail-meta">
            {projectData.role} | {projectData.duration}
            <br />
            Tools used | {projectData.tools}
          </p>
          <p className="project-detail-description">
            {projectData.description}
          </p>

          <motion.section
            className="project-section"
            style={{ opacity: sectionOpacity }}
          >
            <h2>Background</h2>
            {projectData.background.split("\n\n").map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </motion.section>

          <motion.section
            className="project-section"
            style={{ opacity: sectionOpacity }}
          >
            <h2>The goal</h2>
            <p>{projectData.goal}</p>
          </motion.section>

          <motion.section
            className="project-section"
            style={{ opacity: sectionOpacity }}
          >
            <h2>The hypothesis</h2>
            <p>{projectData.hypothesis}</p>
          </motion.section>

          <motion.section
            className="project-section"
            style={{ opacity: sectionOpacity }}
          >
            <h2>What we tested</h2>
            <p>An A/B test across five markets: UK, US, DE, EU, and FR.</p>
            <ul className="project-impact-list">
              {projectData.whatWeTested.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </motion.section>

          <motion.section
            className="project-section"
            style={{ opacity: sectionOpacity }}
          >
            <h2>The results</h2>
            <p>{projectData.resultsRanFor}</p>
            <p>{projectData.resultsP1}</p>
            <p>{projectData.resultsP2}</p>
            <p>{projectData.resultsP3}</p>
            <p>{projectData.resultsP4}</p>
          </motion.section>
        </motion.div>
      </aside>

      {/* Right Content Area */}
      <div className="project-content">
        <div className="project-image-container">
          <motion.div
            className="project-detail-image-wrapper"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Image
              src={projectData.image}
              alt="Shop landing page showing categories instead of raw search results"
              width={1600}
              height={1200}
              className="project-screenshot"
              priority
            />
          </motion.div>
        </div>
      </div>
    </main>
  );
}
