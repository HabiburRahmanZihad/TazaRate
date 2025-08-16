import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { MdInventory, MdCheckCircle, MdCancel, MdDelete, MdEdit, MdSearch, MdArrowBack, MdArrowForward } from 'react-icons/md';
import Swal from 'sweetalert2';
import Loading from '../../../Components/Loader/Loading';
import Error from '../../Error/Error';
import NoFound from '../../../Components/NoFound/NoFound';

const PRODUCTS_PER_PAGE = 15;

const AllProducts = () => {
    const axiosSecure = useAxiosSecure();

    const [searchInput, setSearchInput] = useState('');
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);

    // Debounce search input before applying
    useEffect(() => {
        const handler = setTimeout(() => {
            setSearch(searchInput.trim());
            setPage(1); // Reset page on new search
        }, 500);
        return () => clearTimeout(handler);
    }, [searchInput]);

    // Fetch products with search and pagination
    const fetchProducts = async ({ queryKey }) => {
        const [, searchTerm, pageNumber] = queryKey;
        const res = await axiosSecure.get('/admin/products', {
            params: {
                search: searchTerm,
                page: pageNumber,
                limit: PRODUCTS_PER_PAGE,
            },
        });
        return res.data; // Expected { products: [...], total: number }
    };

    const {
        data,
        isLoading,
        isError,
        refetch,
    } = useQuery({
        queryKey: ['all-products', search, page],
        queryFn: fetchProducts,
        keepPreviousData: true,
    });

    // Extract products and total count safely
    const products = data?.products || [];
    const totalProducts = data?.total || 0;
    const totalPages = Math.ceil(totalProducts / PRODUCTS_PER_PAGE);

    // Confirm dialog wrapper
    const askConfirm = async (title, text, btnColor) => {
        const res = await Swal.fire({
            title,
            text,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: btnColor,
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes',
        });
        return res.isConfirmed;
    };

    // Handlers (Approve / Reject / Delete)
    const handleApprove = async (id) => {
        if (!(await askConfirm('Approve product?', 'This will approve the product.', '#4ADE80'))) return;
        await axiosSecure.patch(`/products/${id}`, { status: 'approved' });
        toast.success('Product Approved');
        refetch();
    };

    const handleReject = async (id) => {
        const { value: reason, isConfirmed } = await Swal.fire({
            title: 'Reject product?',
            input: 'textarea',
            inputLabel: 'Rejection Reason:',
            inputPlaceholder: 'Type reason...',
            inputValidator: v => !v && 'Reason required',
            showCancelButton: true,
            confirmButtonColor: '#FB923C',
            confirmButtonText: 'Reject',
        });
        if (!isConfirmed) return;
        await axiosSecure.patch(`/products/${id}`, { status: 'rejected', rejectionReason: reason });
        toast.success('Product Rejected');
        refetch();
    };

    const handleDelete = async (id) => {
        if (!(await askConfirm('Delete product?', 'Cannot be undone!', '#F87171'))) return;
        await axiosSecure.delete(`/products/${id}`);
        toast.success('Product Deleted');
        refetch();
    };

    // Pagination controls
    const canGoPrev = page > 1;
    const canGoNext = page < totalPages;

    return (
        <div className="p-4 sm:p-6 max-w-7xl mx-auto bg-white rounded-xl shadow">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div className="flex items-center gap-2">
                    <MdInventory className="text-3xl text-secondary" />
                    <h2 className="text-2xl font-bold text-secondary">All Products</h2>
                </div>

                {/* Search */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
                    <input
                        type="text"
                        placeholder="Search by item/vendor name/email..."
                        value={searchInput}
                        onChange={e => setSearchInput(e.target.value)}
                        className="border-2 border-secondary rounded-md px-3 py-2 focus:outline-none w-full sm:w-72"
                        onKeyDown={e => {
                            if (e.key === "Enter") {
                                setSearch(searchInput.trim());
                                setPage(1);
                            }
                        }}
                    />
                    <button
                        onClick={() => {
                            setSearch(searchInput.trim());
                            setPage(1);
                        }}
                        className="flex items-center justify-center bg-secondary text-white px-3 py-2 rounded hover:bg-secondary/90"
                        aria-label="Search"
                    >
                        <MdSearch />
                    </button>
                </div>
            </div>

            {/* Content */}
            {isLoading ? (
                <Loading />
            ) : isError ? (
                <Error />
            ) : products.length === 0 ? (
                <NoFound
                    type="product"
                    title="No products found"
                    message="Looks like there haven’t been any products yet."
                />
            ) : (
                <>
                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="min-w-[900px] w-full text-sm border-collapse">
                            <thead className="bg-secondary text-white">
                                <tr>
                                    <th className="p-3 text-left">Image</th>
                                    <th className="p-3 text-left">Item</th>
                                    <th className="p-3 text-left">Vendor</th>
                                    <th className="p-3 text-left">Email</th>
                                    <th className="p-3 text-left">Market</th>
                                    <th className="p-3 text-left">Date</th>
                                    <th className="p-3 text-left">Price</th>
                                    <th className="p-3 text-left">Status</th>
                                    <th className="p-3 text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map(p => (
                                    <tr
                                        key={p._id}
                                        className="border-t border-secondary/30 hover:bg-gray-50"
                                    >
                                        <td className="p-2">
                                            <img
                                                src={p.imageUrl}
                                                alt={p.itemName}
                                                className="w-12 h-12 rounded object-cover border border-secondary"
                                            />
                                        </td>
                                        <td className="p-2 font-medium text-gray-800 truncate max-w-[160px]">
                                            {p.itemName}
                                        </td>
                                        <td className="p-2 truncate max-w-[140px]">{p.vendorName}</td>
                                        <td className="p-2 truncate max-w-[180px]">{p.vendorEmail}</td>
                                        <td className="p-2 truncate max-w-[140px]">{p.marketName}</td>
                                        <td className="p-2 whitespace-nowrap">{p.date}</td>
                                        <td className="p-2 font-semibold">৳{p.pricePerUnit}</td>
                                        <td
                                            className={`p-2 font-semibold capitalize ${p.status === "approved"
                                                    ? "text-green-600"
                                                    : p.status === "rejected"
                                                        ? "text-red-600"
                                                        : "text-yellow-600"
                                                }`}
                                            title={p.status === "rejected" ? p.rejectionReason : ""}
                                        >
                                            {p.status}
                                        </td>

                                        {/* Actions */}
                                        <td className="p-2">
                                            <div className="flex flex-wrap gap-2">
                                                {p.status === "pending" && (
                                                    <>
                                                        <button
                                                            onClick={() => handleApprove(p._id)}
                                                            className="flex items-center gap-1 px-2 py-1 bg-green-600 hover:bg-green-700 text-white rounded text-xs"
                                                        >
                                                            <MdCheckCircle /> <span className="hidden sm:inline">Approve</span>
                                                        </button>
                                                        <button
                                                            onClick={() => handleReject(p._id)}
                                                            className="flex items-center gap-1 px-2 py-1 bg-yellow-600 hover:bg-yellow-700 text-white rounded text-xs"
                                                        >
                                                            <MdCancel /> <span className="hidden sm:inline">Reject</span>
                                                        </button>
                                                    </>
                                                )}
                                                <Link
                                                    to={`/dashboard/update-product/${p._id}`}
                                                    className="flex items-center gap-1 px-2 py-1 bg-primary hover:bg-primary/90 text-white rounded text-xs"
                                                >
                                                    <MdEdit /> <span className="hidden sm:inline">Update</span>
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(p._id)}
                                                    className="flex items-center gap-1 px-2 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-xs"
                                                >
                                                    <MdDelete /> <span className="hidden sm:inline">Delete</span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mt-4">
                        <button
                            onClick={() => canGoPrev && setPage(prev => prev - 1)}
                            disabled={!canGoPrev}
                            className={`flex items-center gap-1 px-3 py-1.5 rounded text-sm ${canGoPrev
                                    ? "bg-secondary text-white hover:bg-secondary/90"
                                    : "bg-gray-300 text-gray-600 cursor-not-allowed"
                                }`}
                        >
                            <MdArrowBack /> Prev
                        </button>
                        <div className="text-sm font-medium">
                            Page {page} of {totalPages}
                        </div>
                        <button
                            onClick={() => canGoNext && setPage(prev => prev + 1)}
                            disabled={!canGoNext}
                            className={`flex items-center gap-1 px-3 py-1.5 rounded text-sm ${canGoNext
                                    ? "bg-secondary text-white hover:bg-secondary/90"
                                    : "bg-gray-300 text-gray-600 cursor-not-allowed"
                                }`}
                        >
                            Next <MdArrowForward />
                        </button>
                    </div>
                </>
            )}
        </div>
    );

};

export default AllProducts;