import { useForm } from 'react-hook-form';
import { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';
import { AuthContext } from '../../../Provider/AuthContext';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';

const SignIn = () => {
    const { signInUser, loginGoogle } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const onSubmit = async ({ email, password }) => {
        setLoading(true);
        try {
            // Email/password sign-in returns user object
            const user = await signInUser(email, password);

            const userInfo = {
                name: user.displayName || 'User',
                email: user.email,
                photoURL: user.photoURL,
                role: 'user',
                lastLogin: new Date().toISOString(),
            };

            // Post user to backend
            await axios.post(`${import.meta.env.VITE_API_URL}/users`, userInfo);

            Swal.fire({
                icon: 'success',
                title: 'Signed In!',
                text: 'Welcome back to TazaRate!',
                timer: 2000,
                showConfirmButton: false,
            });

            reset();
            navigate(from, { replace: true });
        } catch (error) {
            console.error('Sign In error:', error);

            let message = 'Invalid credentials. Please try again.';
            if (error.code === 'auth/user-not-found') {
                message = 'No account found for this email.';
            } else if (error.code === 'auth/wrong-password') {
                message = 'Wrong password. Please try again.';
            }

            Swal.fire({
                icon: 'error',
                title: 'Sign In Failed',
                text: message,
            });
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        setLoading(true);
        try {
            const user = await loginGoogle();

            // Defensive check to ensure email is available
            if (!user || !user.email) {
                throw new Error('No email found in Google account.');
            }

            const userInfo = {
                name: user.displayName || 'Google User',
                email: user.email, // <=== IMPORTANT: use top-level email, not providerData
                photoURL: user.photoURL,
                role: 'user',
                lastLogin: new Date().toISOString(),
            };

            await axios.post(`${import.meta.env.VITE_API_URL}/users`, userInfo);

            Swal.fire({
                icon: 'success',
                title: 'Welcome Back!',
                text: 'Signed in with Google.',
                timer: 2000,
                showConfirmButton: false,
            });

            navigate(from, { replace: true });
        } catch (error) {
            console.error('Google Sign-In error:', error);
            Swal.fire({
                icon: 'error',
                title: 'Google Sign-In Failed',
                text: error.message || 'Something went wrong.',
            });
        } finally {
            setLoading(false);
        }
    };



    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-base-100 p-6"
        >
            <div className="w-full max-w-md p-8 rounded-2xl shadow-2xl border border-base-300 bg-white/70 backdrop-blur">

                {/* Heading line */}
                <h1 className="text-2xl font-semibold text-center mb-4">
                    Sign in with{' '}
                    <Link to="/" className="text-primary font-bold underline hover:text-primary-focus">
                        TazaRate
                    </Link>
                </h1>

                <h2 className="text-3xl font-bold text-center text-primary mb-6 merriweather">
                    Welcome Back
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
                    {/* Email */}
                    <div>
                        <label className="block font-semibold mb-1">Email Address</label>
                        <input
                            type="email"
                            placeholder="you@example.com"
                            {...register('email', { required: 'Email is required' })}
                            className="input input-bordered w-full"
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block font-semibold mb-1">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="********"
                                {...register('password', { required: 'Password is required' })}
                                className="input input-bordered w-full pr-10"
                            />
                            <span
                                onClick={() => setShowPassword(prev => !prev)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="btn btn-primary w-full mt-4 shadow-md hover:shadow-lg transition-all"
                    >
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>

                {/* Sign Up link */}
                <p className="mt-4 text-center text-sm">
                    Don't have an account?{' '}
                    <Link to="/signup" className="text-primary font-semibold hover:underline">
                        Sign Up
                    </Link>
                </p>

                <div className="divider my-6">OR</div>

                <button
                    onClick={handleGoogleSignIn}
                    className="btn btn-outline w-full hover:border-primary"
                    disabled={loading}
                >
                    Continue with Google
                </button>
            </div>
        </motion.div>
    );

};

export default SignIn;