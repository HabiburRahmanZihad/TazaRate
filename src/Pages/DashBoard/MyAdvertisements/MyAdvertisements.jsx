import { useContext, useEffect, useState, useCallback } from "react";
import { AuthContext } from "../../../Provider/AuthContext";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import "react-toastify/dist/ReactToastify.css";

const MyAdvertisements = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const [ads, setAds] = useState([]);

    // New state to track deletion in progress
    const [deletingAdId, setDeletingAdId] = useState(null);

    const fetchAds = useCallback(async () => {
        if (!user?.email) return;
        try {
            const res = await axiosSecure.get(`/advertisements?vendorEmail=${user.email}`);
            setAds(res.data);
        } catch (err) {
            console.error("Failed to fetch advertisements:", err);
            toast.error("Failed to fetch advertisements");
        }
    }, [user?.email, axiosSecure]);

    useEffect(() => {
        fetchAds();
    }, [fetchAds]);

    const onDeleteAd = async (id) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
        });

        if (!result.isConfirmed) return;

        try {
            setDeletingAdId(id);

            const res = await axiosSecure.delete(`/advertisements/${id}`);
            console.log("Delete response:", res.data);

            if (res.data.success) {
                setAds(prevAds => prevAds.filter(ad => ad._id !== id));
                toast.success("Advertisement deleted");
            } else {
                toast.error("Advertisement was not deleted");
            }
        } catch (err) {
            console.error("Failed to delete advertisement:", err);
            toast.error("Failed to delete advertisement");
        } finally {
            setDeletingAdId(null);
        }
    };



    const openEditDialog = (ad) => {
        Swal.fire({
            title: 'Edit Advertisement',
            html: `
                <input id="swal-input1" class="swal2-input" placeholder="Title" value="${ad.adTitle}" />
                <textarea id="swal-input2" class="swal2-textarea" placeholder="Short Description">${ad.shortDescription}</textarea>
            `,
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonText: 'Update',
            preConfirm: () => {
                const title = document.getElementById('swal-input1').value.trim();
                const desc = document.getElementById('swal-input2').value.trim();
                if (!title || !desc) {
                    Swal.showValidationMessage('Both fields are required');
                    return;
                }
                return { adTitle: title, shortDescription: desc };
            }
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axiosSecure.patch(`/advertisements/${ad._id}`, {
                        adTitle: result.value.adTitle,
                        shortDescription: result.value.shortDescription,
                        imageUrl: ad.imageUrl,
                        status: ad.status,
                    });

                    if (res.data.modifiedCount > 0) {
                        toast.success("Advertisement updated!");
                        fetchAds();
                    } else {
                        toast.info("No changes made.");
                    }
                } catch (err) {
                    console.error("Failed to update advertisement:", err);
                    toast.error("Failed to update advertisement.");
                }
            }
        });
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4 text-primary">📃 My Advertisements</h2>

            <div className="overflow-x-auto">
                <table className="table w-full border">
                    <thead>
                        <tr className="bg-gray-100 text-left">
                            <th>Title</th>
                            <th>Description</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ads.map((ad) => (
                            <tr key={ad._id} className="border-t">
                                <td>{ad.adTitle}</td>
                                <td>{ad.shortDescription}</td>
                                <td>
                                    <span
                                        className={`badge ${ad.status === "pending"
                                            ? "badge-warning"
                                            : ad.status === "accepted"
                                                ? "badge-success"
                                                : "badge-error"
                                            }`}
                                    >
                                        {ad.status}
                                    </span>
                                </td>
                                <td className="space-x-2">
                                    <button
                                        onClick={() => openEditDialog(ad)}
                                        className="btn btn-sm btn-primary"
                                        disabled={deletingAdId === ad._id}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => onDeleteAd(ad._id)}
                                        className="btn btn-sm btn-error"
                                        disabled={deletingAdId === ad._id}
                                    >
                                        {deletingAdId === ad._id ? "Deleting..." : "Delete"}
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {ads.length === 0 && (
                            <tr>
                                <td colSpan={4} className="text-center py-4">
                                    No advertisements found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <ToastContainer position="top-right" />
        </div>
    );
};

export default MyAdvertisements;