"use client";

import { useEffect, useRef } from "react";

const CHARACTERS = " .·•:/|\\";

const CELL_SIZE = 18;
const MOUSE_RADIUS = 220;
const TEXT_RADIUS = 45;

type TextRect = {
  left: number;
  top: number;
  right: number;
  bottom: number;
};

export default function AsciiBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    let width = 0;
    let height = 0;
    let time = 0;
    let animationFrame = 0;

    const mouse = {
      x: -1000,
      y: -1000,
    };

    let textRects: TextRect[] = [];

    // -----------------------------
    // Get text positions
    // -----------------------------

    const updateTextRects = () => {
      const elements =
        document.querySelectorAll<HTMLElement>(
          "[data-ascii-text]"
        );

      textRects = Array.from(elements).map((element) => {
        const rect = element.getBoundingClientRect();

        return {
          left: rect.left,
          top: rect.top,
          right: rect.right,
          bottom: rect.bottom,
        };
      });
    };

    // -----------------------------
    // Resize canvas
    // -----------------------------

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;

      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;

      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0
      );

      updateTextRects();
    };

    // -----------------------------
    // Mouse
    // -----------------------------

    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    };

    // -----------------------------
    // Distance from point to text
    // -----------------------------

    const getTextInfluence = (
      x: number,
      y: number
    ) => {
      let strongestInfluence = 0;

      for (const rect of textRects) {
        const closestX = Math.max(
          rect.left,
          Math.min(x, rect.right)
        );

        const closestY = Math.max(
          rect.top,
          Math.min(y, rect.bottom)
        );

        const dx = x - closestX;
        const dy = y - closestY;

        const distance = Math.sqrt(
          dx * dx + dy * dy
        );

        if (distance < TEXT_RADIUS) {
          const influence =
            1 - distance / TEXT_RADIUS;

          strongestInfluence = Math.max(
            strongestInfluence,
            influence
          );
        }
      }

      return strongestInfluence;
    };

    // -----------------------------
    // Animation
    // -----------------------------

    const animate = () => {
      time += 0.015;

      ctx.clearRect(
        0,
        0,
        width,
        height
      );

      ctx.font = `${CELL_SIZE}px monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const columns = Math.ceil(
        width / CELL_SIZE
      );

      const rows = Math.ceil(
        height / CELL_SIZE
      );

      for (let row = 0; row < rows; row++) {
        for (
          let column = 0;
          column < columns;
          column++
        ) {
          const baseX =
            column * CELL_SIZE;

          const baseY =
            row * CELL_SIZE;

          // -----------------------------
          // Base fluid field
          // -----------------------------

          let wave =
            Math.sin(
              column * 0.18 + time
            );

          wave +=
            Math.sin(
              row * 0.13 -
                time * 1.3
            );

          wave +=
            Math.sin(
              (column + row) *
                0.08 +
                time * 0.7
            );

          wave =
            (wave + 3) / 6;

          // -----------------------------
          // Text avoidance
          // -----------------------------

          const textInfluence =
            getTextInfluence(
              baseX,
              baseY
            );

          // Push ASCII away vertically
          let offsetX = 0;
          let offsetY = 0;

          if (textInfluence > 0) {
            offsetY =
              Math.sin(
                baseX * 0.03 +
                  time
              ) *
              textInfluence *
              25;

            offsetX =
              Math.cos(
                baseY * 0.03 +
                  time
              ) *
              textInfluence *
              20;

            // Also reduce visibility
            wave *=
              1 -
              textInfluence * 0.85;
          }

          // -----------------------------
          // Mouse swish
          // -----------------------------

          const dx =
            baseX - mouse.x;

          const dy =
            baseY - mouse.y;

          const distance =
            Math.sqrt(
              dx * dx +
                dy * dy
            );

          if (
            distance <
            MOUSE_RADIUS
          ) {
            const influence =
              1 -
              distance /
                MOUSE_RADIUS;

            const angle =
              Math.atan2(
                dy,
                dx
              );

            offsetX +=
              Math.cos(angle) *
              influence *
              30;

            offsetY +=
              Math.sin(angle) *
              influence *
              30;

            wave +=
              Math.sin(
                distance *
                  0.08 -
                  time * 5
              ) *
              influence *
              0.7;
          }

          wave = Math.max(
            0,
            Math.min(
              1,
              wave
            )
          );

          // -----------------------------
          // Character
          // -----------------------------

          const index = Math.floor(
            wave *
              (CHARACTERS.length - 1)
          );

          const char =
            CHARACTERS[index];

          if (
            wave > 0.28 &&
            char !== " "
          ) {
            const opacity =
              0.08 +
              wave * 0.35;

            ctx.fillStyle =
              `rgba(255,255,255,${opacity})`;

            const naturalOffset =
              Math.sin(
                column * 0.15 +
                  time
              ) *
              5 *
              wave;

            ctx.fillText(
              char,
              baseX + offsetX,
              baseY +
                naturalOffset +
                offsetY
            );
          }
        }
      }

      animationFrame =
        requestAnimationFrame(
          animate
        );
    };

    resize();

    window.addEventListener(
      "resize",
      resize
    );

    window.addEventListener(
      "mousemove",
      handleMouseMove
    );

    window.addEventListener(
      "scroll",
      updateTextRects
    );

    animate();

    return () => {
      window.removeEventListener(
        "resize",
        resize
      );

      window.removeEventListener(
        "mousemove",
        handleMouseMove
      );

      window.removeEventListener(
        "scroll",
        updateTextRects
      );

      cancelAnimationFrame(
        animationFrame
      );
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed left-0 top-0 z-0"
      aria-hidden="true"
    />
  );
}