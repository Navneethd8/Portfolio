"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

type NetworkNode = {
  x: number;
  y: number;
  layer: number;
  index: number;
};

type NetworkEdge = {
  from: NetworkNode;
  to: NetworkNode;
  layer: number;
  emphasis: number;
};

type Rgba = [number, number, number, number];

function layerCountsForWidth(width: number): number[] {
  if (width >= 1280) return [3, 5, 6, 5, 3];
  if (width >= 1024) return [3, 4, 5, 4, 3];
  if (width >= 768) return [3, 4, 3];
  return [2, 3, 2];
}

function parseColor(value: string, fallback: Rgba): Rgba {
  const match = value.match(/rgba?\(([^)]+)\)/);
  if (!match) return fallback;

  const parts = match[1].split(/[\s,]+/).map(Number);
  return [
    parts[0] ?? fallback[0],
    parts[1] ?? fallback[1],
    parts[2] ?? fallback[2],
    parts[3] ?? 1,
  ];
}

function rgba([r, g, b, a]: Rgba, opacity = 1) {
  return `rgba(${r},${g},${b},${Math.min(1, a * opacity)})`;
}

function gaussian(distance: number, spread: number) {
  return Math.exp(-(distance * distance) / spread);
}

export default function MlpAtmosphere() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pathname = usePathname();
  const hiddenOnNotes = pathname.startsWith("/notes");

  useEffect(() => {
    if (hiddenOnNotes) return;

    const targetCanvas = canvasRef.current;
    if (!targetCanvas) return;

    const targetContext = targetCanvas.getContext("2d");
    if (!targetContext) return;

    const canvas: HTMLCanvasElement = targetCanvas;
    const context: CanvasRenderingContext2D = targetContext;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let layers: NetworkNode[][] = [];
    let edges: NetworkEdge[] = [];
    let animationFrame = 0;
    let lastFrame = 0;

    function themeColor(name: string, fallback: string) {
      return (
        getComputedStyle(document.documentElement)
          .getPropertyValue(name)
          .trim() || fallback
      );
    }

    function buildNetwork() {
      const counts = layerCountsForWidth(width);
      const isNarrow = width < 768;
      const left = isNarrow ? width * 0.08 : Math.max(340, width * 0.34);
      const right = width - (isNarrow ? width * 0.08 : Math.max(46, width * 0.045));
      const centerY = height * (isNarrow ? 0.58 : 0.52);
      const verticalSpan = Math.min(
        height * (isNarrow ? 0.46 : 0.62),
        isNarrow ? 320 : 500,
      );

      layers = counts.map((count, layer) => {
        const x =
          counts.length === 1
            ? (left + right) / 2
            : left + (layer / (counts.length - 1)) * (right - left);

        return Array.from({ length: count }, (_, index) => {
          const normalized = count === 1 ? 0 : index / (count - 1) - 0.5;
          const layerOffset =
            Math.sin((layer / Math.max(1, counts.length - 1)) * Math.PI) *
            Math.min(20, height * 0.02);

          return {
            x,
            y: centerY + normalized * verticalSpan + layerOffset,
            layer,
            index,
          };
        });
      });

      edges = [];

      for (let layer = 0; layer < layers.length - 1; layer++) {
        const current = layers[layer];
        const next = layers[layer + 1];

        current.forEach((node) => {
          const sourcePosition =
            current.length === 1 ? 0.5 : node.index / (current.length - 1);
          const nearest = [...next]
            .sort((a, b) => {
              const aPosition =
                next.length === 1 ? 0.5 : a.index / (next.length - 1);
              const bPosition =
                next.length === 1 ? 0.5 : b.index / (next.length - 1);
              return (
                Math.abs(sourcePosition - aPosition) -
                Math.abs(sourcePosition - bPosition)
              );
            })
            .slice(0, isNarrow ? 2 : 3);

          nearest.forEach((target, rank) => {
            edges.push({
              from: node,
              to: target,
              layer,
              emphasis: rank === 0 ? 1 : rank === 1 ? 0.68 : 0.42,
            });
          });
        });
      }
    }

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      buildNetwork();
    }

    function draw(now: number, staticFrame = false) {
      context.clearRect(0, 0, width, height);

      const edgeColor = parseColor(
        themeColor("--mlp-edge", "rgba(0,120,212,0.08)"),
        [0, 120, 212, 0.08],
      );
      const nodeColor = parseColor(
        themeColor("--mlp-node", "rgba(77,170,252,0.16)"),
        [77, 170, 252, 0.16],
      );
      const pulseColor = parseColor(
        themeColor("--mlp-pulse", "rgba(0,120,212,0.48)"),
        [0, 120, 212, 0.48],
      );

      const layerCount = Math.max(1, layers.length);
      const elapsed = now / 1000;
      const wavePosition = staticFrame
        ? -2
        : ((elapsed * 0.42) % (layerCount + 2)) - 1;
      const baseRadius = width < 768 ? 2.2 : 2.8;

      context.lineCap = "round";

      edges.forEach((edge) => {
        const activation = staticFrame
          ? 0
          : gaussian(wavePosition - (edge.layer + 0.5), 0.24);
        const baseOpacity = 0.42 * edge.emphasis;
        const edgeGradient = context.createLinearGradient(
          edge.from.x,
          edge.from.y,
          edge.to.x,
          edge.to.y,
        );

        edgeGradient.addColorStop(0, rgba(edgeColor, baseOpacity));
        edgeGradient.addColorStop(
          0.55,
          rgba(edgeColor, baseOpacity + activation * 1.55),
        );
        edgeGradient.addColorStop(
          1,
          rgba(edgeColor, baseOpacity + activation * 0.55),
        );

        context.strokeStyle = edgeGradient;
        context.lineWidth = 0.7 + activation * 0.65;
        context.beginPath();
        context.moveTo(edge.from.x, edge.from.y);
        context.lineTo(edge.to.x, edge.to.y);
        context.stroke();
      });

      layers.flat().forEach((node) => {
        const activation = staticFrame
          ? 0
          : gaussian(wavePosition - node.layer, 0.18);
        const radius = baseRadius + activation * 1.25;

        if (activation > 0.04) {
          const glowRadius = radius + 10 + activation * 7;
          const glow = context.createRadialGradient(
            node.x,
            node.y,
            0,
            node.x,
            node.y,
            glowRadius,
          );
          glow.addColorStop(0, rgba(pulseColor, 0.45 * activation));
          glow.addColorStop(0.45, rgba(pulseColor, 0.12 * activation));
          glow.addColorStop(1, rgba(pulseColor, 0));
          context.fillStyle = glow;
          context.beginPath();
          context.arc(node.x, node.y, glowRadius, 0, Math.PI * 2);
          context.fill();
        }

        context.fillStyle = rgba(nodeColor, 0.56 + activation * 1.9);
        context.beginPath();
        context.arc(node.x, node.y, radius, 0, Math.PI * 2);
        context.fill();

        context.strokeStyle = rgba(pulseColor, 0.38 + activation * 1.15);
        context.lineWidth = 0.75 + activation * 0.5;
        context.beginPath();
        context.arc(node.x, node.y, radius + 2.5, 0, Math.PI * 2);
        context.stroke();
      });
    }

    function animate(now: number) {
      if (now - lastFrame >= 1000 / 30) {
        draw(now);
        lastFrame = now;
      }
      animationFrame = requestAnimationFrame(animate);
    }

    resize();

    const handleResize = () => {
      resize();
      if (reduceMotion) draw(performance.now(), true);
    };
    window.addEventListener("resize", handleResize);

    const themeObserver = new MutationObserver(() => {
      if (reduceMotion) draw(performance.now(), true);
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    if (reduceMotion) {
      draw(performance.now(), true);
    } else {
      animationFrame = requestAnimationFrame(animate);
    }

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", handleResize);
      themeObserver.disconnect();
    };
  }, [hiddenOnNotes]);

  if (hiddenOnNotes) return null;

  return (
    <div className="atmosphere" aria-hidden>
      <canvas
        ref={canvasRef}
        className="mlp-canvas"
        width={800}
        height={600}
      />
      <div className="grid-lines" />
    </div>
  );
}
