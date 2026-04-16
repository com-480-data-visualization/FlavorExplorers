import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "motion/react";

interface RollingNumberProps {
  value: string;
  suffix?: string;
}

export function RollingNumber({ value, suffix = "" }: RollingNumberProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    if (!isInView) return;

    const digits = "0123456789";
    const chars = value.split("");
    let iterations = 0;
    const maxIterations = 30;

    const interval = setInterval(() => {
      setDisplayValue(
        chars
          .map((char, index) => {
            if (char === "k" || char === "+") return char;
            if (iterations < maxIterations - index * 2) {
              return digits[Math.floor(Math.random() * digits.length)];
            }
            return char;
          })
          .join("")
      );

      iterations++;

      if (iterations >= maxIterations) {
        clearInterval(interval);
        setDisplayValue(value);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [isInView, value]);

  return (
    <span ref={ref} className="inline-block">
      {displayValue}
      {suffix}
    </span>
  );
}
