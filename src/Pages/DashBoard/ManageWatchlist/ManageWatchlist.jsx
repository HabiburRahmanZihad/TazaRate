import { useEffect, useState } from "react";
import { Link } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";


const ManageWatchlist = () => {
    const { user } = useAuth();
    const [watchlist, setWatchlist] = useState([]);
    const [loading, setLoading] = useState(true);
    const [removingId, setRemovingId] = useState(null); // ✅ for loading state
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        if (!user?.email) return;

        axios.get(`${import.meta.env.VITE_API_URL}/watchlist/${user.email}`)
            .then(res => setWatchlist(res.data))
            .catch(() => toast.error("Failed to load watchlist"))
            .finally(() => setLoading(false));
    }, [user]);

    const handleRemove = (productId) => {
        const confirm = window.confirm("Are you sure you want to remove this item from your watchlist?");
        if (!confirm) return;

        setRemovingId(productId); // ✅ Show loading

        axiosSecure.delete(`/watchlist`, {
            data: { userEmail: user.email, productId }
        })
            .then(() => {
                toast.success("Removed from watchlist");
                setWatchlist(prev => prev.filter(p => p._id !== productId));
            })
            .catch(() => toast.error("Failed to remove item"))
            .finally(() => setRemovingId(null)); // ✅ Reset loading
    };

    if (loading) return <div className="text-center py-10">Loading...</div>;

    return (
        <div className="max-w-4xl mx-auto px-4 py-10">
            <h1 className="text-2xl font-bold mb-6">⭐ Your Watchlist</h1>

            {watchlist.length === 0 ? (
                <div className="text-center text-gray-500">
                    No items in your watchlist.
                    <div className="mt-4">
                        <Link to="/products" className="btn btn-primary">➕ Add Products</Link>
                    </div>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table w-full border">
                        <thead>
                            <tr className="bg-gray-100 text-sm">
                                <th>🖼️</th>
                                <th>Product</th>
                                <th>Market</th>
                                <th>Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {watchlist.map((product) => (
                                <tr key={product._id}>
                                    <td>
                                        <img
                                            src={product.imageUrl}
                                            alt={product.itemName}
                                            className="w-12 h-12 object-cover rounded"
                                        />
                                    </td>
                                    <td>{product.itemName}</td>
                                    <td>{product.marketName}</td>
                                    <td>{new Date(product.date).toLocaleDateString()}</td>
                                    <td className="flex gap-2">
                                        <Link
                                            to="/products"
                                            className="btn btn-sm btn-outline"
                                        >
                                            ➕ Add More
                                        </Link>
                                        <button
                                            className={`btn btn-sm btn-error ${removingId === product._id ? "opacity-50 cursor-not-allowed" : ""}`}
                                            onClick={() => handleRemove(product._id)}
                                            disabled={removingId === product._id}
                                        >
                                            {removingId === product._id ? "Removing..." : "❌ Remove"}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ManageWatchlist;