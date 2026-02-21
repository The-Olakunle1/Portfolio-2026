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
import "../../projects/self-serve-returns/page.css";

// Indices that have video assets (5 = static jpg)
const VIDEO_INDICES = new Set([0, 1, 2, 3, 4, 6]);

interface ProjectData {
    title: string;
    role: string;
    duration: string;
    description: string;
    background: string;
    goal: string;
}

const projectData: ProjectData = {
    title: "SwapSpace MVP",
    role: "Co-founder, Product Designer",
    duration: "2 months",
    description: "Designing for trust in a double-sided marketplace.",
    background:
        "SwapSpace started as a passion project born from a simple observation: travel was becoming increasingly expensive, yet most homes sit empty for weeks at a time. I saw an opportunity to solve both problems simultaneously through home exchange. While home exchange platforms existed, they often felt transactional, lacked trust mechanisms, and didn't provide the kind of experience that would make people feel confident swapping their homes with strangers. I wanted to build something different:",
    goal: "We aimed to create a member-only home exchange platform that makes travel more affordable and accessible while building a trusted community of verified members. The platform needed to feel welcoming yet premium, making people confident enough to swap their homes with strangers while discovering authentic travel experiences they couldn't access through traditional accommodation.",
};

export default function ProjectPage() {
    const sidebarRef = useRef<HTMLElement>(null);
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [showControls, setShowControls] = useState(false);
    const hideTimerRef = useRef<ReturnType<typeof setTimeout>>(null);
    const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

    // Auto-hide media controls after 2.5s
    const flashControls = useCallback(() => {
        setShowControls(true);
        if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
        hideTimerRef.current = setTimeout(() => setShowControls(false), 2500);
    }, []);

    // Reset pause state when scroll moves to a new asset
    useEffect(() => {
        setIsPaused(false);
    }, [activeImageIndex]);

    // Play/pause the active video when isPaused toggles or active index changes
    useEffect(() => {
        if (!VIDEO_INDICES.has(activeImageIndex)) return;
        const vid = videoRefs.current[activeImageIndex];
        if (!vid) return;
        if (isPaused) {
            vid.pause();
        } else {
            vid.play().catch(() => { });
        }
    }, [isPaused, activeImageIndex]);

    const { scrollYProgress } = useScroll({
        container: sidebarRef,
    });

    // Switch image/video based on scroll thresholds
    useMotionValueEvent(scrollYProgress, "change", (value) => {
        if (value < 0.15) {
            setActiveImageIndex(0); // Intro -> SwapSpace recording
        } else if (value < 0.35) {
            setActiveImageIndex(1); // Background -> SwapSpace recording
        } else if (value < 0.52) {
            setActiveImageIndex(2); // 0.1 -> Invite only platform
        } else if (value < 0.65) {
            setActiveImageIndex(3); // 0.2 -> SwapSpace IDV
        } else if (value < 0.76) {
            setActiveImageIndex(4); // 0.3 header -> Introducing delight
        } else if (value < 0.90) {
            setActiveImageIndex(5); // 0.3 italic -> Figma Make exploration
        } else {
            setActiveImageIndex(6); // 0.4 -> Project 3 frame
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
                            className={`italic-note${activeImageIndex === 1 ? " highlighted" : ""}`}
                        >
                            A curated community where verified members could travel
                            authentically and affordably.
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
                        <h2>Designing for Trust</h2>
                        <hr className="project-divider" />
                    </motion.section>

                    <motion.section
                        className="project-section"
                        style={{ opacity: sectionOpacity }}
                    >
                        <h2>0.1 An invite-only platform</h2>
                        <p>
                            The invite-only model was central to solving the biggest
                            challenge in home exchange: trust. Instead of granting direct
                            access to the platform, users had to fill out an application form.
                            This allowed us to vet every member and curate the community
                            from the start
                        </p>
                        <p
                            className={`italic-note${activeImageIndex === 2 ? " highlighted" : ""}`}
                        >
                            The application process set the expectation and ensured every
                            member valued meaningful, affordable travel. By limiting our initial
                            cohort to 100 founding members, we maintained quality and built a
                            platform where people felt safe enough to hand over the keys to their
                            homes.
                        </p>
                    </motion.section>

                    <motion.section
                        className="project-section"
                        style={{ opacity: sectionOpacity }}
                    >
                        <h2>0.2 Trust as a design principle</h2>
                        <p>
                            Trust and safety were foundational to our product strategy. I
                            designed identity verification as a core requirement. Every
                            member must verify their identity with a government ID before
                            they can initiate a swap, and verified members receive a visible
                            badge on their profile. By gating core functionality behind
                            verification, we embedded trust directly into the user journey.
                            This design decision ensured everyone in the community was
                            accountable and real, giving members the confidence to hand
                            over their keys.
                        </p>
                        <p
                            className={`italic-note${activeImageIndex === 3 ? " highlighted" : ""}`}
                        >
                            By gating core functionality behind verification, we embedded trust
                            directly into the user journey.
                        </p>
                    </motion.section>

                    <motion.section
                        className="project-section"
                        style={{ opacity: sectionOpacity }}
                    >
                        <h2>0.3 Introducing moments of delight</h2>
                        <p>
                            My passion for designing experiences filled with delight rather
                            than feeling transactional meant that incorporating delightful
                            moments into Swap-space was a natural step. This involved
                            finding natural parts of the journey where delight could be
                            injected unobtrusively.
                        </p>
                        <p
                            className={`italic-note${activeImageIndex === 5 ? " highlighted" : ""}`}
                        >
                            The first place I injected delight was after a user created an account,
                            when we wanted to inform them about their welcome credits. The
                            thought process was to design a card that felt like a keycard,
                            symbolizing access to explore the world or gain entry to a home. I
                            explored different ideas in Figma Make, prompting until I landed on
                            something I was happy with.
                        </p>
                    </motion.section>

                    <motion.section
                        className="project-section"
                        style={{ opacity: sectionOpacity }}
                    >
                        <h2>0.4 Impact &amp; Scale</h2>
                        <p>
                            Swap-space onboarded 100 founding members within the first
                            month of launching, validating the demand for a more
                            affordable and personal way to travel. Of those onboarded
                            members, 45% listed their homes on the platform,
                            demonstrating strong engagement and confidence in the
                            community we built. This early adoption showed that our focus
                            on trust, verification, and curation was working. Members
                            weren&apos;t just signing up, they were actively participating and
                            opening their homes to the community.
                        </p>
                    </motion.section>
                </motion.div>
            </aside>

            {/* Right Content Area */}
            <div className="project-content" onClick={flashControls}>
                {/* Play/Pause overlay - visible on hover, only for video assets */}
                {VIDEO_INDICES.has(activeImageIndex) && (
                    <div className={`media-control-overlay${showControls ? " visible" : ""}`}>
                        <button
                            className="media-control-btn"
                            onClick={() => setIsPaused((p) => !p)}
                            aria-label={isPaused ? "Play" : "Pause"}
                        >
                            {isPaused ? (
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                            ) : (
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                                </svg>
                            )}
                        </button>
                    </div>
                )}
                <div className="project-image-container">
                    {/* Index 0 - Intro: SwapSpace recording */}
                    <motion.div
                        className="project-detail-image-wrapper"
                        initial={{ opacity: 1 }}
                        animate={{ opacity: activeImageIndex === 0 ? 1 : 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        <video
                            ref={(el) => { videoRefs.current[0] = el; }}
                            src="/SwapSpace recording.mp4"
                            className="project-screenshot"
                            autoPlay
                            loop
                            muted
                            playsInline
                        />
                    </motion.div>

                    {/* Index 1 - Background: SwapSpace recording */}
                    <motion.div
                        className="project-detail-image-wrapper project-image-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: activeImageIndex === 1 ? 1 : 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        <video
                            ref={(el) => { videoRefs.current[1] = el; }}
                            src="/SwapSpace recording.mp4"
                            className="project-screenshot"
                            autoPlay
                            loop
                            muted
                            playsInline
                        />
                    </motion.div>

                    {/* Index 2 - 0.1 Invite-only platform */}
                    <motion.div
                        className="project-detail-image-wrapper project-image-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: activeImageIndex === 2 ? 1 : 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        <video
                            ref={(el) => { videoRefs.current[2] = el; }}
                            src="/Invite only platform.mp4"
                            className="project-screenshot"
                            autoPlay
                            loop
                            muted
                            playsInline
                        />
                    </motion.div>

                    {/* Index 3 - 0.2: SwapSpace IDV */}
                    <motion.div
                        className="project-detail-image-wrapper project-image-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: activeImageIndex === 3 ? 1 : 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        <video
                            ref={(el) => { videoRefs.current[3] = el; }}
                            src="/SwapSpace IDV.mp4"
                            className="project-screenshot"
                            autoPlay
                            loop
                            muted
                            playsInline
                        />
                    </motion.div>

                    {/* Index 4 - 0.3 header: Introducing delight */}
                    <motion.div
                        className="project-detail-image-wrapper project-image-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: activeImageIndex === 4 ? 1 : 0 }}
                        transition={{ duration: 0.7, ease: "easeInOut" }}
                    >
                        <video
                            ref={(el) => { videoRefs.current[4] = el; }}
                            src="/Introducing delight.mp4"
                            className="project-screenshot"
                            autoPlay
                            loop
                            muted
                            playsInline
                        />
                    </motion.div>

                    {/* Index 5 - 0.3 italic: Figma Make exploration */}
                    <motion.div
                        className="project-detail-image-wrapper project-image-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: activeImageIndex === 5 ? 1 : 0 }}
                        transition={{ duration: 0.7, ease: "easeInOut" }}
                    >
                        <Image
                            src="/Figma Make exploration.jpg"
                            alt="Figma Make keycard exploration"
                            width={1200}
                            height={800}
                            className="project-screenshot"
                        />
                    </motion.div>

                    {/* Index 6 - 0.4: Introducing delight */}
                    <motion.div
                        className="project-detail-image-wrapper project-image-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: activeImageIndex === 6 ? 1 : 0 }}
                        transition={{ duration: 0.7, ease: "easeInOut" }}
                    >
                        <video
                            ref={(el) => { videoRefs.current[6] = el; }}
                            src="/Introducing delight.mp4"
                            className="project-screenshot"
                            autoPlay
                            loop
                            muted
                            playsInline
                        />
                    </motion.div>
                </div>
            </div>
        </main>
    );
}
