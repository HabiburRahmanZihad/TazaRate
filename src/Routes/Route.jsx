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

export const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        children: [
            { index: true, element: <Home /> },
            { path: 'products', element: <AllProductsPage /> },
            { path: 'products/:id', element: <PrivateRoute><ProductDetailsPage /></PrivateRoute> },
            { path: '/payment/:id', element: <PrivateRoute><Payment /></PrivateRoute> },
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
            { index: true, element: <DashboardHome></DashboardHome> },
            { path: 'price-trends', element: <ViewPriceTrends></ViewPriceTrends> },
            { path: 'watchlist', element: <ManageWatchlist></ManageWatchlist> },
            { path: 'my-orders', element: <MyOrdersPage /> },

            // 🧑‍🌾 Vendor

            { path: 'add-product', element: <AddProduct></AddProduct> },
            { path: 'my-products', element: <MyProducts></MyProducts> },
            { path: 'add-ad', element: <AddAdvertisement></AddAdvertisement> },
            { path: 'my-ads', element: <MyAdvertisements></MyAdvertisements> },
            { path: 'update-product/:id', element: <UpdateProduct></UpdateProduct> },

            // 🛠 Admin
            { path: 'all-users', element: <AllUsers></AllUsers> },
            { path: 'all-products', element: <AllProducts></AllProducts> },
            { path: 'all-ads', element: <AllAdvertisementsAdmin></AllAdvertisementsAdmin>},
            { path: 'all-orders', element: <p>All Orders feature coming soon</p> },
        ]
    }
]);