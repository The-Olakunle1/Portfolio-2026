"use client";

import GridBackground from "./GridBackground";

import { useState } from "react";
import AccountIcon from "./AccountIcon";

interface Props {
  onNext?: () => void;
}

export default function UsernameScreen({ onNext }: Props) {
  const [value, setValue] = useState("");

  return (
    <div style={{ position: "relative", width: "100%", height: "100%", background: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>

      {/* Grid background — top decorative band */}
      <GridBackground />

      {/* Form */}
      <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", gap: 40, width: "min(458px, calc(100% - 48px))" }}>

        {/* Icon + heading */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <AccountIcon />

          <div style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%" }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 24, fontWeight: 700, lineHeight: "32px", letterSpacing: "-0.25px", color: "#1a1917", margin: 0 }}>
              Create your username
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, fontWeight: 400, lineHeight: 1.4, color: "#7c7770", margin: 0 }}>
              Create a username, this is how others will find you.
            </p>
          </div>
        </div>

        {/* Username input */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <label htmlFor="pk-username" style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 500, lineHeight: "14px", color: "#000", display: "block" }}>
            Username
          </label>
          <input
            id="pk-username"
            type="text"
            placeholder="@JaneDoe"
            value={value}
            onChange={e => setValue(e.target.value)}
            style={{
              width: "100%",
              height: 36,
              padding: "8px 12px",
              border: "1px solid #cbd5e1",
              borderRadius: 6,
              background: "#fff",
              fontFamily: "'Inter', sans-serif",
              fontSize: 14,
              lineHeight: "20px",
              color: "#0f172a",
              outline: "none",
              boxSizing: "border-box",
            }}
          />
        </div>

        {/* Button */}
        <div style={{ width: "100%", maxWidth: 377, alignSelf: "center" }}>
          <button
            onClick={onNext}
            style={{
              width: "100%",
              height: 40,
              background: "#0f172a",
              color: "#fff",
              fontFamily: "'Inter', sans-serif",
              fontSize: 14,
              fontWeight: 500,
              lineHeight: "24px",
              border: "none",
              borderRadius: 9999,
              cursor: "pointer",
              transition: "background 0.15s",
            }}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
