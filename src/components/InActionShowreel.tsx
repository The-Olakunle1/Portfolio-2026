"use client";

import { motion } from "motion/react";

const images = [
  { src: "/In action 1.jpg", alt: "In action 1" },
  { src: "/In action 2.jpeg", alt: "In action 2" },
  { src: "/In action 3.jpeg", alt: "In action 3" },
  { src: "/In action 4.jpeg", alt: "In action 4" },
];

export default function InActionShowreel() {
  return (
    <section className="past-works-section" style={{ paddingTop: 0, paddingBottom: 24 }}>
      <div className="past-works-container">
        <motion.h2
          className="past-works-title"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Behind the work
        </motion.h2>
        <div style={{ display: "flex", gap: 12, overflowX: "auto", overflowY: "hidden", scrollbarWidth: "none", msOverflowStyle: "none", borderRadius: 16 }}>
          {images.map((img, i) => (
            <motion.div
              key={img.src}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              style={{ flexShrink: 0, borderRadius: 16, overflow: "hidden", height: 280 }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.src}
                alt={img.alt}
                style={{ height: "100%", width: "auto", display: "block", objectFit: "cover" }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
