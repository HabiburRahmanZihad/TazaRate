import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const AllOrdersPage = () => {
    const axiosSecure = useAxiosSecure();

    const { data: orders = [], isLoading, error } = useQuery({
        queryKey: ['allOrders'],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin/orders');
            return res.data;
        }
    });

    if (isLoading) return <p className="text-center mt-10">Loading orders...</p>;
    if (error) return <p className="text-center mt-10 text-red-500">Failed to load orders</p>;

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">📋 All Orders (Admin)</h2>
            {orders.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200">
                        <thead>
                            <tr className="bg-gray-100 text-left">
                                <th className="p-3 border">Product Name</th>
                                <th className="p-3 border">User Email</th>
                                <th className="p-3 border">Market</th>
                                <th className="p-3 border">Vendor</th>
                                <th className="p-3 border">Price (৳)</th>
                                <th className="p-3 border">Paid Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr key={order._id} className="hover:bg-gray-50">
                                    <td className="p-3 border">{order.productName}</td>
                                    <td className="p-3 border">{order.userEmail}</td>
                                    <td className="p-3 border">{order.marketName}</td>
                                    <td className="p-3 border">{order.vendorName || '-'}</td>
                                    <td className="p-3 border">{order.price}</td>
                                    <td className="p-3 border">
                                        {new Date(order.paidAt).toLocaleDateString()}
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