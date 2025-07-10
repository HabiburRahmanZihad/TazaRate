import {  useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
    ReferenceLine,
} from "recharts";
import { AuthContext } from "../../Provider/AuthContext";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const getPriceChangeSummary = (data) => {
    if (data.length < 2) return null;

    const [previous, current] = data;
    const diff = current.price - previous.price;

    let message = "";
    if (diff > 0) message = `Price increased by ৳${diff} since ${previous.date}`;
    else if (diff < 0) message = `Price decreased by ৳${Math.abs(diff)} since ${previous.date}`;
    else message = "No price change since selected date";

    const color = diff > 0 ? "text-red-600" : diff < 0 ? "text-green-600" : "text-gray-600";
    return { message, color, previousPrice: previous.price };
};

const ProductDetailsPage = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const [product, setProduct] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [watchlisted, setWatchlisted] = useState(false);
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState(0);
    const [compareDate, setCompareDate] = useState("");
    const [compareData, setCompareData] = useState([]);
    const [loadingCompare, setLoadingCompare] = useState(false);
    const axiosSecure = useAxiosSecure();
    const [userReview, setUserReview] = useState(null);

    useEffect(() => {
        if (!id) return;

        axios.get(`${import.meta.env.VITE_API_URL}/public/products/${id}`)
            .then(res => setProduct(res.data))
            .catch(err => {
                toast.error("Failed to load product");
                console.error(err);
            });

        axios.get(`${import.meta.env.VITE_API_URL}/products/${id}/reviews`)
            .then(res => {
                setReviews(res.data);
                if (user) {
                    const ownReview = res.data.find(r => r.userEmail === user.email);
                    setUserReview(ownReview || null);
                    if (ownReview) {
                        setRating(ownReview.rating);
                        setComment(ownReview.comment);
                    }
                }
            });

        if (user) {
            axios.get(`${import.meta.env.VITE_API_URL}/watchlist/${user.email}/${id}`)
                .then(res => setWatchlisted(res.data.exists))
                .catch(() => { });
        }

    }, [id, user]);

    const availableDates = Array.from(
        new Set(product?.prices?.map(p => new Date(p.date).toISOString().split("T")[0]))
    ).sort();

    const handleWatchlist = () => {
        axiosSecure.post(`/watchlist`, {
            userEmail: user.email,
            productId: id
        })
            .then(() => {
                setWatchlisted(true);
                toast.success("Added to watchlist!");
            })
            .catch(() => toast.error("Failed to add to watchlist"));
    };

    const handleReviewSubmit = () => {
        if (!rating || !comment.trim()) {
            return toast.error("Add rating and comment");
        }

        const reviewData = {
            rating,
            comment,
            userName: user?.displayName || ""  
        };

        axiosSecure.post(`/products/${id}/reviews`, reviewData)
            .then(res => {
                const updatedReview = res.data;
                setUserReview(updatedReview);
                setReviews(prev => {
                    const otherReviews = prev.filter(r => r.userEmail !== updatedReview.userEmail);
                    return [updatedReview, ...otherReviews];
                });
                toast.success("Review saved");
            })
            .catch(() => toast.error("Failed to submit review"));
    };

    const handleDeleteReview = () => {
        axiosSecure.delete(`/products/${id}/reviews`)
            .then(() => {
                toast.success("Review deleted");
                setUserReview(null);
                setComment("");
                setRating(0);
                setReviews(prev => prev.filter(r => r.userEmail !== user.email));
            })
            .catch(() => toast.error("Failed to delete review"));
    };

    const handleCompare = () => {
        if (!compareDate) return toast.error("Select a date to compare");

        const normalized = new Date(compareDate).toISOString().split("T")[0];
        setLoadingCompare(true);

        axios.get(`${import.meta.env.VITE_API_URL}/products/${id}/compare`, {
            params: { date: normalized }
        })
            .then(res => setCompareData(res.data))
            .catch(err => {
                const msg = err.response?.data?.message;
                if (msg?.includes("No data for selected date")) {
                    toast.warning("🚫 This date doesn’t exist. Try another date.");
                } else {
                    toast.error(msg || "Failed to load comparison data");
                }
                setCompareData([]);
            })
            .finally(() => setLoadingCompare(false));
    };



    if (!product) return <div className="text-center p-8">Loading product details...</div>;

    const priceSummary = getPriceChangeSummary(compareData);


    return (
        <div className="max-w-3xl mx-auto p-6 space-y-6">
            <h1 className="text-3xl font-bold">{product.itemName}</h1>
            <p className="text-sm text-gray-600">
                🏪 {product.marketName} • 📅 {product.date}
            </p>

            <img
                src={product.imageUrl}
                alt={product.itemName}
                className="w-full max-h-80 object-cover rounded-lg"
            />

            <div>
                <h2 className="text-xl font-semibold pt-4">🥕 Items and Prices:</h2>

                <ul className="space-y-1 pl-4">
                    {product.prices?.map((entry, idx) => (
                        <li key={idx}>
                            🗓️ {new Date(entry.date).toLocaleDateString()} — ৳{entry.price}
                        </li>
                    ))}
                </ul>
            </div>

            <p className="font-medium">👨‍🌾 Vendor: {product.vendorName}</p>
            <p className="font-medium">👨‍🌾 Vendor Email: {product.vendorEmail}</p>

            <div className="space-x-2 mt-2">
                <Link to={`/payment/${id}`} className="inline-block">
                    <button className="btn btn-primary">
                        🛒 Buy Product
                    </button>
                </Link>



                <button
                    onClick={handleWatchlist}
                    className="btn btn-outline"
                    disabled={watchlisted}
                >
                    ⭐ Add to Watchlist
                </button>

            </div>

            <div className="pt-6">
                <h2 className="text-xl font-semibold">🗣️ Reviews</h2>

                {user && (
                    <div className="space-y-2 mt-2">
                        <select
                            value={rating}
                            onChange={(e) => setRating(+e.target.value)}
                            className="select select-bordered w-full"
                        >
                            <option value="0">Rate…</option>
                            {[1, 2, 3, 4, 5].map(n => (
                                <option key={n} value={n}>{n} ⭐</option>
                            ))}
                        </select>
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            className="textarea textarea-bordered w-full"
                            placeholder="Your thoughts on the price..."
                        />
                        <div className="flex gap-2">
                            <button
                                onClick={handleReviewSubmit}
                                className="btn btn-sm btn-success"
                            >
                                {userReview ? "Update Review" : "Submit Review"}
                            </button>
                            {userReview && (
                                <button
                                    onClick={handleDeleteReview}
                                    className="btn btn-sm btn-error"
                                >
                                    Delete Review
                                </button>
                            )}
                        </div>
                    </div>
                )}

                {reviews.length ? (
                    reviews.map(r => (
                        <div key={r._id} className="border-t pt-4">
                            <p className="font-semibold">
                                {r.userName || r.userEmail} ⭐ {r.rating} •{" "}
                                {new Date(r.createdAt).toLocaleString()}
                            </p>
                            <p>{r.comment}</p>
                        </div>
                    ))
                ) : (
                    <p>No reviews yet.</p>
                )}
            </div>

            <div className="pt-6 space-y-2">
                <h2 className="text-xl font-semibold">📊 Compare with Previous Data</h2>

                <div className="flex gap-2 items-center">
                    <select
                        value={compareDate}
                        onChange={(e) => setCompareDate(e.target.value)}
                        className="select select-bordered select-sm"
                    >
                        <option value="">Select a date</option>
                        {availableDates.map(date => (
                            <option key={date} value={date}>
                                {date}
                            </option>
                        ))}
                    </select>

                    <button onClick={handleCompare} className="btn btn-sm btn-info" disabled={!compareDate || loadingCompare}>
                        {loadingCompare ? "Loading..." : "Compare"}
                    </button>
                </div>

                {availableDates.length === 0 && (
                    <p className="text-sm text-gray-500 pt-2">⚠️ No available price history to compare.</p>
                )}

                {loadingCompare && (
                    <p className="text-sm text-gray-500 pt-2">📈 Fetching comparison data...</p>
                )}

                {!!compareData.length && (
                    <>
                        <ResponsiveContainer width="100%" height={250}>
                            <LineChart data={compareData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip
                                    content={({ active, payload }) => {
                                        if (active && payload && payload.length) {
                                            const [curr] = payload;
                                            return (
                                                <div className="bg-white p-2 border shadow text-sm text-black">
                                                    <p><strong>Date:</strong> {curr.payload.date}</p>
                                                    <p>
                                                        <strong>Price:</strong>{" "}
                                                        <span className="font-semibold text-blue-600">৳{curr.payload.price}</span>
                                                    </p>
                                                </div>
                                            );
                                        }
                                        return null;
                                    }}
                                />
                                <Line type="monotone" dataKey="price" stroke="#3B82F6" strokeWidth={2} dot={{ r: 5 }} />
                                {priceSummary && (
                                    <ReferenceLine y={priceSummary.previousPrice} stroke="red" strokeDasharray="5 5" label="Previous Price" />
                                )}
                            </LineChart>
                        </ResponsiveContainer>

                        {priceSummary && (
                            <p className={`text-sm font-medium pt-2 ${priceSummary.color}`}>
                                📈 {priceSummary.message}
                            </p>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default ProductDetailsPage;