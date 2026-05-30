"use client";

import GridBackground from "./GridBackground";

import { useState } from "react";

interface Props {
  onNext?: () => void;
}

// Small version of AccountIcon scaled to 34×31
function SmallAccountIcon() {
  return (
    <svg
      width="34"
      height="31"
      viewBox="0 0 80 73.316"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="40" cy="18.824" r="18.824" fill="#D4A017" stroke="#1a1917" strokeWidth="1.5" />
      <rect
        x="9.412"
        y="42.285"
        width="61.176"
        height="31.031"
        rx="30.588"
        ry="30.588"
        fill="#2D7A45"
        stroke="#1a1917"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 3.5L3.8 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const requirements = [
  "Minimum 8 characters",
  "At least 1 number",
  "At least one special character",
];

export default function PasswordCreationScreen({ onNext }: Props) {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%", background: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>

      {/* Grid background */}
      <GridBackground />

      {/* Form */}
      <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", gap: 42, width: "min(458px, calc(100% - 48px))" }}>

        {/* Top section */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

          {/* Icon + heading + inputs */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

            {/* Icon + heading */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <SmallAccountIcon />

              <div style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%" }}>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 24, fontWeight: 700, lineHeight: "32px", letterSpacing: "-0.25px", color: "#1a1917", margin: 0 }}>
                  Create password
                </p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, fontWeight: 400, lineHeight: 1.4, color: "#7c7770", margin: 0 }}>
                  Set up a password to protect your account
                </p>
              </div>
            </div>

            {/* Password field */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <label htmlFor="pk-password" style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 500, lineHeight: "14px", color: "#000", display: "block" }}>
                Password*
              </label>
              <div style={{ position: "relative", width: "100%" }}>
                <input
                  id="pk-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="**********"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  style={{
                    width: "100%",
                    height: 36,
                    padding: "8px 52px 8px 12px",
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
                <button
                  type="button"
                  onClick={() => setShowPassword(v => !v)}
                  style={{
                    position: "absolute",
                    right: 12,
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 12,
                    fontWeight: 500,
                    color: "#474440",
                    padding: 0,
                    lineHeight: "20px",
                  }}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* Confirm password field */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <label htmlFor="pk-confirm" style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 500, lineHeight: "14px", color: "#000", display: "block" }}>
                Confirm password*
              </label>
              <div style={{ position: "relative", width: "100%" }}>
                <input
                  id="pk-confirm"
                  type={showConfirm ? "text" : "password"}
                  placeholder="**********"
                  value={confirm}
                  onChange={e => setConfirm(e.target.value)}
                  style={{
                    width: "100%",
                    height: 36,
                    padding: "8px 52px 8px 12px",
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
                <button
                  type="button"
                  onClick={() => setShowConfirm(v => !v)}
                  style={{
                    position: "absolute",
                    right: 12,
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 12,
                    fontWeight: 500,
                    color: "#474440",
                    padding: 0,
                    lineHeight: "20px",
                  }}
                >
                  {showConfirm ? "Hide" : "Show"}
                </button>
              </div>
            </div>
          </div>

          {/* Requirements checklist */}
          <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
            {requirements.map((req) => (
              <div key={req} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{
                  width: 16,
                  height: 16,
                  borderRadius: 4,
                  background: "#079455",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}>
                  <CheckIcon />
                </div>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 400, lineHeight: 1.4, color: "#079455" }}>
                  {req}
                </span>
              </div>
            ))}
          </div>
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
            }}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
