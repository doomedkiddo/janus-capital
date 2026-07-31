"use client";

import { GlyphFrame, GlyphPath, draw, fade, linePath } from "./glyph-frame";

const backrest = (x: number) =>
  `M${x} 128 L${x} 62 C${x} 50 ${x + 9} 44 ${x + 21} 44 C${x + 33} 44 ${x + 42} 50 ${x + 42} 62 L${x + 42} 128`;

export function Throne({ className }: { className?: string }) {
  return (
    <GlyphFrame className={className}>
      {/* Two backrests on one seat: the shared reign */}
      <GlyphPath variants={draw} d={backrest(52)} />
      <GlyphPath variants={draw} d={backrest(106)} />
      <GlyphPath variants={draw} d={linePath(60, 74, 86, 74)} strokeOpacity="0.5" />
      <GlyphPath variants={draw} d={linePath(114, 74, 140, 74)} strokeOpacity="0.5" />

      {/* Armrests */}
      <GlyphPath variants={draw} d="M52 104 L38 104 L38 128" />
      <GlyphPath variants={draw} d="M148 104 L162 104 L162 128" />

      {/* Shared seat slab */}
      <GlyphPath variants={draw} d="M30 128 L170 128 L170 139 L30 139 Z" />

      {/* Legs and stepped dais */}
      <GlyphPath variants={draw} d={linePath(44, 139, 44, 160)} />
      <GlyphPath variants={draw} d={linePath(156, 139, 156, 160)} />
      <GlyphPath variants={draw} d="M36 160 L164 160 L164 169 L36 169 Z" />
      <GlyphPath variants={draw} d="M26 169 L174 169 L174 178 L26 178 Z" strokeOpacity="0.7" />

      {/* The half that was given away */}
      <GlyphPath
        variants={fade}
        d={linePath(100, 36, 100, 184)}
        strokeDasharray="5 6"
        strokeOpacity="0.85"
      />
      <GlyphPath
        variants={fade}
        d="M100 128 L100 139 L156 139 L156 160 L164 160 L164 169 L174 169 L174 178 L100 178 Z M106 128 L106 62 C106 50 115 44 127 44 C139 44 148 50 148 62 L148 104 L162 104 L162 128 Z"
        fill="currentColor"
        fillOpacity="0.08"
        stroke="none"
      />
    </GlyphFrame>
  );
}
