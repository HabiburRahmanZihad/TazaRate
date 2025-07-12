import { Outlet, useLocation } from 'react-router';
import { useEffect } from 'react';
import Footer from '../Components/Shared/Footer/Footer';
import Navbar from '../Components/Shared/Navbar/Navbar';
import ScrollToTop from '../hooks/ScrollToTop';



const Root = () => {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    return (
        <div className="flex flex-col min-h-screen bg-base-100">
            <ScrollToTop />
            <Navbar />

            <div className="flex-grow w-full container mx-auto px-2 py-6">
                <Outlet />
            </div>

            <Footer />
        </div>
    );
};

export default Root;