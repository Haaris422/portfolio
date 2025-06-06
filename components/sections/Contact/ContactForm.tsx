"use client";
import { Button } from "@/components/Button"
import { useState } from "react"
import { LuSend } from "react-icons/lu"
import { PopUp } from "./PopUp";
import { useRef } from "react";
import { useInView } from "@/components/hooks/useInView";
import { CardBody } from "@/components/CardBody";

export function ContactForm() {
    const contentRef = useRef<HTMLDivElement | any>(null);
    const showContent = useInView(contentRef);

    const fields = [{ name: "name", type: "text", placeholder: "Your Name...", label: "Name" },
    { name: "email", type: "email", placeholder: "Your Email...", label: "Email" },
    { name: "mssg", type: "text", placeholder: "Your Message...", label: "Message" }
    ];
    const [data, setData] = useState({
        name: '', email: '', mssg: ''
    });
    const [errors, setErrors] = useState<any>({
        name: "",
        email: "",
        mssg: "",
    });
    const [sending, setSending] = useState(false);
    const [popUpProps, setPopUpProps] = useState({
        open: false, message: "", status: false
    });
    
    function validate() {
        let newErrors = {
            name: "",
            email: "",
            mssg: "",
        };
        console.log('validate: line 26: data: ', data);
        let hasError = false;
        if (!data.name.trim()) {
            newErrors.name = "Name is Required."
            hasError = true;
        }
        if (!data.mssg.trim()) {
            newErrors.mssg = "Message is Required."
            hasError = true;

        }
        if (!data.email.trim()) {
            newErrors.email = "Email is required.";
            hasError = true;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
            newErrors.email = "Invalid email address.";
            hasError = true;
        }

        setErrors(newErrors);
        return !hasError;
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value
        }))
        console.log('handleChange: Line 19: name, value: ', name, value);
    }

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        if (!validate()) return;
        setSending(true);
        const payload = {
            ...data,
            access_key: "747b73c9-c6c9-4263-a41d-ae6318b09f6d"
        };

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                body: JSON.stringify(payload)
            });

            const result = await response.json();
            if (result.success) {
                console.log("Success:", result);
                setSending(false);
                setPopUpProps((prev) => ({
                    open: true,
                    status: true,
                    message: "Message Sent Successfuly"
                }))
                const timeout = setTimeout(() => {
                    setPopUpProps((prev) => ({
                        ...prev,
                        open: false
                    }))
                }, 3000)
                return () => clearTimeout(timeout);
            } else {
                setSending(false);
                setPopUpProps((prev) => ({
                    open: true,
                    status: false,
                    message: "An Error occured while sending the Message."
                }))
                console.error("Failed:", result);
            }
        } catch (err) {
            console.error("Error:", err);
        }
    }

    return (
        <div ref={contentRef} className={`relative group transition-opacity duration-1000 ${
          showContent ? "animate-fade-in opacity-100" : "animate-fade-out"
        }`}>
            <div className="absolute inset-0 bg-[#51606c] rounded-2xl transform rotate-1 
              transition-transform duration-300 group-hover:rotate-2"></div>
              <CardBody className="bg-[#6c757d] text-white relative rounded-4xl w-full 
            border-2 border-black p-4 shadow-lg transition-transform 
                duration-300 group-hover:translate-y-[-5px]">
            
                <h2 className="relative p-2 group text-2xl font-bold text-center lg:text-left w-full">
                    <span className="relative inline-block">
                        Send Me a Message
                    </span>
                </h2>
                <form onSubmit={handleSubmit}>
                    {fields.map((field, index) => (
                        <div className="space-y-1 mt-4" key={index}>
                            <p className="px-1.5">{field.label}</p>
                            {
                                field.name === "mssg" ?
                                    <textarea rows={8} onChange={handleChange} className={`w-full border-2 p-2 ${errors[field.name] ? 'border-red-500' : 'border-black'} rounded-md`} name={field.name} placeholder={field.placeholder} />
                                    :
                                    <input onChange={handleChange} className={`w-full border-2 p-2 ${errors[field.name] ? 'border-red-500' : 'border-black'} rounded-md`} name={field.name} type={field.type} placeholder={field.placeholder} />
                            }
                            {errors[field.name] && (
                                <p className="text-red-500 text-sm px-1.5">
                                    {errors[field.name]}
                                </p>
                            )}
                        </div>
                    ))}
                    <Button type="submit" className="cursor-pointer hover:opacity-75 text-lg text-white bg-black w-full my-4 rounded-2xl">
                        {sending ? <><div className="loader" /> Sending....</> : <><LuSend size={22} /> Send Message</>}

                    </Button>
                </form>
                <PopUp open={popUpProps.open} status={popUpProps.status} message={popUpProps.message} position="bottom-left" />

            </CardBody>
        </div>
    )
}