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

const ViewPriceTrends = () => {
    const [products, setProducts] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(false);
    const axiosSecure = useAxiosSecure()

    // Fetch all approved products
    useEffect(() => {
        const fetchAllProducts = async () => {
            try {
                const res = await axiosSecure.get("/admin/products");
                const approvedOnly = res.data.filter(p => p.status === "approved");
                setProducts(approvedOnly);
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

    // Fetch product by ID
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

    const priceData = product?.prices?.map((entry) => ({
        date: entry.date,
        price: entry.price,
    })) || [];

    const trendChange = () => {
        const len = priceData.length;
        if (len < 2) return null;
        const change = priceData[len - 1].price - priceData[len - 2].price;
        const percentage = ((change / priceData[len - 2].price) * 100).toFixed(1);
        return change >= 0 ? `+${percentage}%` : `${percentage}%`;
    };

    return (
        <div className="max-w-6xl mx-auto p-4 md:p-6">
            <h2 className="text-2xl font-bold mb-6">📈 View Price Trends</h2>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                {/* Sidebar: Tracked Items */}
                <div className="md:col-span-1">
                    <div className="bg-base-100 shadow-md rounded p-4 space-y-2">
                        <p className="text-lg font-semibold">Tracked Items</p>
                        {products.map((item) => (
                            <button
                                key={item._id}
                                onClick={() => {
                                    setSelectedId(item._id);
                                    setLoading(true);
                                }}
                                className={`flex items-center gap-2 px-3 py-2 rounded-md w-full text-left hover:bg-orange-100 ${selectedId === item._id ? "bg-orange-200 font-semibold" : ""}`}
                            >
                                <span>🍅</span>
                                <span>{item.itemName}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Chart & Info */}
                <div className="md:col-span-4">
                    <div className="bg-base-100 shadow-md rounded p-6">
                        {loading || !product ? (
                            <div className="flex justify-center items-center h-60">
                                <span className="loading loading-spinner text-primary w-10 h-10"></span>
                            </div>
                        ) : (
                            <>
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <h3 className="text-xl font-semibold">{product.itemName}</h3>
                                        <p className="text-sm text-gray-500">
                                            {product.marketName} — Vendor: {product.vendorName}
                                        </p>
                                    </div>
                                    <div
                                        className={`badge text-white capitalize ${product.status === "approved"
                                            ? "bg-green-600"
                                            : "bg-yellow-600"
                                            }`}
                                    >
                                        {product.status}
                                    </div>
                                </div>

                                <ResponsiveContainer width="100%" height={300}>
                                    <LineChart
                                        data={priceData}
                                        margin={{ top: 10, right: 30, bottom: 0, left: 0 }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="date" />
                                        <YAxis />
                                        <Tooltip formatter={(value) => [`৳${value}`, "Price"]} />
                                        <Line
                                            type="monotone"
                                            dataKey="price"
                                            stroke="#3B82F6"
                                            activeDot={{ r: 8 }}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>

                                {trendChange() && (
                                    <p className="mt-4 text-sm font-medium text-green-600">
                                        Trend: {trendChange()} last 7 days
                                    </p>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewPriceTrends;