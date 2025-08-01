import { useEffect, useState } from "react";
import { Link } from "react-router";
import axios from "axios";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { motion, AnimatePresence } from "framer-motion";
import { FaTrashAlt, FaPlus } from "react-icons/fa";
import Loading from "../../../Components/Loader/Loading";

const ManageWatchlist = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const [watchlist, setWatchlist] = useState([]);
    const [loading, setLoading] = useState(true);
    const [removingId, setRemovingId] = useState(null);

    useEffect(() => {
        if (!user?.email) return;
        axios.get(`${import.meta.env.VITE_API_URL}/watchlist/${user.email}`)
            .then(res => setWatchlist(res.data))
            .catch(() => Swal.fire("Error", "Failed to load watchlist", "error"))
            .finally(() => setLoading(false));
    }, [user]);

    const handleRemove = async (productId) => {
        const result = await Swal.fire({
            title: "Remove this item?",
            text: "Are you sure you want to remove it from your watchlist?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#e11d48",
            confirmButtonText: "Yes, remove it!",
        });
        if (!result.isConfirmed) return;

        setRemovingId(productId);
        try {
            await axiosSecure.delete(`/watchlist`, { data: { userEmail: user.email, productId } });
            setWatchlist(prev => prev.filter(p => p._id !== productId));
            Swal.fire("Removed!", "Item removed from watchlist.", "success");
        } catch {
            Swal.fire("Error", "Failed to remove item.", "error");
        } finally {
            setRemovingId(null);
        }
    };

    if (loading) {
        return <Loading></Loading>;
    }

    return (
        <div className="max-w-6xl mx-auto px-6 py-12">
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-4xl font-bold text-center text-secondary mb-10"
            >
                Watchlist
            </motion.h1>

            {watchlist.length === 0 ? (
                <div className="text-center text-gray-500 space-y-4">
                    <p className="text-lg">Your watchlist is empty.</p>
                    <Link to="/products" className="btn btn-secondary inline-flex items-center gap-2">
                        <FaPlus /> Browse Products
                    </Link>
                </div>
            ) : (
                <div className="overflow-x-auto rounded-lg shadow-lg border border-gray-200">
                    <table className="min-w-full text-sm text-left">
                        <thead className="bg-gray-100 text-gray-700">
                            <tr>
                                <th className="px-5 py-3">Image</th>
                                <th className="px-5 py-3">Product</th>
                                <th className="px-5 py-3">Market</th>
                                <th className="px-5 py-3">Date</th>
                                <th className="px-5 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <AnimatePresence>
                                {watchlist.map((product, idx) => (
                                    <motion.tr
                                        key={product._id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ delay: idx * 0.03 }}
                                        className="border-b border-secondary/50 hover:bg-gray-50 transition-colors"
                                    >
                                        <td className="px-5 py-3">
                                            <img
                                                src={product.imageUrl}
                                                alt={product.itemName}
                                                className="w-12 h-12 object-cover rounded-lg shadow"
                                            />
                                        </td>
                                        <td className="px-5 py-3 font-medium">{product.itemName}</td>
                                        <td className="px-5 py-3">{product.marketName}</td>
                                        <td className="px-5 py-3">
                                            {new Date(product.date).toLocaleDateString()}
                                        </td>
                                        <td className="px-5 py-3 text-right  grid grid-cols-1 sm:grid-cols-2 gap-2">
                                            <Link to="/products" className="btn btn-sm btn-outline">
                                                <FaPlus className="mr-1" />
                                                Add More
                                            </Link>
                                            <button
                                                onClick={() => handleRemove(product._id)}
                                                disabled={removingId === product._id}
                                                className={`btn btn-sm btn-error inline-flex items-center gap-1 ${removingId === product._id ? "opacity-50" : ""
                                                    }`}
                                            >
                                                <FaTrashAlt />
                                                {removingId === product._id ? "Removing..." : "Remove"}
                                            </button>
                                        </td>
                                    </motion.tr>
                                ))}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ManageWatchlist;