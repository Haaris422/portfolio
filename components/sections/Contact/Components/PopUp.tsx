import { useEffect, useState } from "react";
import { PopUpProps, positionClasses } from "../Data";
import { CardBody } from "@/components/shared/CardBody";

export function PopUp({ open, status, message, position }: PopUpProps) {
    const [visible, setVisible] = useState(open);
    const [animatingOut, setAnimatingOut] = useState(false);

    

    const [showBar, setShowBar] = useState(false);

    useEffect(() => {
        if (open) {
            setVisible(true);
            setAnimatingOut(false);
            setShowBar(true); // start progress bar
        } else {
            setAnimatingOut(true);
            setShowBar(false); // hide progress bar when closing
            const timeout = setTimeout(() => {
                setVisible(false);
                setAnimatingOut(false);
            }, 1000);
            return () => clearTimeout(timeout);
        }
    }, [open]);
    if (!visible) return null;

    return (
        <CardBody
            className={`fixed! bottom-0 left-0 z-50 p-4! rounded-2xl border-black border-2 w-[250px] shadow-lg transition-opacity duration-300 
                ${positionClasses[position]} 
                ${animatingOut ? 'animate-slide-out' : 'animate-slide-in'}`}
        >
            <h2 className={`text-3xl text-left font-bold ${status ? 'text-green-500' : 'text-red-500'}`}>
                {status ? "Success!" : "Error"}
            </h2>
                
            
            <p className="text-start mt-4">{message}</p>
        </CardBody>
    );
}
