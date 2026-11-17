"use client";

import { useEffect } from "react";
import { Stage } from "@/components/stage/stage";
import { Hud } from "@/components/ui/hud";

/** The ground of a page built on the stage: one surface in the theme's dark tokens, the stage's canvas fixed behind
 *  it, the margin lettering in front. Everything that is not a title is set in the mono face (`font-mono`), like the
 *  readouts of the instrument; titles keep `.display`. */
export function Bench({ children, hud = true }: { children: React.ReactNode; hud?: boolean }) {
  useEffect(() => {
    document.body.classList.add("bench-body");
    return () => document.body.classList.remove("bench-body");
  }, []);

  return (
    <div className="ink-surface relative min-h-screen bg-ink font-mono text-paper">
      <Stage />
      {hud && <Hud />}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
