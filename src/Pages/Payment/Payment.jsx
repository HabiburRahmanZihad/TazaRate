import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { FaSpinner, FaExclamationTriangle } from "react-icons/fa";
import PaymentForm from "./PaymentForm";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../../Components/Loader/Loading";
import Error from "../Error/Error";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const Payment = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();

    const {
        data: product,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["product", id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/public/products/${id}`);
            return res.data;
        },
        enabled: !!id,
    });

    if (isLoading) {
        return <Loading />;
    }

    if (error) {
        return <Error />;
    }

    return (
        <div className="max-w-4xl mx-auto px-4 md:px-6 py-10">
            <div className="bg-gradient-to-br from-base-100 to-base-200 shadow-2xl rounded-3xl p-8 md:p-10 space-y-8 border border-base-300">
                {/* Header */}
                <div className="text-center space-y-2">
                    <h1 className="text-3xl md:text-4xl font-extrabold text-primary">Secure Checkout</h1>
                    <p className="text-neutral text-sm md:text-base">
                        You're purchasing: <span className="font-semibold text-secondary">{product?.itemName}</span>
                    </p>
                </div>

                {/* Payment Form */}
                <div className="bg-base-100 border border-base-300 rounded-xl p-6 shadow-inner">
                    <Elements stripe={stripePromise}>
                        <PaymentForm product={product} />
                    </Elements>
                </div>

                {/* Footer info (optional) */}
                <p className="text-center text-xs text-neutral">
                    Payments are securely processed by Stripe.
                </p>
            </div>
        </div>
    );
};

export default Payment;