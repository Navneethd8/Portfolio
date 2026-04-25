"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const GRID = 48;

/** Wider screens get the full decorative MLP; narrow viewports use tiny 3–1–3 / 3–1–2 stacks. */
function layerCountsForWidth(cssWidth: number): number[] {
  if (cssWidth >= 1024) return [2, 4, 5, 4, 3];
  if (cssWidth >= 768) return [3, 5, 4, 3];
  if (cssWidth >= 480) return [3, 1, 3];
  return [3, 1, 2];
}

function snapCenter(v: number) {
  return Math.round((v - GRID / 2) / GRID) * GRID + GRID / 2;
}

type Node = { x: number; y: number; layer: number };
type Edge = { x1: number; y1: number; x2: number; y2: number; layer: number };

function parseRgba(str: string): [number, number, number, number] {
  const m = str.match(/rgba?\(([^)]+)\)/);
  if (!m) return [59, 130, 246, 0.55];
  const p = m[1].split(/[\s,]+/).map(Number);
  if (p.length === 3) return [p[0], p[1], p[2], 1];
  return [p[0], p[1], p[2], p[3]];
}

export default function MlpAtmosphere() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pathname = usePathname();
  const hiddenOnNotes = pathname.startsWith("/notes");

  useEffect(() => {
    if (hiddenOnNotes) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rawCtx = canvas.getContext("2d");
    if (!rawCtx) return;
    const c2d: CanvasRenderingContext2D = rawCtx;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function cssColor(name: string) {
      return getComputedStyle(document.documentElement).getPropertyValue(name).trim() || "rgba(59,130,246,0.4)";
    }

    let nodes: Node[] = [];
    let edges: Edge[] = [];
    let edgeLengths: number[] = [];
    let totalEdgeLength = 0;
    let layers: Node[][] = [];
    let cssW = 800;
    let cssH = 600;
    let layerCounts = layerCountsForWidth(cssW);
    let nodeRadius = 3.5;
    let pulseRadii: [number, number] = [22, 16];
    let edgeLineWidth = 1;
    let raf = 0;
    const start = performance.now();

    function buildGraph(w: number, h: number) {
      const marginX = GRID * 2;
      const marginY = GRID * 2;
      const usableW = w - marginX * 2;
      const usableH = h - marginY * 2;

      layers = layerCounts.map((count, li) => {
        const t = layerCounts.length === 1 ? 0.5 : li / (layerCounts.length - 1);
        const rawX = marginX + t * usableW;
        const x = snapCenter(rawX);
        const ys: Node[] = [];
        for (let j = 0; j < count; j++) {
          const rawY = marginY + ((j + 1) / (count + 1)) * usableH;
          ys.push({ x, y: snapCenter(rawY), layer: li });
        }
        return ys;
      });

      nodes = layers.flat();
      edges = [];
      for (let L = 0; L < layers.length - 1; L++) {
        const A = layers[L];
        const B = layers[L + 1];
        for (let ia = 0; ia < A.length; ia++) {
          for (let ib = 0; ib < B.length; ib++) {
            if (((ia + ib + L * 3) % 4 === 0) || ((ia * 2 + ib + L) % 5 <= 1)) {
              const a = A[ia];
              const b = B[ib];
              edges.push({ x1: a.x, y1: a.y, x2: b.x, y2: b.y, layer: L });
            }
          }
        }
      }
      if (edges.length < 32) {
        edges = [];
        for (let L = 0; L < layers.length - 1; L++) {
          const A = layers[L];
          const B = layers[L + 1];
          for (const a of A) {
            for (const b of B) {
              edges.push({ x1: a.x, y1: a.y, x2: b.x, y2: b.y, layer: L });
            }
          }
        }
      }

      edgeLengths = edges.map((e) => Math.hypot(e.x2 - e.x1, e.y2 - e.y1));
      totalEdgeLength = edgeLengths.reduce((s, l) => s + l, 0);
    }

    function resize() {
      const el = canvasRef.current;
      if (!el) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      cssW = window.innerWidth;
      cssH = window.innerHeight;
      layerCounts = layerCountsForWidth(cssW);
      if (cssW < 480) {
        nodeRadius = 2.25;
        pulseRadii = [12, 9];
        edgeLineWidth = 0.75;
      } else if (cssW < 768) {
        nodeRadius = 2.75;
        pulseRadii = [14, 11];
        edgeLineWidth = 0.85;
      } else if (cssW < 1024) {
        nodeRadius = 3.1;
        pulseRadii = [18, 13];
        edgeLineWidth = 0.95;
      } else {
        nodeRadius = 3.5;
        pulseRadii = [22, 16];
        edgeLineWidth = 1;
      }
      el.width = Math.floor(cssW * dpr);
      el.height = Math.floor(cssH * dpr);
      el.style.width = `${cssW}px`;
      el.style.height = `${cssH}px`;
      c2d.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildGraph(cssW, cssH);
    }

    function pulseAt(globalPos: number) {
      if (!edges.length || totalEdgeLength <= 0) return null;
      let acc = 0;
      let edgeIndex = 0;
      let local = 0;
      const target = ((globalPos % totalEdgeLength) + totalEdgeLength) % totalEdgeLength;
      for (let i = 0; i < edges.length; i++) {
        const len = edgeLengths[i];
        if (acc + len >= target) {
          edgeIndex = i;
          local = target - acc;
          break;
        }
        acc += len;
      }
      const e = edges[edgeIndex];
      const len = edgeLengths[edgeIndex] || 1;
      const u = local / len;
      return {
        px: e.x1 + (e.x2 - e.x1) * u,
        py: e.y1 + (e.y2 - e.y1) * u,
      };
    }

    function drawStatic() {
      c2d.clearRect(0, 0, cssW, cssH);
      const edgeCol = cssColor("--mlp-edge");
      const nodeCol = cssColor("--mlp-node");
      c2d.lineWidth = edgeLineWidth;
      for (const e of edges) {
        c2d.strokeStyle = edgeCol;
        c2d.beginPath();
        c2d.moveTo(e.x1, e.y1);
        c2d.lineTo(e.x2, e.y2);
        c2d.stroke();
      }
      for (const n of nodes) {
        c2d.fillStyle = nodeCol;
        c2d.beginPath();
        c2d.arc(n.x, n.y, nodeRadius, 0, Math.PI * 2);
        c2d.fill();
      }
    }

    function drawFrame(now: number) {
      c2d.clearRect(0, 0, cssW, cssH);
      const edgeCol = cssColor("--mlp-edge");
      const nodeCol = cssColor("--mlp-node");
      const pulseStr = cssColor("--mlp-pulse");
      const [pr, pg, pb, pa] = parseRgba(
        pulseStr.startsWith("rgba") || pulseStr.startsWith("rgb") ? pulseStr : "rgba(59,130,246,0.55)"
      );

      const t = (now - start) / 1000;
      const speed = 0.065;
      const pulsePos = (t * speed * totalEdgeLength) % (totalEdgeLength || 1);
      const numLayers = layers.length || layerCounts.length;
      const activeLayer = Math.floor((t * 0.18) % numLayers);

      c2d.lineWidth = edgeLineWidth;
      const pulseCoreRadius = Math.max(1.6, nodeRadius * 1.06);
      for (const e of edges) {
        c2d.strokeStyle = edgeCol;
        c2d.globalAlpha = 0.45 + 0.06 * e.layer;
        c2d.beginPath();
        c2d.moveTo(e.x1, e.y1);
        c2d.lineTo(e.x2, e.y2);
        c2d.stroke();
        c2d.globalAlpha = 1;
      }

      function drawPulse(globalPos: number, radius: number, alphaMul: number) {
        const pt = pulseAt(globalPos);
        if (!pt) return;
        const rad = c2d.createRadialGradient(pt.px, pt.py, 0, pt.px, pt.py, radius);
        rad.addColorStop(0, `rgba(${pr},${pg},${pb},${0.32 * pa * alphaMul})`);
        rad.addColorStop(0.4, `rgba(${pr},${pg},${pb},${0.1 * pa * alphaMul})`);
        rad.addColorStop(1, "rgba(0,0,0,0)");
        c2d.fillStyle = rad;
        c2d.beginPath();
        c2d.arc(pt.px, pt.py, radius, 0, Math.PI * 2);
        c2d.fill();
        c2d.fillStyle = `rgba(${pr},${pg},${pb},${0.8 * pa * alphaMul})`;
        c2d.beginPath();
        c2d.arc(pt.px, pt.py, pulseCoreRadius, 0, Math.PI * 2);
        c2d.fill();
      }

      const [pulseR, pulseR2] = pulseRadii;
      drawPulse(pulsePos + totalEdgeLength * 0.42, pulseR2, 0.4);
      drawPulse(pulsePos, pulseR, 1);

      for (const n of nodes) {
        const boost = n.layer === activeLayer ? 1.22 : 1;
        c2d.fillStyle = nodeCol;
        c2d.beginPath();
        c2d.arc(n.x, n.y, nodeRadius * boost, 0, Math.PI * 2);
        c2d.fill();
      }

      raf = requestAnimationFrame(drawFrame);
    }

    resize();
    const onResize = () => {
      resize();
      if (reduceMotion) drawStatic();
    };
    window.addEventListener("resize", onResize);

    const mo = new MutationObserver(() => {
      resize();
      if (reduceMotion) drawStatic();
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    if (reduceMotion) {
      drawStatic();
    } else {
      raf = requestAnimationFrame(drawFrame);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      mo.disconnect();
    };
  }, [hiddenOnNotes]);

  if (hiddenOnNotes) return null;

  return (
    <div className="atmosphere pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      <canvas ref={canvasRef} className="mlp-canvas absolute inset-0 block h-full w-full opacity-[0.92]" width={800} height={600} />
      <div className="grid-lines pointer-events-none absolute inset-0" />
    </div>
  );
}
