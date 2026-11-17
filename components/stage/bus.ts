"use client";

import { useCallback, useRef } from "react";
import { motionValue } from "motion/react";

// The bench is one fixed canvas behind the page (components/stage/stage.tsx). Sections do not draw on it: they mark a
// place in the layout (an anchor) and the stage draws its figure there, blending from one anchor to the next as the
// page scrolls. This module is what the two sides share. It is a singleton because only one page is mounted at a time,
// and so that the nav and the footer work on pages that have no stage.

/** word: the full-bleed fringe field with the name written in it as a displacement (hero).
 *  mark: the logo's disc, lower half out of step.  loop: the ring with two counter-rotating pulses.
 *  strip: a full-bleed band of the mark's two rows. */
export type AnchorKind = "word" | "mark" | "loop" | "strip";

export type Anchor = { el: HTMLElement; kind: AnchorKind };

export const bus = {
  anchors: new Set<Anchor>(),
  /** rotation rate felt by the page: scroll and pointer velocity, smoothed, in [-1, 1]; 0 at rest */
  omega: motionValue(0),
  /** phase between the two rows in periods, [0, 1); the mark rests at 0.5 */
  phase: motionValue(0.5),
  /** loop figure: index of the node where the two pulses meet */
  node: 0,
};

/** Ref callback that registers an element as the place for one of the stage's figures. */
export function useStageAnchor(kind: AnchorKind) {
  const current = useRef<Anchor | null>(null);
  return useCallback(
    (el: HTMLElement | null) => {
      if (current.current) bus.anchors.delete(current.current);
      current.current = el ? { el, kind } : null;
      if (current.current) bus.anchors.add(current.current);
    },
    [kind],
  );
}
