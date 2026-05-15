"use client";

import { useRef, useEffect, useState } from "react";

const cardStyle: React.CSSProperties = {
  background: "#ffffff",
  borderRadius: 32,
  overflow: "hidden",
  padding: 32,
  boxSizing: "border-box",
};

const headerStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 8,
  marginBottom: 24,
};

const iconWrapperStyle = (gradient: string): React.CSSProperties => ({
  background: gradient,
  borderRadius: 8.6,
  width: 40,
  height: 40,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  overflow: "hidden",
});

const titleStyle: React.CSSProperties = {
  fontFamily: "var(--font-sentient), Georgia, serif",
  fontSize: 18,
  color: "#181d27",
  margin: 0,
  lineHeight: 1.4,
};

const subtitleStyle: React.CSSProperties = {
  fontFamily: "var(--font-inter), system-ui, sans-serif",
  fontSize: 14,
  color: "#414651",
  margin: 0,
  lineHeight: 1.4,
  letterSpacing: "-0.007em",
};

const videoWrapperStyle: React.CSSProperties = {
  width: "100%",
  aspectRatio: "16/9",
  borderRadius: 24,
  overflow: "hidden",
  position: "relative",
  background: "#f5f5f5",
};

const videoStyle: React.CSSProperties = {
  width: "100%",
  height: "100%",
  objectFit: "contain",
  display: "block",
};

const captionStyle: React.CSSProperties = {
  fontFamily: "var(--font-inter), system-ui, sans-serif",
  fontSize: 14,
  color: "#414651",
  margin: "24px 0 0",
  lineHeight: 1.4,
  letterSpacing: "-0.007em",
};

const AppCard = ({
  icon,
  iconGradient,
  title,
  subtitle,
  caption,
  videoSrc,
}: {
  icon: string;
  iconGradient: string;
  title: string;
  subtitle: string;
  caption: string;
  videoSrc: string;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        const v = videoRef.current;
        if (!v) return;
        entry.isIntersecting ? v.play().catch(() => {}) : v.pause();
      },
      { threshold: 0.3 }
    );
    observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={cardRef} style={cardStyle}>
      <div style={headerStyle}>
        <div style={iconWrapperStyle(iconGradient)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={icon} alt={title} style={{ width: 33, height: 33, objectFit: "contain" }} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <p style={titleStyle}>{title}</p>
          <p style={subtitleStyle}>{subtitle}</p>
        </div>
      </div>

      <div style={videoWrapperStyle}>
        <video ref={videoRef} muted loop playsInline autoPlay preload="auto" style={videoStyle}>
          <source src={videoSrc} type="video/mp4" />
        </video>
      </div>

      <p style={captionStyle}>{caption}</p>
    </div>
  );
};

export default function AppsGrid() {
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
        <AppCard
          icon="/Calm app icon.png"
          iconGradient="linear-gradient(to right, #f9f8f7, #edeaf6)"
          title="Calm app"
          subtitle="Your quiet corner of the internet, saved on your mac."
          caption="Personal project built for MacOS using SwiftUI"
          videoSrc="/Calm-onboarding.mp4"
        />
        <AppCard
          icon="/Companion icon.png"
          iconGradient="linear-gradient(to right, #e7eee7, #f9f8f7)"
          title="Companion"
          subtitle="Every walk is better with a companion."
          caption="Personal project built for iOS using SwiftUI"
          videoSrc="/Companion 1.mp4"
        />
      </div>
    </div>
  );
}
