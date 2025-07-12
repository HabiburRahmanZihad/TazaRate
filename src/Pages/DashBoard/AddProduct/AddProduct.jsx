import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import { MdAddCircleOutline } from "react-icons/md";
import uploadImageToImgbb from "../../../hooks/uploadImageToImgbb";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../../Components/Loader/Loading";

const AddProduct = () => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const axiosSecure = useAxiosSecure();
    const [imagePreview, setImagePreview] = useState(null);

    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: { date: new Date() }
    });

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            let imageUrl = "";
            if (data.image[0]) {
                imageUrl = await uploadImageToImgbb(data.image[0]);
                if (!imageUrl) throw new Error("Image upload failed");
            }

            const formattedDate = data.date.toLocaleDateString("en-CA");

            const newProduct = {
                vendorEmail: user?.email,
                vendorName: user?.displayName || "",
                marketName: data.marketName,
                date: formattedDate,
                description: data.description,
                itemName: data.itemName,
                itemNote: data.itemNote || "",
                status: "pending",
                pricePerUnit: data.pricePerUnit,
                imageUrl,
                prices: [{ date: formattedDate, price: parseFloat(data.pricePerUnit) }]
            };

            await axiosSecure.post("/products", newProduct);

            Swal.fire({
                icon: "success",
                title: "Product Added!",
                text: "Your product has been submitted for review.",
                timer: 2000,
                showConfirmButton: false
            });

            // Reset form and image preview
            reset();
            setImagePreview(null);
            setLoading(false);
        } catch (err) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: err.message || "Something went wrong. Please try again."
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 md:px-8 py-10 bg-white rounded-xl shadow-lg">
            <div className="flex items-center gap-2 mb-8 justify-center">
                <MdAddCircleOutline className="text-3xl text-secondary" />
                <h2 className="text-3xl font-bold text-secondary text-center">Add New Product</h2>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Vendor Info */}
                <div>
                    <label className="block font-medium mb-1">Vendor Email</label>
                    <input
                        type="email"
                        value={user?.email}
                        readOnly
                        className="w-full border border-secondary rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary bg-gray-100"
                    />
                </div>

                <div>
                    <label className="block font-medium mb-1">Vendor Name</label>
                    <input
                        type="text"
                        value={user?.displayName || ""}
                        readOnly
                        className="w-full border border-secondary rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary bg-gray-100"
                    />
                </div>

                {/* Market Name */}
                <div className="md:col-span-2">
                    <label className="block font-medium mb-1">Market Name</label>
                    <input
                        {...register("marketName", { required: "Market name is required" })}
                        className="w-full border border-secondary rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary"
                    />
                    {errors.marketName && <p className="text-red-500 text-sm">{errors.marketName.message}</p>}
                </div>

                {/* Date */}
                <div>
                    <label className="block font-medium mb-1">Date</label>
                    <Controller
                        control={control}
                        name="date"
                        render={({ field }) => (
                            <DatePicker
                                {...field}
                                selected={field.value}
                                className="w-full border border-secondary rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary"
                                dateFormat="yyyy-MM-dd"
                            />
                        )}
                    />
                </div>

                {/* Price */}
                <div>
                    <label className="block font-medium mb-1">Price per Unit (৳)</label>
                    <input
                        type="number"
                        step="0.01"
                        {...register("pricePerUnit", { required: "Price is required" })}
                        className="w-full border border-secondary rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary"
                    />
                    {errors.pricePerUnit && <p className="text-red-500 text-sm">{errors.pricePerUnit.message}</p>}
                </div>

                {/* Item Name */}
                <div className="md:col-span-2">
                    <label className="block font-medium mb-1">Item Name</label>
                    <input
                        {...register("itemName", { required: "Item name is required" })}
                        className="w-full border border-secondary rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary"
                    />
                    {errors.itemName && <p className="text-red-500 text-sm">{errors.itemName.message}</p>}
                </div>

                {/* Item Description */}
                <div className="md:col-span-2">
                    <label className="block font-medium mb-1">Item Description (Optional)</label>
                    <textarea
                        {...register("itemNote")}
                        className="w-full border border-secondary rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary"
                        placeholder="e.g., Freshly harvested, organic quality"
                    />
                </div>

                {/* Market Description */}
                <div className="md:col-span-2">
                    <label className="block font-medium mb-1">Market Description</label>
                    <textarea
                        {...register("description", { required: "Description is required" })}
                        className="w-full border border-secondary rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary"
                    />
                    {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
                </div>

                {/* Image Upload */}
                <div className="md:col-span-2">
                    <label className="block font-medium mb-1">Product Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        {...register("image", {
                            validate: {
                                fileType: (files) =>
                                    !files[0] || files[0].type.startsWith("image/") || "Only image files are allowed",
                                fileSize: (files) =>
                                    !files[0] || files[0].size < 2 * 1024 * 1024 || "Max file size is 2MB"
                            },
                            onChange: (e) => {
                                const file = e.target.files[0];
                                if (file) {
                                    const url = URL.createObjectURL(file);
                                    setImagePreview(prev => {
                                        if (prev) URL.revokeObjectURL(prev);
                                        return url;
                                    });
                                } else {
                                    setImagePreview(null);
                                }
                            }
                        })}
                        className="w-full border border-secondary rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-secondary file:text-white"
                    />
                    {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}

                    {imagePreview && (
                        <div className="mt-4">
                            <p className="text-sm font-medium mb-1">Image Preview:</p>
                            <img
                                src={imagePreview}
                                alt="Preview"
                                className="w-full max-h-64 object-contain rounded-lg border"
                            />
                        </div>
                    )}
                </div>

                {/* Submit Button */}
                <div className="md:col-span-2">
                    <button
                        type="submit"
                        disabled={loading}
                        className="btn btn-secondary w-full"
                    >
                        {loading ? (
                            <Loading></Loading>
                        ) : (
                            <span className="inline-flex items-center gap-2">
                                <MdAddCircleOutline className="text-lg" />
                                Submit Product
                            </span>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddProduct;