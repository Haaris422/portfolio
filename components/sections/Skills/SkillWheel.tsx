interface SkillWheelProps {
    dynamicHeight:number;
    areaWidth:number;
    centerX:number;
    centerY:number;
    category:string;
    skillShapes: any
}
export function SkillWheel({dynamicHeight, areaWidth, centerX, centerY, category, skillShapes}: SkillWheelProps){
    return(
        <div
            className="relative"
            style={{ height: `${dynamicHeight}px`, width: `${areaWidth}px` }}
          >
            <div
              className="absolute flex items-center justify-center text-white text-2xl font-bold rounded-md border border-white/40 bg-white/5 backdrop-blur-md shadow-md"
              style={{
                top: `${centerY - 60 / 2}px`,
                left: `${centerX - 200 / 2}px`,
                width: '200px',
                height: '60px',
              }}
            >
              {category === 'all' ? 'All Skills' : `${category.charAt(0).toUpperCase() + category.slice(1)} Skills`}
            </div>

            {skillShapes}
          </div>
    )
}