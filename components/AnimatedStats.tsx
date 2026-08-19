"use client";
import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { stats } from "@/data/profile";

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [n, setN] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  useEffect(() => {
    if (!inView) return;
    const dur = 1200, start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / dur, 1);
      setN(Math.round((1 - Math.pow(1 - p, 3)) * value));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, value]);
  return (
    <span ref={ref} className="font-display text-3xl font-semibold text-white sm:text-4xl">
      {n}{suffix}
    </span>
  );
}

export default function AnimatedStats() {
  return (
    <dl className="grid grid-cols-2 gap-6 border-t border-white/[0.06] pt-6 sm:grid-cols-4">
  {stats.map((s) => (
    <div key={s.label}>
      <dd>
        <Counter value={s.value} suffix={s.suffix} />
      </dd>

      <dt className="mt-1 font-mono text-[11px] uppercase tracking-wide text-mist-500">
        {s.label}
      </dt>
    </div>
  ))}
</dl>
  );
}
