import { cn } from "@/lib/utils";

export function Formula({ className }: { className?: string }) {
  return (
    <span
      role="math"
      aria-label="Δt = 4AΩ / c²"
      className={cn("inline-flex items-center gap-[0.45em] font-serif leading-none", className)}
    >
      <span aria-hidden>
        Δ<i>t</i>
      </span>
      <span aria-hidden>=</span>
      <span aria-hidden className="inline-flex flex-col items-center">
        <span className="px-[0.15em] pb-[0.2em]">
          4<i>A</i>Ω
        </span>
        <span className="h-px w-full bg-current opacity-70" />
        <span className="pt-[0.24em]">
          <i>c</i>
          <sup>2</sup>
        </span>
      </span>
    </span>
  );
}
