"use client";

import AccountIcon from "./AccountIcon";

interface Props {
  username?: string;
}

export default function SuccessPasskeyScreen({ username = "JaneDoe" }: Props) {
  return (
    <div style={{ position: "relative", width: "100%", height: "100%", background: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>

      {/* Grid background */}
      <GridBackground />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", gap: 40, width: "min(514px, calc(100% - 48px))" }}>

        {/* Icon + text */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <AccountIcon />

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 24, fontWeight: 700, lineHeight: "32px", letterSpacing: "-0.25px", color: "#1a1917", margin: 0 }}>
              You&apos;re all set, {username}.
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, fontWeight: 400, lineHeight: 1.4, letterSpacing: "-0.25px", color: "#7c7770", margin: 0 }}>
              Your account is ready and your passkey is saved. Next time you sign in, just use your face, fingerprint, or device PIN.
            </p>
          </div>
        </div>

        {/* Button */}
        <div style={{ width: "100%", maxWidth: 377, alignSelf: "center" }}>
          <button
            style={{ width: "100%", height: 40, background: "#0f172a", color: "#fff", fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 500, lineHeight: "24px", border: "none", borderRadius: 9999, cursor: "pointer" }}
          >
            Go home
          </button>
        </div>
      </div>
    </div>
  );
}

function GridBackground() {
  const CELL = 64;
  const COLS = 23;
  const ROWS = 4;

  const highlighted = new Set(["0-9", "0-14", "1-7", "1-13", "2-5", "2-12", "2-18", "3-3", "3-8"]);

  return (
    <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: COLS * CELL, pointerEvents: "none", WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 60%, transparent 100%)", maskImage: "linear-gradient(to bottom, black 0%, black 60%, transparent 100%)", opacity: 0.6 }}>
      {Array.from({ length: ROWS }, (_, row) => (
        <div key={row} style={{ display: "flex" }}>
          {Array.from({ length: COLS }, (_, col) => (
            <div key={col} style={{ width: CELL, height: CELL, flexShrink: 0, borderRight: "1px solid #d0d5dd", borderBottom: "1px solid #d0d5dd", background: highlighted.has(`${row}-${col}`) ? "#e8edf5" : "transparent" }} />
          ))}
        </div>
      ))}
    </div>
  );
}
