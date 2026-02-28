import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

const ContactForm = () => {
    const form = useRef();
    const [status, setStatus] = useState("Send Inquiry");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatus("Sending...");

        emailjs.sendForm(
            import.meta.env.VITE_EMAILJS_SERVICE_ID,
            import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
            form.current,
            import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        )
            .then((result) => {
                setStatus("Message Sent Successfully!");
                form.current.reset();

                setTimeout(() => {
                    setStatus("Send Inquiry");
                }, 3000);
            }, (error) => {
                console.error("EmailJS Error:", error.text);
                setStatus("Error. Please try again.");

                setTimeout(() => {
                    setStatus("Send Inquiry");
                }, 3000);
            })
            .finally(() => {
                setIsSubmitting(false);
            });
    };

    return (
        <form ref={form} onSubmit={handleSubmit} className="flex flex-col gap-5 w-full max-w-lg mx-auto">
            <div>
                <input
                    type="text"
                    name="user_name"
                    placeholder="Full Name"
                    required
                    className="w-full p-4 bg-slate-900 border border-slate-700 text-white rounded focus:outline-none focus:border-amber-500 transition-colors"
                />
            </div>
            <div>
                <input
                    type="email"
                    name="user_email"
                    placeholder="Email Address"
                    required
                    className="w-full p-4 bg-slate-900 border border-slate-700 text-white rounded focus:outline-none focus:border-amber-500 transition-colors"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                    <input
                        type="text"
                        name="user_country"
                        placeholder="Country"
                        required
                        className="w-full p-4 bg-slate-900 border border-slate-700 text-white rounded focus:outline-none focus:border-amber-500 transition-colors"
                    />
                </div>
                <div>
                    <input
                        type="tel"
                        name="user_phone"
                        placeholder="Phone Number"
                        required
                        className="w-full p-4 bg-slate-900 border border-slate-700 text-white rounded focus:outline-none focus:border-amber-500 transition-colors"
                    />
                </div>
            </div>

            <div>
                <textarea
                    name="message"
                    placeholder="How can we help your business?"
                    required
                    rows="5"
                    className="w-full p-4 bg-slate-900 border border-slate-700 text-white rounded focus:outline-none focus:border-amber-500 transition-colors resize-none"
                ></textarea>
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full p-4 font-bold rounded-full transition-all duration-300 ${isSubmitting
                        ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                        : 'bg-amber-500 text-slate-900 hover:bg-amber-400'
                    }`}
            >
                {status}
            </button>
        </form>
    );
};

export default ContactForm;
