import { useEffect, useState, useCallback, useRef } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { FaSearch, FaCalendarAlt, FaMapMarkerAlt, FaUserTag, FaMoneyBillWave } from "react-icons/fa";
import Loading from "../../Components/Loader/Loading";
import NoFound from "../../Components/NoFound/NoFound";

const PAGE_SIZE = 32;

const AllProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [filters, setFilters] = useState({
        sortBy: "createdAt",
        order: "desc",
        startDate: "",
        endDate: "",
        searchQuery: "",
    });
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    const API = `${import.meta.env.VITE_API_URL}/public/products`;

    const isMounted = useRef(true);
    const [debouncedSearch, setDebouncedSearch] = useState(filters.searchQuery);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(filters.searchQuery);
        }, 500);

        return () => clearTimeout(handler);
    }, [filters.searchQuery]);

    useEffect(() => {
        setPage(1);
    }, [filters.sortBy, filters.order, filters.startDate, filters.endDate, debouncedSearch]);

    const fetchProducts = useCallback(async () => {
        setLoading(true);
        setError(null);
        const source = axios.CancelToken.source();

        try {
            const res = await axios.get(API, {
                cancelToken: source.token,
                params: {
                    page,
                    limit: PAGE_SIZE,
                    sortBy: filters.sortBy,
                    order: filters.order,
                    startDate: filters.startDate || undefined,
                    endDate: filters.endDate || undefined,
                    search: debouncedSearch.trim() || undefined,
                },
            });

            if (!isMounted.current) return;

            if (res.data && Array.isArray(res.data.products)) {
                setProducts(res.data.products);
                setTotalCount(res.data.total || 0);
            } else {
                setProducts([]);
                setTotalCount(0);
                setError("Invalid data format received.");
            }
        } catch (err) {
            if (!axios.isCancel(err)) {
                console.error("Error fetching products:", err);
                if (isMounted.current) setError("Failed to load products. Please try again.");
            }
        } finally {
            if (isMounted.current) setLoading(false);
        }

        return () => {
            source.cancel("Component unmounted");
        };
    }, [API, page, filters.sortBy, filters.order, filters.startDate, filters.endDate, debouncedSearch]);

    useEffect(() => {
        isMounted.current = true;
        fetchProducts();
        return () => {
            isMounted.current = false;
        };
    }, [fetchProducts]);

    const totalPages = Math.ceil(totalCount / PAGE_SIZE);

    const clearFilters = () => {
        setFilters({
            sortBy: "createdAt",
            order: "desc",
            startDate: "",
            endDate: "",
            searchQuery: "",
        });
        setPage(1);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-6">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary pb-2 mb-10">
                Market Product Listings
            </h2>

            {/* Filters */}
            <div className="bg-base-200 rounded-xl p-6 shadow-sm border border-base-300 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

                    {/* Start Date */}
                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-neutral mb-1">Start Date</label>
                        <div className="relative">
                            <FaCalendarAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary text-sm z-10 pointer-events-none" />
                            <input
                                type="date"
                                className="input input-sm input-bordered w-full pl-10"
                                value={filters.startDate}
                                onChange={(e) => setFilters((f) => ({ ...f, startDate: e.target.value }))}
                            />
                        </div>
                    </div>

                    {/* End Date */}
                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-neutral mb-1">End Date</label>
                        <div className="relative">
                            <FaCalendarAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary text-sm z-10 pointer-events-none" />
                            <input
                                type="date"
                                className="input input-sm input-bordered w-full pl-10"
                                value={filters.endDate}
                                onChange={(e) => setFilters((f) => ({ ...f, endDate: e.target.value }))}
                            />
                        </div>
                    </div>

                    {/* Search */}
                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-neutral mb-1">Search</label>
                        <div className="relative">
                            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary text-sm z-10 pointer-events-none" />
                            <input
                                type="text"
                                placeholder="Search by product or market"
                                className="input input-sm input-bordered w-full pl-10"
                                value={filters.searchQuery}
                                onChange={(e) => setFilters((f) => ({ ...f, searchQuery: e.target.value }))}
                            />
                        </div>
                    </div>

                    {/* Sort Dropdown + Clear */}
                    <div className="flex flex-col gap-2">
                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-neutral mb-1">Sort By</label>
                            <select
                                className="select select-sm w-full"
                                value={`${filters.sortBy}_${filters.order}`}
                                onChange={(e) => {
                                    const [sb, o] = e.target.value.split("_");
                                    setFilters((f) => ({ ...f, sortBy: sb, order: o }));
                                }}
                            >
                                <option value="createdAt_desc">Newest</option>
                                <option value="pricePerUnit_asc">Price – Low to High</option>
                                <option value="pricePerUnit_desc">Price – High to Low</option>
                            </select>
                        </div>
                        <button onClick={clearFilters} className="btn btn-secondary btn-sm w-full mt-auto">
                            Clear Filters
                        </button>
                    </div>
                </div>
            </div>

            {/* Product Grid */}
            {loading ? (
                <Loading />
            ) : error ? (
                <div className="text-center text-red-500">{error}</div>
            ) : !products.length ? (
                <NoFound
                    type="product"
                    title="No Products Found"
                    message="Try different filters or check back later for new listings."
                />
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <AnimatePresence>
                            {products.map((prod) => (
                                <motion.div
                                    key={prod._id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    whileHover={{ scale: 1.01 }}
                                    layout
                                    layoutId={prod._id}
                                    className="card bg-base-100 shadow-md rounded-lg overflow-hidden"
                                >
                                    <figure className="h-48 w-full overflow-hidden">
                                        <img src={prod.imageUrl} alt={prod.itemName} className="object-cover w-full h-full" />
                                    </figure>
                                    <div className="card-body p-4">
                                        <h3 className="text-xl font-semibold">{prod.itemName}</h3>
                                        <div className="mt-2 grid grid-cols-2 gap-2 text-sm text-neutral">
                                            <div className="flex items-center gap-1"><FaMoneyBillWave /> ৳{prod.pricePerUnit}</div>
                                            <div className="flex items-center gap-1"><FaCalendarAlt /> {new Date(prod.date).toLocaleDateString()}</div>
                                            <div className="flex items-center gap-1"><FaMapMarkerAlt /> {prod.marketName}</div>
                                            <div className="flex items-center gap-1"><FaUserTag /> {prod.vendorName}</div>
                                        </div>
                                        <button onClick={() => navigate(`/products/${prod._id}`)} className="btn btn-sm btn-secondary mt-4">
                                            View Details
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* Pagination */}
                    <div className="flex justify-center items-center mt-8 gap-2">
                        <button onClick={() => setPage((p) => Math.max(p - 1, 1))} disabled={page === 1} className="btn btn-sm btn-outline">
                            Prev
                        </button>
                        <span className="btn btn-sm">{page} / {totalPages}</span>
                        <button onClick={() => setPage((p) => Math.min(p + 1, totalPages))} disabled={page === totalPages} className="btn btn-sm btn-outline">
                            Next
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default AllProductsPage;