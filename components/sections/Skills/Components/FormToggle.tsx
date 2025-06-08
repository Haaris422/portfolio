import { Button } from "@/components/shared/Button";
import { TbWheel } from "react-icons/tb";
import { LuTable } from "react-icons/lu";
import { FormatToggleProps } from "../Data";



export function FormatToggle({ format, setFormat, isHovering, setIsHovering }: FormatToggleProps) {
  return (
    <div className="flex w-full justify-center mb-14 items-center text-2xl text-white relative">
      {[
        { name: 'wheel', Icon: TbWheel, label: 'Wheel View' },
        { name: 'table', Icon: LuTable, label: 'Table View' },
      ].map(({ name, Icon, label }) => (
        <div
          key={name}
          onMouseEnter={() => setIsHovering(name)}
          onMouseLeave={() => setIsHovering('')}
          className="relative"
        >
          <Button
            onClick={() => setFormat(name)}
            className={`${format === name ? 'bg-white/40' : 'bg-white/10'} ${
              name === 'wheel' ? 'rounded-r-none border-r-black' : 'rounded-l-none border-l-black'
            } border-white/20 backdrop-blur-md p2 transition-all duration-300 ease-in-out group cursor-pointer`}
          >
            <Icon className="group-hover:scale-110" />
          </Button>

          {/* Tooltip */}
          <div className={`absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 transition-all duration-200 ease-out pointer-events-none ${
            isHovering === name ? 'opacity-100 translate-y-0 visible' : 'opacity-0 translate-y-1 invisible'}`}>
            <div className="bg-gray-900/95 text-white text-sm px-3 py-2 rounded-lg shadow-xl border border-white/10 whitespace-nowrap relative">
              {label}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900/95"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
