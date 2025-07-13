import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useParams, useNavigate } from "react-router";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import { MdEditNote } from "react-icons/md";
import uploadImageToImgbb from "../../../hooks/uploadImageToImgbb";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../Components/Loader/Loading";



const UpdateProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    const [loading, setLoading] = useState(true);
    const [imagePreview, setImagePreview] = useState(null);
    const [existingData, setExistingData] = useState(null);

    const {
        register,
        handleSubmit,
        control,
        reset,
        watch,
        formState: { errors },
    } = useForm({
        defaultValues: { date: new Date(), status: "pending" },
    });

    const imageFile = watch("image");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axiosSecure.get(`/products/${id}`);
                data.date = data.date ? new Date(data.date) : new Date();
                reset(data);
                setExistingData(data);
                setImagePreview(data.imageUrl || null);
            } catch {
                Swal.fire("Error", "Failed to load product data.", "error");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id, reset, axiosSecure]);

    useEffect(() => {
        if (imageFile?.[0]) {
            const file = imageFile[0];
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(prev => {
                if (prev?.startsWith("blob:")) URL.revokeObjectURL(prev);
                return previewUrl;
            });
            return () => URL.revokeObjectURL(previewUrl);
        }
    }, [imageFile]);

    const onSubmit = async (data) => {
        try {
            setLoading(true);
            if (!existingData) {
                Swal.fire("Error", "Product data not loaded.", "error");
                return;
            }

            let imageUrl = existingData.imageUrl;

            if (imageFile?.[0]) {
                imageUrl = await uploadImageToImgbb(imageFile[0]);
                if (!imageUrl) throw new Error("Image upload failed");
            }

            const dateStr = data.date.toISOString().split("T")[0];
            const newPrice = parseFloat(data.pricePerUnit);

            const updatedPrices = [...(existingData?.prices || [])];
            const last = updatedPrices[updatedPrices.length - 1];
            if (!last || last.price !== newPrice || last.date !== dateStr) {
                updatedPrices.push({ date: dateStr, price: newPrice });
            }

            const updatedProduct = {
                ...data,
                date: dateStr,
                imageUrl,
                pricePerUnit: newPrice,
                prices: updatedPrices,
            };

            const res = await axiosSecure.put(`/products/${id}`, updatedProduct);
            if (res.data.modifiedCount || res.data.success) {
                Swal.fire("Success", "Product updated!", "success");
            } else {
                Swal.fire("Info", "No changes made.", "info");
            }
        } catch (err) {
            Swal.fire("Error", err.message || "Update failed.", "error");
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Loading></Loading>;

    return (
        <div className="max-w-4xl mx-auto px-4 md:px-8 py-10 bg-white rounded-xl shadow-lg">
            <div className="flex items-center gap-2 mb-8 justify-center">
                <MdEditNote className="text-3xl text-secondary" />
                <h2 className="text-3xl font-bold text-secondary text-center">Update Product</h2>
            </div>


            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Vendor Email */}
                <div>
                    <label className="block font-medium mb-1">Vendor Email</label>
                    <input
                        type="email"
                        {...register("vendorEmail")}
                        readOnly
                        className="w-full border border-secondary bg-gray-100 px-4 py-2 rounded-md focus:outline-none"
                    />
                </div>

                {/* Vendor Name */}
                <div>
                    <label className="block font-medium mb-1">Vendor Name</label>
                    <input
                        type="text"
                        {...register("vendorName")}
                        readOnly
                        className="w-full border border-secondary bg-gray-100 px-4 py-2 rounded-md focus:outline-none"
                    />
                </div>

                {/* Market Name */}
                <div className="md:col-span-2">
                    <label className="block font-medium mb-1">Market Name</label>
                    <input
                        {...register("marketName", { required: "Market name is required" })}
                        className="w-full border border-secondary px-4 py-2 rounded-md focus:outline-none"
                    />
                    {errors.marketName && <p className="text-red-500 text-sm">{errors.marketName.message}</p>}
                </div>

                {/* Date */}
                <div>
                    <label className="block font-medium mb-1">Date</label>
                    <Controller
                        name="date"
                        control={control}
                        render={({ field }) => (
                            <DatePicker
                                {...field}
                                selected={field.value}
                                className="w-full border border-secondary px-4 py-2 rounded-md focus:outline-none"
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
                        className="w-full border border-secondary px-4 py-2 rounded-md focus:outline-none"
                    />
                    {errors.pricePerUnit && <p className="text-red-500 text-sm">{errors.pricePerUnit.message}</p>}
                </div>

                {/* Item Name */}
                <div className="md:col-span-2">
                    <label className="block font-medium mb-1">Item Name</label>
                    <input
                        {...register("itemName", { required: "Item name is required" })}
                        className="w-full border border-secondary px-4 py-2 rounded-md focus:outline-none"
                    />
                    {errors.itemName && <p className="text-red-500 text-sm">{errors.itemName.message}</p>}
                </div>

                {/* Item Description */}
                <div className="md:col-span-2">
                    <label className="block font-medium mb-1">Item Description (Optional)</label>
                    <textarea
                        {...register("itemNote")}
                        className="w-full border border-secondary px-4 py-2 rounded-md focus:outline-none"
                        placeholder="e.g., Organic, freshly picked"
                    />
                </div>

                {/* Market Description */}
                <div className="md:col-span-2">
                    <label className="block font-medium mb-1">Market Description</label>
                    <textarea
                        {...register("description", { required: "Description is required" })}
                        className="w-full border border-secondary px-4 py-2 rounded-md focus:outline-none"
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
                                    !files[0] || files[0].type.startsWith("image/") || "Only image files allowed",
                                fileSize: (files) =>
                                    !files[0] || files[0].size < 2 * 1024 * 1024 || "Max file size is 2MB"
                            }
                        })}
                        className="w-full border border-secondary px-4 py-2 rounded-md focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-secondary file:text-white"
                    />
                    {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}
                    {imagePreview && (
                        <div className="mt-4">
                            <p className="text-sm font-medium mb-1">Image Preview:</p>
                            <img
                                src={imagePreview}
                                alt="Preview"
                                className="w-full max-h-64 object-contain rounded-lg border border-secondary"
                            />
                        </div>
                    )}
                </div>

                {/* Status */}
                <div>
                    <label className="block font-medium mb-1">Status</label>
                    <input
                        type="text"
                        readOnly
                        {...register("status")}
                        className="w-full border border-secondary bg-gray-100 px-4 py-2 rounded-md focus:outline-none"
                    />
                </div>

                {/* Submit Button */}
                <div className="md:col-span-2">
                    <button
                        type="submit"
                        disabled={loading}
                        className="btn bg-secondary text-white hover:bg-secondary/90 w-full flex justify-center items-center gap-2"
                    >
                        {loading ? (
                            "Updating..."
                        ) : (
                            <>
                                <MdEditNote className="text-lg" />
                                Update Product
                            </>
                        )}
                    </button>
                </div>
            </form>

        </div>
    );
};

export default UpdateProduct;