"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useState, useEffect } from "react";
import "../self-serve-returns/page.css";

const SHOWREEL_ITEMS: { label: string; src: string }[] = [
  { label: "Order placed", src: "/showreel-1.png" },
  { label: "Preparing your order", src: "/showreel-2.png" },
  { label: "Wrapping things up", src: "/showreel-3.png" },
  { label: "Order is shipping", src: "/showreel-4.png" },
  { label: "Order delivered", src: "/showreel-5.png" },
];

export default function OrderTrackingPage() {
  const sidebarRef = useRef<HTMLElement>(null);
  const processingRef = useRef<HTMLParagraphElement>(null);
  const deliveredRef = useRef<HTMLParagraphElement>(null);

  const [showProcessing, setShowProcessing] = useState(false);
  const [showDelivered, setShowDelivered] = useState(false);
  const [showreelIndex, setShowreelIndex] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({ container: sidebarRef });
  const sectionOpacity = useTransform(scrollYProgress, [0, 0.2], [0.6, 1]);

  useEffect(() => {
    const sidebar = sidebarRef.current;
    if (!sidebar) return;

    const observers: IntersectionObserver[] = [];

    const processingObs = new IntersectionObserver(
      ([entry]) => setShowProcessing(entry.isIntersecting),
      { root: sidebar, threshold: 0.3 }
    );
    if (processingRef.current) processingObs.observe(processingRef.current);
    observers.push(processingObs);

    const deliveredObs = new IntersectionObserver(
      ([entry]) => setShowDelivered(entry.isIntersecting),
      { root: sidebar, threshold: 0.3 }
    );
    if (deliveredRef.current) deliveredObs.observe(deliveredRef.current);
    observers.push(deliveredObs);

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const inShowreel = showreelIndex !== null;
  const activeAsset = inShowreel ? "showreel" : showDelivered ? "delivered" : showProcessing ? "processing" : "firstview";

  return (
    <main className="project-page">
      <Link href="/" className="back-link">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Home
      </Link>

      <aside className="project-sidebar" ref={sidebarRef}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="project-detail-title">Order tracking</h1>
          <p className="project-detail-meta">Product designer | 2026</p>
          <p className="project-detail-description">Reducing post purchase anxiety for over a million users by giving real-time visibility of their order.</p>

          <motion.section className="project-section" style={{ opacity: sectionOpacity }}>
            <h2>The problem</h2>
            <p>
              Buying used camera gear is already a considered purchase and cameras are very expensive. You've already spent time researching, comparing different items and conditions to make sure you get exactly what you'd expect. The last thing you want as a customer is silence or very little communication.
            </p>
            <p>
              But that's largely what customers got. Status updates came via email. If you missed one or wanted to know where things stood right now, your options were to search your inbox, refresh My Account hoping something had changed, or contact the CE team to ask. A significant chunk of customers were doing exactly that. Order chaser contacts made up 5.7% of all CE contact volume in FY25 and were still climbing by FY26.
            </p>
            <p>
              We ran a survey across 711 customers to understand how they actually used My Account. Tracking was the number one reason people logged in. 66.7% used it to track transactions. 36.6% said it was their primary goal every time they visited. And yet 53.6% were still relying on email to stay informed, because My Account wasn't giving them what they needed.
            </p>
            <p>
              The gap was obvious. My Account was rated 8.6 out of 10 overall, customers genuinely liked it. But it wasn't the single source of truth it needed to be.
            </p>
          </motion.section>

          <motion.section className="project-section" style={{ opacity: sectionOpacity }}>
            <h2>What we set out to do</h2>
            <p>
              Give customers a clear, real-time view of where their order was at every stage, from confirmation through to delivery, without them having to go anywhere else to find it.
            </p>
            <p>
              The hypothesis was simple. If customers could see progress happening, they'd stop chasing it.
            </p>
          </motion.section>

          <motion.section className="project-section" style={{ opacity: sectionOpacity }}>
            <h2>The Challenge</h2>
            <p>
              Order tracking sounds straightforward until you get into it. The status data existed internally but wasn't consistently structured in a way that mapped cleanly to a customer-facing journey. We had to design something that made sense to a customer while working within the constraints of how MPB's systems actually operated.
            </p>
            <p>
              There were also edge cases to design around. What happens when an order goes backwards in status, like an item flagged as unpickable? How do you show a delay without causing unnecessary panic? How granular should the steps be before they start creating more confusion than clarity?
            </p>
            <p>
              Because order tracking is inherently linear, we also wanted a way to show the full history of where an order had been, not just where it was now. That meant designing for all three states at once: the steps that had already passed, what MPB was actively doing at the current stage, and what was coming next. Getting that balance right was important. Too much detail and customers would feel overwhelmed. Too little and they'd still be left guessing.
            </p>
            <p>
              We needed to get the step structure right before we built anything. Too few stages and customers still wouldn't know what was happening. Too many and we'd overwhelm them with detail they didn't need.
            </p>
          </motion.section>

          <motion.section className="project-section" style={{ opacity: sectionOpacity }}>
            <h2>What we shipped</h2>
            <p>
              <strong>0.1 The Progress tracker</strong><br />
              A visual progress tracker embedded in My Account showing four primary stages from order placed through to delivered. Customers could see exactly where their order was at a glance without checking their email or contacting support.
            </p>
            <p ref={processingRef}>
              <strong>0.2 Processing sub-stages</strong><br />
              Processing was where we got the most contact. Customers knew their order had been placed but had no visibility of what MPB was actually doing before it shipped. It felt like a black box.<br />
              We introduced two sub-stages within processing to open that up.<br />
              For the first time customers could see that work was actively happening on their order, which is exactly what they needed to stop reaching out to ask.
            </p>
            <p ref={deliveredRef}>
              <strong>0.3 Delivered and courier tracking</strong><br />
              Once an order shipped, customers got a direct courier tracking link inside My Account. No more hunting through emails for a tracking number. Everything they needed to follow their parcel to the door was right there alongside their order.
            </p>
          </motion.section>

          <motion.section className="project-section" style={{ opacity: sectionOpacity }}>
            <h2>Visual design shots from Order placed to delivered</h2>
            <div className="articles-list" style={{ marginTop: 8 }}>
              {SHOWREEL_ITEMS.map((item, i) => (
                <button
                  key={i}
                  onClick={() => setShowreelIndex(showreelIndex === i ? null : i)}
                  className="article-item"
                  style={{ background: "none", borderLeft: "none", borderRight: "none", borderTop: "none", cursor: "pointer", width: "100%", textAlign: "left" }}
                >
                  <span className="article-title" style={{ color: showreelIndex === i ? "#181d27" : undefined }}>
                    {item.label}
                  </span>
                </button>
              ))}
            </div>
          </motion.section>
          <motion.section className="project-section" style={{ opacity: sectionOpacity }}>
            <h2>What we're watching</h2>
            <p>
              The project is live. We're tracking order chaser contact volume as the primary success metric. The expectation is a meaningful reduction as customers find the answers they were previously contacting CE to get.
            </p>
          </motion.section>
        </motion.div>
      </aside>

      <div className="project-content">
        <div className="project-image-container">
          <div style={{ position: "relative", width: "95%", maxHeight: "95%" }}>
            <motion.img
              src="/Tracking firstview.png"
              alt="Order tracking interface"
              initial={{ opacity: 1 }}
              animate={{ opacity: activeAsset === "firstview" ? 1 : 0 }}
              transition={{ duration: 0.4 }}
              style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "contain", display: "block", pointerEvents: "none" }}
            />
            <motion.video
              muted
              loop
              playsInline
              autoPlay
              initial={{ opacity: 0 }}
              animate={{ opacity: activeAsset === "processing" ? 1 : 0 }}
              transition={{ duration: 0.4 }}
              style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "contain", display: "block", pointerEvents: "none" }}
            >
              <source src="/Processing video.mp4" type="video/mp4" />
            </motion.video>
            <motion.img
              src="/Delivered stage.png"
              alt="Delivered stage"
              initial={{ opacity: 0 }}
              animate={{ opacity: activeAsset === "delivered" ? 1 : 0 }}
              transition={{ duration: 0.4 }}
              style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "contain", display: "block", pointerEvents: "none" }}
            />
            {SHOWREEL_ITEMS.map((item, i) => (
              <motion.img
                key={item.src}
                src={item.src}
                alt={item.label}
                initial={{ opacity: 0 }}
                animate={{ opacity: activeAsset === "showreel" && showreelIndex === i ? 1 : 0 }}
                transition={{ duration: 0.4 }}
                style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "contain", display: "block", pointerEvents: "none" }}
              />
            ))}
            <img
              src="/Tracking firstview.png"
              alt=""
              aria-hidden
              style={{ width: "100%", height: "auto", display: "block", visibility: "hidden" }}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
