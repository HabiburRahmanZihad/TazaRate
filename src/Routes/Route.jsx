import { createBrowserRouter } from 'react-router';
import RootLayout from '../Layout/RootLayout';
import Home from '../Pages/Home/Home';
import NotFound from '../Pages/Error/NotFound';
import Signup from '../Components/Authentication/Signup/Signup';

export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            { index: true, element: <Home /> },
            { path: "*", element: <NotFound></NotFound> }
        ],
    },
    {
        path: 'signup',
        element: <Signup></Signup>
    }
]);