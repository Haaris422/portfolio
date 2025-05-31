interface HeadingProps{
    text:string;
    size:string;
    className?:string
}

const sizeMap:any = {
  '2xl': 'text-2xl',
  '3xl': 'text-3xl',
  '4xl': 'text-4xl',
  '5xl': 'text-5xl',
  // etc.
};

export function Heading({ text, size, className = '' }: HeadingProps) {
  const textSize = sizeMap[size] || 'text-base';

  return (
    <h2 className={`relative group ${textSize} font-bold text-center lg:text-left w-full ${className}`}>
      <span className="relative inline-block">
        {text}
        <span className="absolute -bottom-[3px] left-1/2 -translate-x-1/2 lg:left-0 lg:translate-x-0 h-1.5 bg-[#6c757d] rounded-full transition-all duration-300 w-full lg:w-[40%] group-hover:w-full"></span>
      </span>
    </h2>
  );
}
