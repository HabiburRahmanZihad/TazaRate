import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { Link } from "react-router";
import { AuthContext } from "../../../Provider/AuthContext";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyOrdersPage = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const { data: orders = [], isLoading, error } = useQuery({
        queryKey: ['myOrders', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments?email=${user.email}`);
            return res.data;
        },
    });

    if (isLoading) return <p className="text-center mt-10">Loading orders...</p>;
    if (error) return <p className="text-center mt-10 text-red-500">Failed to load orders</p>;

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">🛒 My Orders</h2>

            {orders.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200">
                        <thead>
                            <tr className="bg-gray-100 text-left">
                                <th className="p-3 border">Product Name</th>
                                <th className="p-3 border">Market Name</th>
                                <th className="p-3 border">Price (৳)</th>
                                <th className="p-3 border">Date</th>
                                <th className="p-3 border">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr key={order._id} className="hover:bg-gray-50">
                                    <td className="p-3 border">{order.productName}</td>
                                    <td className="p-3 border">{order.marketName}</td>
                                    <td className="p-3 border">{order.price}</td>
                                    <td className="p-3 border">
                                        {new Date(order.paidAt).toLocaleDateString()}
                                    </td>
                                    <td className="p-3 border">
                                        <Link
                                            to={`/products/${order.productId}`}
                                            className="text-blue-600 hover:underline"
                                        >
                                            🔍 View Details
                                        </Link>
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

export default MyOrdersPage;