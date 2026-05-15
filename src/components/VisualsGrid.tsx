"use client";

import { useRef, useState, useEffect } from "react";

type MediaItem = { src: string; label: string; type: "video" | "gif" };

const items: MediaItem[] = [
  { src: "/Companion 1.mp4", label: "Companion", type: "video" },
  { src: "/Companion 2.mp4", label: "Companion", type: "video" },
  { src: "/Airstream 1.mp4", label: "Airstream", type: "video" },
  { src: "/Airstream 2.mp4", label: "Airstream", type: "video" },
  { src: "/Calm-firstview.mp4", label: "Calm — First View", type: "video" },
  { src: "/Calm-secondview.mp4", label: "Calm — Second View", type: "video" },
  { src: "/Introducing delight.mp4", label: "Moments of Delight", type: "video" },
  { src: "/Invite only platform.mp4", label: "Invite-Only Platform", type: "video" },
  { src: "/SSR 1 recording.mp4", label: "Self Serve Returns v1", type: "video" },
  { src: "/SSR phase 2 video.mp4", label: "Self Serve Returns v2", type: "video" },
  { src: "/Exchange selection.mp4", label: "Exchange Selection", type: "video" },
  { src: "/Mid Exchange refund.mp4", label: "Mid-Exchange Refund", type: "video" },
  { src: "/SwapSpace IDV.mp4", label: "Identity Verification", type: "video" },
  { src: "/SwapSpace recording.mp4", label: "SwapSpace Overview", type: "video" },
  { src: "/Refund-Mid exchange.mp4", label: "Refund Flow", type: "video" },
  { src: "/SwapSpace video 1.mp4", label: "SwapSpace Walkthrough", type: "video" },
];

const gifStyle: React.CSSProperties = {
  width: "100%",
  height: "100%",
  objectFit: "contain",
  display: "block",
};

const videoStyle: React.CSSProperties = {
  width: "100%",
  height: "100%",
  objectFit: "contain",
  display: "block",
};

const MediaCard = ({ item }: { item: MediaItem }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // Play/pause videos based on visibility
  useEffect(() => {
    if (item.type !== "video" || !cardRef.current) return;
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
  }, [item.type]);

  return (
    <div
      ref={cardRef}
      style={{
        background: "#ffffff",
        borderRadius: 32,
        height: "fit-content",
        overflow: "hidden",
        position: "relative",
        padding: "32px",
        boxSizing: "border-box",
      }}
    >
      <div style={{ width: "100%", aspectRatio: "16/9", borderRadius: 24, overflow: "hidden", position: "relative", background: "#ffffff" }}>
        {item.type === "gif" ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={item.src} alt={item.label} style={gifStyle} />
        ) : (
          <video
            ref={videoRef}
            muted
            loop
            playsInline
            autoPlay
            preload="auto"
            style={videoStyle}
          >
            <source src={item.src} type="video/mp4" />
          </video>
        )}
      </div>
      <div className="visuals-card-label">{item.label}</div>
    </div>
  );
};

export default function VisualsGrid() {
  const [cols, setCols] = useState(2);

  useEffect(() => {
    const update = () => setCols(window.innerWidth < 980 ? 1 : 2);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <div style={{ background: "#e9eaeb", padding: cols === 1 ? "80px 16px 40px" : "100px 40px 80px", minHeight: "100vh" }}>
      <div style={{ display: "grid", gridTemplateColumns: cols === 1 ? "1fr" : "1fr 1fr", gap: 16 }}>
        {items.map((item) => (
          <MediaCard key={item.src} item={item} />
        ))}
      </div>
    </div>
  );
}
