import { createBrowserRouter } from 'react-router';
import RootLayout from '../Layout/RootLayout';
import Home from '../Pages/Home/Home';
import Signup from '../Components/Authentication/Signup/Signup';
import SignIn from '../Components/Authentication/Signin/SignIn';
import PrivateRoute from './PrivateRoute';
import DashboardLayout from '../Layout/DashboardLayout';
import DashboardHome from '../Pages/DashBoard/DashboardHome/DashboardHome';
import AddProduct from '../Pages/DashBoard/AddProduct/AddProduct';
import MyProducts from '../Pages/DashBoard/MyProducts/MyProducts';
import UpdateProduct from '../Pages/DashBoard/UpdateProduct/UpdateProduct';
import AddAdvertisement from '../Pages/DashBoard/AddAdvertisement/AddAdvertisement';
import MyAdvertisements from '../Pages/DashBoard/MyAdvertisements/MyAdvertisements';
import AllUsers from '../Pages/DashBoard/AllUsers/AllUsers';
import AllProducts from '../Pages/DashBoard/AllProducts/AllProducts';
import AllAdvertisementsAdmin from '../Pages/DashBoard/AllAdvertisementsAdmin/AllAdvertisementsAdmin';
import ViewPriceTrends from '../Pages/DashBoard/ViewPriceTrends/ViewPriceTrends';
import AllProductsPage from '../Pages/AllProductsPage/AllProductsPage';
import ProductDetailsPage from '../Pages/ProductDetailsPage/ProductDetailsPage';
import ManageWatchlist from '../Pages/DashBoard/ManageWatchlist/ManageWatchlist';
import Payment from '../Pages/Payment/Payment';
import MyOrdersPage from '../Pages/DashBoard/MyOrdersPage/MyOrdersPage';
import AllOrdersPage from '../Pages/DashBoard/AllOrdersPage/AllOrdersPage';
import AccessDenied from '../Pages/AccessDenied/AccessDenied';
import AdminRoute from './AdminRoute';
import VendorRoute from './VendorRoute';
import AboutUs from '../Pages/AboutUS/AboutUs';
import Contact from '../Pages/Contact/Contact';
import Terms from '../Pages/Terms/Terms';
import Privacy from '../Pages/Privacy/Privacy';
import Refund from '../Pages/Refund/Refund';
import Help from '../Pages/Help/Help';
import Error from '../Pages/Error/Error';
import DashboardError from '../Pages/DashBoard/DashboardError/DashboardError';
import AdminVendorRoute from './AdminVendorRoute';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        children: [
            { index: true, element: <Home /> },
            { path: 'products', element: <AllProductsPage /> },
            { path: 'products/:id', element: <PrivateRoute><ProductDetailsPage /></PrivateRoute> },
            { path: '/payment/:id', element: <PrivateRoute><Payment /></PrivateRoute> },
            { path: '/access-denied', element: <AccessDenied /> },
            { path: '/aboutUs', element: <AboutUs /> },
            { path: '/contact', element: <Contact /> },
            { path: '/terms', element: <Terms /> },
            { path: '/privacy', element: <Privacy /> },
            { path: '/refund', element: <Refund /> },
            { path: '/help', element: <Help /> },
            { path: '*', element: <Error /> },
        ],
    },

    // Routes that should NOT use RootLayout
    { path: '/signup', element: <Signup /> },
    { path: '/signin', element: <SignIn /> },


    // Dashboard routes
    {
        path: '/dashboard',
        element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
        children: [
            // 🧑‍💼 User
            { index: true, element: <PrivateRoute><DashboardHome /></PrivateRoute> },
            { path: 'price-trends', element: <PrivateRoute><ViewPriceTrends /></PrivateRoute> },
            { path: 'watchlist', element: <PrivateRoute><ManageWatchlist /></PrivateRoute> },
            { path: 'my-orders', element: <PrivateRoute><MyOrdersPage /></PrivateRoute> },

            // 🧑‍🌾 Vendor

            { path: 'add-product', element: <VendorRoute><AddProduct /></VendorRoute> },
            { path: 'my-products', element: <VendorRoute><MyProducts /></VendorRoute> },
            { path: 'update-product/:id', element: <AdminVendorRoute><UpdateProduct /></AdminVendorRoute> },
            { path: 'add-ad', element: <VendorRoute><AddAdvertisement /></VendorRoute> },
            { path: 'my-ads', element: <VendorRoute><MyAdvertisements /></VendorRoute> },

            // 🛠 Admin
            
            { path: 'all-users', element: <AdminRoute><AllUsers /></AdminRoute> },
            { path: 'all-products', element: <AdminRoute><AllProducts /></AdminRoute> },
            { path: 'all-ads', element: <AdminRoute><AllAdvertisementsAdmin /></AdminRoute> },
            { path: 'all-orders', element: <AdminRoute><AllOrdersPage /></AdminRoute> },


            { path: '*', element: <DashboardError /> },
        ]
    }
]);