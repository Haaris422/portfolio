import { useEffect, useState } from "react";

interface PopUpProps {
    open: boolean;
    status: boolean;
    message: string;
    position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center';
}

export function PopUp({ open, status, message, position }: PopUpProps) {
    const [visible, setVisible] = useState(open);
    const [animatingOut, setAnimatingOut] = useState(false);

    const positionClasses: Record<PopUpProps['position'], string> = {
        'top-left': 'top-4 left-4',
        'top-right': 'top-4 right-4',
        'bottom-left': 'bottom-4 left-4',
        'bottom-right': 'bottom-4 right-4',
        'center': 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
    };

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
            className={`bg-white fixed z-50 p-4 border-black border-2 w-[250px] shadow-lg transition-opacity duration-300 
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
