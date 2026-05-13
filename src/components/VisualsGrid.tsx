"use client";

import { useRef, useState, useEffect } from "react";

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

const VideoCard = ({ video }: { video: (typeof videos)[0] }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // Play when visible, pause when scrolled away
  useEffect(() => {
    if (!cardRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        const v = videoRef.current;
        if (!v) return;
        if (entry.isIntersecting) {
          v.play().catch(() => {});
        } else {
          v.pause();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      style={{
        background: "#ffffff",
        borderRadius: 32,
        height: 540,
        overflow: "hidden",
        position: "relative",
        padding: "32px",
        boxSizing: "border-box" as const,
      }}
    >
      <div style={{ width: "100%", height: "100%", borderRadius: 24, overflow: "hidden", position: "relative", background: "#f5f5f5" }}>
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          autoPlay
          preload="auto"
          style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
        >
          <source src={video.src} type="video/mp4" />
        </video>
      </div>
      <div className="visuals-card-label">{video.label}</div>
    </div>
  );
};

export default function VisualsGrid() {
  const [cols, setCols] = useState(2);

  useEffect(() => {
    const update = () => setCols(window.innerWidth < 768 ? 1 : 2);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <div style={{ background: "#e9eaeb", padding: cols === 1 ? "40px 16px" : "80px 40px", minHeight: "100vh" }}>
      <div style={{ display: "grid", gridTemplateColumns: cols === 1 ? "1fr" : "1fr 1fr", gap: 16 }}>
        {videos.map((video) => (
          <VideoCard key={video.src} video={video} />
        ))}
      </div>
    </div>
  );
}
