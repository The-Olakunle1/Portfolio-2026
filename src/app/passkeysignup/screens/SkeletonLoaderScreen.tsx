"use client";

import GridBackground from "./GridBackground";

import { useEffect } from "react";

interface Props {
  onNext?: () => void;       // auto-fires after 2s (passkey supported)
  onPassword?: () => void;   // fires if user taps "Use a password instead"
}

const SHIMMER = "#e4e4e4";

// Reusable skeleton bar
function Bar({ width, height, top, borderRadius = 4 }: { width: number | string; height: number; top?: number; borderRadius?: number }) {
  return (
    <div className="sk-shimmer" style={{
      width, height, borderRadius,
      background: SHIMMER,
      flexShrink: 0,
      ...(top !== undefined ? { position: "absolute", top, left: 0 } : {}),
    }} />
  );
}

export default function SkeletonLoaderScreen({ onNext, onPassword }: Props) {
  // Auto-advance after 2 seconds
  useEffect(() => {
    const t = setTimeout(() => onNext?.(), 2000);
    return () => clearTimeout(t);
  }, [onNext]);

  return (
    <>
      <style>{`
        @keyframes sk-pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.5; }
        }
        .sk-shimmer {
          animation: sk-pulse 1.4s ease-in-out infinite;
        }
      `}</style>

      <div style={{ position: "relative", width: "100%", height: "100%", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>

        {/* Grid background */}
        <GridBackground />

        {/* Skeleton content */}
        <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", gap: 40, width: "min(514px, calc(100% - 48px))" }}>

          {/* Top section */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

            {/* Icon skeleton */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <Bar width={80} height={80} borderRadius={4} />

              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {/* Title line */}
                <div style={{ height: 32, position: "relative" }}>
                  <Bar width={514} height={19.2} top={6.4} />
                </div>

                {/* Body lines */}
                <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-end" }}>
                  <div style={{ height: 88, width: "100%", position: "relative" }}>
                    <Bar width={514} height={12.8} top={8.8} />
                    <Bar width={514} height={12.8} top={28} />
                    <Bar width={514} height={12.8} top={47.2} />
                    <Bar width={514} height={12.8} top={66.4} />
                  </div>
                  {/* "Learn more" line */}
                  <div style={{ height: 17, width: 151, position: "relative" }}>
                    <Bar width={151} height={9.6} top={3.7} />
                  </div>
                </div>
              </div>
            </div>

            {/* Auth methods skeleton */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {/* "With Passkeys…" line */}
              <div style={{ height: 22, position: "relative" }}>
                <Bar width={514} height={12.8} top={4.6} />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {/* Face ID */}
                <div style={{ height: 20, position: "relative" }}>
                  <Bar width={81} height={11.2} top={4.4} />
                </div>
                {/* Touch ID */}
                <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                  <div style={{ width: 24, height: 24, position: "relative", flexShrink: 0 }}>
                    <Bar width={24} height={14.8} top={4.6} />
                  </div>
                  <div style={{ height: 20, width: 57, position: "relative" }}>
                    <Bar width={57} height={11.2} top={4.4} />
                  </div>
                </div>
                {/* Passcode */}
                <div style={{ height: 20, position: "relative" }}>
                  <Bar width={63} height={11.2} top={4.4} />
                </div>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%", maxWidth: 377, alignSelf: "center" }}>
            {/* Primary button skeleton */}
            <div className="sk-shimmer" style={{ width: "100%", height: 40, background: SHIMMER, borderRadius: 9999 }} />

            {/* Ghost link — stays live so user can opt out */}
            <button
              onClick={onPassword}
              style={{ width: "100%", height: 40, background: "transparent", color: "#0f172a", fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 500, border: "none", borderRadius: 9999, cursor: "pointer" }}
            >
              Use a password instead
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
