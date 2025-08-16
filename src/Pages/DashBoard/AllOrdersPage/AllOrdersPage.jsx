import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { MdReceipt } from "react-icons/md";
import Loading from "../../../Components/Loader/Loading";
import Error from "../../Error/Error";
import NoFound from "../../../Components/NoFound/NoFound";

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
                <Loading />
            ) : error ? (
                <Error />
            ) : orders.length === 0 ? (
                <NoFound
                    type="order"
                    title="No orders found"
                    message="Looks like there haven’t been any transactions yet."
                />
            ) : (
                <div className="bg-white/90 backdrop-blur-lg shadow-2xl rounded-2xl overflow-x-auto border border-gray-200">
                    <table className="min-w-full text-sm md:text-base text-left text-neutral font-medium">
                        <thead className="bg-secondary text-white text-xs md:text-md">
                            <tr>
                                <th className="px-4 md:px-6 py-3 md:py-5 whitespace-nowrap">🛒 Product</th>
                                <th className="px-4 md:px-6 py-3 md:py-5 whitespace-nowrap">📧 Buyer Email</th>
                                <th className="px-4 md:px-6 py-3 md:py-5 whitespace-nowrap">🏪 Market</th>
                                <th className="px-4 md:px-6 py-3 md:py-5 whitespace-nowrap">👤 Vendor</th>
                                <th className="px-4 md:px-6 py-3 md:py-5 whitespace-nowrap">💰 Price (৳)</th>
                                <th className="px-4 md:px-6 py-3 md:py-5 whitespace-nowrap">📅 Paid On</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr
                                    key={order._id}
                                    className="border-t border-secondary/30 hover:bg-gray-50 transition-all duration-200 ease-in-out"
                                >
                                    <td className="px-4 md:px-6 py-3 md:py-4 break-words">{order.productName}</td>
                                    <td className="px-4 md:px-6 py-3 md:py-4 break-words">{order.userEmail}</td>
                                    <td className="px-4 md:px-6 py-3 md:py-4">{order.marketName}</td>
                                    <td className="px-4 md:px-6 py-3 md:py-4">
                                        {order.vendorName || (
                                            <span className="text-gray-400 italic">N/A</span>
                                        )}
                                    </td>
                                    <td className="px-4 md:px-6 py-3 md:py-4 font-bold text-neutral-800">
                                        ৳ {order.price}
                                    </td>
                                    <td className="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap">
                                        {new Date(order.paidAt).toLocaleDateString(undefined, {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
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