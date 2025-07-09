import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import uploadImageToImgbb from "../../../hooks/uploadImageToImgbb";
import { AuthContext } from "../../../Provider/AuthContext";

const AddAdvertisement = () => {
    const { user } = useContext(AuthContext); // Assuming you have AuthContext to get user info

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            status: "pending",
        },
    });

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

            console.log("Ad Data:", adData);

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
            <h2 className="text-2xl font-bold mb-4 text-primary">📢 Add Advertisement</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label className="block font-medium">Ad Title</label>
                    <input
                        {...register("title", { required: "Title is required" })}
                        className="input input-bordered w-full"
                        type="text"
                    />
                    {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
                </div>

                <div>
                    <label className="block font-medium">Short Description</label>
                    <textarea
                        {...register("shortDescription", { required: "Description is required" })}
                        className="textarea textarea-bordered w-full"
                        rows={3}
                    />
                    {errors.shortDescription && (
                        <p className="text-red-500 text-sm">{errors.shortDescription.message}</p>
                    )}
                </div>

                <div>
                    <label className="block font-medium">Upload Image</label>
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
                        className="file-input file-input-bordered w-full"
                    />
                    {preview && (
                        <img
                            src={preview}
                            alt="Ad Preview"
                            className="mt-2 w-40 h-40 object-cover rounded shadow"
                        />
                    )}
                </div>

                <div>
                    <label className="block font-medium">Status</label>
                    <input
                        value="Pending"
                        readOnly
                        {...register("status")}
                        className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
                    />
                </div>

                <button type="submit" disabled={loading} className="btn btn-primary w-full">
                    {loading ? "Submitting..." : "Submit Advertisement"}
                </button>
            </form>
        </div>
    );
};

export default AddAdvertisement;