'use client';

import { ContactCard } from './contact-card'; 
import { contacts } from '../data/contact';

export function Contact() {
    return (
        <section className="py-20">
            <div className="container mx-auto px-6 flex flex-col items-center justify-start gap-12">
                <div className="text-center">
                    <span className="tape tape-pink mb-4 inline-block -rotate-1">
                        The crew behind the fire
                    </span>
                    <h2 className="font-poster text-5xl uppercase leading-none text-gradient-live md:!text-7xl">
                        Contact Us
                    </h2>
                </div>
                <div className="w-full flex items-center justify-center flex-wrap gap-8">
                    {contacts.map((contact, index) => {
                        return (
                            <ContactCard className='' key={index} contact={contact}  />
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
