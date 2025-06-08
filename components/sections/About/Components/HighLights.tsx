import { HighLightsCard } from "./HighlightCard";
import { highlights } from "../Data";

export function HighLights() {
 

  return (
    <div className={`flex gap-8 flex-wrap justify-center`}>
      {highlights.map((item, index) => 
      <HighLightsCard key={index} item={item} index={index}/>
      )}
    </div>
  );
}
