import { createBrowserRouter } from 'react-router';
import RootLayout from '../Layout/RootLayout';
import Home from '../Pages/Home/Home';
import NotFound from '../Pages/Error/NotFound';
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
            { path: '*', element: <NotFound /> },
        ],
    },

    // Routes that should NOT use RootLayout
    { path: '/signup', element: <Signup /> },
    { path: '/signin', element: <SignIn /> },


    // Dashboard routes
    {
        path: '/dashboard',
        element: (
            <PrivateRoute>
                <DashboardLayout />
            </PrivateRoute>
        ),
        children: [
            // 🧑‍💼 User
            { index: true, element: <PrivateRoute><DashboardHome></DashboardHome></PrivateRoute> },
            { path: 'price-trends', element: <PrivateRoute><ViewPriceTrends></ViewPriceTrends></PrivateRoute> },
            { path: 'watchlist', element: <PrivateRoute><ManageWatchlist></ManageWatchlist></PrivateRoute> },
            { path: 'my-orders', element: <PrivateRoute><MyOrdersPage /></PrivateRoute> },

            // 🧑‍🌾 Vendor

            { path: 'add-product', element: <VendorRoute><AddProduct></AddProduct></VendorRoute> },
            { path: 'my-products', element: <VendorRoute><MyProducts></MyProducts></VendorRoute> },
            { path: 'add-ad', element: <VendorRoute><AddAdvertisement></AddAdvertisement></VendorRoute> },
            { path: 'my-ads', element: <VendorRoute><MyAdvertisements></MyAdvertisements></VendorRoute> },
            { path: 'update-product/:id', element: <VendorRoute><UpdateProduct></UpdateProduct></VendorRoute> },

            // 🛠 Admin
            { path: 'all-users', element: <AdminRoute><AllUsers></AllUsers></AdminRoute> },
            { path: 'all-products', element: <AdminRoute><AllProducts></AllProducts></AdminRoute> },
            { path: 'all-ads', element: <AdminRoute><AllAdvertisementsAdmin></AllAdvertisementsAdmin></AdminRoute> },
            { path: 'all-orders', element: <AdminRoute><AllOrdersPage></AllOrdersPage></AdminRoute> },
        ]
    }
]);