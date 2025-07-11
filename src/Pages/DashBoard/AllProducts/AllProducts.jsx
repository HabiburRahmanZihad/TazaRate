import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { MdInventory, MdCheckCircle, MdCancel, MdDelete, MdEdit, MdSearch, MdArrowBack, MdArrowForward } from 'react-icons/md';
import Swal from 'sweetalert2';

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
        error,
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
        <div className="p-6 max-w-7xl mx-auto bg-white rounded-xl shadow">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <MdInventory className="text-3xl text-secondary" />
                    <h2 className="text-2xl font-bold text-secondary">All Products</h2>
                </div>
                <div className="flex items-center gap-2">
                    <input
                        type="text"
                        placeholder="Search by item/vendor name/email..."
                        value={searchInput}
                        onChange={e => setSearchInput(e.target.value)}
                        className="border-2 border-secondary rounded-md px-3 py-1 focus:outline-none w-72"
                        onKeyDown={e => {
                            if (e.key === 'Enter') {
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
                        className="flex items-center bg-secondary text-white px-3 py-1 rounded hover:bg-secondary/90"
                        aria-label="Search"
                    >
                        <MdSearch />
                    </button>
                </div>
            </div>

            {isLoading ? (
                <div className="p-4 text-center text-gray-500">Loading products...</div>
            ) : isError ? (
                <div className="p-4 text-red-500">Error: {error.message}</div>
            ) : products.length === 0 ? (
                <div className="p-10 text-center text-gray-500">No products found.</div>
            ) : (
                <>
                    <div className="overflow-x-auto">
                        <table className="min-w-full table-auto">
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
                                    <tr key={p._id} className="border-t border-secondary/30 hover:bg-gray-50">
                                        <td className="p-2">
                                            <img src={p.imageUrl} alt={p.itemName} className="w-12 h-12 rounded" />
                                        </td>
                                        <td className="p-2">{p.itemName}</td>
                                        <td className="p-2">{p.vendorName}</td>
                                        <td className="p-2">{p.vendorEmail}</td>
                                        <td className="p-2">{p.marketName}</td>
                                        <td className="p-2">{p.date}</td>
                                        <td className="p-2">৳{p.pricePerUnit}</td>
                                        <td
                                            className={`p-2 font-semibold ${p.status === 'approved'
                                                ? 'text-green-600'
                                                : p.status === 'rejected'
                                                    ? 'text-red-600'
                                                    : 'text-yellow-600'
                                                }`}
                                            title={p.status === 'rejected' ? p.rejectionReason : ''}
                                        >
                                            {p.status}
                                        </td>
                                        <td className="p-2 flex flex-col gap-2">
                                            {p.status === 'pending' && (
                                                <>
                                                    <button
                                                        onClick={() => handleApprove(p._id)}
                                                        className="flex items-center gap-1 btn btn-xs bg-green-600 text-white"
                                                    >
                                                        <MdCheckCircle /> Approve
                                                    </button>
                                                    <button
                                                        onClick={() => handleReject(p._id)}
                                                        className="flex items-center gap-1 btn btn-xs bg-yellow-600 text-white"
                                                    >
                                                        <MdCancel /> Reject
                                                    </button>
                                                </>
                                            )}
                                            <Link
                                                to={`/dashboard/update-product/${p._id}`}
                                                className="flex items-center gap-1 btn btn-xs bg-blue-600 text-white"
                                            >
                                                <MdEdit /> Update
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(p._id)}
                                                className="flex items-center gap-1 btn btn-xs bg-red-600 text-white"
                                            >
                                                <MdDelete /> Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination controls */}
                    <div className="flex justify-between items-center mt-4">
                        <button
                            onClick={() => canGoPrev && setPage(prev => prev - 1)}
                            disabled={!canGoPrev}
                            className={`flex items-center gap-1 btn btn-sm rounded ${canGoPrev ? 'bg-secondary text-white hover:bg-secondary/90' : 'bg-gray-300 cursor-not-allowed'
                                }`}
                        >
                            <MdArrowBack /> Prev
                        </button>
                        <div>
                            Page {page} of {totalPages}
                        </div>
                        <button
                            onClick={() => canGoNext && setPage(prev => prev + 1)}
                            disabled={!canGoNext}
                            className={`flex items-center gap-1 btn btn-sm rounded ${canGoNext ? 'bg-secondary text-white hover:bg-secondary/90' : 'bg-gray-300 cursor-not-allowed'
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