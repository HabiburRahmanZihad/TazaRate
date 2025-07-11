import { useForm } from "react-hook-form";
import { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import uploadImageToImgbb from "../../../hooks/uploadImageToImgbb";
import useAuth from "../../../hooks/useAuth";
import { MdCampaign } from "react-icons/md";

const AddAdvertisement = () => {
    const { user } = useAuth();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({ defaultValues: { status: "pending" } });

    const axiosSecure = useAxiosSecure();
    const [loading, setLoading] = useState(false);
    const [preview, setPreview] = useState(null);

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            if (!data.image?.[0]) {
                Swal.fire("Image Required", "Please upload an advertisement image.", "error");
                setLoading(false);
                return;
            }

            const imageUrl = await uploadImageToImgbb(data.image[0]);

            const adData = {
                adTitle: data.title,
                shortDescription: data.shortDescription,
                status: "pending",
                imageUrl,
                createdAt: new Date().toISOString(),
                vendorEmail: user?.email || "",
                vendorName: user?.displayName || "",
            };

            const res = await axiosSecure.post("/advertisements", adData);

            if (res.data.insertedId) {
                Swal.fire("Success", "Advertisement submitted for review!", "success");
                reset();
                setPreview(null);
            } else {
                Swal.fire("Error", "Failed to submit advertisement.", "error");
            }
        } catch (err) {
            console.error("Ad submission error:", err);
            Swal.fire("Error", "Failed to submit advertisement.", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md">
            <div className="flex items-center gap-2 mb-6 justify-center">
                <MdCampaign className="text-3xl text-secondary" />
                <h2 className="text-2xl font-bold text-secondary">Add Advertisement</h2>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* Title */}
                <div>
                    <label className="block font-medium mb-1">Ad Title</label>
                    <input
                        {...register("title", { required: "Title is required" })}
                        className="w-full border border-secondary px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
                        type="text"
                        placeholder="Enter title"
                    />
                    {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
                </div>

                {/* Description */}
                <div>
                    <label className="block font-medium mb-1">Short Description</label>
                    <textarea
                        {...register("shortDescription", { required: "Description is required" })}
                        className="w-full border border-secondary px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
                        rows={3}
                        placeholder="Brief description of your ad"
                    />
                    {errors.shortDescription && (
                        <p className="text-red-500 text-sm">{errors.shortDescription.message}</p>
                    )}
                </div>

                {/* Image Upload */}
                <div>
                    <label className="block font-medium mb-1">Upload Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        {...register("image", {
                            required: "Image is required",
                            onChange: (e) => {
                                const file = e.target.files[0];
                                if (file && file.size > 2 * 1024 * 1024) {
                                    Swal.fire("Too Large", "Image must be under 2MB", "error");
                                    e.target.value = null;
                                    return;
                                }
                                if (!file.type.startsWith("image/")) {
                                    Swal.fire("Invalid File", "Only image files are allowed.", "error");
                                    e.target.value = null;
                                    return;
                                }
                                setPreview(URL.createObjectURL(file));
                            },
                        })}
                        className="w-full border border-secondary px-4 py-2 rounded-md file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-secondary file:text-white focus:outline-none focus:ring-2 focus:ring-secondary"
                    />
                    {preview && (
                        <div className="mt-3">
                            <img
                                src={preview}
                                alt="Ad Preview"
                                className="w-40 h-40 object-cover rounded-md border border-secondary shadow"
                            />
                        </div>
                    )}
                </div>

                {/* Status */}
                <div>
                    <label className="block font-medium mb-1">Status</label>
                    <input
                        value="Pending"
                        readOnly
                        {...register("status")}
                        className="w-full border border-secondary bg-gray-100 px-4 py-2 rounded-md cursor-not-allowed text-gray-500"
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-secondary text-white rounded-md hover:bg-secondary/90 transition disabled:opacity-50"
                >
                    {loading ? "Submitting..." : (
                        <>
                            <MdCampaign className="text-xl" />
                            Submit Advertisement
                        </>
                    )}
                </button>
            </form>
        </div>
    );
};

export default AddAdvertisement;