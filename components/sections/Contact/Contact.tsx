import { Heading } from "@/components/shared/Heading";
import { ContactForm } from "./Components/ContactForm";
import { ContactInfo } from "./Components/ContactInfo";

export function Contact() {
    return (
        <div className="p-8 lg:px-36 lg:pt-12 bg-gradient-to-b from-[rgba(10,10,30,0.2)] to-gray-700 backdrop-blur-lg ">
            <div className="space-y-4">
                <Heading text="Contact Me" size="4xl" className="pb-8" />
                <p className="text-2xl mb-8 font-bold text-center text-white">I’m always open to new ideas and opportunities — let’s get in touch!</p>

                <div className="grid grid-cols-1 lg:grid-cols-2 w-full gap-12">
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
