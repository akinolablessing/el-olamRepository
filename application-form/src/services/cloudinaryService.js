import axios from "axios";

export async function uploadToCloudinary(file) {
    if (!file) return null;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "unsigned_upload");

    try {
        const res = await axios.post(
            "https://api.cloudinary.com/v1_1/dn8i1tpih/auto/upload",
            formData
        );
        return res.data.secure_url;
    } catch (err) {
        console.error("Cloudinary upload error:", err);
        return null;
    }
}
