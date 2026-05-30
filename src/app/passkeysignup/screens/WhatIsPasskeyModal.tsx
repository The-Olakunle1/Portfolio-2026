"use client";

interface Props {
  onClose: () => void;
}

export default function WhatIsPasskeyModal({ onClose }: Props) {
  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)",
          zIndex: 300, display: "flex", alignItems: "center", justifyContent: "center",
        }}
      >
        {/* Modal card */}
        <div
          onClick={e => e.stopPropagation()}
          style={{
            background: "#fff", borderRadius: 12, padding: 24,
            width: 390, maxWidth: "calc(100vw - 32px)",
            display: "flex", flexDirection: "column", gap: 12,
            alignItems: "center", boxShadow: "0 8px 40px rgba(0,0,0,0.16)",
          }}
        >
          {/* Key icon */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/passkey-key-icon.svg" alt="Passkey" style={{ width: 80, height: 80, display: "block" }} />

          {/* Title */}
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, fontWeight: 700, lineHeight: 1.4, letterSpacing: "-0.25px", color: "#1a1917", textAlign: "center", margin: 0, width: "100%" }}>
            What&apos;s a passkey?
          </p>

          {/* Intro */}
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 400, lineHeight: 1.4, letterSpacing: "-0.25px", color: "#474440", width: "100%" }}>
            <p style={{ margin: "0 0 0 0" }}>
              A passkey is a modern alternative to a password. Instead of typing something in, you confirm it&apos;s you the same way you unlock your phone or computer, with your face, fingerprint, or device PIN.
            </p>
            <p style={{ margin: "6px 0 0 0" }}>
              It&apos;s faster, more secure, and there&apos;s nothing to remember or reset.
            </p>
          </div>

          {/* How passkeys work */}
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 600, lineHeight: 1.4, letterSpacing: "-0.25px", color: "#474440", margin: 0, width: "100%" }}>
            How passkeys work:
          </p>

          <ul style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 400, lineHeight: 1.4, letterSpacing: "-0.25px", color: "#474440", paddingLeft: 18, margin: 0, width: "100%", display: "flex", flexDirection: "column", gap: 6 }}>
            <li>
              Tap <strong style={{ fontWeight: 500 }}>&apos;Set up passkey&apos;</strong> and your browser or device will guide you through a quick setup.
            </li>
            <li>
              Next time you sign in, just use your face, fingerprint, or PIN — no typing required.
            </li>
            <li>
              Your passkey is stored securely on your device and never shared.
            </li>
          </ul>

          {/* Spacer */}
          <div style={{ height: 24 }} />

          {/* Got it button */}
          <button
            onClick={onClose}
            style={{
              width: "100%", height: 40, background: "#0f172a", color: "#fff",
              fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 500,
              lineHeight: "24px", border: "none", borderRadius: 9999, cursor: "pointer",
            }}
          >
            Got it
          </button>
        </div>
      </div>
    </>
  );
}
