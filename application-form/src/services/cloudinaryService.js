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

export const uploadPdfToCloudinary = async (file) => {
    if (!file) return null;

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "unsigned_upload");

    const res = await fetch(
        "https://api.cloudinary.com/v1_1/dn8i1tpih/raw/upload",
        {
            method: "POST",
            body: data,
        }
    );

    if (!res.ok) {
        console.error("Cloudinary upload failed:", await res.text());
        throw new Error("Cloudinary upload failed");
    }

    const json = await res.json();
    return json.secure_url;
};

