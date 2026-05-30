"use client";

import GridBackground from "./GridBackground";

import AccountIcon from "./AccountIcon";

interface Props {
  username?: string;
}

export default function SuccessPasswordScreen({ username = "JaneDoe" }: Props) {
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
              Your account is ready. Welcome aboard.
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
