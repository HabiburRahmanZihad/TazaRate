import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';
import { Typewriter } from 'react-simple-typewriter';
import Swal from 'sweetalert2';

const Contact = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const form = e.target;
        const name = form.name.value.trim();
        const email = form.email.value.trim();
        const message = form.message.value.trim();

        if (!name || !email || !message) {
            Swal.fire({
                icon: 'warning',
                title: 'Hold on!',
                text: 'Please fill out all fields.',
                confirmButtonColor: '#10b981'
            });
            setIsSubmitting(false);
            return;
        }

        Swal.fire({
            title: 'Sending...',
            didOpen: () => Swal.showLoading(),
            allowOutsideClick: false,
        });

        setTimeout(() => {
            Swal.fire({
                icon: 'success',
                title: 'Message Sent!',
                text: 'Thanks for reaching out. We’ll be in touch soon.',
                confirmButtonColor: '#10b981'
            });
            form.reset();
            setIsSubmitting(false);
        }, 1500);
    };

    return (
        <section className="bg-base-200 py-16 px-6 lg:px-20">

            <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Contact Info */}
                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                    className="space-y-8"
                >
                    <h2 className="text-3xl font-bold text-primary">
                        <Typewriter
                            words={['Let’s Connect']}
                            cursor
                            cursorStyle="_"
                            typeSpeed={60}
                            delaySpeed={500}
                        />
                    </h2>
                    <p className="text-neutral text-lg max-w-lg">
                        Got questions, feedback, or a media inquiry? We're happy to hear from you! Drop us a message or reach us directly.
                    </p>
                    <div className="space-y-4 text-base-400 text-sm">
                        <div className="flex items-center space-x-3">
                            <FaMapMarkerAlt className="text-primary w-5 h-5" />
                            <span>House 88, Road 7/A, Dhanmondi, Dhaka 1209</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <FaEnvelope className="text-primary w-5 h-5" />
                            <a href="mailto:info@tazarate.com" className="hover:text-primary">info@tazarate.com</a>
                        </div>
                        <div className="flex items-center space-x-3">
                            <FaPhoneAlt className="text-primary w-5 h-5" />
                            <span>+880-1329-453598</span>
                        </div>
                    </div>
                </motion.div>

                {/* Contact Form */}
                <motion.form
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, delay: 0.4 }}
                    className="bg-white rounded-lg shadow-lg border border-base-300 p-8 space-y-6"
                >
                    <div className="form-control">
                        <label htmlFor="name" className="label text-primary font-medium">Name</label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            className="input input-bordered w-full"
                            placeholder="Your name"
                            disabled={isSubmitting}
                            required
                        />
                    </div>

                    <div className="form-control">
                        <label htmlFor="email" className="label text-primary font-medium">Email</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            className="input input-bordered w-full"
                            placeholder="you@example.com"
                            disabled={isSubmitting}
                            required
                        />
                    </div>

                    <div className="form-control">
                        <label htmlFor="message" className="label text-primary font-medium">Message</label>
                        <textarea
                            id="message"
                            name="message"
                            className="textarea textarea-bordered w-full"
                            rows="5"
                            placeholder="How can we help you?"
                            disabled={isSubmitting}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className={`btn btn-primary w-full ${isSubmitting && 'btn-disabled'}`}
                    >
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                    </button>
                </motion.form>
            </div>
        </section>
    );
};

export default Contact;