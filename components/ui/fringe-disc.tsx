import { useId } from "react";
import { cn } from "@/lib/utils";

/** A small disc of fringes in the manner of the mark, with its own number of fringes. Inside an element with the
 *  `group` class the lower half drifts by one period on hover, a shift that ends on the picture it started from. */
export function FringeDisc({ count, className }: { count: number; className?: string }) {
  const id = useId();
  const r = 24;
  const gap = 1.4;
  const P = (2 * r) / count;
  const bars = Array.from({ length: count + 4 }, (_, k) => -r + (k - 2) * P);
  return (
    <svg viewBox="-24 -24 48 48" aria-hidden className={cn("block", className)}>
      <clipPath id={`${id}u`}>
        <path d={`M-24 ${-gap}A24 24 0 0 1 24 ${-gap}Z`} />
      </clipPath>
      <clipPath id={`${id}l`}>
        <path d={`M-24 ${gap}A24 24 0 0 0 24 ${gap}Z`} />
      </clipPath>
      <g clipPath={`url(#${id}u)`} className="fill-paper">
        {bars.map((x) => (
          <rect key={x} x={x} y={-r} width={P / 2} height={r} />
        ))}
      </g>
      <g clipPath={`url(#${id}l)`} className="fill-accent">
        <g className="transition-transform duration-1000 ease-[cubic-bezier(0.45,0,0.2,1)] group-hover:translate-x-[var(--p)] motion-reduce:transition-none" style={{ "--p": `${P}px` } as React.CSSProperties}>
          {bars.map((x) => (
            <rect key={x} x={x + P / 2} y={0} width={P / 2} height={r} />
          ))}
        </g>
      </g>
    </svg>
  );
}
