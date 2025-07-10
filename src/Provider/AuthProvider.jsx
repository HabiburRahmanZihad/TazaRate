import { useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    onAuthStateChanged,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile,
} from "firebase/auth";
import { auth } from "../Firebase/Firebase.config";
import { AuthContext } from "./AuthContext";


const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = async (email, password) => {
        setLoading(true);
        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);
            return res.user; // Return just the user object
        } catch (error) {
            setLoading(false); // Only set loading false on error
            throw error;
        }
    };

    const signInUser = async (email, password) => {
        setLoading(true);
        try {
            const res = await signInWithEmailAndPassword(auth, email, password);
            return res.user; // Return just the user object
        } catch (error) {
            setLoading(false); // Only set loading false on error
            throw error;
        }
    };

    const signOutUser = async () => {
        setLoading(true);
        try {
            await signOut(auth);
            // Don't set loading false here - let onAuthStateChanged handle it
        } catch (error) {
            setLoading(false);
            throw error;
        }
    };

    const forgetPassword = async (email) => {
        // Don't set loading for password reset as it doesn't change auth state
        return sendPasswordResetEmail(auth, email);
    };

    const updateUserProfile = async (profile) => {
        // We do not toggle loading here because it's usually called inside other flows
        return updateProfile(auth.currentUser, profile);
    };

    const loginGoogle = async () => {
        setLoading(true);
        try {
            const provider = new GoogleAuthProvider();
            provider.addScope('email'); // Ensure email is requested
            provider.setCustomParameters({
                prompt: 'select_account', // Force account chooser
            });

            const res = await signInWithPopup(auth, provider);
            const user = res.user;

            // Try to extract email from user object
            const email =
                user.email ||
                user.providerData?.find((p) => p.providerId === 'google.com')?.email;

            if (!email) {
                throw new Error("No email received from Google authentication");
            }

            // Optionally: force refresh ID token to ensure email gets included
            await user.getIdToken(true);

            return { email, user };
        } catch (error) {
            console.error("Google login error:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser?.email) {
                setUser(currentUser);
            } else {
                const fallbackEmail = currentUser?.providerData?.[0]?.email;
                setUser(fallbackEmail ? { ...currentUser, email: fallbackEmail } : null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const userInfo = {
        user,
        setUser,
        loading,
        createUser,
        signInUser,
        signOutUser,
        forgetPassword,
        updateUserProfile,
        loginGoogle,
    };

    return <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;