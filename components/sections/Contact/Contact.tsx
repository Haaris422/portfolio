import { Heading } from "@/components/Heading";
import { ContactForm } from "./ContactForm";
import { ContactInfo } from "./ContactInfo";

export function Contact() {
    return (
        <div className="p-2 bg-gradient-to-b from-[rgba(10,10,30,0.2)] to-gray-700 backdrop-blur-lg lg:px-32 lg:py-2">
            <div className="px-2 py-8 lg:p-16 space-y-4">
                <Heading text="Contact Me" size="4xl" className="pb-8" />
                <p className="text-2xl mb-8 font-bold text-center text-white">I’m always open to new ideas and opportunities — let’s get in touch!</p>

                <div className="grid grid-cols-1 lg:grid-cols-2 w-full gap-8">
                    <ContactForm />
                    <ContactInfo />
                </div>

                <div className="border-t-2 border-gray-500 w-full my-10" />
                <footer className="text-center text-sm text-gray-300 pb-4">
                    © {new Date().getFullYear()} Haaris Amin. All rights reserved.
                </footer>
            </div>
        </div>
    );
}
