import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { MdCampaign, MdCheckCircle, MdCancel } from 'react-icons/md';
import Loading from '../../../Components/Loader/Loading';

const AllAdvertisementsAdmin = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    const { data: ads = [], isLoading } = useQuery({
        queryKey: ['admin-ads'],
        queryFn: async () => {
            const res = await axiosSecure.get('/advertisements');
            return res.data;
        },
    });

    const updateStatusMutation = useMutation({
        mutationFn: async ({ adId, status, feedback = '' }) => {
            const res = await axiosSecure.patch(`/advertisements/${adId}/status`, { status, feedback });
            return res.data;
        },
        onSuccess: () => {
            toast.success('Advertisement updated');
            queryClient.invalidateQueries(['admin-ads']);
        },
        onError: () => toast.error('Failed to update advertisement'),
    });

    const confirmApprove = async (id) => {
        const result = await Swal.fire({
            title: 'Approve this advertisement?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#4ade80',
            confirmButtonText: 'Approve',
        });
        if (result.isConfirmed) {
            updateStatusMutation.mutate({ adId: id, status: 'accepted' });
        }
    };

    const confirmReject = async (id) => {
        const { value, isConfirmed } = await Swal.fire({
            title: 'Reject this advertisement',
            input: 'textarea',
            inputLabel: 'Rejection reason',
            inputPlaceholder: 'Type your feedback...',
            inputValidator: (val) => (!val ? 'Feedback is required' : null),
            showCancelButton: true,
            confirmButtonColor: '#f87171',
            confirmButtonText: 'Reject',
        });

        if (isConfirmed) {
            updateStatusMutation.mutate({ adId: id, status: 'rejected', feedback: value });
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Header */}
            <div className="flex items-center gap-3 mb-8">
                <MdCampaign className="text-4xl text-secondary" />
                <h2 className="text-2xl font-bold text-secondary">
                    All Advertisements
                </h2>
            </div>

            {/* Table */}
            <div className="bg-white shadow-xl rounded-xl overflow-x-auto border border-gray-200">
                {isLoading ? (
                    <Loading />
                ) : ads.length === 0 ? (
                    <div className="text-center py-10 text-gray-500">
                        <p className="text-lg font-medium">
                            😕 No advertisements found.
                        </p>
                        <p className="text-sm">Please check back later.</p>
                    </div>
                ) : (
                    <table className="w-full text-sm min-w-[700px]">
                        <thead className="bg-secondary text-white text-left">
                            <tr>
                                <th className="py-3 px-4">#</th>
                                <th className="py-3 px-4">Image</th>
                                <th className="py-3 px-4">Title</th>
                                <th className="py-3 px-4">Vendor</th>
                                <th className="py-3 px-4">Status</th>
                                <th className="py-3 px-4">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ads.map((ad, idx) => (
                                <tr
                                    key={ad._id}
                                    className="border-t border-gray-200 hover:bg-gray-50 transition duration-150"
                                >
                                    <td className="px-4 py-3 font-medium text-gray-700">
                                        {idx + 1}
                                    </td>

                                    {/* Image */}
                                    <td className="px-4 py-3">
                                        <img
                                            src={ad.imageUrl}
                                            alt={ad.adTitle}
                                            className="w-16 h-16 object-cover rounded-md border"
                                        />
                                    </td>

                                    {/* Title + description */}
                                    <td className="px-4 py-3">
                                        <p className="font-semibold text-neutral truncate max-w-[180px]">
                                            {ad.adTitle}
                                        </p>
                                        <p className="text-xs text-gray-500 line-clamp-2 max-w-[200px]">
                                            {ad.shortDescription}
                                        </p>
                                    </td>

                                    {/* Vendor */}
                                    <td className="px-4 py-3">
                                        <p className="font-medium">{ad.vendorName}</p>
                                        <p className="text-xs text-gray-500 truncate max-w-[180px]">
                                            {ad.vendorEmail}
                                        </p>
                                    </td>

                                    {/* Status */}
                                    <td className="px-4 py-3">
                                        <span
                                            className={`inline-block px-3 py-1 rounded-full text-xs font-semibold text-white capitalize ${ad.status === "accepted"
                                                    ? "bg-emerald-500"
                                                    : ad.status === "rejected"
                                                        ? "bg-rose-500"
                                                        : "bg-yellow-500"
                                                }`}
                                            title={
                                                ad.status === "rejected" && ad.rejectionFeedback
                                                    ? ad.rejectionFeedback
                                                    : ""
                                            }
                                        >
                                            {ad.status}
                                        </span>
                                    </td>

                                    {/* Actions */}
                                    <td className="px-4 py-3">
                                        {ad.status === "pending" && (
                                            <div className="flex flex-wrap gap-2">
                                                <button
                                                    onClick={() => confirmApprove(ad._id)}
                                                    className="flex items-center gap-1 px-3 py-1 text-white bg-emerald-600 hover:bg-emerald-700 rounded text-xs"
                                                >
                                                    <MdCheckCircle className="text-sm" /> Approve
                                                </button>
                                                <button
                                                    onClick={() => confirmReject(ad._id)}
                                                    className="flex items-center gap-1 px-3 py-1 text-white bg-rose-600 hover:bg-rose-700 rounded text-xs"
                                                >
                                                    <MdCancel className="text-sm" /> Reject
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default AllAdvertisementsAdmin;