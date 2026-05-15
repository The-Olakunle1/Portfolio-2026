"use client";

import Link from "next/link";
import { motion } from "motion/react";

const imgStacking = "/Calm stacking.png";
const imgLogoExploration = "/Calm logo exploration.png";
const imgButtonsCalm = "/Buttons Calm.png";
const imgCalmSearch = "/Calm search.png";

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: "#ffffff",
    display: "flex",
    justifyContent: "center",
    padding: "80px 24px 120px",
  },
  inner: {
    width: "100%",
    maxWidth: 560,
    display: "flex",
    flexDirection: "column",
    gap: 32,
  },
  backLink: {
    display: "inline-flex",
    alignItems: "center",
    gap: 4,
    fontSize: 12,
    color: "#d5d7da",
    textDecoration: "none",
    fontFamily: "var(--font-inter), system-ui, sans-serif",
    marginBottom: 8,
  },
  title: {
    fontFamily: "var(--font-sentient), Georgia, serif",
    fontSize: 24,
    fontWeight: 700,
    color: "#000",
    letterSpacing: "-0.192px",
    lineHeight: 1.6,
    margin: 0,
  },
  meta: {
    fontSize: 12,
    color: "#181d27",
    fontFamily: "var(--font-inter), system-ui, sans-serif",
    letterSpacing: "-0.096px",
    lineHeight: 1.6,
    margin: 0,
  },
  description: {
    fontSize: 14,
    color: "#000",
    fontFamily: "var(--font-inter), system-ui, sans-serif",
    letterSpacing: "-0.112px",
    lineHeight: 1.6,
    margin: 0,
  },
  body: {
    fontSize: 14,
    color: "#181d27",
    fontFamily: "var(--font-inter), system-ui, sans-serif",
    letterSpacing: "-0.112px",
    lineHeight: 1.6,
    margin: 0,
  },
  bold: {
    fontWeight: 700,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 700,
    color: "#181d27",
    fontFamily: "var(--font-inter), system-ui, sans-serif",
    letterSpacing: "-0.112px",
    lineHeight: 1.6,
    margin: 0,
  },
  imgFull: {
    width: "100%",
    height: "auto",
    display: "block",
    borderRadius: 8,
  },
  logoRow: {
    background: "#fff",
    display: "flex",
    gap: 25,
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
    width: "100%",
    boxSizing: "border-box" as const,
  },
  buttonsImg: {
    width: 214,
    height: "auto",
    display: "block",
  },
};

