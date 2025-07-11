import { motion } from 'framer-motion';
import {
    FaMapMarkerAlt,
    FaBriefcase,
    FaEnvelope,
    FaPhoneAlt,
    FaFacebookF,
    FaTwitter,
    FaYoutube,
    FaLinkedin
} from 'react-icons/fa';
import { Typewriter } from 'react-simple-typewriter';

const team = [
    {
        name: 'Habibur Rahman Zihad',
        role: 'Founder & CEO',
        location: 'Chattogram, Bangladesh',
        speciality: 'Market insights & product vision',
        email: 'zihad@tazarate.com',
        phone: '+880 1329 000000',
        socials: {
            facebook: 'https://www.facebook.com/habiburrahmanzihad.zihad',
            twitter: 'https://x.com/xihad_xihad',
            youtube: 'https://www.youtube.com/@xihadxonereplace',
            linkedin: 'https://linkedin.com/in/habiburrahmanzihad'
        },
        avatar: 'https://i.ibb.co/7xY4NYdf/Whats-App-Image-2025-06-09-at-13-14-46-80573a92.jpg'
    },
    {
        name: 'Saimon Uddin Imam',
        role: 'Community Manager & Content Creator',
        location: 'Dhaka, Bangladesh',
        speciality: 'Vendor coordination and quality control',
        email: 'saimon@tazarate.com',
        phone: '+880 1711 000000',
        socials: {
            facebook: '#', twitter: '#', youtube: '#', linkedin: '#'
        },
        avatar: 'https://i.ibb.co/bRMrj8zq/Saimon-1.jpg'
    },
    {
        name: 'Rohit Ahemed',
        role: 'Market Operations Lead',
        location: 'Dhaka, Bangladesh',
        speciality: 'Vendor coordination and quality control',
        email: 'rohit@tazarate.com',
        phone: '+880 1711 000000',
        socials: {
            facebook: '#', twitter: '#', youtube: '#', linkedin: '#'
        },
        avatar: 'https://i.ibb.co/KjTSPwGY/Rohitahemed-1.jpg'
    }
];

const AboutUs = () => {
    return (
        <section className="bg-base-200 py-16 px-4 lg:px-20" aria-labelledby="aboutus-title">

            {/* Title + Typewriter intro */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
                <h2 id="aboutus-title" className="text-4xl font-bold text-primary text-center">
                    About <span className="text-green-500">TazaRate</span>
                </h2>
                <motion.p
                    className="mt-6 text-lg text-neutral/80 max-w-3xl mx-auto"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                >
                    <Typewriter
                        words={[
                            'Track fresh bazaar prices daily. Compare across markets. Empower local vendors and consumers.'
                        ]}
                        loop={1}
                        cursor
                        cursorStyle="|"
                        typeSpeed={20}
                        deleteSpeed={0}
                        delaySpeed={1500}
                    />
                </motion.p>
            </motion.div>

            {/* Mission Quote */}
            <motion.p
                className="mt-6 italic text-lg text-secondary text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.5 }}
            >
                “Track Fresh, Shop Smart — Empowering local trade daily.”
            </motion.p>

            {/* Mission Summary */}
            <motion.div
                className="mt-8 max-w-2xl mx-auto text-neutral/80 text-center leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 2 }}
            >
                <p>
                    At TazaRate, our mission is to bring transparency and reliability to local market pricing in Bangladesh.
                    Vendors update daily prices, and users effortlessly compare rates across nearby bazaars, saving both time and money.
                </p>
            </motion.div>

            {/* Team Section */}
            <motion.div
                className="mt-16"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
            >
                <h3 className="text-2xl font-bold text-primary text-center mb-6">Meet Our Team</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {team.map((member, idx) => (
                        <motion.article
                            key={idx}
                            className="group bg-white p-6 rounded-lg shadow-md text-center flex flex-col items-center"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 + idx * 0.2 }}
                        >
                            <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-4 border-primary group-hover:scale-110 transition-transform duration-300">
                                <img
                                    src={member.avatar}
                                    alt={`Portrait of ${member.name}`}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <h4 className="text-lg font-semibold text-primary">{member.name}</h4>
                            <p className="text-sm italic text-neutral mb-4">{member.role}</p>

                            <ul className="text-sm text-neutral space-y-2 mb-4">
                                <li className="flex items-center justify-center gap-2">
                                    <FaMapMarkerAlt className="text-primary" /> {member.location}
                                </li>
                                <li className="flex items-center justify-center gap-2">
                                    <FaBriefcase className="text-primary" /> {member.speciality}
                                </li>
                                <li className="flex items-center justify-center gap-2">
                                    <FaEnvelope className="text-primary" />{' '}
                                    <a
                                        href={`mailto:${member.email}`}
                                        className="text-neutral hover:text-primary transition-colors"
                                    >
                                        {member.email}
                                    </a>
                                </li>
                                <li className="flex items-center justify-center gap-2">
                                    <FaPhoneAlt className="text-primary" /> {member.phone}
                                </li>
                            </ul>

                            <div className="flex justify-center space-x-4">
                                {member.socials.facebook && (
                                    <a
                                        href={member.socials.facebook}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label="Facebook"
                                        className="text-primary hover:text-blue-600 transition-colors"
                                    >
                                        <FaFacebookF />
                                    </a>
                                )}
                                {member.socials.twitter && (
                                    <a
                                        href={member.socials.twitter}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label="Twitter"
                                        className="text-primary hover:text-blue-400 transition-colors"
                                    >
                                        <FaTwitter />
                                    </a>
                                )}
                                {member.socials.youtube && (
                                    <a
                                        href={member.socials.youtube}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label="YouTube"
                                        className="text-primary hover:text-red-500 transition-colors"
                                    >
                                        <FaYoutube />
                                    </a>
                                )}
                                {member.socials.linkedin && (
                                    <a
                                        href={member.socials.linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label="LinkedIn"
                                        className="text-primary hover:text-blue-700 transition-colors"
                                    >
                                        <FaLinkedin />
                                    </a>
                                )}
                            </div>
                        </motion.article>
                    ))}
                </div>
            </motion.div>
        </section>
    );
};

export default AboutUs;