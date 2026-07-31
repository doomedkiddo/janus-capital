"use client";

import { GlyphFrame, GlyphPath, draw, fade, linePath } from "./glyph-frame";

const profile =
  "M100 42 C82 42 66 51 61 70 C59 78 63 82 61 86 C57 92 47 96 47 99 C47 102 55 103 57 107 C58 111 53 113 54 117 C55 122 61 126 69 129 C75 131 79 134 79 139 L100 141";

const neck = "M79 139 L79 170";

export function TwoFaces({ className }: { className?: string }) {
  return (
    <GlyphFrame className={className}>
      <GlyphPath variants={draw} d={profile} />
      <GlyphPath variants={draw} d={neck} />
      <GlyphPath variants={draw} d={linePath(66, 79, 74, 79)} />

      <g transform="translate(200 0) scale(-1 1)">
        <GlyphPath variants={draw} d={profile} />
        <GlyphPath variants={draw} d={neck} />
        <GlyphPath variants={draw} d={linePath(66, 79, 74, 79)} />
      </g>

      <GlyphPath variants={draw} d={linePath(100, 30, 100, 182)} strokeOpacity="0.6" />
      <GlyphPath
        variants={fade}
        d={linePath(40, 79, 8, 79)}
        strokeDasharray="3 5"
        strokeOpacity="0.7"
      />
      <GlyphPath
        variants={fade}
        d={linePath(160, 79, 192, 79)}
        strokeDasharray="3 5"
        strokeOpacity="0.7"
      />
      <GlyphPath variants={draw} d={linePath(58, 182, 142, 182)} strokeOpacity="0.72" />
    </GlyphFrame>
  );
}
