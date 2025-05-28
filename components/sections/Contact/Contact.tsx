import { ContactForm } from "./ContactForm";
import { ContactInfo } from "./ContactInfo";

export function Contact() {
    
    return (
        <div className="p-2 lg:px-32 lg:py-2">

            <div className="px-2 py-8 lg:p-16 space-y-4">
                <h2 className="relative pb-8 group text-4xl font-bold text-center lg:text-left w-full">
                    <span className="relative inline-block">
                        Contact Me
                        <span className="absolute -bottom-[3px] left-1/2 -translate-x-1/2 lg:left-0 lg:translate-x-0 h-1.5 bg-amber-400 rounded-full transition-all duration-300 w-full lg:w-[40%] group-hover:w-full"></span>
                    </span>
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 w-full gap-8">
                    <ContactForm/>
                    <ContactInfo/>

                </div>
            </div>
        </div>
    )
}