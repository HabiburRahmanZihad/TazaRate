import Marquee from "react-fast-marquee";

const companies = [
    {
        name: "Shwapno",
        logo: "https://markedium.com/wp-content/uploads/2023/03/2.png",
    },
    {
        name: "Chaldal",
        logo: "https://upload.wikimedia.org/wikipedia/en/d/de/Chaldal.com_logo.png",
    },
    {
        name: "Daraz",
        logo: "https://i.pinimg.com/736x/85/91/84/85918474f7e603c702f1fb839906d15b.jpg",
    },
    {
        name: "Aarong",
        logo: "https://i.pinimg.com/736x/49/85/21/498521ae69f0c0d8c760ec098fe673bd.jpg",
    },
    {
        name: "Meena Bazar",
        logo: "https://meenabazaronline.com/assets/main-logo.png",
    },
    {
        name: "Pickaboo",
        logo: "https://www.pickaboo.com/blog/wp-content/uploads/2023/11/Pickaboo-1024x538.jpg",
    },
    {
        name: "Evaly",
        logo: "https://futurestartup.com/wp-content/uploads/2018/12/Evaly-logo-01.jpg",
    },
    {
        name: "Othoba",
        logo: "https://othoba.com/Themes/Othoba/Content/images/logoOthoba.png",
    },
    {
        name: "PriyoShop",
        logo: "https://priyoshopretail.com/wp-content/uploads/2023/11/priyoshop-logo-transparent-bg-for-white-bg-1.png",
    },
    {
        name: "Foodpanda",
        logo: "https://download.logo.wine/logo/Foodpanda/Foodpanda-Logo.wine.png",
    },
    {
        name: "Uber Eats",
        logo: "https://logos-world.net/wp-content/uploads/2020/11/Uber-Eats-Logo.png",
    },
    {
        name: "Pathao Mart",
        logo: "https://pathao.com/wp-content/uploads/2019/02/Pathao-logo.svg",
    },
];


const SupportedCompanies = () => {
    return (
        <section className="py-10 sm:py-12 bg-base-200 rounded-2xl shadow-md">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary text-center mb-8 sm:mb-12">
                We Support These Companies
            </h2>

            <Marquee gradient={false} speed={50} pauseOnHover={true}>
                {companies.map((company, idx) => (
                    <div
                        key={idx}
                        className="mx-6 sm:mx-10 md:mx-12 flex flex-col items-center justify-center group"
                    >
                        <img
                            src={company.logo}
                            alt={company.name}
                            className="h-10 sm:h-12 md:h-16 object-contain filter grayscale group-hover:grayscale-0 transition duration-300"
                        />
                        <p className="text-xs sm:text-sm mt-2 opacity-70 text-center">
                            {company.name}
                        </p>
                    </div>
                ))}
            </Marquee>
        </section>
    );
};

export default SupportedCompanies;