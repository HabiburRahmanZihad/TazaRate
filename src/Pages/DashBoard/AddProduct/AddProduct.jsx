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
            }

            const newProduct = {
                vendorEmail: user?.email,
                vendorName: user?.displayName || "",
                marketName: data.marketName,
                date: data.date.toISOString().split("T")[0],
                description: data.description,
                itemName: data.itemName,
                status: "pending",
                pricePerUnit: data.pricePerUnit,
                imageUrl,
                prices: [
                    {
                        date: data.date.toISOString().split("T")[0],
                        price: parseFloat(data.pricePerUnit)
                    }
                ]
            };

            console.log(newProduct);
            await axiosSecure.post("/products", newProduct);

            Swal.fire({
                icon: "success",
                title: "Product Added!",
                text: "Your product has been submitted for review.",
                timer: 2000,
                showConfirmButton: false
            });

            reset();
        } catch (err) {
            console.error("Error adding product:", err);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Something went wrong. Please try again.",
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
                    <label className="block font-medium">Vendor Email</label>
                    <input
                        type="email"
                        value={user?.email}
                        readOnly
                        className="input input-bordered w-full"
                    />
                </div>

                <div>
                    <label className="block font-medium">Vendor Name</label>
                    <input
                        type="text"
                        value={user?.displayName || ""}
                        readOnly
                        className="input input-bordered w-full"
                    />
                </div>

                <div>
                    <label className="block font-medium">Market Name</label>
                    <input
                        {...register("marketName", { required: "Market name is required" })}
                        className="input input-bordered w-full"
                    />
                    {errors.marketName && <p className="text-red-500 text-sm">{errors.marketName.message}</p>}
                </div>

                <div>
                    <label className="block font-medium">Date</label>
                    <Controller
                        control={control}
                        name="date"
                        render={({ field }) => (
                            <DatePicker
                                {...field}
                                selected={field.value}
                                className="input input-bordered w-full"
                                dateFormat="yyyy-MM-dd"
                            />
                        )}
                    />
                </div>

                <div>
                    <label className="block font-medium">Market Description</label>
                    <textarea
                        {...register("description", { required: "Description is required" })}
                        className="textarea textarea-bordered w-full"
                    ></textarea>
                    {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
                </div>

                <div>
                    <label className="block font-medium">Item Name</label>
                    <input
                        {...register("itemName", { required: "Item name is required" })}
                        className="input input-bordered w-full"
                    />
                    {errors.itemName && <p className="text-red-500 text-sm">{errors.itemName.message}</p>}
                </div>

                <div>
                    <label className="block font-medium">Product Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        {...register("image")}
                        className="file-input file-input-bordered w-full"
                    />
                </div>

                <div>
                    <label className="block font-medium">Price per Unit (e.g., ৳30/kg)</label>
                    <input
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
                    {loading ? "Submitting..." : "Submit Product"}
                </button>
            </form>
        </div>
    );
};

export default AddProduct;