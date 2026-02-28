import React, { useState } from 'react';

const ContactForm = () => {
    const [status, setStatus] = useState("Send Inquiry");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatus("Sending...");

        // Gather the data from the form
        const formData = new FormData(e.target);
        const data = {
            Name: formData.get("name"),
            Email: formData.get("email"),
            Message: formData.get("message"),
            Date: new Date().toLocaleString() // Automatically grabs the exact date and time
        };

        try {
            // Send it to your secure SheetDB link
         const response = await fetch('https://sheetdb.io/api/v1/YOUR_ACTUAL_LINK_HERE', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ data: [data] })
            });

            if (response.ok) {
                setStatus("Message Sent Successfully!");
                e.target.reset(); // Clears the input fields
            } else {
                setStatus("Error: Could not send.");
            }
        } catch (error) {
            console.error("Submission Error:", error);
            setStatus("Network Error. Try again.");
        } finally {
            setIsSubmitting(false);

            // Reset the button text after 3 seconds
            setTimeout(() => {
                setStatus("Send Inquiry");
            }, 3000);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full max-w-lg mx-auto">
            <div>
                <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    required
                    className="w-full p-4 bg-slate-900 border border-slate-700 text-white rounded focus:outline-none focus:border-amber-500 transition-colors"
                />
            </div>
            <div>
                <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    required
                    className="w-full p-4 bg-slate-900 border border-slate-700 text-white rounded focus:outline-none focus:border-amber-500 transition-colors"
                />
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
                className={`w-full p-4 font-bold rounded transition-all duration-300 ${isSubmitting
                        ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                        : 'bg-amber-500 text-slate-950 hover:bg-amber-400'
                    }`}
            >
                {status}
            </button>
        </form>
    );
};

export default ContactForm;
