import { Heading } from "@/components/Heading";
import { ContactForm } from "./ContactForm";
import { ContactInfo } from "./ContactInfo";

export function Contact() {

    return (
        <div className="p-2 lg:px-32 lg:py-2">

            <div className="px-2 py-8 lg:p-16 space-y-4">
                <Heading text="Contact Me" size="4xl" className="pb-8" />

                <div className="grid grid-cols-1 lg:grid-cols-2 w-full gap-8">
                    <ContactForm />
                    <ContactInfo />

                </div>
            </div>
        </div>
    )
}