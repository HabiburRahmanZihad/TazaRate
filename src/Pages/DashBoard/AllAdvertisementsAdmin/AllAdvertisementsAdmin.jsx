import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AllAdvertisementsAdmin = () => {
    const axiosSecure = useAxiosSecure();

    const { data: ads = [], refetch } = useQuery({
        queryKey: ["admin-ads"],
        queryFn: async () => {
            const res = await axiosSecure.get("/advertisements");
            return res.data;
        },
    });

    const updateStatus = async (id, status) => {
        try {
            await axiosSecure.patch(`/advertisements/${id}/status`, {
                status,
                feedback: "", // No feedback needed
            });
            toast.success(`Ad ${status}`);
            refetch();
        } catch {
            toast.error("Failed to update status");
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-semibold mb-4">📢 All Advertisements</h2>
            <div className="overflow-x-auto">
                <table className="table w-full border border-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Vendor</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ads.map((ad, i) => (
                            <tr key={ad._id}>
                                <td>{i + 1}</td>
                                <td>
                                    <img src={ad.imageUrl} alt="ad" className="w-20 rounded" />
                                </td>
                                <td>
                                    <p className="font-medium">{ad.adTitle}</p>
                                    <p className="text-sm text-gray-500">{ad.shortDescription}</p>
                                </td>
                                <td>
                                    <p>{ad.vendorName}</p>
                                    <p className="text-xs text-gray-500">{ad.vendorEmail}</p>
                                </td>
                                <td>
                                    <span
                                        className={`capitalize px-2 py-1 rounded text-white ${ad.status === "accepted"
                                            ? "bg-green-500"
                                            : ad.status === "rejected"
                                                ? "bg-red-500"
                                                : "bg-yellow-500"
                                            }`}
                                    >
                                        {ad.status}
                                    </span>
                                    {ad.rejectionFeedback && (
                                        <p className="text-xs text-red-500 mt-1 italic">
                                            {ad.rejectionFeedback}
                                        </p>
                                    )}
                                </td>
                                <td className="space-x-1">
                                    {ad.status === "pending" && (
                                        <>
                                            <button
                                                onClick={() => updateStatus(ad._id, "accepted")}
                                                className="btn btn-xs btn-success"
                                            >
                                                Approve
                                            </button>
                                            <button
                                                onClick={() => updateStatus(ad._id, "rejected")}
                                                className="btn btn-xs btn-error"
                                            >
                                                Reject
                                            </button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllAdvertisementsAdmin;