import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const Payment = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();

    const { data: product, isLoading, error } = useQuery({
        queryKey: ["product", id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/public/products/${id}`);
            return res.data;
        },
        enabled: !!id,
    });

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading product</p>;

    return (
        <Elements stripe={stripePromise}>
            <PaymentForm product={product} />
        </Elements>
    );
};

export default Payment;