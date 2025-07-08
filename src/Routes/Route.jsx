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

export const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        children: [
            { index: true, element: <Home /> },
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
            { path: 'price-trends', element: <p>Price Trends feature coming soon</p> },
            { path: 'watchlist', element: <p>Watchlist Manager feature coming soon</p> },
            { path: 'my-orders', element: <p>My Orders feature coming soon</p> },

            // 🧑‍🌾 Vendor

            { path: 'add-product', element: <AddProduct></AddProduct> },
            { path: 'my-products', element: <MyProducts></MyProducts> },
            { path: 'add-ad', element: <p>Add Advertisement feature coming soon</p> },
            { path: 'my-ads', element: <p>My Advertisements feature coming soon</p> },

            // 🛠 Admin
            { path: 'all-users', element: <p>All Users feature coming soon</p> },
            { path: 'all-products', element: <p>All Products feature coming soon</p> },
            { path: 'all-ads', element: <p>All Advertisements feature coming soon</p> },
            { path: 'all-orders', element: <p>All Orders feature coming soon</p> },
        ]
    }
]);