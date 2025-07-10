import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Link } from "react-router";
import useAuth from "../../../hooks/useAuth";

const MyProducts = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user?.email) {
            axiosSecure.get(`/products?vendorEmail=${user.email}`)
                .then(res => {
                    setProducts(res.data);
                    setLoading(false);
                })
                .catch(err => {
                    console.error("Failed to load products", err);
                    setLoading(false);
                });
        }
    }, [user, axiosSecure]);

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then(result => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/products/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            setProducts(products.filter(p => p._id !== id));
                            Swal.fire('Deleted!', 'Your product has been removed.', 'success');
                        }
                    });
            }
        });
    };

    if (loading) return <p className="text-center py-10">Loading your products...</p>;

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">🧾 My Products</h2>
            <div className="overflow-x-auto">
                <table className="table w-full border">
                    <thead>
                        <tr className="bg-base-200 text-left">
                            <th>Item</th>
                            <th>Price</th>
                            <th>Market</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="text-center py-4">No products found.</td>
                            </tr>
                        ) : (
                            products.map(product => (
                                <tr key={product._id}>
                                    <td>{product.itemName}</td>
                                    <td>৳{product.pricePerUnit}</td>
                                    <td>{product.marketName}</td>
                                    <td>{new Date(product.date).toLocaleDateString()}</td>
                                    <td
                                        className={`capitalize ${
                                            product.status === 'rejected' ? 'text-red-500 underline cursor-help' : ''
                                        }`}
                                        title={
                                            product.status === 'rejected'
                                                ? product.rejectionReason || 'No reason provided'
                                                : ''
                                        }
                                    >
                                        {product.status}
                                    </td>
                                    <td className="space-x-2">
                                        {product.status !== 'rejected' && (
                                            <Link
                                                to={`/dashboard/update-product/${product._id}`}
                                                className="btn btn-sm btn-outline btn-info"
                                            >
                                                Update
                                            </Link>
                                        )}
                                        <button
                                            onClick={() => handleDelete(product._id)}
                                            className="btn btn-sm btn-outline btn-error"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyProducts;