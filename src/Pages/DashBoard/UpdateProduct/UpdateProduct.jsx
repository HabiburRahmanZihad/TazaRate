import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useParams, useNavigate } from "react-router";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import uploadImageToImgbb from "../../../hooks/uploadImageToImgbb";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

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
        reset,
        control,
        watch,
        formState: { errors },
    } = useForm({
        defaultValues: {
            date: new Date(),
            status: "pending",
        },
    });

    const imageFile = watch("image");

    useEffect(() => {
        async function fetchProduct() {
            try {
                const { data } = await axiosSecure.get(`/products/${id}`);
                data.date = data.date ? new Date(data.date) : new Date();
                reset(data);
                setImagePreview(data.imageUrl || null);
                setExistingData(data);
                setLoading(false);
            } catch (err) {
                console.error("Failed to fetch product:", err);
                Swal.fire("Error", "Failed to load product data.", "error");
                setLoading(false);
            }
        }

        fetchProduct();
    }, [id, reset, axiosSecure]);

    useEffect(() => {
        if (imageFile && imageFile.length > 0) {
            const file = imageFile[0];
            const previewUrl = URL.createObjectURL(file);
            setImagePreview((prev) => {
                if (prev && prev.startsWith("blob:")) {
                    URL.revokeObjectURL(prev);
                }
                return previewUrl;
            });

            return () => URL.revokeObjectURL(previewUrl);
        }
    }, [imageFile]);

    const onSubmit = async (data) => {
        try {
            setLoading(true);

            if (!existingData) {
                Swal.fire("Error", "Product data not loaded. Try again.", "error");
                return;
            }

            let imageUrl = existingData.imageUrl;

            if (imageFile && imageFile.length > 0) {
                imageUrl = await uploadImageToImgbb(imageFile[0]);
                if (!imageUrl) {
                    throw new Error("Image upload failed");
                }
            }

            const currentDate = data.date.toISOString().split("T")[0];
            const newPrice = parseFloat(data.pricePerUnit);

            const updatedPrices = [...(existingData?.prices || [])];
            const lastEntry = updatedPrices[updatedPrices.length - 1];
            if (!lastEntry || lastEntry.price !== newPrice || lastEntry.date !== currentDate) {
                updatedPrices.push({ date: currentDate, price: newPrice });
            }

            const updatedProduct = {
                vendorEmail: data.vendorEmail,
                vendorName: data.vendorName,
                marketName: data.marketName,
                date: currentDate,
                description: data.description,
                itemName: data.itemName,
                itemNote: data.itemNote || "",
                status: data.status,
                pricePerUnit: newPrice,
                imageUrl,
                prices: updatedPrices,
            };

            const res = await axiosSecure.put(`/products/${id}`, updatedProduct);

            if (res.data.modifiedCount > 0 || res.data.success) {
                Swal.fire("Success", "Product updated successfully!", "success");
                navigate("/dashboard/my-products");
            } else {
                Swal.fire("Info", "No changes made.", "info");
            }
        } catch (err) {
            console.error("Error updating product:", err);
            Swal.fire("Error", err.message || "Failed to update product.", "error");
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <p className="text-center py-10">Loading product...</p>;

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-primary">Update Product</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label htmlFor="vendorEmail" className="block font-medium">Vendor Email</label>
                    <input
                        id="vendorEmail"
                        type="email"
                        {...register("vendorEmail")}
                        readOnly
                        className="input input-bordered w-full"
                    />
                </div>

                <div>
                    <label htmlFor="vendorName" className="block font-medium">Vendor Name</label>
                    <input
                        id="vendorName"
                        type="text"
                        {...register("vendorName")}
                        readOnly
                        className="input input-bordered w-full"
                    />
                </div>

                <div>
                    <label htmlFor="marketName" className="block font-medium">Market Name</label>
                    <input
                        id="marketName"
                        {...register("marketName", { required: "Market name is required" })}
                        className="input input-bordered w-full"
                    />
                    {errors.marketName && (
                        <p className="text-red-500 text-sm">{errors.marketName.message}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="date" className="block font-medium">Date</label>
                    <Controller
                        control={control}
                        name="date"
                        render={({ field }) => (
                            <DatePicker
                                id="date"
                                {...field}
                                selected={field.value}
                                className="input input-bordered w-full"
                                dateFormat="yyyy-MM-dd"
                            />
                        )}
                    />
                </div>

                <div>
                    <label htmlFor="description" className="block font-medium">Market Description</label>
                    <textarea
                        id="description"
                        {...register("description", { required: "Description is required" })}
                        className="textarea textarea-bordered w-full"
                        rows={3}
                    />
                    {errors.description && (
                        <p className="text-red-500 text-sm">{errors.description.message}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="itemName" className="block font-medium">Item Name</label>
                    <input
                        id="itemName"
                        {...register("itemName", { required: "Item name is required" })}
                        className="input input-bordered w-full"
                    />
                    {errors.itemName && (
                        <p className="text-red-500 text-sm">{errors.itemName.message}</p>
                    )}
                </div>

                {/* 📝 Optional Item Description */}
                <div>
                    <label htmlFor="itemNote" className="block font-medium">
                        📝 Item Description
                    </label>
                    <textarea
                        id="itemNote"
                        {...register("itemNote")}
                        className="textarea textarea-bordered w-full"
                        placeholder="e.g., Freshly harvested, organic quality"
                        rows={2}
                    />
                </div>

                <div>
                    <label htmlFor="status" className="block font-medium">Status</label>
                    <input
                        id="status"
                        type="text"
                        readOnly
                        value="Pending"
                        {...register("status")}
                        className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
                    />
                </div>

                <div>
                    <label htmlFor="image" className="block font-medium">Product Image</label>
                    <input
                        id="image"
                        type="file"
                        accept="image/*"
                        {...register("image", {
                            validate: {
                                fileType: (files) =>
                                    !files[0] || files[0].type.startsWith("image/") || "Only image files are allowed",
                                fileSize: (files) =>
                                    !files[0] || files[0].size < 2 * 1024 * 1024 || "Max file size is 2MB",
                            },
                            onChange: (e) => {
                                const file = e.target.files[0];
                                if (file) {
                                    const previewUrl = URL.createObjectURL(file);
                                    setImagePreview((prev) => {
                                        if (prev && prev.startsWith("blob:")) URL.revokeObjectURL(prev);
                                        return previewUrl;
                                    });
                                } else {
                                    setImagePreview(existingData?.imageUrl || null);
                                }
                            }
                        })}
                        className="file-input file-input-bordered w-full"
                    />
                    {errors.image && (
                        <p className="text-red-500 text-sm">{errors.image.message}</p>
                    )}

                    {imagePreview && (
                        <img
                            src={imagePreview}
                            alt="Product Preview"
                            className="mt-2 w-32 h-32 object-cover rounded"
                        />
                    )}
                </div>

                <div>
                    <label htmlFor="pricePerUnit" className="block font-medium">
                        Price per Unit (e.g., ৳30/kg)
                    </label>
                    <input
                        id="pricePerUnit"
                        type="number"
                        step="0.01"
                        {...register("pricePerUnit", { required: "Price is required" })}
                        className="input input-bordered w-full"
                    />
                    {errors.pricePerUnit && (
                        <p className="text-red-500 text-sm">{errors.pricePerUnit.message}</p>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-primary w-full"
                >
                    {loading ? "Updating..." : "Update Product"}
                </button>
            </form>
        </div>
    );
};

export default UpdateProduct;