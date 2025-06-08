import React from "react";

type CardBodyProps = {
  children: React.ReactNode;
  animationClass?: string;
  delay?: number;
  className?: string;
cardRef?: React.Ref<HTMLDivElement>;
};

export function CardBody({
  children,
  animationClass = "",
  delay = 0,
  className = "",
  cardRef,
}: CardBodyProps) {
  return (
    <div
      ref={cardRef}
      style={{ animationDelay: `${delay}s` }}
      className={`relative bg-white/10 backdrop-blur-md 
        text-white  space-y-6 rounded-lg border 
        border-white/20 p-6 pt-12 shadow-md transition-all duration-500 
        ${animationClass} ${className}`}
    >
      {children}
    </div>
  );
}
