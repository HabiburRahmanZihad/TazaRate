import { useEffect, useState, useCallback } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import "react-toastify/dist/ReactToastify.css";
import useAuth from "../../../hooks/useAuth";
import { MdEdit, MdDelete, MdLibraryBooks } from "react-icons/md";

const MyAdvertisements = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [ads, setAds] = useState([]);
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

            if (res.data.success) {
                setAds(prev => prev.filter(ad => ad._id !== id));
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
            title: "Edit Advertisement",
            html: `
                <input id="swal-input1" class="swal2-input" placeholder="Title" value="${ad.adTitle}" />
                <textarea id="swal-input2" class="swal2-textarea" placeholder="Short Description">${ad.shortDescription}</textarea>
            `,
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonText: "Update",
            preConfirm: () => {
                const title = document.getElementById("swal-input1").value.trim();
                const desc = document.getElementById("swal-input2").value.trim();
                if (!title || !desc) {
                    Swal.showValidationMessage("Both fields are required");
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
        <div className="p-6 max-w-5xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-6">
                <MdLibraryBooks className="text-3xl text-secondary" />
                <h2 className="text-2xl font-bold  text-secondary">My Advertisements</h2>
            </div>

            <div className="overflow-x-auto bg-white rounded-xl shadow-md">
                <table className="table w-full text-sm">
                    <thead className="bg-secondary text-white">
                        <tr>
                            <th className="py-3 px-4 text-left">Title</th>
                            <th className="py-3 px-4 text-left">Description</th>
                            <th className="py-3 px-4 text-left">Status</th>
                            <th className="py-3 px-4 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ads.map((ad) => (
                            <tr key={ad._id} className="border-t hover:bg-gray-50">
                                <td className="py-3 px-4">{ad.adTitle}</td>
                                <td className="py-3 px-4">{ad.shortDescription}</td>
                                <td className="py-3 px-4">
                                    <span
                                        className={`px-2 py-1 text-xs font-semibold rounded-full ${ad.status === "pending"
                                            ? "bg-yellow-100 text-yellow-800"
                                            : ad.status === "accepted"
                                                ? "bg-green-100 text-green-800"
                                                : "bg-red-100 text-red-800"
                                            }`}
                                    >
                                        {ad.status}
                                    </span>
                                </td>
                                <td className="py-3 px-4 flex gap-2">
                                    <button
                                        onClick={() => openEditDialog(ad)}
                                        className="flex items-center gap-1 text-white bg-secondary hover:bg-secondary/90 px-3 py-1 rounded text-sm"
                                        disabled={deletingAdId === ad._id}
                                    >
                                        <MdEdit className="text-base" />
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => onDeleteAd(ad._id)}
                                        className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                                        disabled={deletingAdId === ad._id}
                                    >
                                        <MdDelete className="text-base" />
                                        {deletingAdId === ad._id ? "Deleting..." : "Delete"}
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {ads.length === 0 && (
                            <tr>
                                <td colSpan={4} className="text-center py-4 text-gray-500">
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