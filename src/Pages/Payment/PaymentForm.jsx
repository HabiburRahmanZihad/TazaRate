import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import {  useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";

import useAuth from "../../hooks/useAuth";

const PaymentForm = ({ product }) => {
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const navigate = useNavigate();

    const [error, setError] = useState(null);
    const price = product?.prices?.at(-1)?.price || 0;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) return;

        const card = elements.getElement(CardElement);
        if (!card) return;

        try {
            const res = await axiosSecure.post("/create-payment-intent", {
                productId: product._id,
                userEmail: user?.email,
            });

            const clientSecret = res.data.clientSecret;
            if (!clientSecret) {
                setError({ message: "No client secret received" });
                return;
            }

            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card,
                    billing_details: {
                        name: user?.name || "Anonymous",
                        email: user?.email,
                    },
                },
            });

            if (result.error) {
                setError(result.error);
            } else if (result.paymentIntent.status === "succeeded") {
                const paymentData = {
                    productId: product._id,
                    productName: product.itemName,
                    marketName: product.marketName,
                    userEmail: user?.email,
                    vendorEmail: product.vendorEmail,
                    vendorName: product.vendorName,
                    price,
                    transactionId: result.paymentIntent.id,
                    paymentMethod: result.paymentIntent.payment_method_types[0],
                    date: new Date(),
                };

                await axiosSecure.post("/payments", paymentData);

                Swal.fire("Payment Success", `You paid ৳${price}`, "success").then(() => {
                    navigate("/dashboard/my-orders"); // or any route you want
                });
            }
        } catch (err) {
            console.error(err);
            setError({ message: "Payment failed. Try again." });
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white shadow rounded">
            <h2 className="text-2xl font-semibold mb-4">💳 Pay for: {product.itemName}</h2>
            <p className="mb-2">Price: <strong>৳{price}</strong></p>
            <p className="mb-4 text-sm text-gray-500">From: {user?.name || user?.email}</p>
            <p className="mb-4 text-sm text-gray-500">To: {product.vendorName} ({product.vendorEmail})</p>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="border p-3 rounded-md">
                    <CardElement />
                </div>
                {error && <p className="text-red-600 text-sm">{error.message}</p>}
                <button
                    type="submit"
                    disabled={!stripe}
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                    Pay ৳{price}
                </button>
            </form>
        </div>
    );
};

export default PaymentForm;
