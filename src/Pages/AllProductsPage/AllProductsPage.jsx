import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { motion } from "framer-motion";
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

    const navigate = useNavigate();
    const API = `${import.meta.env.VITE_API_URL}/public/products`;

    const fetchProducts = useCallback(async () => {
        setLoading(true);
        try {
            const res = await axios.get(API, {
                params: {
                    page,
                    limit: PAGE_SIZE,
                    sortBy: filters.sortBy,
                    order: filters.order,
                    startDate: filters.startDate,
                    endDate: filters.endDate,
                    search: filters.searchQuery.trim(),
                },
            });
            setProducts(res.data.products);
            setTotalCount(res.data.total);
        } catch (err) {
            console.error("Error fetching products:", err);
        } finally {
            setLoading(false);
        }
    }, [API, page, filters]);

    useEffect(() => {
        fetchProducts();
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
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary pb-2 mb-10">Market Product Listings</h2>

            {/* Filters & Search Section */}
            <div className="bg-base-200 rounded-xl p-6 shadow-sm border border-base-300 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

                    {/* Start Date */}
                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-neutral mb-1">Start Date</label>
                        <div className="relative">
                            <FaCalendarAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary text-sm z-10 pointer-events-none" />
                            <input
                                type="date"
                                className="input input-sm input-bordered w-full pl-10 focus:outline-none focus:ring-0"
                                value={filters.startDate}
                                onChange={(e) =>
                                    setFilters((f) => ({ ...f, startDate: e.target.value }))
                                }
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
                                className="input input-sm input-bordered w-full pl-10 focus:outline-none focus:ring-0"
                                value={filters.endDate}
                                onChange={(e) =>
                                    setFilters((f) => ({ ...f, endDate: e.target.value }))
                                }
                            />
                        </div>
                    </div>

                    {/* Search Field */}
                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-neutral mb-1">Search</label>
                        <div className="relative">
                            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary text-sm z-10 pointer-events-none" />
                            <input
                                type="text"
                                placeholder="Search by product or market"
                                className="input input-sm input-bordered w-full pl-10 focus:outline-none focus:ring-0"
                                value={filters.searchQuery}
                                onChange={(e) =>
                                    setFilters((f) => ({ ...f, searchQuery: e.target.value }))
                                }
                            />
                        </div>
                    </div>

                    {/* Sort Dropdown + Reset */}
                    <div className="flex flex-col gap-2">
                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-neutral mb-1">Sort By</label>
                            <div className="relative">
                                <select
                                    className="select select-sm w-full bg-base-100 border border-base-300 rounded-md text-sm text-neutral pl-3 pr-10 focus:outline-none focus:ring-2 focus:ring-primary/30 appearance-none"
                                    value={`${filters.sortBy}_${filters.order}`}
                                    onChange={(e) => {
                                        const [sb, o] = e.target.value.split("_");
                                        setFilters((f) => ({ ...f, sortBy: sb, order: o }));
                                    }}
                                    style={{
                                        backgroundImage: `url("data:image/svg+xml;utf8,<svg fill='%23222222' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'><path d='M6 8l4 4 4-4H6z'/></svg>")`,
                                        backgroundRepeat: "no-repeat",
                                        backgroundPosition: "right 0.75rem center",
                                        backgroundSize: "1rem"
                                    }}
                                >
                                    <option value="createdAt_desc">Newest</option>
                                    <option value="pricePerUnit_asc">Price – Low to High</option>
                                    <option value="pricePerUnit_desc">Price – High to Low</option>
                                </select>
                            </div>
                        </div>


                        <button
                            onClick={clearFilters}
                            className="btn btn-secondary btn-sm w-full mt-auto focus:outline-none focus:ring-0"
                        >
                            Clear Filters
                        </button>
                    </div>
                </div>
            </div>




            {/* Product Grid */}
            {loading ? (
                <Loading></Loading>
            ) : !products.length ? (
                <NoFound
                    type="product"
                    title="No Products Found"
                    message="Try different filters or check back later for new listings."
                />
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {products.map((prod) => (
                            <motion.div
                                key={prod._id}
                                className="card bg-base-100 shadow-md hover:shadow-lg transition-all h-full flex flex-col border border-base-300"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                whileHover={{ scale: 1.01 }}
                                layout
                            >
                                {/* Image */}
                                <figure className="h-48 w-full overflow-hidden rounded-t-lg">
                                    <img
                                        src={prod.imageUrl}
                                        alt={prod.itemName}
                                        className="object-cover w-full h-full"
                                    />
                                </figure>

                                {/* Body */}
                                <div className="card-body p-4 flex flex-col justify-between flex-1">
                                    <div className="space-y-1">
                                        <h3 className="text-xl font-semibold text-neutral pb-2">{prod.itemName}</h3>


                                        <div className="grid grid-cols-2 items-center gap-2">
                                            <div className="flex items-center gap-2  text-neutral font-medium">
                                                <FaMoneyBillWave className="text-accent" />
                                                ৳ {prod.pricePerUnit}
                                            </div>

                                            <div className="flex items-center gap-2  text-neutral/70">
                                                <FaCalendarAlt className="text-accent" />
                                                {new Date(prod.date).toLocaleDateString()}
                                            </div>



                                            <div className="flex items-center gap-2  text-neutral/70">
                                                <FaMapMarkerAlt className="text-accent" />
                                                {prod.marketName}
                                            </div>

                                            <div className="flex items-center gap-2  text-neutral/70">
                                                <FaUserTag className="text-accent" />
                                                {prod.vendorName}
                                            </div>
                                        </div>

                                    </div>

                                    {/* Button */}
                                    <button
                                        onClick={() => navigate(`/products/${prod._id}`)}
                                        className="btn btn-sm btn-secondary mt-4"
                                    >
                                        View Details
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex justify-center items-center mt-8 gap-2">
                            <button
                                onClick={() => setPage(p => Math.max(p - 1, 1))}
                                disabled={page === 1}
                                className="btn btn-sm btn-outline"
                            >
                                Prev
                            </button>
                            <span className="btn btn-sm">{page} / {totalPages}</span>
                            <button
                                onClick={() => setPage(p => Math.min(p + 1, totalPages))}
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