"use client";

import { useState } from "react";
import Link from "next/link";
import UsernameScreen from "../screens/UsernameScreen";
import PasswordCreationScreen from "../screens/PasswordCreationScreen";

const STEPS = [
  { id: "username",          label: "Username entry",     Screen: UsernameScreen },
  { id: "password-creation", label: "Password creation",  Screen: PasswordCreationScreen },
];

const SCENARIOS = [
  { id: "S1", href: "/passkeysignup/scenario-1" },
  { id: "S2", href: "/passkeysignup/scenario-2" },
  { id: "S3", href: "/passkeysignup/scenario-3" },
  { id: "S4", href: "/passkeysignup/scenario-4" },
  { id: "S5", href: "/passkeysignup/scenario-5" },
];

const ACTIVE = "S3";

export default function Scenario3() {
  const [step, setStep] = useState(0);

  const { label, Screen } = STEPS[step];
  const isFirst = step === 0;
  const isLast = step === STEPS.length - 1;

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh", overflow: "hidden" }}>

      {/* Full-page screen */}
      <div style={{ width: "100%", height: "100%" }}>
        <Screen onNext={isLast ? undefined : () => setStep(s => s + 1)} />
      </div>

      {/* Floating prototype bar */}
      <div style={{
        position: "fixed", top: 16, left: "50%", transform: "translateX(-50%)",
        background: "rgba(255,255,255,0.92)", backdropFilter: "blur(12px)",
        border: "1px solid #e5e5e5", borderRadius: 100,
        padding: "8px 12px", display: "flex", alignItems: "center", gap: 8,
        boxShadow: "0 2px 12px rgba(0,0,0,0.08)", zIndex: 200,
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        whiteSpace: "nowrap",
      }}>
        {SCENARIOS.map((s) => (
          <Link key={s.id} href={s.href} style={{
            padding: "5px 12px", borderRadius: 100, fontSize: 12, fontWeight: 500,
            background: s.id === ACTIVE ? "#111" : "transparent",
            color: s.id === ACTIVE ? "#fff" : "#666",
            textDecoration: "none",
          }}>
            {s.id}
          </Link>
        ))}

        <div style={{ width: 1, height: 16, background: "#e5e5e5", margin: "0 4px" }} />

        <button disabled={isFirst} onClick={() => setStep(s => s - 1)}
          style={{ padding: "5px 12px", borderRadius: 100, fontSize: 12, fontWeight: 500, background: "none", border: "none", cursor: isFirst ? "default" : "pointer", color: "#666", opacity: isFirst ? 0.3 : 1 }}>
          ← Back
        </button>

        <span style={{ fontSize: 12, color: "#aaa" }}>{step + 1}/{STEPS.length}</span>

        <button disabled={isLast} onClick={() => setStep(s => s + 1)}
          style={{ padding: "5px 12px", borderRadius: 100, fontSize: 12, fontWeight: 500, background: isLast ? "transparent" : "#111", border: "none", cursor: isLast ? "default" : "pointer", color: isLast ? "#aaa" : "#fff", opacity: isLast ? 0.5 : 1 }}>
          Next →
        </button>
      </div>

      {/* Step label */}
      <div style={{
        position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)",
        fontSize: 11, color: "#aaa", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        background: "rgba(255,255,255,0.8)", backdropFilter: "blur(8px)",
        padding: "4px 12px", borderRadius: 100, border: "1px solid #ebebeb",
      }}>
        {label}
      </div>
    </div>
  );
}
