import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiEye, FiEyeOff, FiImage, FiCheckCircle, FiXCircle } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { Link, useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../../../Provider/AuthContext';
import axios from 'axios';
import Swal from 'sweetalert2';
import uploadImageToImgbb from '../../../hooks/uploadImageToImgbb';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const SignUp = () => {
    const { register, handleSubmit, watch, setError, clearErrors, formState: { errors }, reset } = useForm();
    const { createUser, updateUserProfile, loginGoogle } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/';

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [photoPreview, setPhotoPreview] = useState(null);

    const password = watch('password');
    const confirmPassword = watch('confirmPassword');
    const profilePhoto = watch('profilePhoto');

    const [passwordCriteria, setPasswordCriteria] = useState({
        minLength: false,
        uppercase: false,
        lowercase: false,
        number: false,
        specialChar: false,
    });

    useEffect(() => {
        setPasswordCriteria({
            minLength: password?.length >= 8,
            uppercase: /[A-Z]/.test(password),
            lowercase: /[a-z]/.test(password),
            number: /[0-9]/.test(password),
            specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
        });
    }, [password]);

    useEffect(() => {
        if (profilePhoto && profilePhoto[0]) {
            setPhotoPreview(URL.createObjectURL(profilePhoto[0]));
            clearErrors('profilePhoto');
        }
    }, [profilePhoto, clearErrors]);

    useEffect(() => {
        if (confirmPassword && password !== confirmPassword) {
            setError('confirmPassword', { type: 'manual', message: 'Passwords do not match' });
        } else {
            clearErrors('confirmPassword');
        }
    }, [confirmPassword, password, setError, clearErrors]);

    const PasswordRequirement = ({ met, text }) => (
        <li className={`flex items-center transition-colors duration-300 ${met ? 'text-green-600' : 'text-gray-500'}`}>
            {met ? <FiCheckCircle className="mr-2 w-4 h-4" /> : <FiXCircle className="mr-2 w-4 h-4" />}
            <span>{text}</span>
        </li>
    );

    const onSubmit = async (data) => {
        const allCriteriaMet = Object.values(passwordCriteria).every(Boolean);
        if (!allCriteriaMet) {
            setError('password', { type: 'manual', message: 'Password does not meet all criteria.' });
            return;
        }

        if (!data.profilePhoto || data.profilePhoto.length === 0) {
            setError('profilePhoto', { type: 'manual', message: 'Profile photo is required.' });
            return;
        }

        if (data.profilePhoto[0].size > 2 * 1024 * 1024) {
            setError('profilePhoto', { type: 'manual', message: 'Profile photo must be less than 2MB.' });
            return;
        }

        try {
            await createUser(data.email, data.password);

            const imageUrl = await uploadImageToImgbb(data.profilePhoto[0]);

            await updateUserProfile({
                displayName: data.name,
                photoURL: imageUrl,
            });

            // Check if user already exists
            // const { data: existingUser } = await axios.get(`${import.meta.env.VITE_API_URL}/users?email=${encodeURIComponent(data.email)}`);


            const { data: existingUser } = await axiosSecure.get(`/users/${encodeURIComponent(data.email)}`);

            if (!existingUser?.exists) {
                const userInfo = {
                    name: data.name,
                    role: 'user',
                    email: data.email,
                    profilePhoto: imageUrl,
                    createdAt: new Date().toISOString(),
                    lastLogin: new Date().toISOString(),
                };
                // ✅ Save user to database via custom server
                await axios.post(`${import.meta.env.VITE_API_URL}/users`, userInfo);

                Swal.fire("✅ Success", "User registered successfully!", "success");
                reset();
                setPhotoPreview(null);
                navigate(from, { replace: true });
            }


        } catch (error) {
            console.error("Signup error:", error);

            let message = "An unexpected error occurred. Please try again.";
            if (error.code === "auth/email-already-in-use") {
                message = "This email is already in use. Try signing in instead.";
            } else if (axios.isAxiosError(error)) {
                message = error.response?.data?.message || message;
            }

            Swal.fire("❌ Signup Failed", message, "error");
            setError("email", { type: "manual", message });
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            const res = await loginGoogle();
            const firebaseUser = res.user;

            // Extract email
            const userEmail =
                firebaseUser.email ||
                firebaseUser.providerData?.[0]?.email ||
                (firebaseUser.reload && (await firebaseUser.reload(), firebaseUser.email));

            if (!userEmail) {
                throw new Error("No email found in Google account.");
            }

            const userInfo = {
                name: firebaseUser.displayName || 'No Name',
                email: userEmail,
                photoURL: firebaseUser.photoURL || '',
                role: 'user',
                createdAt: new Date().toISOString(),
                lastLogin: new Date().toISOString(),
            };

            // Try creating user
            await axios.post(`${import.meta.env.VITE_API_URL}/users`, userInfo);

            // Success (new user)
            Swal.fire({
                icon: 'success',
                title: 'Welcome!',
                text: `Signed in as ${userInfo.name}`,
                timer: 2000,
                showConfirmButton: false,
            });

            navigate(from, { replace: true });

        } catch (error) {
            // If user already exists — treat as success
            if (
                axios.isAxiosError(error) &&
                error.response?.status === 409 &&
                error.response?.data?.message === "User already exists."
            ) {
                Swal.fire({
                    icon: 'success',
                    title: 'Welcome Back!',
                    text: 'Signed in successfully.',
                    timer: 2000,
                    showConfirmButton: false,
                });
                return navigate(from, { replace: true });
            }

            // Handle other errors
            let message = "Something went wrong. Please try again.";
            if (error.code === "auth/popup-closed-by-user") {
                message = "You closed the sign-in popup.";
            } else if (error.code === "auth/network-request-failed") {
                message = "Network error. Please try again.";
            } else if (axios.isAxiosError(error)) {
                message = error.response?.data?.message || message;
            } else if (error.message) {
                message = error.message;
            }

            Swal.fire({
                icon: "error",
                title: "Google Sign-In Failed",
                text: message,
            });
        }
    };

    return (
        <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
            <div className="w-full max-w-xl p-6 lg:p-8">
                <div className="text-center mb-6">
                    <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-800 mb-2">Create an Account</h1>
                    <p className="text-gray-600 font-bold">
                        Register with <Link className='text-lime-600' to='/'>TazaRate</Link>
                    </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
                    {/* Name */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-2">Enter your Legal name</label>
                        <input
                            type="text"
                            id="name"
                            {...register('name', {
                                required: 'Name is required.',
                                minLength: {
                                    value: 4,
                                    message: 'Name must be at least 4 characters.',
                                }
                            })}
                            className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 transition-colors ${errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-lime-500'}`}
                            placeholder="Your full legal name"
                        />
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                    </div>

                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            {...register('email', {
                                required: 'Email is required.',
                                pattern: {
                                    value: /^\S+@\S+$/,
                                    message: 'Invalid email format.',
                                },
                            })}
                            className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 transition-colors ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-lime-500'}`}
                            placeholder="you@example.com"
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                    </div>

                    {/* Password */}
                    <div className="relative">
                        <label htmlFor="password" className="block text-sm font-bold text-gray-700 mb-2">Password</label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            {...register('password', { required: 'Password is required.' })}
                            className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 pr-12 transition-colors ${errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-lime-500'}`}
                            placeholder="Enter a secure password"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 top-7 pr-4 flex items-center text-gray-500 hover:text-gray-800"
                        >
                            {showPassword ? <FiEyeOff className="w-6 h-6" /> : <FiEye className="w-6 h-6" />}
                        </button>
                        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                    </div>

                    {/* Password Criteria */}
                    <ul className="text-sm space-y-1">
                        <PasswordRequirement met={passwordCriteria.minLength} text="At least 8 characters" />
                        <PasswordRequirement met={passwordCriteria.uppercase} text="Contains an uppercase letter" />
                        <PasswordRequirement met={passwordCriteria.lowercase} text="Contains a lowercase letter" />
                        <PasswordRequirement met={passwordCriteria.number} text="Contains a number" />
                        <PasswordRequirement met={passwordCriteria.specialChar} text="Contains a special character (!@#...)" />
                    </ul>

                    {/* Confirm Password */}
                    <div className="relative">
                        <label htmlFor="confirmPassword" className="block text-sm font-bold text-gray-700 mb-2">Confirm Password</label>
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            id="confirmPassword"
                            {...register('confirmPassword', {
                                required: 'Please confirm your password.',
                                validate: (value) => value === password || 'Passwords do not match.',
                            })}
                            className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 pr-12 transition-colors ${errors.confirmPassword ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-lime-500'}`}
                            placeholder="Re-enter your password"
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute inset-y-0 right-0 top-7 pr-4 flex items-center text-gray-500 hover:text-gray-800"
                        >
                            {showConfirmPassword ? <FiEyeOff className="w-6 h-6" /> : <FiEye className="w-6 h-6" />}
                        </button>
                        {errors.confirmPassword && (
                            <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>
                        )}
                    </div>

                    {/* Profile Photo */}
                    <div className="pb-6">
                        <label className="block text-sm font-bold text-gray-700 mb-2">Profile Photo</label>
                        <div className="mt-2 flex justify-center items-center">
                            <label htmlFor="profilePhoto" className={`relative cursor-pointer rounded-full h-32 w-32 flex items-center justify-center border-2 ${errors.profilePhoto ? 'border-red-500' : 'border-dashed border-gray-300'} hover:border-lime-500 transition-all duration-300`}>
                                {photoPreview ? (
                                    <img src={photoPreview} alt="Preview" className="h-full w-full object-cover rounded-full" />
                                ) : (
                                    <div className="text-gray-400 text-center">
                                        <FiImage className="mx-auto h-8 w-8" />
                                        <span className="text-xs">Upload Photo</span>
                                    </div>
                                )}
                                <input
                                    id="profilePhoto"
                                    type="file"
                                    accept="image/*"
                                    {...register('profilePhoto')}
                                    className="sr-only"
                                />
                            </label>
                        </div>
                        {errors.profilePhoto && <p className="text-red-500 text-xs mt-2 text-center">{errors.profilePhoto.message}</p>}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-lime-500 text-white font-bold py-3 px-4 rounded-md hover:bg-lime-600 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-opacity-50 transition-all duration-200 ease-in-out transform hover:scale-105"
                    >
                        Create Account
                    </button>
                </form>

                {/* Divider */}
                <div className="flex items-center my-6">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="mx-4 text-gray-500 text-sm">Or</span>
                    <div className="flex-grow border-t border-gray-300"></div>
                </div>

                {/* Google Button */}
                <button
                    onClick={handleGoogleSignIn}
                    type="button"
                    className="w-full flex items-center justify-center gap-4 bg-white border border-gray-300 rounded-md py-3 px-4 text-gray-700 font-bold hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50 transition-all duration-200 ease-in-out transform hover:scale-105"
                >
                    <FcGoogle className="w-5 h-5" />
                    Register with Google
                </button>

                <p className="text-center text-gray-600 text-sm mt-6">
                    Already have an account?{' '}
                    <Link to="/signin" className="text-green-600 hover:underline font-medium">
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    );
};
export default SignUp;