"use client";

import { useEffect, useRef } from "react";

const CHARACTERS = " .·:*+xX#@";

const CELL_SIZE = 18;
const MOUSE_RADIUS = 220;

const AsciiBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    let width = 0;
    let height = 0;
    let animationFrame = 0;
    let time = 0;

    const mouse = {
      x: -1000,
      y: -1000,
    };

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;

      width = canvas.clientWidth;
      height = canvas.clientHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    };

    const isExcluded = (x: number, y: number) => {
      const elements =
        document.querySelectorAll("[data-ascii-exclude]");

      for (const element of elements) {
        const rect = element.getBoundingClientRect();

        if (
          x >= rect.left &&
          x <= rect.right &&
          y >= rect.top &&
          y <= rect.bottom
        ) {
          return true;
        }
      }

      return false;
    };

    const animate = () => {
      time += 0.015;

      ctx.clearRect(0, 0, width, height);

      ctx.font = `${CELL_SIZE}px monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const columns = Math.ceil(width / CELL_SIZE);
      const rows = Math.ceil(height / CELL_SIZE);

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < columns; x++) {
          const px = x * CELL_SIZE;
          const py = y * CELL_SIZE;

          /*
           * Don't draw ASCII inside
           * protected content areas.
           */
          if (isExcluded(px, py)) {
            continue;
          }

          let wave = Math.sin(
            x * 0.18 + time
          );

          wave += Math.sin(
            y * 0.13 - time * 1.3
          );

          wave += Math.sin(
            (x + y) * 0.08 + time * 0.7
          );

          wave = (wave + 3) / 6;

          /*
           * Mouse interaction
           */
          const dx = px - mouse.x;
          const dy = py - mouse.y;

          const distance = Math.sqrt(
            dx * dx + dy * dy
          );

          if (distance < MOUSE_RADIUS) {
            const influence =
              1 - distance / MOUSE_RADIUS;

            wave +=
              Math.sin(
                distance * 0.08 -
                  time * 5
              ) *
              influence *
              0.7;
          }

          wave = Math.max(
            0,
            Math.min(1, wave)
          );

          const index = Math.floor(
            wave * (CHARACTERS.length - 1)
          );

          const char = CHARACTERS[index];

          if (wave > 0.35) {
            const opacity =
              0.08 + wave * 0.25;

            ctx.fillStyle = `rgba(255,255,255,${opacity})`;

            const offsetY =
              Math.sin(
                x * 0.15 + time
              ) *
              5 *
              wave;

            ctx.fillText(
              char,
              px,
              py + offsetY
            );
          }
        }
      }

      animationFrame =
        requestAnimationFrame(animate);
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

      cancelAnimationFrame(
        animationFrame
      );
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 h-full w-full"
      aria-hidden="true"
    />
  );
};

export default AsciiBackground;