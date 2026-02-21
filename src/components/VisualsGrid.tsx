"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

const videos = [
    { src: "/Introducing delight.mp4", label: "Moments of Delight" },
    { src: "/Invite only platform.mp4", label: "Invite-Only Platform" },
    { src: "/SSR 1 recording.mp4", label: "Self Serve Returns v1" },
    { src: "/SSR phase 2 video.mp4", label: "Self Serve Returns v2" },
    { src: "/Exchange selection.mp4", label: "Exchange Selection" },
    { src: "/Mid Exchange refund.mp4", label: "Mid-Exchange Refund" },
    { src: "/SwapSpace IDV.mp4", label: "Identity Verification" },
    { src: "/SwapSpace recording.mp4", label: "SwapSpace Overview" },
    { src: "/Refund-Mid exchange.mp4", label: "Refund Flow" },
    { src: "/SwapSpace video 1.mp4", label: "SwapSpace Walkthrough" },
];

const GAP = 20;

function useCanvasLayout() {
    const [layout, setLayout] = useState({
        cardW: 552,
        cardH: 345,
        cols: 4,
        canvasW: 0,
        canvasH: 0,
        positions: [] as { x: number; y: number }[],
    });

    useEffect(() => {
        function compute() {
            const vw = window.innerWidth;
            let cols: number, cardW: number;

            if (vw <= 600) {
                cols = 2;
                cardW = Math.floor((vw - 32 - GAP) / 2); // 16px padding each side
            } else if (vw <= 900) {
                cols = 3;
                cardW = Math.floor((vw - 64 - GAP * 2) / 3);
            } else {
                cols = 4;
                cardW = 607;
            }

            const cardH = Math.round(cardW * 0.625); // 16:10 ratio
            const positions = videos.map((_, i) => ({
                x: (i % cols) * (cardW + GAP),
                y: Math.floor(i / cols) * (cardH + GAP),
            }));
            const canvasW = cols * (cardW + GAP) - GAP;
            const canvasH = Math.ceil(videos.length / cols) * (cardH + GAP) - GAP;

            setLayout({ cardW, cardH, cols, canvasW, canvasH, positions });
        }

        compute();
        window.addEventListener("resize", compute);
        return () => window.removeEventListener("resize", compute);
    }, []);

    return layout;
}

const VideoCard = ({
    video,
    pos,
    cardW,
    cardH,
}: {
    video: (typeof videos)[0];
    pos: { x: number; y: number };
    cardW: number;
    cardH: number;
}) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setIsMobile("ontouchstart" in window || window.innerWidth < 900);
    }, []);

    // Mobile: autoplay when visible via IntersectionObserver
    useEffect(() => {
        if (!isMobile || !videoRef.current || !cardRef.current) return;

        const vid = videoRef.current;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    vid.play().catch(() => { });
                } else {
                    vid.pause();
                }
            },
            { threshold: 0.5 }
        );

        observer.observe(cardRef.current);
        return () => observer.disconnect();
    }, [isMobile]);

    return (
        <div
            ref={cardRef}
            className="canvas-card"
            style={{
                position: "absolute",
                left: pos.x,
                top: pos.y,
                width: cardW,
                height: cardH,
            }}
            onMouseEnter={() => {
                if (!isMobile && videoRef.current) {
                    videoRef.current.currentTime = 0;
                    videoRef.current.play().catch(() => { });
                }
            }}
            onMouseLeave={() => {
                if (!isMobile && videoRef.current) {
                    videoRef.current.pause();
                    videoRef.current.currentTime = 0;
                }
            }}
        >
            <video
                ref={videoRef}
                className="visuals-video"
                muted
                loop
                playsInline
                preload="metadata"
            >
                <source src={video.src} type="video/mp4" />
            </video>
            <div className="visuals-card-label">{video.label}</div>
        </div>
    );
};

export default function VisualsGrid() {
    const [showHint, setShowHint] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);
    const layout = useCanvasLayout();

    // Center scroll position on mount (with small delay for layout)
    useEffect(() => {
        const timer = setTimeout(() => {
            if (scrollRef.current) {
                const el = scrollRef.current;
                const scrollX = Math.max(0, (el.scrollWidth - el.clientWidth) / 2);
                const scrollY = Math.max(0, (el.scrollHeight - el.clientHeight) / 2);
                el.scrollTo(scrollX, scrollY);
            }
        }, 50);
        return () => clearTimeout(timer);
    }, [layout]);

    // Desktop hint
    useEffect(() => {
        const isMobile = "ontouchstart" in window || window.innerWidth < 900;
        if (isMobile) return;
        const showTimer = setTimeout(() => setShowHint(true), 600);
        const hideTimer = setTimeout(() => setShowHint(false), 2600);
        return () => {
            clearTimeout(showTimer);
            clearTimeout(hideTimer);
        };
    }, []);

    return (
        <div ref={scrollRef} className="infinite-canvas">
            <AnimatePresence>
                {showHint && (
                    <motion.div
                        className="visuals-hint-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <motion.div
                            className="visuals-hint"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 18.5C15.5899 18.5 18.5 15.5899 18.5 12C18.5 8.41015 15.5899 5.5 12 5.5C8.41015 5.5 5.5 8.41015 5.5 12C5.5 15.5899 8.41015 18.5 12 18.5Z" />
                                <path d="M8 12L4 12" /><path d="M20 12L16 12" />
                                <path d="M12 8L12 4" /><path d="M12 20L12 16" />
                            </svg>
                            Scroll to explore · Hover to preview
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div
                className="canvas-content"
                style={{
                    width: layout.canvasW,
                    height: layout.canvasH,
                    position: "relative",
                }}
            >
                {layout.positions.length > 0 &&
                    videos.map((video, index) => (
                        <VideoCard
                            key={video.src}
                            video={video}
                            pos={layout.positions[index]}
                            cardW={layout.cardW}
                            cardH={layout.cardH}
                        />
                    ))}
            </div>
        </div>
    );
}