export default function CalmPage() {
  return (
    <main style={styles.page}>
      <motion.div
        style={styles.inner}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Back link */}
        <Link href="/apps" style={styles.backLink}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Home
        </Link>

        {/* Header */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <h1 style={styles.title}>Calm app</h1>
          <p style={styles.meta}>Product designer &amp; Design Engineer | TryCalm.app | 2026</p>
          <p style={styles.description}>Your quiet corner of the internet, saved on your mac.</p>
        </div>

        {/* Intro */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <p style={styles.body}>
            I have a folder on my Mac called <strong>Saves,</strong> it has over 500 images on it. I haven't opened it in months.
          </p>
          <p style={styles.body}>
            As a designer I save constantly. Articles, design references, ideas that felt important at the time. They're all in there somewhere, buried under everything I saved after them.
          </p>
          <p style={styles.body}>
            The problem isn't saving. Saving is easy. Every app makes saving easy. The problem is what happens after. You save something and it disappears into a pile. The pile gets bigger. Eventually you stop trusting the pile and you stop going back to it.
          </p>
          <p style={styles.body}>
            So you save the next thing somewhere else. A new Note. A new folder. A new app that promises to be different. It never is.
          </p>
          <p style={styles.body}>
            I wanted something simpler. My own quiet corner of the internet. Somewhere things I save actually feel mine — without the overhead of organising, tagging, or maintaining it.
          </p>
          <p style={{ ...styles.body, ...styles.bold }}>So, I built Calm.</p>
          <p style={styles.body}>
            It lives on your Mac. Nothing leaves your machine. Hit a shortcut, drop a link, an image, a PDF, whatever caught your eye, and it's there. Sorted by date. Instantly searchable. That's it.
          </p>
          <p style={styles.body}>No account. No cloud. No pile you'll never go back to.</p>
        </div>

        {/* Stacked screenshots */}
        <img src={imgStacking} alt="Calm app screenshots" style={styles.imgFull} />

        {/* Building Calm */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <p style={styles.sectionTitle}>Building Calm</p>
          <p style={styles.body}>
            Calm has been the most enjoyable personal project I've worked on. I had a clear feeling for what I wanted it to be from the start and it lives up to its name.
          </p>
          <p style={styles.body}>
            I wanted the whole experience to feel considered, from the first screen you see to the sound that plays when you open it. The onboarding needed to feel like an arrival, not a setup process. So I spent time on the logo animation, the ambient music, the gradient that shifts slowly behind everything like light through a window.
          </p>
          <p style={styles.body}>
            For the icon I sketched a few butterfly illustrations in Figma and refined the final version in QuiverAI. The butterfly isn't incidental. It's something that lands quietly, stays briefly, and leaves an impression. That felt right for an app about things worth keeping.
          </p>
          <img src={imgLogoExploration} alt="Calm logo exploration" style={styles.imgFull} />
        </div>

        {/* Capture anything */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <p style={styles.sectionTitle}>Capture anything, out of the way</p>
          <p style={styles.body}>The main view is three buttons. Add photo. Menu. Add link.</p>
          <p style={styles.body}>
            That's the whole app surface. No sidebar, no toolbar, no settings panel demanding attention. The most important actions are right there and everything else stays hidden until you need it.
          </p>
          <img src={imgButtonsCalm} alt="Calm buttons" style={styles.imgFull} />
          <p style={styles.body}>
            I wanted Calm to feel like it's not really there, until you need it. Then it's exactly where you left it.
          </p>
        </div>

        {/* Search */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <p style={styles.sectionTitle}>Search</p>
          <p style={styles.body}>
            Most bookmark apps make you do the work upfront. Tag it, categorise it, file it somewhere sensible. The assumption is that future you will thank present you for the effort.
          </p>
          <p style={styles.body}>Present you never does the effort. So future you finds nothing.</p>
          <p style={styles.body}>
            Calm doesn't ask you to tag anything. You save it and it's there, sorted by the date you saved it. The search bar at the top of the menu searches everything instantly as you type. Titles, URLs, file names. No filters, no dropdowns, no query syntax to learn.
          </p>
          <p style={styles.body}>It's the kind of search that gets out of your way.</p>
          <img src={imgCalmSearch} alt="Calm search" style={styles.imgFull} />
        </div>

        {/* Anthropic layer */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <p style={styles.sectionTitle}>Anthropic layer</p>
          <p style={styles.body}>
            One thing I wanted to solve was images. A link has a title. A PDF has a file name. An image has nothing. It just sits there, unsearchable, unless you remember exactly when you saved it.
          </p>
          <p style={styles.body}>
            So I added an optional Anthropic layer. Drop in your API key and Calm will quietly generate a description for every image you save. A screenshot of a colour palette becomes searchable as "muted sage and blush tones." A photo of a building becomes "brutalist concrete facade, natural light."
          </p>
          <p style={styles.body}>
            The key lives on your Mac. It never touches a server. It's the same local-first principle the whole app is built on, just with a layer of intelligence on top for the people who want it.
          </p>
          <p style={styles.body}>
            You don't have to use it. But once you do, your image library becomes as searchable as everything else.
          </p>
          <img src="/CalmOS.png" alt="CalmOS" style={styles.imgFull} />
        </div>
      </motion.div>
    </main>
  );
}
