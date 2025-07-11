import { motion } from 'framer-motion';
import { FaShieldAlt, FaUserSecret, FaLock, FaCookieBite, FaSyncAlt } from 'react-icons/fa';

const Privacy = () => {
    return (
        <section className="bg-base-200 py-20 px-6 lg:px-28">

            <motion.div
                className="container mx-auto max-w-5xl text-neutral"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
            >
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-extrabold text-primary mb-4">Privacy Policy</h1>
                    <p className="text-lg text-neutral/80">
                        Your privacy is our promise. Here's how we protect and manage your personal data at <strong>TazaRate</strong>.
                    </p>
                </div>

                <div className="space-y-12 text-base leading-relaxed">
                    {/* Section 1 */}
                    <div>
                        <h2 className="text-2xl font-bold flex items-center gap-2 text-primary">
                            <FaUserSecret className="text-lg" /> What We Collect
                        </h2>
                        <p className="mt-2">
                            When you interact with TazaRate, we may collect your name, email, location, or feedback—only what’s necessary to improve your experience.
                        </p>
                    </div>

                    {/* Section 2 */}
                    <div>
                        <h2 className="text-2xl font-bold flex items-center gap-2 text-primary">
                            <FaLock className="text-lg" /> How We Use It
                        </h2>
                        <p className="mt-2">
                            We use your information to personalize your experience, send updates, and improve our services. No spam. No nonsense. Just value.
                        </p>
                    </div>

                    {/* Section 3 */}
                    <div>
                        <h2 className="text-2xl font-bold flex items-center gap-2 text-primary">
                            <FaShieldAlt className="text-lg" /> Security First
                        </h2>
                        <p className="mt-2">
                            Your data is encrypted and stored securely. We implement technical and organizational safeguards to prevent unauthorized access.
                        </p>
                    </div>

                    {/* Section 4 */}
                    <div>
                        <h2 className="text-2xl font-bold flex items-center gap-2 text-primary">
                            <FaCookieBite className="text-lg" /> Cookies? Minimal and Essential
                        </h2>
                        <p className="mt-2">
                            We use only essential cookies to make the site function properly and enhance usability. You can adjust preferences via your browser.
                        </p>
                    </div>

                    {/* Section 5 */}
                    <div>
                        <h2 className="text-2xl font-bold flex items-center gap-2 text-primary">
                            <FaSyncAlt className="text-lg" /> Policy Updates
                        </h2>
                        <p className="mt-2">
                            We may occasionally update this policy to reflect changes in technology or legal requirements. You’ll always find the latest version right here.
                        </p>
                    </div>

                    {/* Section 6 */}
                    <div>
                        <h2 className="text-2xl font-bold text-primary mt-8 mb-2">📬 Contact Us</h2>
                        <p>
                            Have questions about our Privacy Policy? Reach out at{' '}
                            <a
                                href="mailto:privacy@tazarate.com"
                                className="text-primary font-medium underline hover:text-secondary transition"
                            >
                                privacy@tazarate.com
                            </a>
                        </p>
                    </div>
                </div>

                <p className="text-sm text-base-400 mt-16 text-center">Last updated: July 2025</p>
            </motion.div>
        </section>
    );
};

export default Privacy;