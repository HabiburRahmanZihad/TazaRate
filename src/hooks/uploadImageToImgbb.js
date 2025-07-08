import axios from "axios";

const uploadImageToImgbb = async (imageFile) => {
    const apiKey = import.meta.env.VITE_IMGBB_API_KEY;

    // 🔐 1. Ensure API key is available (avoid silent failure)
    if (!apiKey) {
        throw new Error("Missing imgbb API key");
    }

    // 📦 2. Create FormData with the selected image
    const formData = new FormData();
    formData.append('image', imageFile);

    // 🌐 3. Upload to imgbb using axios
    const response = await axios.post(`https://api.imgbb.com/1/upload?key=${apiKey}`, formData);

    // ✅ 4. Check if upload was successful and return the image URL
    if (response.data && response.data.success) {
        return response.data.data.display_url;
    } else {
        // ❌ If upload failed, throw a meaningful error
        throw new Error("Image upload failed");
    }
};

export default uploadImageToImgbb;