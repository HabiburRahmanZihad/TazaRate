import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { FaCreditCard, FaUser, FaStore } from "react-icons/fa";

const CARD_OPTIONS = {
    style: {
        base: {
            iconColor: "#6B7280",
            color: "#1F2937",
            fontWeight: "500",
            fontFamily: "Inter, sans-serif",
            fontSize: "16px",
            "::placeholder": {
                color: "#9CA3AF",
            },
        },
        invalid: {
            iconColor: "#EF4444",
            color: "#EF4444",
        },
    },
};

const PaymentForm = ({ product }) => {
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const navigate = useNavigate();

    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState(false);

    const price = product?.prices?.at(-1)?.price || 0;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) return;

        const card = elements.getElement(CardElement);
        if (!card) return;

        try {
            setProcessing(true);
            const res = await axiosSecure.post("/create-payment-intent", {
                productId: product._id,
                userEmail: user?.email,
            });

            const clientSecret = res.data.clientSecret;
            if (!clientSecret) {
                setError({ message: "No client secret received" });
                setProcessing(false);
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

                Swal.fire("Payment Successful", `You paid ৳${price}`, "success").then(() => {
                    navigate("/dashboard/my-orders");
                });
            }
        } catch (err) {
            console.error(err);
            setError({ message: "Payment failed. Try again." });
        } finally {
            setProcessing(false);
        }
    };

    return (
        <div className="max-w-lg mx-auto bg-base-100 border border-base-300 shadow-md rounded-xl p-6 space-y-5">
            <h2 className="text-2xl font-bold text-primary flex items-center gap-2">
                <FaCreditCard /> Complete Payment
            </h2>

            <div className="space-y-2">
                <p className="text-neutral">Amount: <strong className="text-secondary">৳{price}</strong></p>
                <p className="flex items-center gap-2 text-neutral/70 text-sm">
                    <FaUser className="text-accent" />
                    From: {user?.name || user?.email}
                </p>
                <p className="flex items-center gap-2 text-neutral/70 text-sm">
                    <FaStore className="text-accent" />
                    To: {product.vendorName} ({product.vendorEmail})
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="border border-base-300 p-4 rounded-md bg-white shadow-sm">
                    <CardElement options={CARD_OPTIONS} />
                </div>

                {error && (
                    <p className="text-red-500 text-sm font-medium">{error.message}</p>
                )}

                <button
                    type="submit"
                    disabled={!stripe || processing}
                    className={`btn btn-primary w-full ${processing ? "btn-disabled" : ""}`}
                >
                    {processing ? "Processing..." : `Pay ৳${price}`}
                </button>
            </form>
            {/* back to previous page */}
            <Link to="/products" className="btn text-secondary w-full hover:bg-base-100">
                &larr; Back to Products
            </Link>

        </div>
    );
};

export default PaymentForm;