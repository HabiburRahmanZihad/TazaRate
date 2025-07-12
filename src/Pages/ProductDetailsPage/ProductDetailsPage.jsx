import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import axios from "axios";
import Swal from "sweetalert2";
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
import { FaStore, FaCalendarAlt, FaEnvelope, FaUserAlt, FaTrash, FaEdit, FaStar, FaComments, FaShoppingCart, FaCheck, FaClock } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import useUserRole from "../../hooks/useUserRole";
import NoFound from "../../Components/NoFound/NoFound";
import Loading from "../../Components/Loader/Loading";

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
    const axiosSecure = useAxiosSecure();
    const { role, roleLoading } = useUserRole();
    const [product, setProduct] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [watchlisted, setWatchlisted] = useState(false);
    const [userReview, setUserReview] = useState(null);
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState(0);
    const [compareDate, setCompareDate] = useState("");
    const [compareData, setCompareData] = useState([]);
    const [loadingCompare, setLoadingCompare] = useState(false);

    useEffect(() => {
        if (!id) return;
        axios.get(`${import.meta.env.VITE_API_URL}/public/products/${id}`)
            .then(res => setProduct(res.data))
            .catch(() => toast.error("Failed to load product"));
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

    const handleWatchlist = () => {
        axiosSecure.post(`/watchlist`, { userEmail: user.email, productId: id })
            .then(() => {
                setWatchlisted(true);
                toast.success("Added to watchlist!");
            })
            .catch(() => toast.error("Failed to add to watchlist"));
    };

    const handleReviewSubmit = () => {
        if (!rating || !comment.trim()) {
            toast.error("Please fill in all fields.");
            return;
        }
        const reviewData = { rating, comment, userName: user?.displayName || "" };
        axiosSecure.post(`/products/${id}/reviews`, reviewData)
            .then(res => {
                const updatedReview = res.data;
                setUserReview(updatedReview);
                setReviews(prev => {
                    const others = prev.filter(r => r.userEmail !== updatedReview.userEmail);
                    return [updatedReview, ...others];
                });
                Swal.fire({ icon: "success", title: "Thank you!", text: "Review submitted successfully!", confirmButtonColor: "#28A745" });
            })
            .catch(() => toast.error("Failed to submit review"));
    };

    const handleDeleteReview = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "This will delete your review.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Cancel",
            confirmButtonColor: "#d33",
            cancelButtonColor: "#aaa",
        }).then(result => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/products/${id}/reviews`)
                    .then(() => {
                        Swal.fire("Deleted!", "Your review has been removed.", "success");
                        setUserReview(null);
                        setComment("");
                        setRating(0);
                        setReviews(prev => prev.filter(r => r.userEmail !== user.email));
                    })
                    .catch(() => toast.error("Failed to delete review"));
            }
        });
    };

    const handleCompare = () => {
        if (!compareDate) return toast.error("Select a date to compare");
        setLoadingCompare(true);
        const formatted = new Date(compareDate).toISOString().split("T")[0];
        axios.get(`${import.meta.env.VITE_API_URL}/products/${id}/compare`, { params: { date: formatted } })
            .then(res => setCompareData(res.data))
            .catch(err => {
                const msg = err.response?.data?.message;
                if (msg?.includes("No data for selected date")) {
                    toast.warning("No data found for selected date.");
                } else {
                    toast.error(msg || "Failed to load comparison data");
                }
                setCompareData([]);
            })
            .finally(() => setLoadingCompare(false));
    };

    if (!product) return <Loading />;

    const availableDates = Array.from(new Set(product?.prices?.map(p => new Date(p.date).toISOString().split("T")[0]))).sort();
    const priceSummary = getPriceChangeSummary(compareData);

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
            {/* Product Info Section */}
            <section className="bg-white rounded-2xl shadow-lg p-6 md:p-8 space-y-6">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <img
                        src={product.imageUrl}
                        alt={product.itemName}
                        className="w-full h-64 object-cover rounded-xl border"
                    />
                    <div className="space-y-4">
                        <h1 className="text-3xl font-extrabold text-primary">{product.itemName}</h1>
                        <p className=" text-gray-600 flex items-center gap-2"><FaStore className="text-accent" /> {product.marketName}</p>
                        <p className=" text-gray-600 flex items-center gap-2"><FaCalendarAlt className="text-accent" /> {product.date}</p>
                        <p className=" text-gray-600 flex items-center gap-2"><FaUserAlt className="text-accent" /> {product.vendorName}</p>
                        <p className=" text-gray-600 flex items-center gap-2"><FaEnvelope className="text-accent" /> {product.vendorEmail}</p>
                    </div>
                </div>
            </section>

            {/* Price History + Chart */}
            <section className="bg-white rounded-2xl shadow-lg p-6 md:p-8 grid md:grid-cols-2 gap-10">
                {/* Price History List */}
                <div>
                    <h2 className="text-xl font-semibold mb-4 text-primary">Price History</h2>
                    <ul className="space-y-2">
                        {product.prices?.map((entry, idx) => (
                            <li key={idx} className="text-sm text-gray-700 flex items-center gap-2">
                                <FaCalendarAlt className="text-accent" />
                                <span>{new Date(entry.date).toLocaleDateString()}</span>
                                <span className="font-semibold text-primary">৳{entry.price}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Chart and Compare */}
                <div>
                    <h2 className="text-xl font-semibold mb-4 text-primary">Compare Price</h2>
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                        <select
                            value={compareDate}
                            onChange={(e) => setCompareDate(e.target.value)}
                            className="select select-bordered  w-44"
                        >
                            <option value="">Select a date</option>
                            {availableDates.map(date => (
                                <option key={date} value={date}>{date}</option>
                            ))}
                        </select>
                        <button
                            onClick={handleCompare}
                            className="btn  btn-accent text-white"
                            disabled={!compareDate || loadingCompare}
                        >
                            {loadingCompare ? "Loading..." : "Compare"}
                        </button>
                    </div>

                    {compareData.length > 0 && (
                        <>
                            <ResponsiveContainer width="100%" height={250}>
                                <LineChart data={compareData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="date" />
                                    <YAxis />
                                    <Tooltip />
                                    <Line
                                        type="monotone"
                                        dataKey="price"
                                        stroke="#3C7A4F"
                                        strokeWidth={2}
                                        dot={{ r: 4 }}
                                    />
                                    {priceSummary && (
                                        <ReferenceLine
                                            y={priceSummary.previousPrice}
                                            stroke="red"
                                            strokeDasharray="5 5"
                                            label="Previous Price"
                                        />
                                    )}
                                </LineChart>
                            </ResponsiveContainer>
                            {priceSummary && (
                                <p className={`pt-2 font-medium ${priceSummary.color}`}>
                                    <FaCheck className="inline mr-1" />{priceSummary.message}
                                </p>
                            )}
                        </>
                    )}
                </div>
            </section>

            {/* Review Section */}
            <section className="bg-white rounded-2xl shadow-lg p-6 md:p-8 space-y-6">
                <h2 className="text-xl font-semibold text-primary flex items-center gap-2">
                    <FaComments className="text-accent" /> Reviews
                </h2>

                {user && (
                    <div className="space-y-3">
                        <select
                            value={rating}
                            onChange={(e) => setRating(+e.target.value)}
                            className="select select-bordered w-full"
                        >
                            <option value="0">Rate…</option>
                            {[1, 2, 3, 4, 5].map(n => (
                                <option key={n} value={n}>{n} Star{n > 1 && 's'}</option>
                            ))}
                        </select>
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            className="textarea textarea-bordered w-full"
                            placeholder="Write your review..."
                            rows={3}
                        />
                        <div className="flex flex-wrap gap-2">
                            <button onClick={handleReviewSubmit} className="btn btn-primary text-neutral btn-sm">
                                {userReview ? <><FaEdit className="inline mr-1" /> Update</> : <><FaCheck className="inline mr-1" /> Submit</>}
                            </button>
                            {userReview && (
                                <button onClick={handleDeleteReview} className="btn btn-error btn-sm">
                                    <FaTrash className="inline mr-1" /> Delete
                                </button>
                            )}
                        </div>
                    </div>
                )}

                <div className="space-y-4 border-t pt-4">
                    {reviews.length ? reviews.map(r => (
                        <div key={r._id} className="space-y-1">
                            <p className="text-sm font-semibold text-neutral">
                                {r.userName || r.userEmail} — <FaStar className="inline text-yellow-500" /> {r.rating} ★
                                <span className="text-xs text-gray-400 ml-2">{new Date(r.createdAt).toLocaleString()}</span>
                            </p>
                            <p className="text-sm text-gray-700">{r.comment}</p>
                        </div>
                    )) : (
                        <NoFound
                            type="user"
                            title="No Reviews Found"
                            message="want to be the first one to review this product."
                        />
                    )}
                </div>
            </section>

            {/* Action Buttons */}
            {!roleLoading && role === "user" && (
                <div className="text-center space-x-3">
                    <Link to={`/payment/${id}`}>
                        <button className="btn btn-accent text-white"><FaShoppingCart className="inline mr-1" /> Buy Now</button>
                    </Link>
                    <button
                        onClick={handleWatchlist}
                        className={`btn ${watchlisted ? 'btn-outline' : 'btn-outline'} ml-2`}
                        disabled={watchlisted}
                    >
                        {watchlisted ? (
                            <><FaStar className="inline text-primary" /> In Watchlist</>
                        ) : (
                            <><FaStar className="inline" /> Add to Watchlist</>
                        )}
                    </button>
                </div>
            )}
        </div>
    );

};

export default ProductDetailsPage;