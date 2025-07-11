import { motion } from 'framer-motion';

const Terms = () => {
    return (
        <section className="bg-base-200 py-16 px-6">

            <motion.div
                className="container mx-auto max-w-4xl text-neutral"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
            >
                <h1 className="text-4xl font-bold text-primary mb-8">Terms & Conditions</h1>

                <p className="mb-6">
                    Welcome to <strong>TazaRate</strong>. By accessing or using our website, you agree to be bound by these terms and conditions. Please read them carefully before using the service.
                </p>

                <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">1. Acceptance of Terms</h2>
                <p className="mb-4">
                    By accessing or using any part of our platform, you agree to comply with and be legally bound by these Terms. If you do not agree to these Terms, do not use TazaRate.
                </p>

                <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">2. Use of the Platform</h2>
                <p className="mb-4">
                    You may use TazaRate only for lawful purposes. You must not misuse the platform by knowingly introducing viruses, or attempting unauthorized access to our services.
                </p>

                <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">3. Intellectual Property</h2>
                <p className="mb-4">
                    All content, branding, and designs on TazaRate are protected by copyright and intellectual property laws. You may not use our content without permission.
                </p>

                <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">4. User Responsibilities</h2>
                <p className="mb-4">
                    You are responsible for the accuracy of the data you submit. Misuse of services or submission of false content may result in termination of access.
                </p>

                <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">5. Limitation of Liability</h2>
                <p className="mb-4">
                    TazaRate shall not be liable for any indirect or consequential damages arising out of the use or inability to use the service.
                </p>

                <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">6. Changes to Terms</h2>
                <p className="mb-4">
                    We may update these Terms occasionally. Continued use of TazaRate after changes means you accept the revised terms.
                </p>

                <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">7. Contact</h2>
                <p className="mb-4">
                    If you have any questions about these Terms & Conditions, feel free to contact us at{" "}
                    <a href="mailto:legal@tazarate.com" className="text-primary hover:underline">legal@tazarate.com</a>.
                </p>

                <p className="text-sm text-base-400 mt-12">Last updated: July 2025</p>
            </motion.div>
        </section>
    );
};

export default Terms;