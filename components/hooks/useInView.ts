// hooks/useInView.ts
import { useState, useEffect } from "react";

export function useInView(ref: React.RefObject<HTMLElement>, threshold = 0.2) {
  const [isInView, setIsInView] = useState(true);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {
        threshold,
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [ref, threshold]);

  return isInView;
}
