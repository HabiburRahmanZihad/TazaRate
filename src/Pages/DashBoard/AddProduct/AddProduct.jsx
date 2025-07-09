import { useForm, Controller } from "react-hook-form";
import { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import uploadImageToImgbb from "../../../hooks/uploadImageToImgbb";
import { AuthContext } from "../../../Provider/AuthContext";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AddProduct = () => {
    const { user } = useContext(AuthContext);
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
        defaultValues: {
            date: new Date()
        }
    });

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            let imageUrl = "";
            if (data.image[0]) {
                imageUrl = await uploadImageToImgbb(data.image[0]);
                if (!imageUrl) {
                    throw new Error("Image upload failed");
                }
            }

            const formattedDate = data.date.toLocaleDateString("en-CA"); // YYYY-MM-DD

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
                prices: [
                    {
                        date: formattedDate,
                        price: parseFloat(data.pricePerUnit)
                    }
                ]
            };

            await axiosSecure.post("/products", newProduct);

            Swal.fire({
                icon: "success",
                title: "Product Added!",
                text: "Your product has been submitted for review.",
                timer: 2000,
                showConfirmButton: false
            });

            reset({ date: new Date() }); // ✅ Reset with default date
            setImagePreview(null); // add this after reset()
        } catch (err) {
            console.error("Error adding product:", err);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: err.message || "Something went wrong. Please try again.",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-primary">📝 Add Market Product</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label htmlFor="vendorEmail" className="block font-medium">Vendor Email</label>
                    <input
                        id="vendorEmail"
                        type="email"
                        value={user?.email}
                        readOnly
                        className="input input-bordered w-full"
                    />
                </div>

                <div>
                    <label htmlFor="vendorName" className="block font-medium">Vendor Name</label>
                    <input
                        id="vendorName"
                        type="text"
                        value={user?.displayName || ""}
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
                    {errors.marketName && <p className="text-red-500 text-sm">{errors.marketName.message}</p>}
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
                    ></textarea>
                    {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
                </div>

                <div>
                    <label htmlFor="itemName" className="block font-medium">Item Name</label>
                    <input
                        id="itemName"
                        {...register("itemName", { required: "Item name is required" })}
                        className="input input-bordered w-full"
                    />
                    {errors.itemName && <p className="text-red-500 text-sm">{errors.itemName.message}</p>}
                </div>

                {/* ✅ New Optional Field */}
                <div>
                    <label htmlFor="itemNote" className="block font-medium">Item Description </label>
                    <textarea
                        id="itemNote"
                        {...register("itemNote")}
                        className="textarea textarea-bordered w-full"
                        placeholder="e.g., Freshly harvested, organic quality"
                    ></textarea>
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
                                    !files[0] || files[0].size < 2 * 1024 * 1024 || "Max file size is 2MB"
                            },
                            onChange: (e) => {
                                const file = e.target.files[0];
                                if (file) {
                                    const url = URL.createObjectURL(file);
                                    setImagePreview((prev) => {
                                        if (prev) URL.revokeObjectURL(prev);
                                        return url;
                                    });
                                } else {
                                    setImagePreview(null);
                                }
                            }
                        })}
                        className="file-input file-input-bordered w-full"
                    />
                    {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}

                    {imagePreview && (
                        <div className="mt-2">
                            <p className="text-sm font-medium">Image Preview:</p>
                            <img
                                src={imagePreview}
                                alt="Preview"
                                className="w-full max-h-64 object-contain rounded border"
                            />
                        </div>
                    )}
                </div>

                <div>
                    <label htmlFor="pricePerUnit" className="block font-medium">Price per Unit (e.g., ৳30/kg)</label>
                    <input
                        id="pricePerUnit"
                        type="number"
                        step="0.01"
                        {...register("pricePerUnit", { required: "Price is required" })}
                        className="input input-bordered w-full"
                    />
                    {errors.pricePerUnit && <p className="text-red-500 text-sm">{errors.pricePerUnit.message}</p>}
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-primary w-full"
                >
                    {loading ? (
                        <span className="loading loading-spinner loading-sm"></span>
                    ) : (
                        "Submit Product"
                    )}
                </button>
            </form>
        </div>
    );
};

export default AddProduct;