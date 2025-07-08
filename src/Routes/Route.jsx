import { createBrowserRouter } from 'react-router';
import RootLayout from '../Layout/RootLayout';
import Home from '../Pages/Home/Home';
import NotFound from '../Pages/Error/NotFound';
import Signup from '../Components/Authentication/Signup/Signup';
import SignIn from '../Components/Authentication/Signin/SignIn';

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

]);