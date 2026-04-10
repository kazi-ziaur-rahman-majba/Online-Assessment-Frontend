import { motion, HTMLMotionProps } from "framer-motion";
import { ReactNode } from "react";
import { TargetAndTransition, VariantLabels } from "framer-motion";

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

// Reusable transition
export const transition = {
  duration: 1,
  delay: Math.random() * 0.5,
};

type MotionDivProp = {
  children: ReactNode;
  className?: string;
  initial?: boolean | TargetAndTransition | VariantLabels;
  whileInView?: boolean | TargetAndTransition | VariantLabels;
  delay?:number
} & Omit<HTMLMotionProps<"div">, "className" | "children">;
export const MotionDiv = ({
  children,
  className,
  initial,
  whileInView,
  delay,
  ...others
}: MotionDivProp) => (
  <motion.div
    initial={initial ?? { opacity: 0, y: 20 }}
    whileInView={whileInView ?? { opacity: 1, y: 0 }}
    transition={{
      type: "spring",
      stiffness: 50,     // Lower = softer movement
      damping: 20,       // Higher = less bouncy
      delay: delay ?? 0,
    }}
    viewport={{ once: true, amount: 0.3 }}
    className={className}
    style={{ willChange: "transform, opacity" }} // helps performance
    {...others}
  >
    {children}
  </motion.div>
);
type MotionByIndexProp = {
  i: number;
  children: ReactNode;
  className?: string;
} & Omit<HTMLMotionProps<"div">, "className" | "children">;

export const MotionByIndex = ({
  i,
  children,
  className,
  ...others
}: MotionByIndexProp) => (
  <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{
      duration: 0.6,
      delay: i * 0.1,
    }}
    className={className}
    {...others}
  >
    {children}
  </motion.div>
);

type TAProp = {
  delay?: number;
};

export const motionVar = ({ delay }: TAProp) => ({
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  transition: {
    duration: 1,
    delay: delay ?? Math.random() * 0.5,
  },
});


/**
 *
 * @param root0
 * @param root0.value
 */

type Props = {
  value: number;
  direction?: "up" | "down";
  className?: string;
};

export default function Counter({
  value,
  direction = "up",
  className
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(direction === "down" ? value : 0);
  const springValue = useSpring(motionValue, {
    damping: 100,
    stiffness: 100,
  });
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      motionValue.set(direction === "down" ? 0 : value);
    }
  }, [motionValue, isInView]);

  useEffect(
    () =>
      springValue.on("change", (latest) => {
        if (ref.current) {
          ref.current.textContent = Intl.NumberFormat("en-US").format(
            Number(latest.toFixed(0))
          );
        }
      }),
    [springValue]
  );

  return <span className={className} ref={ref} />;
}
