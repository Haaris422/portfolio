import { FaXTwitter } from "react-icons/fa6";
import { LuMail, LuMapPin } from "react-icons/lu";

export type ErrorProps = {
    name: string;
    email: string;
    mssg: string;
}

export type FieldName = keyof ErrorProps;

export const fields: { name: FieldName; type: string; placeholder: string; label: string; }[] = [
    { name: "name", type: "text", placeholder: "Your Name...", label: "Name" },
    { name: "email", type: "email", placeholder: "Your Email...", label: "Email" },
    { name: "mssg", type: "text", placeholder: "Your Message...", label: "Message" }
];

export interface PopUpProps {
    open: boolean;
    status: boolean;
    message: string;
    position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center';
}

export const otherContacts = [
    {
        label: "Email",
        value: "haarisamin123@gmail.com",
        icon: <LuMail />,
        link: "mailto:haarisamin123@gmail.com"
    },
    {
        label: "Twitter",
        value: "@HaarisAmin2",
        icon: <FaXTwitter />,
        link: "https://x.com/HaarisAmin2"
    },
    {
        label: "Location",
        value: "Greater Noida, Uttar Pradesh",
        icon: <LuMapPin />,
        link: null
    },
]

export const positionClasses: Record<PopUpProps['position'], string> = {
    'top-left': 'top-4 left-4',
    'top-right': 'top-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'center': 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
};