import { motion } from "framer-motion";
import { FaBoxOpen, FaUserAltSlash, FaShoppingBag, FaBan } from "react-icons/fa";

const icons = {
    user: FaUserAltSlash,
    product: FaBoxOpen,
    order: FaShoppingBag,
    default: FaBan,
};

const NoFound = ({ type = "default", title = "Nothing Found", message = "Try adjusting your search or filters." }) => {
    const Icon = icons[type] || icons.default;

    return (
        <motion.div
            className="flex flex-col items-center justify-center text-center py-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Icon className="text-5xl text-secondary mb-4" />
            <h2 className="text-xl font-bold text-neutral mb-1">{title}</h2>
            <p className="text-sm text-neutral/60 max-w-sm">{message}</p>
        </motion.div>
    );
};

export default NoFound;