import { motion } from 'framer-motion';
import { FaQuestionCircle, FaUserShield, FaCog, FaMoneyCheckAlt, FaHandsHelping, FaEnvelopeOpenText } from 'react-icons/fa';

const helpTopics = [
    {
        icon: <FaQuestionCircle className="text-primary text-xl" />,
        title: 'General FAQs',
        description: 'Find answers to common questions about how TazaRate works, account setup, and more.',
    },
    {
        icon: <FaUserShield className="text-primary text-xl" />,
        title: 'Account & Security',
        description: 'Learn how to manage your account settings, change passwords, and protect your data.',
    },
    {
        icon: <FaCog className="text-primary text-xl" />,
        title: 'Using TazaRate',
        description: 'Get detailed guidance on how to browse, rate, and submit content effectively.',
    },
    {
        icon: <FaMoneyCheckAlt className="text-primary text-xl" />,
        title: 'Billing & Payments',
        description: 'Need help with invoices, payment methods, or subscriptions? We’ve got you covered.',
    },
    {
        icon: <FaHandsHelping className="text-primary text-xl" />,
        title: 'Refund & Cancellation',
        description: 'Read our policy and process for refund requests and how to cancel subscriptions.',
    },
    {
        icon: <FaEnvelopeOpenText className="text-primary text-xl" />,
        title: 'Contact Support',
        description: (
            <>
                Can’t find what you’re looking for? Email us anytime at{' '}
                <a
                    href="mailto:support@tazarate.com"
                    className="text-primary font-medium underline hover:text-secondary transition"
                >
                    support@tazarate.com
                </a>
                .
            </>
        ),
    },
];

const Help = () => {
    return (
        <section className="bg-base-200 py-20 px-6 md:px-12 lg:px-28">
            <motion.div
                className="container mx-auto max-w-6xl"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
            >
                <header className="text-center mb-14">
                    <h1 className="text-5xl font-extrabold text-primary mb-4">Help Center</h1>
                    <p className="text-lg text-neutral/80 max-w-2xl mx-auto">
                        Need assistance? We’re here to help. Explore common questions, technical guidance, and support options for your TazaRate journey.
                    </p>
                </header>

                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {helpTopics.map((topic, index) => (
                        <motion.div
                            key={index}
                            className="bg-white/90 dark:bg-white/5 rounded-xl border border-base-300 p-6 shadow-lg hover:shadow-2xl backdrop-blur-md transition"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <div className="flex items-start gap-3 mb-3">
                                {topic.icon}
                                <h3 className="text-lg font-semibold text-neutral">{topic.title}</h3>
                            </div>
                            <p className="text-sm text-neutral/80 leading-relaxed">{topic.description}</p>
                        </motion.div>
                    ))}
                </div>

                <p className="text-sm text-base-400 mt-20 text-center">Last updated: July 2025</p>
            </motion.div>
        </section>
    );
};

export default Help;