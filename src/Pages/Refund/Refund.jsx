import { motion } from 'framer-motion';
import {
    FaUndo,
    FaMoneyBillAlt,
    FaClock,
    FaExclamationTriangle,
    FaQuestionCircle,
} from 'react-icons/fa';

const refundData = [
    {
        icon: <FaUndo className="text-2xl text-secondary" />,
        title: 'Eligibility for Refund',
        description:
            'Refunds are available within 7 days of purchase, provided the service or content has not been significantly used, downloaded, or accessed.',
    },
    {
        icon: <FaMoneyBillAlt className="text-2xl text-secondary" />,
        title: 'How Refunds Are Issued',
        description:
            'Approved refunds will be sent back to your original payment method within 5–10 business days, depending on your bank’s processing times.',
    },
    {
        icon: <FaClock className="text-2xl text-secondary" />,
        title: 'Non-Refundable Scenarios',
        description:
            'We may deny refunds if requests come after 7 days, or if the content has been heavily used or downloaded. Abuse or terms violation may also void eligibility.',
    },
    {
        icon: <FaExclamationTriangle className="text-2xl text-secondary" />,
        title: 'Exceptional Cases',
        description:
            'We may still grant partial or full refunds in unique cases like double charges, technical errors, or accidental purchases. Please reach out with proof.',
    },
    {
        icon: <FaQuestionCircle className="text-2xl text-secondary" />,
        title: 'How to Request a Refund',
        description: (
            <>
                Email us at{' '}
                <a
                    href="mailto:refund@tazarate.com"
                    className="text-primary underline hover:text-secondary transition"
                >
                    refund@tazarate.com
                </a>{' '}
                with your order ID, purchase date, and a brief explanation. We'll get back to you within 48 hours.
            </>
        ),
    },
];

const Refund = () => {
    return (
        <section className="min-h-screen bg-gradient-to-b from-base-100 to-base-200 py-20 px-6 md:px-12 lg:px-28">
            <motion.div
                className="container mx-auto max-w-6xl"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
            >
                <header className="mb-14 text-center">
                    <h1 className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary mb-4">
                        Refund Policy
                    </h1>
                    <p className="text-neutral/70 max-w-2xl mx-auto text-lg">
                        We want you to feel confident in your purchase. Our refund policy ensures you're protected, informed, and heard.
                    </p>
                </header>

                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {refundData.map((item, index) => (
                        <motion.div
                            key={index}
                            className="rounded-xl bg-white/80 dark:bg-white/5 border border-base-300 backdrop-blur-md shadow-lg p-6 space-y-4 transition hover:shadow-2xl"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <div className="flex items-center gap-3">
                                {item.icon}
                                <h3 className="text-xl font-bold text-neutral">{item.title}</h3>
                            </div>
                            <p className="text-neutral/80 text-sm leading-relaxed">{item.description}</p>
                        </motion.div>
                    ))}
                </div>

                <p className="text-center text-sm text-base-400 mt-20">
                    Last updated: July 2025
                </p>
            </motion.div>
        </section>
    );
};

export default Refund;