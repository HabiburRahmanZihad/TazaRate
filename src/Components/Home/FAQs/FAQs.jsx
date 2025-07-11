import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaQuestionCircle, FaPlus, FaMinus } from 'react-icons/fa';

const faqs = [
    {
        q: "How often are product prices updated?",
        a: "Prices are updated daily by vendors and local field agents to reflect the latest market rates."
    },
    {
        q: "Is TazaRate free to use?",
        a: "Yes! You can browse and compare prices without any cost."
    },
    {
        q: "How can I register as a vendor?",
        a: "You can contact the TazaRate support team through the vendor registration form or visit our local office."
    },
    {
        q: "Can I compare prices between multiple markets?",
        a: "Yes, TazaRate allows users to compare item prices across nearby markets in real-time."
    },
    {
        q: "How reliable is the price data?",
        a: "Our field agents verify prices daily and vendors are held accountable through ratings and moderation."
    },
    {
        q: "Does TazaRate work on mobile devices?",
        a: "Absolutely! TazaRate is mobile-friendly and accessible on any browser or device."
    }
];

const FAQs = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleFAQ = (i) => {
        setActiveIndex(activeIndex === i ? null : i);
    };

    return (
        <section className="bg-base-200 py-16 rounded-xl">
            <div className="container mx-auto max-w-3xl px-4">
                <h2 className="text-3xl md:text-4xl font-bold text-neutral text-center mb-10">
                    Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                    {faqs.map((faq, i) => (
                        <div
                            key={i}
                            className="bg-base-100 p-5 rounded-xl shadow"
                        >
                            <div className="flex justify-between items-start cursor-pointer" onClick={() => toggleFAQ(i)}>
                                <div className="flex items-start gap-3">
                                    <FaQuestionCircle className="text-primary mt-1" />
                                    <h3 className="text-lg font-semibold text-primary">{faq.q}</h3>
                                </div>
                                <button className="text-secondary text-xl">
                                    {activeIndex === i ? <FaMinus /> : <FaPlus />}
                                </button>
                            </div>

                            <AnimatePresence>
                                {activeIndex === i && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <p className="text-sm text-neutral mt-4">{faq.a}</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQs;