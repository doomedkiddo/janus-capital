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
uniform float uPx;     // device pixels per CSS pixel
uniform float uIntro;  // the two rows enter from opposite sides

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

void main() {
  vec2 f = vec2(gl_FragCoord.x, uRes.y - gl_FragCoord.y);
  vec2 p = f - uC;
  float R = min(uB.x, uB.y);
  float fg = 0.0;
  float ac = 0.0;

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
    fg += ref * (1.0 - sel) * body * uField * aRef * ground;
    ac += dis * sel * body * uField * aDis * mix(1.0, 0.86, uCalm);
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
    for (int k = 0; k < 6; k++) {
      float a = -1.5707963 + float(k) * 1.0471976;
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

  vec3 col = mix(uBg, uFg, clamp(fg, 0.0, 1.0));
  col = mix(col, uAc, clamp(ac, 0.0, 1.0));
  gl_FragColor = vec4(col, 1.0);
}
`;
