interface SkillCardProps {
  skill: string;
  level: number;
  icon: string;
}

interface CardProps {
  data: SkillCardProps;
}

export function SkillCard({ data }: CardProps) {
  return (
    <div className="bg-white border-2 rounded-4xl p-4 border-black space-y-2 transition-all duration-500 hover:shadow-2xs hover:scale-105 hover:border-amber-500">
      <div className="flex justify-between text-lg font-bold pb-4 items-center">
        <span>{data.skill}</span>
        <span>{data.icon}</span>
      </div>
      <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-amber-500 rounded-full grow-bar"
          style={{ '--bar-width': `${data.level}%` } as React.CSSProperties}
        />
      </div>
      <div className="flex pt-4 justify-between items-center">
        <span>Proficiency</span>
        <span>{data.level}%</span>
      </div>
    </div>
  );
}
