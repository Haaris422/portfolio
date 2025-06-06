interface SkillShapeProps {
  category: 'frontend' | 'backend' | 'other';
  title: string;
  proficiency: number;
  index: number;
  icon: string;
  top: number;
  left: number;
}

export function SkillShape({
  category,
  title,
  proficiency,
  index,
  icon,
  top,
  left
}: SkillShapeProps) {
const size = 100;
const strokeWidth = 2;
const color = "rgba(255, 255, 255, 0.1)";
const stroke = "rgba(255, 255, 255, 0.9)";

const shape = {
  frontend: (
    <svg width={size} height={size}>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={(size / 2) - strokeWidth / 2}
        stroke={stroke}
        strokeWidth={strokeWidth}
        fill={color}
      />
    </svg>
  ),
  backend: (
    <svg width={size} height={size}>
      <rect
        x={strokeWidth / 2}
        y={strokeWidth / 2}
        width={size - strokeWidth}
        height={size - strokeWidth}
        stroke={stroke}
        strokeWidth={strokeWidth}
        fill={color}
      />
    </svg>
  ),
  other: (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <polygon
        points="50,5 95,95 5,95"
        stroke={stroke}
        strokeWidth={strokeWidth}
        fill={color}
      />
    </svg>
  )
};


  return (
    <div
      className="absolute cursor-pointer animate-fade-in"
      style={{
        top,
        left,
        width: `${size}px`,
        height: `${size}px`,
        animationDelay: `${index *100}`
      }}
    >
      <div className="relative w-full h-full">
        {shape[category]}
        <div className="absolute inset-0 flex flex-col gap-2 items-center justify-center text-white text-center px-1">
          <span className="text-sm font-semibold">{title}</span>

          <div className="w-full mt-1 bg-white/30 h-2 rounded-full overflow-hidden">
            <div className="bg-white h-full rounded-full" style={{ width: `${proficiency}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
}
