// One fragment shader draws every figure of the bench. All lengths are device pixels with y pointing down, so an edge
// is antialiased by clamping a distance over one pixel. Nothing glows and nothing is added: a pixel is the ground, the
// main colour or the accent, mixed by coverage, which is why the same picture works on the dark and the light ground.

export const VERT = `
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`;

export const FRAG = `
precision highp float;

uniform vec2 uRes;
uniform vec3 uBg;
uniform vec3 uFg;
uniform vec3 uAc;

uniform vec2 uC;       // centre of the figure
uniform vec2 uB;       // half size
uniform float uRho;    // corner radius: 0 a band, min(uB) a disc
uniform float uHole;   // 0 a full figure, 1 only its outline
uniform float uField;  // fringes
uniform float uCalm;   // 1: the field recedes to a quiet ground with soft edges and the displaced fringes carry the figure
uniform float uText;   // the name as a displaced region
uniform float uHalf;   // the lower half as a displaced region (the mark)
uniform float uRing;   // the loop: ring, rim, pulses, nodes
uniform float uPeriod; // one bright and one dark fringe
uniform float uShift;  // displacement beyond the mark's half period, in periods
uniform float uGap;    // half height of the slit between the two rows
uniform vec4 uTextRect;
uniform sampler2D uTex;
uniform float uTurn;   // the table
uniform float uTau;    // how far the pulses have travelled from where they met
uniform float uNode;   // angle of the node where they meet
uniform float uCount;  // nodes on the ring
uniform float uStart;  // angle of the first
uniform float uPx;     // device pixels per CSS pixel
uniform float uIntro;  // the two rows enter from opposite sides
uniform float uMetal;  // 1: the fringes are relief on a polished plate, lit, instead of flat bars
uniform float uTime;   // seconds, for the light and the slow swell of the plate

const float TAU = 6.2831853;

float sdBox(vec2 p, vec2 b, float r) {
  vec2 q = abs(p) - b + r;
  return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r;
}

// coverage of the inside of an edge at signed distance d
float cov(float d) { return clamp(0.5 - d, 0.0, 1.0); }

// bars half a period wide, one centred on every multiple of P
float bars(float x, float P) {
  float f = abs(fract(x / P + 0.5) - 0.5) * P;
  return clamp(0.5 + 0.25 * P - f, 0.0, 1.0);
}

// which fringes are out of step at f: the letters of the name, or the lower half
float selAt(vec2 f, vec2 p) {
  float s = 0.0;
  if (uText > 0.001) {
    vec2 uv = (f - uTextRect.xy) / uTextRect.zw;
    if (uv.x > 0.0 && uv.x < 1.0 && uv.y > 0.0 && uv.y < 1.0) s = texture2D(uTex, uv).a * uText;
  }
  return max(s, clamp(0.5 + p.y, 0.0, 1.0) * uHalf);
}

// a ridge on every bar of the flat picture: highest on its centre, flat between
float ridge(float u) {
  float r = 0.5 + 0.5 * cos(TAU * u);
  return r * r * (3.0 - 2.0 * r);
}

// The plate: the fringes as ridges, those of the name half a period along, on a surface that swells slowly like a
// liquid. Unitless height; f in device pixels.
float plate(vec2 f) {
  vec2 p = f - uC;
  float P = uPeriod;
  float t = uTime;
  float w = P * (0.2 * sin(p.y / (P * 3.1) + t * 0.33) + 0.14 * sin((0.6 * p.x + p.y) / (P * 5.3) - t * 0.25));
  float s = selAt(f, p);
  float h = mix(ridge((p.x + 0.25 * P + w) / P), ridge((p.x - 0.25 * P - uShift * P + w) / P), s);
  // the liquid: two broad swells that drift against each other, much taller than the ridges, so the light rolls
  // over the plate in large soft forms and the fringes ride on them
  float swell = sin((p.x + 0.4 * p.y) / (P * 5.0) + t * 0.18) * sin((p.y - 0.3 * p.x) / (P * 3.6) - t * 0.13)
              + 0.7 * sin((p.x - 0.8 * p.y) / (P * 7.5) - t * 0.11) * sin((0.5 * p.x + p.y) / (P * 4.8) + t * 0.09);
  return 0.45 * h + 9.0 * swell;
}

// Lit by a studio: two tall soft boxes either side (they draw a line of light down every ridge), a long one above,
// and a key light that drifts. Returns (light from the room, specular glints).
vec2 studio(vec3 n) {
  float t = uTime;
  vec3 r = vec3(2.0 * n.z * n.x, 2.0 * n.z * n.y, 2.0 * n.z * n.z - 1.0);
  float side = exp(-pow((r.x - 0.45 - 0.12 * sin(t * 0.17)) * 2.2, 2.0)) + 0.5 * exp(-pow((r.x + 0.55) * 2.0, 2.0));
  float top = 0.42 * exp(-pow((r.y + 0.5 + 0.1 * sin(t * 0.11)) * 1.8, 2.0));
  vec3 key = normalize(vec3(0.55 * cos(t * 0.13), -0.45, 0.7));
  float glint = pow(max(dot(n, normalize(key + vec3(0.0, 0.0, 1.0))), 0.0), 40.0);
  return vec2(clamp(side + top, 0.0, 1.4), glint);
}

void main() {
  vec2 f = vec2(gl_FragCoord.x, uRes.y - gl_FragCoord.y);
  vec2 p = f - uC;
  float R = min(uB.x, uB.y);
  float fg = 0.0;
  float ac = 0.0;
  vec3 metal = uBg;
  float metalA = 0.0;

  if (uField > 0.001) {
    float d = sdBox(p, uB, uRho);
    float body = cov(d) * cov(-R * (1.0 - uHole) - d - 1.0);

    // which fringes are out of step: the letters of the name, or the lower half
    float sel = 0.0;
    if (uText > 0.001) {
      vec2 uv = (f - uTextRect.xy) / uTextRect.zw;
      if (uv.x > 0.0 && uv.x < 1.0 && uv.y > 0.0 && uv.y < 1.0) sel = texture2D(uTex, uv).a * uText;
    }
    sel = max(sel, clamp(0.5 + p.y, 0.0, 1.0) * uHalf);
    body *= 1.0 - cov(abs(p.y) - uGap) * uHalf;

    float P = uPeriod;
    float ref = bars(p.x + 0.25 * P, P);
    float dis = bars(p.x - 0.25 * P - uShift * P, P);

    float edge = mix(-uB.x - 60.0 * uPx, uB.x + 60.0 * uPx, uIntro);
    float aRef = clamp((edge - p.x) / (60.0 * uPx), 0.0, 1.0);
    float aDis = clamp((p.x + edge) / (60.0 * uPx), 0.0, 1.0);

    // a figure the size of the window must not dazzle: its field is kept low and fades out towards its edges
    float ground = mix(1.0, 0.17 * smoothstep(0.0, 0.42 * R, -d), uCalm);
    float bars2d = 1.0 - uMetal;
    fg += ref * (1.0 - sel) * body * uField * aRef * ground * bars2d;
    ac += dis * sel * body * uField * aDis * mix(1.0, 0.86, uCalm) * bars2d;

    if (uMetal > 0.001) {
      float e = 2.0 * uPx;
      float hx = (plate(f + vec2(e, 0.0)) - plate(f - vec2(e, 0.0))) / (2.0 * e);
      float hy = (plate(f + vec2(0.0, e)) - plate(f - vec2(0.0, e))) / (2.0 * e);
      vec3 n = normalize(vec3(-hx * 0.42 * P, -hy * 0.42 * P, 1.0));
      vec2 lit = studio(n);
      // gunmetal on the dark ground, brushed steel on the light one; the name takes the accent in its reflections
      float light = step(0.5, dot(uBg, vec3(0.299, 0.587, 0.114)));
      vec3 base = mix(mix(uBg, vec3(0.30, 0.33, 0.37), 0.32), mix(uBg, vec3(0.62, 0.65, 0.69), 0.30), light);
      vec3 room = mix(vec3(0.70, 0.74, 0.80), vec3(0.26, 0.29, 0.33), light);
      base = mix(base, uAc, 0.22 * sel);
      room = mix(room, uAc, 0.62 * sel);
      // kept low: the plate is lit, not shining (the full-contrast fringes were too bright to look at)
      metal = base + (room - base) * clamp(lit.x * mix(0.38, 0.66, sel), 0.0, 1.0);
      metal = mix(metal, vec3(1.0), lit.y * mix(0.32, 0.22, light) * mix(0.6, 1.0, sel));
      // the plate's edges fade into the ground as the calm field's do
      metalA = uMetal * uField * body * mix(1.0, smoothstep(0.0, 0.42 * R, -d), uCalm) * smoothstep(0.0, 1.0, uIntro);
    }
  }

  if (uRing > 0.001) {
    float r = length(p);
    float ang = atan(p.y, p.x);
    float px = uPx;
    float Ri = R - 9.0 * px;

    float ring = cov(abs(r - R) - 0.6 * px);
    float inner = cov(abs(r - Ri) - 0.5 * px) * step(0.5, fract((ang + uTurn) / TAU * 96.0));

    // the rim of the table, a tick every five degrees
    float ta = (ang - uTurn * 0.5) / TAU * 72.0;
    float tick = cov(abs(fract(ta) - 0.5) * (TAU / 72.0) * r - 0.5 * px);
    float major = step(mod(floor(ta), 6.0), 0.5);
    tick *= step(R + 8.0 * px, r) * step(r, R + (13.0 + 7.0 * major) * px);

    // two pulses leave the node together, one each way round, and meet again at the node and across from it
    float a1 = uNode + uTau;
    float a2 = uNode - uTau;
    float p1 = cov(abs(r - R) - 1.5 * px) * exp(-mod(a1 - ang, TAU) * 2.4);
    float p2 = cov(abs(r - Ri) - 1.5 * px) * exp(-mod(ang - a2, TAU) * 2.4);
    vec2 h1 = p - R * vec2(cos(a1), sin(a1));
    vec2 h2 = p - Ri * vec2(cos(a2), sin(a2));
    float g1 = exp(-dot(h1, h1) / (30.0 * px * px));
    float g2 = exp(-dot(h2, h2) / (30.0 * px * px));

    float nodes = 0.0;
    float lit = 0.0;
    float knock = 0.0;
    for (int k = 0; k < 8; k++) {
      if (float(k) >= uCount) break;
      float a = uStart + float(k) * TAU / uCount;
      float dn = length(p - R * vec2(cos(a), sin(a)));
      float da = abs(mod(a - uNode + 3.14159265, TAU) - 3.14159265);
      float on = 1.0 - smoothstep(0.0, 0.45, da);
      knock = max(knock, cov(dn - 5.0 * px));
      nodes = max(nodes, cov(abs(dn - 5.0 * px) - 0.6 * px));
      lit = max(lit, on * max(cov(dn - 3.0 * px), 0.75 * cov(abs(dn - 13.0 * px) - 0.5 * px)));
    }

    float meet = pow(max(cos(uTau), 0.0), 48.0);
    vec2 mp = p - R * vec2(cos(uNode), sin(uNode));
    float flash = meet * exp(-dot(mp, mp) / (700.0 * px * px));

    // the beam comes in along the axis and is split where it meets the ring
    float beam = cov(abs(p.y) - 0.5 * px) * step(p.x, -R);
    vec2 s = p + vec2(R, 0.0);
    float split = cov(abs(s.x + s.y) * 0.7071 - 0.8 * px) * step(abs(s.x - s.y) * 0.7071, 14.0 * px);

    fg += uRing * (ring * (1.0 - knock) * 0.85 + tick * 0.4 + p1 + g1 + nodes * 0.9 + beam * 0.4 + split + flash * 0.6);
    ac += uRing * (inner * 0.55 + p2 + g2 + lit + flash * 0.5);
  }

  vec3 col = mix(uBg, metal, metalA);
  col = mix(col, uFg, clamp(fg, 0.0, 1.0));
  col = mix(col, uAc, clamp(ac, 0.0, 1.0));
  gl_FragColor = vec4(col, 1.0);
}
`;
