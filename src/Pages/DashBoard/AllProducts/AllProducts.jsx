import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { Link } from 'react-router';

const AllProducts = () => {
    const axiosSecure = useAxiosSecure();
    const [rejectModal, setRejectModal] = useState(null);

    const { data: products = [], isLoading, isError, error, refetch } = useQuery({
        queryKey: ['all-products'],
        queryFn: async () => {
            try {
                const res = await axiosSecure.get('/admin/products');
                return res.data;
            } catch (err) {
                if (err.response?.status === 403) {
                    toast.error("Access denied: Admins only");
                } else {
                    toast.error("Failed to fetch products");
                }
                throw err;
            }
        }
    });

    const handleApprove = async (id) => {
        try {
            await axiosSecure.patch(`/products/${id}`, { status: 'approved' });
            toast.success('Product approved');
            refetch();
        } catch (err) {
            console.error(err);
            toast.error('Failed to approve');
        }
    };

    const handleReject = async (id, reason) => {
        try {
            await axiosSecure.patch(`/products/${id}`, {
                status: 'rejected',
                rejectionReason: reason,
            });
            toast.success('Product rejected');
            refetch();
        } catch (err) {
            console.error(err);
            toast.error('Failed to reject');
        }
    };

    const handleDelete = async (id) => {
        const confirm = window.confirm('Are you sure you want to delete this product?');
        if (!confirm) return;
        try {
            await axiosSecure.delete(`/products/${id}`);
            toast.success('Product deleted');
            refetch();
        } catch (err) {
            console.error(err);
            toast.error('Failed to delete');
        }
    };

    if (isLoading) return <div className="p-4">Loading products...</div>;
    if (isError) return <div className="p-4 text-red-500">Error loading products: {error.message}</div>;

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">📋 All Products</h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra">

                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Item</th>
                            <th>Vendor</th>
                            <th>Email</th>
                            <th>Market</th>
                            <th>Date</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Rejection Reason</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {products.map(product => (
                            <tr key={product._id}>
                                <td>
                                    <img
                                        src={product.imageUrl}
                                        alt={product.itemName}
                                        className="w-12 h-12 rounded"
                                    />
                                </td>
                                <td>{product.itemName}</td>
                                <td>{product.vendorName}</td>
                                <td>{product.vendorEmail}</td>
                                <td>{product.marketName}</td>
                                <td>{product.date}</td>
                                <td>৳{product.pricePerUnit}</td>
                                <td
                                    className={
                                        product.status === 'approved'
                                            ? 'text-green-500'
                                            : product.status === 'rejected'
                                            ? 'text-red-500'
                                            : 'text-yellow-500'
                                    }
                                >
                                    {product.status}
                                </td>
                                <td>{product.rejectionReason || '-'}</td>
                                <td className="flex flex-col gap-2">
                                    {product.status === 'pending' && (
                                        <>
                                            <button
                                                onClick={() => handleApprove(product._id)}
                                                className="btn btn-xs btn-success"
                                            >
                                                Approve
                                            </button>
                                            <button
                                                onClick={() => setRejectModal(product)}
                                                className="btn btn-xs btn-warning"
                                            >
                                                Reject
                                            </button>
                                        </>
                                    )}
                                    <Link
                                        to={`/dashboard/update-product/${product._id}`}
                                        className="btn btn-xs btn-info"
                                    >
                                        Update
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(product._id)}
                                        className="btn btn-xs btn-error"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>

            {/* Reject Modal */}
            {rejectModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
                        <h3 className="text-lg font-bold mb-4">Reject Product</h3>
                        <textarea
                            rows="4"
                            placeholder="Enter rejection reason..."
                            className="textarea textarea-bordered w-full mb-4"
                            onChange={(e) =>
                                setRejectModal(prev => ({ ...prev, reason: e.target.value }))
                            }
                        />
                        <div className="flex justify-end gap-2">
                            <button className="btn btn-sm" onClick={() => setRejectModal(null)}>
                                Cancel
                            </button>
                            <button
                                className="btn btn-sm btn-warning"
                                disabled={!rejectModal.reason?.trim()}
                                onClick={() => {
                                    handleReject(rejectModal._id, rejectModal.reason || 'No reason provided');
                                    setRejectModal(null);
                                }}
                            >
                                Confirm Reject
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AllProducts;