"use client";

import { useEffect, useRef } from "react";
import { WORDMARK } from "@/components/logo";
import { bus, type AnchorKind } from "./bus";
import { FRAG, VERT } from "./shader";

// The wordmark's outline in the logo's own units (components/logo.tsx): S A G | N A C.
const WORD = { x0: 94, x1: 307.89, y0: 17, y1: 51.06, split: 200 };

/** The name as a mask, on one row or (for a narrow screen) on two. Slightly emboldened: a stroke has to hold two fringes. */
function wordCanvas(stacked: boolean) {
  const h = WORD.y1 - WORD.y0;
  const path = new Path2D(WORDMARK);
  const cvs = document.createElement("canvas");
  const draw = (ctx: CanvasRenderingContext2D, scale: number, x0: number, y: number) => {
    ctx.save();
    ctx.translate(0, y);
    ctx.scale(scale, scale);
    ctx.translate(-x0, -WORD.y0);
    ctx.lineWidth = 1.1;
    ctx.lineJoin = "round";
    ctx.fill(path);
    ctx.stroke(path);
    ctx.restore();
  };
  if (!stacked) {
    cvs.width = 2048;
    cvs.height = Math.round((2048 * h) / (WORD.x1 - WORD.x0));
    const ctx = cvs.getContext("2d")!;
    draw(ctx, 2048 / (WORD.x1 - WORD.x0), WORD.x0, 0);
  } else {
    const w = WORD.x1 - 206.29;
    const scale = 1024 / w;
    const row = Math.round(h * scale);
    const gap = Math.round(row * 0.3);
    cvs.width = 1024;
    cvs.height = 2 * row + gap;
    const ctx = cvs.getContext("2d")!;
    ctx.save();
    ctx.beginPath();
    ctx.rect(0, 0, 1024, row + gap / 2);
    ctx.clip();
    draw(ctx, scale, WORD.x0 - (w - (193.99 - WORD.x0)) / 2, 0);
    ctx.restore();
    ctx.save();
    ctx.beginPath();
    ctx.rect(0, row + gap / 2, 1024, row + gap / 2);
    ctx.clip();
    draw(ctx, scale, 206.29, row + gap);
    ctx.restore();
  }
  return cvs;
}

type Fig = { cx: number; cy: number; bx: number; by: number; rho: number; period: number; gap: number; hole: number; field: number; text: number; half: number; ring: number };
const GEOMETRY = ["cx", "cy", "bx", "by", "rho", "period", "gap"] as const;
const LEVELS = ["hole", "field", "text", "half", "ring"] as const;

function figure(kind: AnchorKind, r: DOMRect): Fig & { textRect?: [number, number, number, number]; stacked?: boolean } {
  const cx = r.left + r.width / 2;
  const cy = r.top + r.height / 2;
  if (kind === "word") {
    const stacked = r.width / r.height < 2.6;
    const aspect = stacked ? 1024 / 789 : 6.28;
    const tw = Math.min(r.width * (stacked ? 0.84 : 0.9), r.height * (stacked ? 0.8 : 0.7) * aspect);
    const th = tw / aspect;
    return {
      cx, cy, bx: r.width / 2, by: r.height / 2, rho: 0, period: Math.max((stacked ? th / 2.3 : th) / 12, 5), gap: 0,
      hole: 0, field: 1, text: 1, half: 0, ring: 0, textRect: [cx - tw / 2, cy - th / 2, tw, th], stacked,
    };
  }
  if (kind === "strip") {
    return { cx, cy, bx: r.width / 2, by: r.height / 2, rho: 0, period: Math.max(r.height / 7, 10), gap: Math.max(r.height * 0.02, 1.5), hole: 0, field: 1, text: 0, half: 1, ring: 0 };
  }
  // the logo's own proportions: four fringes across the disc, a slit of 6 % of the radius either side of the axis
  const R = Math.min(r.width, r.height) / 2;
  const loop = kind === "loop";
  return { cx, cy, bx: R, by: R, rho: R, period: R / 2, gap: R * 0.06, hole: loop ? 1 : 0, field: 1, text: 0, half: 1, ring: loop ? 1 : 0 };
}

