import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

const ContactForm = () => {
    const form = useRef();
    const [status, setStatus] = useState("Send Inquiry");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [botTrap, setBotTrap] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        // Honeypot security check
        if (botTrap) {
            console.warn("Bot detected by honeypot field.");
            return;
        }

        const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
        const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
        const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

        if (!serviceId || !templateId || !publicKey) {
            console.error("Missing Env Vars");
            setStatus("Error. System unavailable.");
            return;
        }

        setIsSubmitting(true);
        setStatus("Sending...");

        emailjs.sendForm(serviceId, templateId, form.current, publicKey)
            .then((result) => {
                setStatus("Message Sent Successfully!");
                form.current.reset();
                setBotTrap("");
            }, (error) => {
                console.error("EmailJS Error:", error);
                setStatus("Error. Please try again.");
            })
            .finally(() => {
                setIsSubmitting(false);
                setTimeout(() => setStatus("Send Inquiry"), 3000);
            });
    };

    return (
        <form
            ref={form}
            onSubmit={handleSubmit}
            className="flex flex-col gap-5 w-full max-w-lg mx-auto relative z-50 bg-slate-900/50 p-6 sm:p-8 rounded-xl"
        >
            {/* Honeypot Input: Hidden from humans, traps automated bots */}
            <input
                type="text"
                name="contact_me_by_fax_only"
                value={botTrap}
                onChange={(e) => setBotTrap(e.target.value)}
                style={{ display: 'none' }}
                tabIndex="-1"
                autoComplete="off"
            />

            <div>
                <input
                    type="text"
                    name="user_name"
                    placeholder="Full Name"
                    required
                    className="w-full p-4 bg-slate-900 border border-slate-700 text-white rounded focus:outline-none focus:border-amber-500 transition-colors pointer-events-auto"
                />
            </div>

            <div>
                <input
                    type="email"
                    name="user_email"
                    placeholder="Email Address"
                    required
                    className="w-full p-4 bg-slate-900 border border-slate-700 text-white rounded focus:outline-none focus:border-amber-500 transition-colors pointer-events-auto"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pointer-events-auto">
                <div>
                    <input
                        type="text"
                        name="user_country"
                        placeholder="Country"
                        required
                        className="w-full p-4 bg-slate-900 border border-slate-700 text-white rounded focus:outline-none focus:border-amber-500 transition-colors pointer-events-auto"
                    />
                </div>
                <div>
                    <input
                        type="tel"
                        name="user_phone"
                        placeholder="Phone Number"
                        required
                        className="w-full p-4 bg-slate-900 border border-slate-700 text-white rounded focus:outline-none focus:border-amber-500 transition-colors pointer-events-auto"
                    />
                </div>
            </div>

            <div>
                <textarea
                    name="message"
                    placeholder="How can we help your business?"
                    required
                    rows="5"
                    className="w-full p-4 bg-slate-900 border border-slate-700 text-white rounded focus:outline-none focus:border-amber-500 transition-colors resize-none pointer-events-auto"
                ></textarea>
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full p-4 font-bold rounded-full transition-all duration-300 pointer-events-auto ${isSubmitting
                        ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                        : 'bg-amber-500 text-slate-900 hover:bg-amber-400 cursor-pointer'
                    }`}
            >
                {status}
            </button>
        </form>
    );
};

export default ContactForm;