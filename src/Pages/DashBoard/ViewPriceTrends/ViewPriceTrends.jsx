import { useEffect, useState } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
} from "recharts";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { motion } from "framer-motion";

const ViewPriceTrends = () => {
    const [products, setProducts] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(false);
    const axiosSecure = useAxiosSecure();

    // Fetch approved products
    useEffect(() => {
        const fetchAllProducts = async () => {
            try {
                const res = await axiosSecure.get("/user/allproduct");
                setProducts(res.data);
            } catch (err) {
                console.error("Error fetching products", err);
            }
        };
        fetchAllProducts();
    }, [axiosSecure]);

    // Auto-select first product
    useEffect(() => {
        if (products.length && !selectedId) {
            setSelectedId(products[0]._id);
        }
    }, [products, selectedId]);

    // Fetch selected product data
    useEffect(() => {
        if (!selectedId) return;

        const fetchProduct = async () => {
            setLoading(true);
            try {
                const res = await axiosSecure.get(`/products/${selectedId}`);
                setProduct(res.data);
            } catch (err) {
                console.error("Error fetching product data", err);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [selectedId, axiosSecure]);

    const priceData =
        product?.prices?.map((entry) => ({
            date: entry.date,
            price: entry.price,
        })) || [];

    const trendChange = () => {
        const len = priceData.length;
        if (len < 2) return null;
        const change = priceData[len - 1].price - priceData[len - 2].price;
        const percentage = ((change / priceData[len - 2].price) * 100).toFixed(1);
        return change >= 0 ? `📈 +${percentage}%` : `📉 ${percentage}%`;
    };

    return (
        <div className="py-10 space-y-8">
            <h2 className="text-3xl font-extrabold text-center text-secondary">
                📊 Real-Time Price Trends
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {/* Sidebar */}
                <motion.div
                    className="md:col-span-1 bg-white shadow rounded-lg p-4 space-y-2 overflow-y-auto max-h-[500px]"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    <p className="md:text-lg font-semibold text-gray-700">🛒Tracked Items</p>
                    {products.map((item) => (
                        <button
                            key={item._id}
                            onClick={() => setSelectedId(item._id)}
                            className={`flex items-center gap-2 px-1 py-2 rounded-lg w-full text-left transition-all duration-200 hover:bg-orange-100 text-sm ${selectedId === item._id
                                ? "bg-orange-200 font-semibold text-orange-900"
                                : "text-gray-700"
                                }`}
                        >
                            <span>🧺</span>
                            <span className="truncate">{item.itemName}</span>
                        </button>
                    ))}
                </motion.div>

                {/* Chart Area */}
                <motion.div
                    className="md:col-span-4 bg-white shadow-lg rounded-lg p-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    {loading || !product ? (
                        <div className="flex justify-center items-center h-72">
                            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-secondary"></div>
                        </div>
                    ) : (
                        <>
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-2">
                                <div>
                                    <h3 className="text-2xl font-semibold text-gray-800">
                                        {product.itemName}
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        {product.marketName} — Vendor: {product.vendorName}
                                    </p>
                                </div>
                                <div
                                    className={`badge px-4 py-1 rounded-full text-white text-sm ${product.status === "approved"
                                        ? "bg-green-500"
                                        : "bg-yellow-500"
                                        }`}
                                >
                                    {product.status}
                                </div>
                            </div>

                            <div className="w-full h-[300px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={priceData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                                        <YAxis tick={{ fontSize: 12 }} />
                                        <Tooltip
                                            formatter={(value) => [`৳${value}`, "Price"]}
                                            labelStyle={{ fontWeight: 600 }}
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="price"
                                            stroke="#FB923C"
                                            strokeWidth={2.5}
                                            activeDot={{ r: 6 }}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>

                            {trendChange() && (
                                <div className="mt-4 text-sm font-medium text-center text-green-600">
                                    {trendChange()} over last update
                                </div>
                            )}
                        </>
                    )}
                </motion.div>
            </div>
        </div>
    );
};

export default ViewPriceTrends;