const smooth = (a: number, b: number, x: number) => {
  const t = Math.min(Math.max((x - a) / (b - a), 0), 1);
  return t * t * (3 - 2 * t);
};

/** The bench: a fixed canvas behind the page. Returns nothing visible where WebGL is missing; the page then shows its
 *  plain ground (and `html[data-stage="off"]` lets CSS draw a still stand-in). */
export function Stage() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const gl = canvas.getContext("webgl", { antialias: false, alpha: false, powerPreference: "high-performance" });
    const root = document.documentElement;
    if (!gl) {
      root.dataset.stage = "off";
      return () => void delete root.dataset.stage;
    }

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) console.error(gl.getShaderInfoLog(s));
      return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    gl.useProgram(prog);
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(prog, "aPos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);
    const U = (name: string) => gl.getUniformLocation(prog, name);
    const u = Object.fromEntries(
      ["uRes", "uBg", "uFg", "uAc", "uC", "uB", "uRho", "uHole", "uField", "uText", "uHalf", "uRing", "uPeriod", "uShift", "uGap", "uTextRect", "uTex", "uTurn", "uTau", "uNode", "uPx", "uIntro"].map((n) => [n, U(n)]),
    );

    const textures = [false, true].map((stacked) => {
      const tex = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, wordCanvas(stacked));
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      return tex;
    });
    gl.uniform1i(u.uTex, 0);

    // colours follow the theme: read from the tokens of the surface the canvas sits in
    let stale = true;
    const colours = () => {
      const cs = getComputedStyle(canvas);
      for (const [name, token] of [["uBg", "--c-ink"], ["uFg", "--c-paper"], ["uAc", "--c-accent"]] as const) {
        const [r, g, b] = cs.getPropertyValue(token).trim().split(/\s+/).map((v) => +v / 255);
        gl.uniform3f(u[name], r, g, b);
      }
      stale = false;
    };
    const themed = new MutationObserver(() => (stale = true));
    themed.observe(root, { attributes: true, attributeFilter: ["data-theme", "style"] });

    const still = window.matchMedia("(prefers-reduced-motion: reduce)");
    let pointerX: number | null = null;
    let pointerDx = 0;
    const onPointer = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      if (pointerX != null) pointerDx += e.clientX - pointerX;
      pointerX = e.clientX;
    };
    window.addEventListener("pointermove", onPointer, { passive: true });

    let raf = 0;
    let last = 0;
    let t = 0;
    let started = 0;
    let lastY = window.scrollY;
    let omega = 0;
    let node = -Math.PI / 2;
    let dpr = 1;
    let blank = false;

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (!last) {
        last = now;
        if (!started) started = now;
      }
      const dt = Math.min((now - last) / 1000, 0.1);
      last = now;
      t += dt;

      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      if (canvas.width !== Math.round(w * dpr) || canvas.height !== Math.round(h * dpr)) {
        canvas.width = Math.round(w * dpr);
        canvas.height = Math.round(h * dpr);
        gl.viewport(0, 0, canvas.width, canvas.height);
        blank = false;
      }
      if (stale) {
        colours();
        blank = false;
      }

      // the rotation the page feels: how fast it is being scrolled, and how fast the pointer crosses it
      const y = window.scrollY;
      const felt = dt > 0 ? (y - lastY) / dt / 2600 + pointerDx / dt / 5200 : 0;
      lastY = y;
      pointerDx = 0;
      const quiet = still.matches;
      omega += ((quiet ? 0 : Math.max(-1, Math.min(1, felt))) - omega) * (1 - Math.exp(-dt * 7));
      if (Math.abs(omega) < 1e-4) omega = 0;
      // at rest the fringes still creep: the ground itself is turning
      const shift = (quiet ? 0 : t * 0.045) + omega * 0.6;
      bus.omega.set(omega);
      bus.phase.set((((0.5 + shift) % 1) + 1) % 1);
      node += (-Math.PI / 2 + (bus.node * Math.PI) / 3 - node) * (1 - Math.exp(-dt * 5));

      // every anchor near the viewport pulls the figure towards its own place and shape
      const vh = window.innerHeight;
      const mix = { cx: 0, cy: 0, bx: 0, by: 0, rho: 0, period: 0, gap: 0, hole: 0, field: 0, text: 0, half: 0, ring: 0 } as Fig;
      let sum = 0;
      let textRect: [number, number, number, number] | undefined;
      let stacked = false;
      for (const a of bus.anchors) {
        const r = a.el.getBoundingClientRect();
        if (!r.width || !r.height) continue;
        const wgt = 1 - smooth(0.3 * vh, 0.8 * vh, Math.abs(r.top + r.height / 2 - vh / 2));
        if (wgt <= 0) continue;
        const fig = figure(a.kind, r);
        for (const k of GEOMETRY) mix[k] += wgt * fig[k];
        for (const k of LEVELS) mix[k] += wgt * fig[k];
        if (fig.textRect) [textRect, stacked] = [fig.textRect, !!fig.stacked];
        sum += wgt;
      }

      if (sum < 0.002) {
        if (!blank) {
          gl.uniform1f(u.uField, 0);
          gl.uniform1f(u.uRing, 0);
          gl.drawArrays(gl.TRIANGLES, 0, 3);
          blank = true;
        }
        return;
      }
      blank = false;
      for (const k of GEOMETRY) mix[k] /= sum;
      for (const k of LEVELS) mix[k] /= Math.max(sum, 1);
      // the loop's furniture (rim, nodes, pulses) waits until the figure has all but arrived
      mix.ring = smooth(0.6, 1, mix.ring);

      const intro = quiet ? 1 : smooth(0, 1, (now - started) / 1700 - 0.12);
      gl.uniform2f(u.uRes, canvas.width, canvas.height);
      gl.uniform2f(u.uC, mix.cx * dpr, mix.cy * dpr);
      gl.uniform2f(u.uB, mix.bx * dpr, mix.by * dpr);
      gl.uniform1f(u.uRho, mix.rho * dpr);
      gl.uniform1f(u.uPeriod, mix.period * dpr);
      gl.uniform1f(u.uGap, mix.gap * dpr);
      gl.uniform1f(u.uHole, mix.hole);
      gl.uniform1f(u.uField, mix.field);
      gl.uniform1f(u.uText, textRect ? mix.text : 0);
      gl.uniform1f(u.uHalf, mix.half);
      gl.uniform1f(u.uRing, mix.ring);
      gl.uniform1f(u.uShift, shift);
      gl.uniform1f(u.uTurn, quiet ? 0 : t * 0.05 + y * 0.0012);
      gl.uniform1f(u.uTau, quiet ? 0.9 : t * 1.05);
      gl.uniform1f(u.uNode, node);
      gl.uniform1f(u.uPx, dpr);
      gl.uniform1f(u.uIntro, intro);
      if (textRect) {
        gl.uniform4f(u.uTextRect, textRect[0] * dpr, textRect[1] * dpr, textRect[2] * dpr, textRect[3] * dpr);
        gl.bindTexture(gl.TEXTURE_2D, textures[stacked ? 1 : 0]);
      }
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const onVisible = () => {
      cancelAnimationFrame(raf);
      last = 0;
      if (!document.hidden) raf = requestAnimationFrame(frame);
    };
    document.addEventListener("visibilitychange", onVisible);
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      themed.disconnect();
      document.removeEventListener("visibilitychange", onVisible);
      window.removeEventListener("pointermove", onPointer);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  return <canvas ref={ref} aria-hidden className="pointer-events-none fixed inset-x-0 top-0 z-0 h-lvh w-full" />;
}
