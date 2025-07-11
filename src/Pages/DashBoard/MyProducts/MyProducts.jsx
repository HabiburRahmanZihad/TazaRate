import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { Link } from "react-router";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { MdInventory, MdAddShoppingCart } from "react-icons/md";
import { FaTrash, FaEdit } from "react-icons/fa";

const MyProducts = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deletingId, setDeletingId] = useState(null);

    useEffect(() => {
        if (!user?.email) return;
        axiosSecure
            .get(`/products?vendorEmail=${user.email}`)
            .then(res => setProducts(res.data))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, [user, axiosSecure]);

    const handleDelete = async (id) => {
        const { isConfirmed } = await Swal.fire({
            title: "Delete this product?",
            text: "This action cannot be undone.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#dc2626",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Yes, delete!",
        });
        if (!isConfirmed) return;

        setDeletingId(id);
        try {
            const res = await axiosSecure.delete(`/products/${id}`);
            if (res.data.deletedCount > 0) {
                setProducts(prev => prev.filter(p => p._id !== id));
                Swal.fire("Deleted!", "Product removed.", "success");
            }
        } catch {
            Swal.fire("Error", "Could not delete product.", "error");
        } finally {
            setDeletingId(null);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center py-20">
                <div className="text-gray-400 text-lg animate-pulse">
                    Loading your products...
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-6 py-12">
            <motion.div
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex items-center justify-center gap-2 mb-10"
            >
                <MdInventory className="text-4xl text-secondary" />
                <h2 className="text-4xl font-bold text-secondary">My Products</h2>
            </motion.div>

            {products.length === 0 ? (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    className="text-center text-gray-500 space-y-4"
                >
                    <MdAddShoppingCart className="mx-auto text-6xl text-gray-300" />
                    <p className="text-lg">You haven’t added any products yet.</p>
                    <Link
                        to="/dashboard/add-product"
                        className="btn btn-primary inline-flex items-center gap-2"
                    >
                        <MdAddShoppingCart /> Add Product
                    </Link>
                </motion.div>
            ) : (
                <div className="overflow-x-auto rounded-lg shadow-lg border border-gray-200">
                    <table className="min-w-full text-sm text-left">
                        <thead className="bg-gray-100 text-gray-700">
                            <tr>
                                <th className="px-5 py-3">Item</th>
                                <th className="px-5 py-3">Price (৳)</th>
                                <th className="px-5 py-3">Market</th>
                                <th className="px-5 py-3">Date</th>
                                <th className="px-5 py-3">Status</th>
                                <th className="px-5 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <AnimatePresence>
                                {products.map((p, i) => (
                                    <motion.tr
                                        key={p._id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ delay: i * 0.04 }}
                                        className="border-b border-secondary/30 hover:bg-gray-50 transition-colors"
                                    >
                                        <td className="px-5 py-3 font-medium">{p.itemName}</td>
                                        <td className="px-5 py-3 text-green-600 font-semibold">
                                            ৳{p.pricePerUnit}
                                        </td>
                                        <td className="px-5 py-3">{p.marketName}</td>
                                        <td className="px-5 py-3">
                                            {new Date(p.date).toLocaleDateString()}
                                        </td>
                                        <td
                                            className={`px-5 py-3 capitalize ${p.status === "rejected"
                                                    ? "text-red-600 underline cursor-help"
                                                    : p.status === "approved"
                                                        ? "text-green-600"
                                                        : "text-yellow-500"
                                                }`}
                                            title={p.status === "rejected" ? p.rejectionReason : ""}
                                        >
                                            {p.status}
                                        </td>
                                        <td className="px-5 py-3 text-right space-x-2 grid grid-cols-1 sm:flex items-center justify-end gap-2">
                                            {p.status !== "rejected" && (
                                                <Link
                                                    to={`/dashboard/update-product/${p._id}`}
                                                    className="btn btn-sm btn-outline btn-info inline-flex items-center gap-1"
                                                >
                                                    <FaEdit /> Edit
                                                </Link>
                                            )}
                                            <button
                                                onClick={() => handleDelete(p._id)}
                                                disabled={deletingId === p._id}
                                                className={`btn btn-sm btn-outline btn-error inline-flex items-center gap-1 ${deletingId === p._id && "opacity-50 cursor-not-allowed"
                                                    }`}
                                            >
                                                <FaTrash />
                                                {deletingId === p._id ? "Deleting..." : "Delete"}
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

export default MyProducts;
