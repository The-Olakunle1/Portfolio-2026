"use client";

import { useRef, useEffect } from "react";
import { motion } from "motion/react";
import * as THREE from "three";
import vertexShader from "@/shaders/particles/vertex.glsl";
import fragmentShader from "@/shaders/particles/fragment.glsl";

interface DistortionTextProps {
  children: string;
}

export default function DistortionText({ children }: DistortionTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.OrthographicCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const animationIdRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const textElement = textRef.current;
    const container = containerRef.current;

    if (!canvas || !textElement || !container) return;

    let cleanupFn: (() => void) | null = null;

    const init = () => {
      if (cleanupFn) cleanupFn();
      if (animationIdRef.current) cancelAnimationFrame(animationIdRef.current);

      const rect = textElement.getBoundingClientRect();
      if (rect.width === 0) return; // Not yet laid out

      const dpr = window.devicePixelRatio || 1;
      const computedStyle = window.getComputedStyle(textElement);
      const baseFontSize = parseFloat(computedStyle.fontSize) || 38;
      const fontStr = `${computedStyle.fontWeight} ${baseFontSize}px ${computedStyle.fontFamily}`;
      const lineHeight = baseFontSize * 1.35;

      // ── Step 1: measure text wrapping using the FULL element width ──────────
      const measureCanvas = document.createElement("canvas");
      const measureCtx = measureCanvas.getContext("2d");
      if (!measureCtx) return;
      measureCtx.font = fontStr;

      const maxWidth = rect.width; // no arbitrary subtraction
      const words = children.split(" ");
      const lines: string[] = [];
      let currentLine = "";

      words.forEach((word: string) => {
        const testLine = currentLine + (currentLine ? " " : "") + word;
        if (measureCtx.measureText(testLine).width > maxWidth && currentLine) {
          lines.push(currentLine);
          currentLine = word;
        } else {
          currentLine = testLine;
        }
      });
      if (currentLine) lines.push(currentLine);

      // ── Step 2: compute canvas height from actual line count ─────────────────
      const padding = lineHeight * 0.5;
      const canvasW = rect.width;
      const canvasH = lines.length * lineHeight + padding;

      // Size the container to fit the canvas (avoids clipping by parent)
      container.style.minHeight = `${canvasH}px`;

      // ── Step 3: draw particles onto an offscreen canvas ──────────────────────
      const tempCanvas = document.createElement("canvas");
      tempCanvas.width = Math.ceil(canvasW * dpr);
      tempCanvas.height = Math.ceil(canvasH * dpr);

      const ctx = tempCanvas.getContext("2d");
      if (!ctx) return;
      ctx.scale(dpr, dpr);
      ctx.font = fontStr;
      ctx.fillStyle = "#ffffff";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const startY = padding / 2 + lineHeight / 2;
      lines.forEach((line, i) => {
        ctx.fillText(line, canvasW / 2, startY + i * lineHeight);
      });

      const imageData = ctx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
      const pixels = imageData.data;
      const positions: number[] = [];
      const step = 2;

      for (let y = 0; y < tempCanvas.height; y += step) {
        for (let x = 0; x < tempCanvas.width; x += step) {
          const idx = (y * tempCanvas.width + x) * 4;
          if (pixels[idx + 3] > 128) {
            // Convert to centred coordinates (origin at canvas centre)
            positions.push(
              x / dpr - canvasW / 2,
              -(y / dpr - canvasH / 2),
              0,
            );
          }
        }
      }

      const posArray = new Float32Array(positions);

      // ── Step 4: Three.js scene ────────────────────────────────────────────────
      const scene = new THREE.Scene();
      sceneRef.current = scene;

      const camera = new THREE.OrthographicCamera(
        -canvasW / 2, canvasW / 2,
        canvasH / 2, -canvasH / 2,
        0.1, 1000,
      );
      camera.position.z = 1;
      cameraRef.current = camera;

      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      renderer.setSize(canvasW, canvasH);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      rendererRef.current = renderer;

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute("position", new THREE.BufferAttribute(posArray, 3));

      const material = new THREE.ShaderMaterial({
        uniforms: {
          uSize: { value: 4.0 },
          uMouse: { value: new THREE.Vector2(-1000, -1000) },
          uDistortionRadius: { value: 100 },
          uDistortionStrength: { value: 20 },
          uTime: { value: 0 },
          uResolution: { value: new THREE.Vector2(canvasW, canvasH) },
        },
        vertexShader,
        fragmentShader,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
      materialRef.current = material;

      scene.add(new THREE.Points(geometry, material));

      // Track whether the mouse is actively hovering
      let isMouseActive = false;

      const animate = () => {
        if (materialRef.current) {
          materialRef.current.uniforms.uTime.value += 0.016;

          // Auto-animate when the mouse is NOT hovering (all devices)
          if (!isMouseActive) {
            const t = materialRef.current.uniforms.uTime.value;
            materialRef.current.uniforms.uMouse.value.set(
              Math.sin(t * 0.4) * canvasW * 0.35,
              Math.cos(t * 0.25) * canvasH * 0.25,
            );
          }
        }
        if (rendererRef.current && sceneRef.current && cameraRef.current) {
          rendererRef.current.render(sceneRef.current, cameraRef.current);
        }
        animationIdRef.current = requestAnimationFrame(animate);
      };
      animate();

      // Mouse events — override auto-animation while hovering
      const getCoords = (e: MouseEvent) => {
        const r = textElement.getBoundingClientRect();
        return { x: e.clientX - r.left - canvasW / 2, y: -(e.clientY - r.top - canvasH / 2) };
      };
      const onMove = (e: MouseEvent) => {
        isMouseActive = true;
        if (materialRef.current) {
          const { x, y } = getCoords(e);
          materialRef.current.uniforms.uMouse.value.set(x, y);
        }
      };
      const onLeave = () => {
        isMouseActive = false;
        // Auto-animation picks back up on the next frame
      };

      container.addEventListener("mousemove", onMove);
      container.addEventListener("mouseenter", onMove);
      container.addEventListener("mouseleave", onLeave);

      cleanupFn = () => {
        if (animationIdRef.current) cancelAnimationFrame(animationIdRef.current);
        container.removeEventListener("mousemove", onMove);
        container.removeEventListener("mouseenter", onMove);
        container.removeEventListener("mouseleave", onLeave);
        renderer.dispose();
        geometry.dispose();
        material.dispose();
      };
    };

    const rafId = requestAnimationFrame(init);

    // Re-initialise on container resize (breakpoint / device rotation)
    const resizeObserver = new ResizeObserver(() => requestAnimationFrame(init));
    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      if (cleanupFn) cleanupFn();
    };
  }, [children]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      {/* Hidden h2 provides accessible text + drives container width */}
      <motion.h2
        ref={textRef}
        className="tagline-text"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.5 }}
        style={{ visibility: "hidden" }}
      >
        {children}
      </motion.h2>

      {/* Canvas sits absolutely, sized to the computed particle bounds */}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
