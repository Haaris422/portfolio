import { useEffect, useState } from "react";
import { PopUpProps, positionClasses } from "../Data";

export function PopUp({ open, status, message, position }: PopUpProps) {
    const [visible, setVisible] = useState(open);
    const [animatingOut, setAnimatingOut] = useState(false);

    

    useEffect(() => {
        if (open) {
            setVisible(true);
            setAnimatingOut(false);
        } else {
            setAnimatingOut(true);
            const timeout = setTimeout(() => {
                setVisible(false);
                setAnimatingOut(false);
            }, 300); 
            return () => clearTimeout(timeout);
        }
    }, [open]);

    if (!visible) return null;

    return (
        <div
            className={`bg-white fixed bottom-10 left-10 z-50 p-4 border-black border-2 w-[250px] shadow-lg transition-opacity duration-300 
                ${positionClasses[position]} 
                ${animatingOut ? 'animate-slide-out' : 'animate-slide-in'}`}
        >
            <h2 className={`text-3xl text-center font-bold ${status ? 'text-green-500' : 'text-red-500'}`}>
                {status ? "Success!" : "Error"}
            </h2>
            <p className="text-center mt-4">{message}</p>
        </div>
    );
}
