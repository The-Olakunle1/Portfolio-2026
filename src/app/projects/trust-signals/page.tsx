"use client";

import Link from "next/link";
import { motion, useScroll, useTransform, useMotionValueEvent } from "motion/react";
import Image from "next/image";
import { useRef, useState } from "react";
import "./page.css";

const projectData = {
  title: "Testing trust signals to increase Add to basket conversion rate",
  role: "Product Designer (Growth)",
  duration: "3 weeks",
  tools: "Kameleoon, Fullstory, Tableau",
  description:
    "Driving Add-to-Basket growth by 15% through strategic USP messaging across 5 markets.",
  background:
    "Buying used camera gear online requires trust that new equipment purchases don't. Shoppers can't physically inspect items, so uncertainty about quality and value can stall decisions at the point of browsing.\n\nFollowing a successful sell-side contentful tile test, we saw an opportunity to test whether surfacing buy-side USPs on the search results page could reduce that hesitation and improve conversion.",
  goal: "Increase Add to Basket rate across all markets, with a secondary goal of increasing purchases in GBP, USD, and EUR.",
  hypothesis:
    "We believed that surfacing specific buy-side USPs on the search results page would reduce hesitation and positively affect Add to Basket and purchase conversion rates across all markets.",
  whatWeTested: [
    "Control: We photograph every item so all products shown are the exact products you receive",
    "Variant 1: Every item is MPB approved and thoroughly checked by our team of product specialists",
    "On average, used kit from MPB costs a third less than new",
    "All our packaging is plastic free"
  ],
  resultsVariant1: "Variant 1 lifted Add to Basket rate in DE from 4.86% to 5.60%, a 15.16% improvement at 99% statistical significance. The effect was stronger for new visitors (+24.67%) than returning visitors (+10.85%), suggesting the message was particularly effective at building trust with first-time buyers.",
  resultsVariant3: "Variant 3 drove purchase uplifts in the US (+9.95% at 96% statistical significance) and FR (+18.08% at 91% reliability). However, it also negatively affected Add to Basket rate in EU, which required further consideration before rollout.",
  image1: "/Contentful tile 1.png",
  image2: "/Contentful tiles 2.png",
  image3: "/Contentful results.png",
};

export default function TrustSignalsPage() {
  const sidebarRef = useRef<HTMLElement>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    container: sidebarRef,
  });

  // Text highlighting based on scroll
  const sectionOpacity = useTransform(scrollYProgress, [0, 0.2], [0.6, 1]);

  useMotionValueEvent(scrollYProgress, "change", (value: number) => {
    // Switch to the second image when scrolled past ~35%
    // Switch to the third image when scrolled past ~75%
    if (value < 0.35) {
      setActiveImageIndex(0);
    } else if (value < 0.75) {
      setActiveImageIndex(1);
    } else {
      setActiveImageIndex(2);
    }
  });

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
            <p>
              We tested three USP-led messages against a control on the search
              results page across five markets.
            </p>
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
            <p>The experiment ran for 4 weeks across the EU, US, UK &amp; FR market</p>
            <p>
              <strong>Variant 1</strong> {projectData.resultsVariant1.replace("Variant 1 ", "")}
            </p>
            <p>
              <strong>Variant 3</strong> {projectData.resultsVariant3.replace("Variant 3 ", "")}
            </p>
          </motion.section>
        </motion.div>
      </aside>

      {/* Right Content Area */}
      <div className="project-content">
        <div className="project-image-container">
          <motion.div
            className="project-detail-image-wrapper"
            initial={{ opacity: 1, scale: 0.98 }}
            animate={{ 
              opacity: activeImageIndex === 0 ? 1 : 0,
              scale: activeImageIndex === 0 ? 1 : 0.98 
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Image
              src={projectData.image1}
              alt="Trust signals test variant showing USPs on search results"
              width={1600}
              height={1200}
              className="project-screenshot"
              priority
            />
          </motion.div>

          <motion.div
            className="project-detail-image-wrapper"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ 
              opacity: activeImageIndex === 1 ? 1 : 0, 
              scale: activeImageIndex === 1 ? 1 : 0.98 
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Image
              src={projectData.image2}
              alt="The three USP variants tested"
              width={1600}
              height={1200}
              className="project-screenshot"
            />
          </motion.div>

          <motion.div
            className="project-detail-image-wrapper"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ 
              opacity: activeImageIndex === 2 ? 1 : 0, 
              scale: activeImageIndex === 2 ? 1 : 0.98 
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Image
              src={projectData.image3}
              alt="Results of the trust signals test"
              width={1600}
              height={1200}
              className="project-screenshot"
            />
          </motion.div>
        </div>
      </div>
    </main>
  );
}
