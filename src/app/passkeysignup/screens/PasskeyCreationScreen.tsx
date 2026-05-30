"use client";

import { useState, useEffect } from "react";
import WhatIsPasskeyModal from "./WhatIsPasskeyModal";

interface Props {
  onNext?: () => void;
  onCancel?: () => void;
  onFail?: () => void;
  username?: string;
  autoTrigger?: boolean;  // fire the passkey prompt immediately on mount
  simulateFail?: boolean; // skip real WebAuthn and simulate an error instead
}

export default function PasskeyCreationScreen({ onNext, onCancel, onFail, username = "JaneDoe", autoTrigger = false, simulateFail = false }: Props) {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (autoTrigger) handleSetupPasskey();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleSetupPasskey() {
    setLoading(true);
    try {
      if (simulateFail) {
        // Simulate a short delay then throw a generic failure for S6
        await new Promise(res => setTimeout(res, 1500));
        throw new Error("SimulatedFailure");
      }

      const challenge = crypto.getRandomValues(new Uint8Array(32));
      const userId = crypto.getRandomValues(new Uint8Array(16));

      await navigator.credentials.create({
        publicKey: {
          challenge,
          rp: { name: "Passkey-First Signup", id: window.location.hostname },
          user: { id: userId, name: username, displayName: username },
          pubKeyCredParams: [
            { alg: -7,   type: "public-key" }, // ES256
            { alg: -257, type: "public-key" }, // RS256
          ],
          authenticatorSelection: {
            authenticatorAttachment: "platform",
            userVerification: "required",
            residentKey: "required",
          },
          timeout: 60000,
        },
      });

      onNext?.();
    } catch (err: unknown) {
      const name = err instanceof Error ? err.name : "";
      if (name === "NotAllowedError") {
        onCancel?.();
      } else {
        // Generic failure (timeout, device error, simulated)
        onFail?.();
      }
    } finally {
      setLoading(false);
    }
  }
  return (
    <div style={{ position: "relative", width: "100%", height: "100%", background: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>

      {/* Grid background */}
      <GridBackground />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", gap: 40, width: 514 }}>

        {/* Top section */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

          {/* Icon + heading + body */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {/* Key icon */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/passkey-key-icon.svg" alt="Passkey" style={{ width: 80, height: 80, display: "block" }} />

            {/* Heading + body */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 24, fontWeight: 700, lineHeight: "32px", letterSpacing: "-0.25px", color: "#1a1917", margin: 0 }}>
                Create a passkey
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-end" }}>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, fontWeight: 400, lineHeight: 1.4, color: "#7c7770", margin: 0, width: "100%" }}>
                  A passkey lets you sign in using your face, fingerprint, or device PIN. It&apos;s faster and more secure than a password, and there&apos;s nothing to remember or reset. Your passkey is saved to your device and never shared.
                </p>
                <button onClick={() => setShowModal(true)} style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 400, color: "#0f172a", background: "none", border: "none", cursor: "pointer", padding: 0, textDecoration: "underline", whiteSpace: "nowrap" }}>
                  Learn more about passkeys
                </button>
              </div>
            </div>
          </div>

          {/* Auth methods */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, fontWeight: 400, lineHeight: 1.4, color: "#000", margin: 0, letterSpacing: "-0.25px" }}>
              With Passkeys, you can log in with
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {/* Face ID */}
              <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/passkey-faceid-icon.svg" alt="Face ID" style={{ width: 24, height: 24, flexShrink: 0 }} />
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 400, color: "#474440", letterSpacing: "-0.25px" }}>Your Face ID</span>
              </div>
              {/* Touch ID */}
              <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                <FingerprintIcon />
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 400, color: "#474440", letterSpacing: "-0.25px" }}>Touch ID</span>
              </div>
              {/* Passcode */}
              <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                <LockIcon />
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 400, color: "#474440", letterSpacing: "-0.25px" }}>Passcode</span>
              </div>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12, width: 377, alignSelf: "center" }}>
          <button
            onClick={handleSetupPasskey}
            disabled={loading}
            style={{ width: "100%", height: 40, background: "#0f172a", color: "#fff", fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 500, lineHeight: "24px", border: "none", borderRadius: 9999, cursor: loading ? "wait" : "pointer", opacity: loading ? 0.7 : 1, transition: "opacity 0.15s" }}
          >
            {loading ? "Waiting…" : "Set up passkey"}
          </button>
          <button
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

function FingerprintIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C9.87 2 7.93 2.84 6.5 4.22" stroke="#474440" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M17.5 4.22C16.07 2.84 14.13 2 12 2" stroke="#474440" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M4.22 8.5C3.44 9.5 3 10.7 3 12" stroke="#474440" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M21 12C21 10.7 20.56 9.5 19.78 8.5" stroke="#474440" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M12 8C10.34 8 9 9.34 9 11C9 13.5 9 16 8 19" stroke="#474440" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M16 19C15.5 17 15 14.5 15 11C15 9.34 13.66 8 12 8" stroke="#474440" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M6 15C6.33 14 6.6 12.8 6.6 11C6.6 8.02 9.02 5.6 12 5.6C14.98 5.6 17.4 8.02 17.4 11" stroke="#474440" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M12 13C12 15.5 11.5 18 10 21" stroke="#474440" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M17.4 14C17.15 15.5 16.9 17 16.2 19" stroke="#474440" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="11" width="14" height="10" rx="2" stroke="#474440" strokeWidth="1.5"/>
      <path d="M8 11V7C8 4.79 9.79 3 12 3C14.21 3 16 4.79 16 7V11" stroke="#474440" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="12" cy="16" r="1.5" fill="#474440"/>
      <line x1="12" y1="17.5" x2="12" y2="19" stroke="#474440" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

function GridBackground() {
  const CELL = 64;
  const COLS = 23;
  const ROWS = 4;

  const highlighted = new Set([
    "0-9", "0-14",
    "1-7", "1-13",
    "2-5", "2-12", "2-18",
    "3-3", "3-8",
  ]);

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
