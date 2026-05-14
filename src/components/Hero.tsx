"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";
import DistortionText from "./DistortionText";
import PastWorks from "./PastWorks";
import GrowthWorks from "./GrowthWorks";
import Articles from "./Articles";
import PageToggle from "./PageToggle";

const EMAIL = "Alabiolakunledaniel@gmail.com";

const Hero = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(EMAIL).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const externalLinks = [
    { label: "LinkedIn", href: "https://linkedin.com/in/olakunlealabi" },
    { label: "Medium", href: "https://medium.com/@The_Olakunle" },
  ];

  const bioRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: bioRef,
    offset: ["start 0.9", "end 0.1"],
  });

  const bioParagraphs = [
    "I'm Olakunle, Product designer and design engineer experienced in building software experiences from concept to delivery, based in the UK.",
    "I am obsessed with the way the web works and crafting great and delightful user experiences for it.",
    <>
      Currently a Product Designer at{" "}
      <a
        href="https://www.mpb.com"
        target="_blank"
        rel="noopener noreferrer"
        className="hero-link"
      >
        MPB.com
      </a>
      ; the largest global platform to buy, sell and trade photo kit where I
      help create solutions for over a million users across 13 countries.
    </>,
    <>
      I also co-founded{" "}
      <a
        href="https://swap-space.com"
        target="_blank"
        rel="noopener noreferrer"
        className="hero-link"
      >
        Swap-space.com
      </a>{" "}
      a members-only home swapping platform for affordable and sustainable
      travel.
    </>,
    "Outside of work I build and ship my own products. On iOS and macOS I use SwiftUI, on the web I work in React and Next.js. Recent projects include Calm for macOS and Airstream for iOS.",
  ];

  return (
    <>
      <section className="hero">
        <PageToggle />
        <div className="hero-container">
          {/* Left Column */}
          <motion.div
            className="hero-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h1 className="hero-name">Olakunle</h1>
            <p className="hero-pronunciation">[ooh-lah-KOON-leh]</p>

            <nav className="hero-links">
              {/* Email — copies to clipboard */}
              <motion.button
                className="hero-link"
                style={{ background: "none", border: "none", padding: 0, cursor: "pointer", fontFamily: "inherit", textAlign: "left" }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3, ease: "easeOut" }}
                whileHover={{ x: 4 }}
                onClick={handleCopyEmail}
              >
                {copied ? "Copied!" : "Email"}
              </motion.button>

              {/* External links */}
              {externalLinks.map((link, index) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero-link"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: 0.4 + index * 0.1,
                    ease: "easeOut",
                  }}
                  whileHover={{ x: 4 }}
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>

          {/* Right Column */}
          <motion.div
            className="hero-right"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            <div className="hero-bio" ref={bioRef}>
              {bioParagraphs.map((para, paraIndex) => {
                const totalParas = bioParagraphs.length;

                // Each paragraph gets an equal portion of the scroll range
                const segmentSize = 1 / totalParas;

                // Calculate the start and end of this paragraph's highlight window
                const segmentStart = paraIndex * segmentSize;
                const segmentEnd = (paraIndex + 1) * segmentSize;

                // For the first paragraph, start highlighted from the beginning
                // For others, fade in at the start of their segment
                const fadeInStart =
                  paraIndex === 0 ? -0.2 : segmentStart - 0.05;
                const fadeInEnd = paraIndex === 0 ? 0 : segmentStart + 0.05;

                // Fade out near the end of this paragraph's segment
                const fadeOutStart = segmentEnd - 0.1;
                const fadeOutEnd = segmentEnd;

                const color = useTransform(
                  scrollYProgress,
                  [fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd],
                  [
                    paraIndex === 0 ? "var(--text-primary)" : "var(--text-secondary)",
                    "var(--text-primary)",
                    "var(--text-primary)",
                    "var(--text-secondary)",
                  ],
                );

                return (
                  <motion.p key={paraIndex} style={{ color }}>
                    {para}
                  </motion.p>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Second Section - Tagline */}
      <section className="tagline-section">
        <div className="tagline-container">
          <DistortionText>
            Partnering with top product and design teams to solve complex and
            ambitious business problems
          </DistortionText>
        </div>
      </section>

      {/* Third Section - Past Works */}
      <PastWorks />

      {/* Fourth Section - Growth Works */}
      <GrowthWorks />

      {/* Fifth Section - Articles */}
      <Articles />
    </>
  );
};

export default Hero;
