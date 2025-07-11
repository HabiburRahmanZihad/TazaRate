import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';
import useAuth from '../../../hooks/useAuth';
import { FcGoogle } from 'react-icons/fc';

const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: i => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.1 },
    }),
};

const SignIn = () => {
    const { signInUser, loginGoogle, forgetPassword } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors },
        reset,
    } = useForm();

    const onSubmit = async ({ email, password }) => {
        setLoading(true);
        try {
            const user = await signInUser(email, password);

            const userInfo = {
                name: user.displayName || 'User',
                email: user.email,
                profilePhoto: user.photoURL,
                role: 'user',
                createdAt: new Date().toISOString(),
                lastLogin: new Date().toISOString(),
            };

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
            let message = 'Invalid credentials. Please try again.';
            if (error.code === 'auth/user-not-found') message = 'No account found for this email.';
            else if (error.code === 'auth/wrong-password') message = 'Wrong password. Please try again.';

            Swal.fire({ icon: 'error', title: 'Sign In Failed', text: message });
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        setLoading(true);
        try {
            const user = await loginGoogle();
            if (!user || !user.email) throw new Error('No email found in Google account.');

            const userInfo = {
                name: user.displayName || 'Google User',
                email: user.email,
                profilePhoto: user.photoURL,
                role: 'user',
                createdAt: new Date().toISOString(),
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
            Swal.fire({
                icon: 'error',
                title: 'Google Sign-In Failed',
                text: error.message || 'Something went wrong.',
            });
        } finally {
            setLoading(false);
        }
    };

    const handleForgotPassword = async () => {
        const email = getValues('email');
        if (!email) {
            return Swal.fire({
                icon: 'warning',
                title: 'Email Required',
                text: 'Please enter your email to reset password.',
            });
        }

        try {
            await forgetPassword(email);
            Swal.fire({
                icon: 'success',
                title: 'Reset Email Sent',
                text: 'Check your inbox for a password reset link.',
            });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Reset Failed',
                text: error.message || 'Try again later.',
            });
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen flex items-center justify-center bg-base-200 p-6 border"
        >
            <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                className="w-full max-w-md p-8 rounded-2xl shadow-xl border border-primary bg-white/80 backdrop-blur"
            >
                <motion.h1 variants={fadeInUp} custom={0} className="text-2xl font-semibold text-center mb-4">
                    Sign in with{' '}
                    <Link to="/" className="text-primary font-bold underline hover:text-primary-focus">
                        TazaRate
                    </Link>
                </motion.h1>

                <motion.h2
                    variants={fadeInUp}
                    custom={0.1}
                    className="text-3xl font-bold text-center text-primary mb-6 merriweather"
                >
                    Welcome Back
                </motion.h2>

                <motion.form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-5"
                    noValidate
                    variants={fadeInUp}
                    custom={0.2}
                >
                    {/* Email */}
                    <div className="space-y-1">
                        <label className="font-medium text-sm">Email</label>
                        <input
                            type="email"
                            placeholder="you@example.com"
                            {...register('email', { required: 'Email is required' })}
                            className="w-full px-4 py-3 bg-gray-100 rounded-md text-sm focus:ring-2 focus:ring-primary focus:outline-none border border-primary"
                        />
                        {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
                    </div>

                    {/* Password */}
                    <div className="space-y-1">
                        <label className="font-medium text-sm">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="********"
                                {...register('password', { required: 'Password is required' })}
                                className="w-full px-4 py-3 bg-gray-100 rounded-md text-sm pr-10 focus:ring-2 focus:ring-primary focus:outline-none border border-primary"
                            />
                            <span
                                onClick={() => setShowPassword(prev => !prev)}
                                className="absolute right-3 top-3.5 cursor-pointer text-gray-500"
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                        {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}

                        <div className="text-right mt-1">
                            <button
                                type="button"
                                onClick={handleForgotPassword}
                                className="text-xs text-primary hover:underline"
                            >
                                Forgot password?
                            </button>
                        </div>
                    </div>

                    {/* Submit */}
                    <motion.button
                        type="submit"
                        disabled={loading}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="w-full py-3 bg-primary text-white rounded-md font-semibold shadow-sm hover:bg-primary-dark transition duration-200 ease-in-out"
                    >
                        {loading ? 'Signing in...' : 'Sign In'}
                    </motion.button>
                </motion.form>

                <motion.p
                    variants={fadeInUp}
                    custom={0.5}
                    className="mt-5 text-center text-sm text-gray-600"
                >
                    Don’t have an account?{' '}
                    <Link to="/signup" className="text-primary font-medium hover:underline">
                        Sign Up
                    </Link>
                </motion.p>

                <motion.div variants={fadeInUp} custom={0.6} className="divider my-6">
                    OR
                </motion.div>

                <motion.button
                    onClick={handleGoogleSignIn}
                    disabled={loading}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    variants={fadeInUp}
                    custom={0.7}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white border border-gray-300 rounded-md shadow-sm text-gray-700 hover:bg-gray-50 transition duration-200 ease-in-out"
                >
                    <FcGoogle className="w-5 h-5" /> Continue with Google
                </motion.button>
            </motion.div>
        </motion.div>
    );
};

export default SignIn;