"use client";

import GridBackground from "./GridBackground";

import { useState } from "react";
import WhatIsPasskeyModal from "./WhatIsPasskeyModal";

interface Props {
  onTryAgain?: () => void;
  onPassword?: () => void;
}

export default function PasskeyCancelledScreen({ onTryAgain, onPassword }: Props) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%", background: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>

      {/* Grid background */}
      <GridBackground />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", gap: 40, width: "min(514px, calc(100% - 48px))" }}>

        {/* Icon + text */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>

          {/* Icon */}
          <img
            src="/passkey-cancelled-icon.svg"
            alt=""
            width={80}
            height={80}
            style={{ display: "block" }}
          />

          {/* Heading + body */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12, letterSpacing: "-0.25px" }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 24, fontWeight: 700, lineHeight: "32px", color: "#1a1917", margin: 0 }}>
              Passkey set up was cancelled
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-end" }}>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, fontWeight: 400, lineHeight: 1.4, color: "#7c7770", margin: 0, width: "100%" }}>
                No problem, you can set up your passkey again or use a password instead.
              </p>
              <button
                onClick={() => setShowModal(true)}
                style={{ background: "none", border: "none", cursor: "pointer", padding: 0, fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 400, lineHeight: 1.4, color: "#0f172a", textDecoration: "underline", textAlign: "right" }}
              >
                Learn more about passkeys
              </button>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%", maxWidth: 377, alignSelf: "center" }}>
          <button
            onClick={onTryAgain}
            style={{ width: "100%", height: 40, background: "#0f172a", color: "#fff", fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 500, lineHeight: "24px", border: "none", borderRadius: 9999, cursor: "pointer" }}
          >
            Try Passkey setup again
          </button>
          <button
            onClick={onPassword}
            style={{ width: "100%", height: 40, background: "transparent", color: "#0f172a", fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 500, lineHeight: "24px", border: "none", borderRadius: 9999, cursor: "pointer" }}
          >
            Use a password instead
          </button>
        </div>
      </div>
      {showModal && <WhatIsPasskeyModal onClose={() => setShowModal(false)} />}
    </div>
  );
}
