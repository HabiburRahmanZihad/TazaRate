import { motion } from 'framer-motion';

const testimonials = [
    {
        text: "TazaRate helps me update my daily prices easily. Customers now trust me more since they know I’m transparent.",
        image: "https://randomuser.me/api/portraits/women/1.jpg",
        name: "Rina Akhter",
        role: "Vegetable Vendor – Karwan Bazar",
    },
    {
        text: "I used to call 3–4 vendors daily. Now I just open TazaRate and compare prices instantly. It’s a lifesaver!",
        image: "https://randomuser.me/api/portraits/men/2.jpg",
        name: "Mokbul Hossain",
        role: "Local Shopper – Jatrabari",
    },
    {
        text: "Since joining TazaRate, I’ve seen more buyers come to my stall. They like that my prices are verified.",
        image: "https://randomuser.me/api/portraits/women/3.jpg",
        name: "Sultana Begum",
        role: "Fruit Seller – Mohammadpur",
    },
    {
        text: "Tracking price trends helps me stock smarter and earn better margins. TazaRate made it simple.",
        image: "https://randomuser.me/api/portraits/men/4.jpg",
        name: "Farid Uddin",
        role: "Wholesale Supplier – Shyambazar",
    },
    {
        text: "TazaRate gives small businesses like mine a voice. I feel more connected with buyers every day.",
        image: "https://randomuser.me/api/portraits/women/5.jpg",
        name: "Nusrat Jahan",
        role: "Home-Based Seller – Uttara",
    },
    {
        text: "As a market committee member, this tool helps us maintain fair pricing. Transparency has improved a lot.",
        image: "https://randomuser.me/api/portraits/men/6.jpg",
        name: "Habib Rahman",
        role: "Market Admin – Mirpur 1",
    },
    {
        text: "Buyers used to bargain all the time. Now they come prepared and trust the listed price. Less hassle!",
        image: "https://randomuser.me/api/portraits/men/7.jpg",
        name: "Tariqul Islam",
        role: "Fish Vendor – Kaptan Bazar",
    },
    {
        text: "TazaRate is my daily go-to before shopping. It saves me both time and money!",
        image: "https://randomuser.me/api/portraits/women/8.jpg",
        name: "Sharmin Sultana",
        role: "Housewife – Dhanmondi",
    },
    {
        text: "This platform gave my small grocery store visibility online. I even got a new customer from another area!",
        image: "https://randomuser.me/api/portraits/men/9.jpg",
        name: "Rafiq Mia",
        role: "Grocery Shop Owner – Badda",
    },
];

const cardVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 50 },
    visible: (i) => ({
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            delay: i * 0.15,
            duration: 0.7,
            ease: [0.17, 0.67, 0.83, 0.67], // spring-like smooth ease
        },
    }),
};



const Testimonials = () => (
    <section className="bg-base-100 py-16">
        <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary mb-10">
                What People Say About TazaRate
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {testimonials.map((t, i) => (
                    <motion.div
                        key={i}
                        className="bg-base-200 p-6 rounded-xl shadow-md flex flex-col items-center text-center transition-transform hover:scale-115"
                        variants={cardVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        custom={i}
                    >
                        <img
                            src={t.image}
                            alt={`${t.name} profile`}
                            className="w-18 h-18 rounded-full border-2 border-secondary mb-4 object-cover p-1"
                        />
                        <p className="text-neutral italic mb-4">“{t.text}”</p>
                        <h4 className="text-sm font-semibold text-secondary">{t.name}</h4>
                        <p className="text-xs text-neutral/60">{t.role}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
);

export default Testimonials;