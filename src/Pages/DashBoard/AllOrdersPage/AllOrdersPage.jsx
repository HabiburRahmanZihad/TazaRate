import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { MdReceipt } from "react-icons/md";

const AllOrdersPage = () => {
    const axiosSecure = useAxiosSecure();

    const { data: orders = [], isLoading, error } = useQuery({
        queryKey: ['allOrders'],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin/orders');
            return res.data;
        }
    });

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            {/* Page Title */}
            <div className="flex items-center gap-4 mb-10">
                <MdReceipt className="text-2xl text-secondary" />
                <h2 className="text-2xl font-bold text-secondary">
                    Admin Order Management
                </h2>
            </div>

            {/* Loading/Error States */}
            {isLoading ? (
                <div className="text-center text-xl text-gray-500 py-20 animate-pulse">
                    Loading orders...
                </div>
            ) : error ? (
                <div className="text-center text-xl text-red-600 py-20 font-semibold">
                    🚫 Failed to load orders. Please try again.
                </div>
            ) : orders.length === 0 ? (
                <div className="text-center py-20 text-gray-500">
                    <p className="text-2xl font-semibold">📭 No orders found</p>
                    <p className="text-md mt-2">Looks like there haven’t been any transactions yet.</p>
                </div>
            ) : (
                <div className="bg-white/90 backdrop-blur-lg shadow-2xl rounded-2xl overflow-x-auto border border-gray-200">
                    <table className="min-w-full text-lg text-left text-neutral font-medium">
                        <thead className="bg-secondary text-white text-md">
                            <tr>
                                <th className="px-6 py-5">🛒 Product</th>
                                <th className="px-6 py-5">📧 Buyer Email</th>
                                <th className="px-6 py-5">🏪 Market</th>
                                <th className="px-6 py-5">👤 Vendor</th>
                                <th className="px-6 py-5">💰 Price (৳)</th>
                                <th className="px-6 py-5">📅 Paid On</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr
                                    key={order._id}
                                    className="border-t border-secondary/30 hover:bg-gray-50 transition-all duration-200 ease-in-out"
                                >
                                    <td className="px-6 py-4">{order.productName}</td>
                                    <td className="px-6 py-4">{order.userEmail}</td>
                                    <td className="px-6 py-4">{order.marketName}</td>
                                    <td className="px-6 py-4">
                                        {order.vendorName || (
                                            <span className="text-gray-400 italic">N/A</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 font-bold text-neutral-800">
                                        ৳ {order.price}
                                    </td>
                                    <td className="px-6 py-4">
                                        {new Date(order.paidAt).toLocaleDateString(undefined, {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                        })}
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

export default AllOrdersPage;