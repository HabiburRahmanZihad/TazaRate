import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

const PAGE_SIZE = 12;

const AllProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [sortBy, setSortBy] = useState("createdAt"); // default sort field
    const [order, setOrder] = useState("desc");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);

    const navigate = useNavigate();
    const API = `${import.meta.env.VITE_API_URL}/public/products`;

    const fetchProducts = useCallback(async () => {
        try {
            setLoading(true);
            const params = {
                page,
                limit: PAGE_SIZE,
                sortBy,
                order,
                startDate,
                endDate,
                search: searchQuery.trim(),
            };
            const res = await axios.get(API, { params });
            setProducts(res.data.products);
            setTotalCount(res.data.total);
        } catch (err) {
            console.error("❌ Error fetching products:", err);
        } finally {
            setLoading(false);
        }
    }, [API, page, sortBy, order, startDate, endDate, searchQuery]);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const totalPages = Math.ceil(totalCount / PAGE_SIZE);

    const clearFilters = () => {
        setStartDate("");
        setEndDate("");
        setSearchQuery("");
        setPage(1);
        setSortBy("createdAt");
        setOrder("desc");
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-6">
            <h2 className="text-2xl font-bold mb-6">🛍️ All Market Products</h2>

            {/* Filters & Sort */}
            <div className="flex flex-wrap items-end gap-4 mb-6">
                <div>
                    <label className="label-text">Start Date</label>
                    <input
                        type="date"
                        className="input input-bordered input-sm"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                </div>
                <div>
                    <label className="label-text">End Date</label>
                    <input
                        type="date"
                        className="input input-bordered input-sm"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </div>
                <div>
                    <label className="label-text">Sort By</label>
                    <select
                        className="select select-bordered select-sm"
                        value={`${sortBy}_${order}`}
                        onChange={(e) => {
                            const [sb, o] = e.target.value.split("_");
                            setSortBy(sb);
                            setOrder(o);
                        }}
                    >
                        <option value="createdAt_desc">🕒 Latest</option>
                        <option value="pricePerUnit_asc">💵 Price: Low → High</option>
                        <option value="pricePerUnit_desc">💵 Price: High → Low</option>
                    </select>
                </div>
                <div className="flex-1">
                    <label className="label-text">🔍 Search</label>
                    <input
                        type="text"
                        placeholder="Product or Market"
                        className="input input-bordered input-sm w-full"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <button onClick={clearFilters} className="btn btn-sm btn-secondary mt-2">
                    Clear Filters
                </button>
            </div>

            {/* Products Grid */}
            {loading ? (
                <div className="text-center py-20 font-medium">Loading products...</div>
            ) : products.length === 0 ? (
                <div className="text-center text-red-500 font-medium">No products found.</div>
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {products.map((product) => (
                            <div key={product._id} className="card bg-base-100 shadow hover:shadow-lg transition">
                                <figure>
                                    <img src={product.imageUrl} alt={product.itemName} className="h-48 w-full object-cover" />
                                </figure>
                                <div className="card-body p-4 space-y-1">
                                    <h3 className="text-lg font-semibold">{product.itemName}</h3>
                                    <p className="text-sm text-gray-600">৳{product.pricePerUnit}</p>
                                    <p className="text-sm">{product.date}</p>
                                    <p className="text-sm">{product.marketName}</p>
                                    <p className="text-sm">{product.vendorName}</p>
                                    <button onClick={() => navigate(`/products/${product._id}`)} className="btn btn-sm btn-primary mt-2">
                                        View Details
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex justify-center mt-6 space-x-2">
                            <button
                                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                                disabled={page === 1}
                                className="btn btn-sm btn-outline"
                            >
                                Prev
                            </button>
                            <span className="btn btn-sm">
                                {page} / {totalPages}
                            </span>
                            <button
                                onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                                disabled={page === totalPages}
                                className="btn btn-sm btn-outline"
                            >
                                Next
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default AllProductsPage;