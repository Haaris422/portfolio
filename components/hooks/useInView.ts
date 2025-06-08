import { useState, useEffect } from "react";

export function useInView(ref: React.RefObject<HTMLElement | null>, threshold = 0.2) {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const target = ref?.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold }
    );

    observer.observe(target);

    return () => {
      observer.unobserve(target); // Clean up using the captured target
    };
  }, [ref, threshold]);

  return isInView;
}
