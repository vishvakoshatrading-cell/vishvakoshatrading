import React, { useState } from 'react';
import { T } from '../theme';

/**
 * PartnerForm Component
 * - Secure submission via Web3Forms API
 * - Built-in spam protection via Honeypot field
 * - Premium Tailwind CSS styling
 */
const PartnerForm = () => {
    // Form field states
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        country: '',
        phone: '',
        message: '',
        consent: false,
    });

    // Honeypot field state (Hidden from users)
    const [botTrap, setBotTrap] = useState('');

    // UI States
    const [status, setStatus] = useState({
        submitting: false,
        success: false,
        error: null,
    });

    // Handle input changes
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    // Form submission handler
    const handleSubmit = async (e) => {
        e.preventDefault();

        // 1. Spam Honeypot Check
        if (botTrap !== '') {
            console.warn('Spam detected. Submission blocked.');
            return;
        }

        setStatus({ submitting: true, success: false, error: null });

        try {
            // 2. Package data for Web3Forms
            const data = new FormData();
            data.append('access_key', import.meta.env.VITE_WEB3FORMS_KEY);
            data.append('name', formData.name);
            data.append('email', formData.email);
            data.append('country', formData.country);
            data.append('phone', formData.phone);
            data.append('message', formData.message);
            data.append('subject', 'New Partnership Inquiry - Vishvakosha Trading');
            data.append('from_name', 'Vishvakosha Trading Website');

            // 3. POST to Web3Forms API
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: data,
            });

            const result = await response.json();

            if (result.success) {
                setStatus({ submitting: false, success: true, error: null });
                // Reset form fields
                setFormData({
                    name: '',
                    email: '',
                    country: '',
                    phone: '',
                    message: '',
                    consent: false,
                });
            } else {
                throw new Error(result.message || 'Submission failed');
            }
        } catch (err) {
            console.error('Submission error:', err);
            setStatus({ submitting: false, success: false, error: err.message });
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto bg-white p-8 sm:p-12 rounded-2xl shadow-xl border border-slate-100">
            <div className="mb-8">
                <h2 className="text-3xl font-bold tracking-tight text-slate-900">Partner With Us</h2>
                <p className="mt-2 text-slate-500">Complete the form below and our team will get in touch shortly.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Honeypot Field (Hidden) */}
                <input
                    type="text"
                    name="bot_trap"
                    value={botTrap}
                    onChange={(e) => setBotTrap(e.target.value)}
                    style={{ display: 'none' }}
                    tabIndex="-1"
                    autoComplete="off"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Full Name */}
                    <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-semibold text-slate-700 uppercase tracking-wider">
                            Full Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="John Doe"
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none transition-all text-slate-900"
                        />
                    </div>

                    {/* Email Address */}
                    <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-semibold text-slate-700 uppercase tracking-wider">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="john@example.com"
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none transition-all text-slate-900"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Country */}
                    <div className="space-y-2">
                        <label htmlFor="country" className="text-sm font-semibold text-slate-700 uppercase tracking-wider">
                            Country
                        </label>
                        <input
                            type="text"
                            id="country"
                            name="country"
                            required
                            value={formData.country}
                            onChange={handleChange}
                            placeholder="Your Country"
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none transition-all text-slate-900"
                        />
                    </div>

                    {/* Contact Number */}
                    <div className="space-y-2">
                        <label htmlFor="phone" className="text-sm font-semibold text-slate-700 uppercase tracking-wider">
                            Contact Number
                        </label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            required
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="+1 (555) 000-0000"
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none transition-all text-slate-900"
                        />
                    </div>
                </div>

                {/* Message */}
                <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-semibold text-slate-700 uppercase tracking-wider">
                        Message
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        required
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us about your requirements..."
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none transition-all text-slate-900 resize-none"
                    ></textarea>
                </div>

                {/* Consent Checkbox */}
                <div className="flex items-start bg-slate-50 p-4 rounded-lg border border-slate-100">
                    <div className="flex items-center h-5">
                        <input
                            id="consent"
                            name="consent"
                            type="checkbox"
                            required
                            checked={formData.consent}
                            onChange={handleChange}
                            className="w-4 h-4 text-slate-900 border-slate-300 rounded focus:ring-slate-900 cursor-pointer"
                        />
                    </div>
                    <div className="ml-3 text-sm">
                        <label htmlFor="consent" className="font-medium text-slate-600 cursor-pointer">
                            I agree to be contacted via phone, email, or WhatsApp.
                        </label>
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={status.submitting}
                    className="w-full py-4 px-6 bg-slate-900 hover:bg-slate-800 text-[#D4AF37] font-bold text-sm uppercase tracking-[0.2em] rounded-lg transition-all transform active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-slate-200"
                    style={{ color: T.accent }}
                >
                    {status.submitting ? 'Sending Inquiry...' : 'Send Inquiry'}
                </button>

                {/* Status Messages */}
                {status.success && (
                    <div className="mt-4 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm font-medium animate-in fade-in slide-in-from-top-1">
                        ✓ Thank you! Your inquiry has been sent successfully.
                    </div>
                )}
                {status.error && (
                    <div className="mt-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm font-medium animate-in fade-in slide-in-from-top-1">
                        ✕ Error: {status.error}. Please try again.
                    </div>
                )}
            </form>
        </div>
    );
};

export default PartnerForm;
