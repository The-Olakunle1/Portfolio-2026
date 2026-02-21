"use client";

import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "motion/react";
import Image from "next/image";
import { useRef, useState, useEffect, useCallback } from "react";
import "./page.css";

const VIDEO_INDICES = new Set([2]);

interface ProjectData {
  title: string;
  role: string;
  duration: string;
  description: string;
  background: string;
  goal: string;
  images: string[];
}

const projectData: ProjectData = {
  title: "Self serve returns v.1",
  role: "Product designer",
  duration: "3 months",
  description:
    "Reducing customer contact by enabling a seamless, on-platform return initiation experience.",
  background:
    "Before launching self-serve returns, customers were unable to initiate returns independently on platform. This limitation placed a heavy burden on the customer experience team, who had to manually troubleshoot each return and provide personalised support. With a clear goal to reduce this pain point, the team set out to empower users to create and manage their returns autonomously.",
  goal: "The goal was to implement self-service workflows that will allow users initiate, track and complete returns independently with limited customer experience contact.",
  images: ["/SSR image 1.png", "/NPS image 2.png"],
};

export default function ProjectPage() {
  const sidebarRef = useRef<HTMLElement>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout>>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Auto-hide media controls after 2.5s
  const flashControls = useCallback(() => {
    setShowControls(true);
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    hideTimerRef.current = setTimeout(() => setShowControls(false), 2500);
  }, []);

  // Reset pause on scroll, control the video
  useEffect(() => {
    setIsPaused(false);
  }, [activeImageIndex]);

  useEffect(() => {
    if (!VIDEO_INDICES.has(activeImageIndex)) return;
    if (isPaused) {
      videoRef.current?.pause();
    } else {
      videoRef.current?.play().catch(() => { });
    }
  }, [isPaused, activeImageIndex]);

  const { scrollYProgress } = useScroll({
    container: sidebarRef,
  });

  // Switch image/video based on scroll thresholds
  useMotionValueEvent(scrollYProgress, "change", (value) => {
    if (value < 0.1) {
      setActiveImageIndex(0); // Intro
    } else if (value < 0.25) {
      setActiveImageIndex(1); // Background Note -> NPS
    } else if (value < 0.4) {
      setActiveImageIndex(0); // Goal / Delivered -> SSR 1
    } else if (value < 0.6) {
      setActiveImageIndex(2); // 0.1 Section -> SSR 1 recording
    } else if (value < 0.8) {
      setActiveImageIndex(3); // 0.2 Section -> AI chart workflow
    } else {
      setActiveImageIndex(4); // Impact & Challenges -> NPS (Return image)
    }
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
          </p>
          <p className="project-detail-description">
            {projectData.description}
          </p>

          <motion.section
            className="project-section"
            style={{ opacity: sectionOpacity }}
          >
            <h2>Background</h2>
            <p>{projectData.background}</p>
            <p
              className={`italic-note ${activeImageIndex === 1 ? "highlighted" : ""}`}
            >
              The lack of a self serve superience on platform resulted in high
              contact contact rate and low NPS score for return related queries.
            </p>
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
            <h2>What we delivered</h2>
            <p>
              We launched self serve returns using a dual-pathway approach that
              empowered customers while supporting our internal teams. Customer
              could initiate returns directly on platform and are routed to an
              enhanced AI chat workflow for efficient resolution.
            </p>
            <hr className="project-divider" />
          </motion.section>

          <motion.section
            className="project-section"
            style={{ opacity: sectionOpacity }}
          >
            <h2>0.1 Returns initiation from My account</h2>
            <p>
              We enabled customers to initiate returns from their account
              section choose return reasons and select a resolution method
              before continuing to an enhanced AI chat workflow.
            </p>
            <p
              className={`italic-note ${activeImageIndex === 2 ? "highlighted" : ""}`}
            >
              Autonomous return initiation from the account section empowering
              customers to self serve
            </p>
          </motion.section>

          <motion.section
            className="project-section"
            style={{ opacity: sectionOpacity }}
          >
            <h2>0.2 Optimised AI powered workflows</h2>
            <p>
              We redesigned the returns support experience by building
              structured workflows inside FIN that collected essential
              information upfront, such as whether customers had already tried
              troubleshooting steps or if their kit was showing specific error
              codes.
            </p>
            <p
              className={`italic-note ${activeImageIndex === 3 ? "highlighted" : ""}`}
            >
              This meant that by the time a Customer Experience advisor picked
              up the return, they already had the full context needed to resolve
              issues much more quickly. We also integrated Intercom’s AI agent,
              FIN, by exposing MPB’s internal knowledge bases, allowing FIN to
              troubleshoot common issues independently and often resolve cases
              without needing to escalate to a human advisor.
            </p>
          </motion.section>

          <motion.section
            className="project-section"
            style={{ opacity: sectionOpacity }}
          >
            <h2>Impact and scale</h2>
            <ul className="project-impact-list">
              <li>
                Launched a self-serve returns experience used by 1M+ customers
                across 13 markets, with support for 7+ localised languages.
              </li>
              <li>
                Over 3,400 customers initiated returns via the self serve flow
                within the first 12 weeks with 80% progression rate.
              </li>
              <li>61% of returns resolved without an agent's intervention.</li>
              <li>
                Customer experience team workload reduced, freeing time to focus
                on complex and high value issues.
              </li>
              <li>
                CSAT remained at 86% for all returns conversations, matching the
                benchmark and proving customers didn't feel abandoned by
                automation.
              </li>
              <li>
                Time to resolve and close a support ticket reduced from 11+
                hours to 8-9 hours on average, with peak efficiency at 2-3 hours
                during optimal weeks.
              </li>
              <li>
                Average replies per ticket dropped to 2.4 replies (vs.
                traditional 5+ reply conversations), meaning the Customer
                Experience team received enough information upfront regarding
                the customer's return.
              </li>
              <li>
                Returns volume and values remained within expected historical
                ranges (~8-9% of GMV, 248 returns weekly), indicating no
                operational disruption or spike in user returns.
              </li>
            </ul>
          </motion.section>

          <motion.section
            className="project-section"
            style={{ opacity: sectionOpacity }}
          >
            <h2>Challenges</h2>
            <ul className="project-impact-list">
              <li>
                <strong>We had to deliver value sooner.</strong> To keep
                momentum and start improving the returns experience quickly, we
                split the work into Phase 1 and Phase 2. Phase 1 focused on
                delivering the most impactful self-serve capabilities early,
                while Phase 2 layered on more complex workflows and
                integrations.
              </li>
              <li>
                <strong>
                  We needed to preserve essential human touchpoints.
                </strong>{" "}
                For some return reasons, such as faulty items, we created a
                hybrid process where automated workflows collected detailed
                information upfront before escalating to a Customer Experience
                advisor for resolution.
              </li>
              <li>
                <strong>We were working with legacy systems.</strong> The
                returns infrastructure was not initially built to support
                self-serve functionality, so we had to design a solution robust
                enough to integrate with old processes without breaking them,
                while still accommodating new features.
              </li>
            </ul>
          </motion.section>
        </motion.div>
      </aside>

      {/* Right Content Area */}
      <div className="project-content" onClick={flashControls}>
        {/* Play/Pause overlay — only shown when current asset is a video */}
        {VIDEO_INDICES.has(activeImageIndex) && (
          <div className={`media-control-overlay${showControls ? " visible" : ""}`}>
            <button
              className="media-control-btn"
              onClick={() => setIsPaused((p) => !p)}
              aria-label={isPaused ? "Play" : "Pause"}
            >
              {isPaused ? (
                // Play icon
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              ) : (
                // Pause icon
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                </svg>
              )}
            </button>
          </div>
        )}
        <div className="project-image-container">
          {/* Default Visual - SSR image 1 */}
          <motion.div
            className="project-detail-image-wrapper"
            initial={{ opacity: 1 }}
            animate={{ opacity: activeImageIndex === 0 ? 1 : 0 }}
            transition={{ duration: 0.4 }}
          >
            <Image
              src="/SSR image 1.png"
              alt="Self serve returns screenshot"
              width={1200}
              height={800}
              className="project-screenshot"
            />
          </motion.div>

          {/* Background Visual - NPS image 2 */}
          <motion.div
            className="project-detail-image-wrapper project-image-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: activeImageIndex === 1 ? 1 : 0 }}
            transition={{ duration: 0.4 }}
          >
            <Image
              src="/NPS image 2.png"
              alt="NPS feedback screenshot"
              width={1200}
              height={800}
              className="project-screenshot"
            />
          </motion.div>

          {/* 0.1 Visual - SSR 1 recording.mp4 */}
          <motion.div
            className="project-detail-image-wrapper project-image-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: activeImageIndex === 2 ? 1 : 0 }}
            transition={{ duration: 0.4 }}
          >
            <video
              ref={videoRef}
              src="/SSR 1 recording.mp4"
              className="project-screenshot"
              autoPlay
              loop
              muted
              playsInline
            />
          </motion.div>

          {/* 0.2 Visual - AI chart workflow.png */}
          <motion.div
            className="project-detail-image-wrapper project-image-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: activeImageIndex === 3 ? 1 : 0 }}
            transition={{ duration: 0.4 }}
          >
            <Image
              src="/AI chart workflow.png"
              alt="AI chart workflow"
              width={1200}
              height={800}
              className="project-screenshot"
            />
          </motion.div>

          {/* Impact & Challenges Visual - Return.png */}
          <motion.div
            className="project-detail-image-wrapper project-image-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: activeImageIndex === 4 ? 1 : 0 }}
            transition={{ duration: 0.4 }}
          >
            <Image
              src="/Return.png"
              alt="Impact and challenges metrics"
              width={1200}
              height={800}
              className="project-screenshot"
            />
          </motion.div>
        </div>
      </div>
    </main>
  );
}
