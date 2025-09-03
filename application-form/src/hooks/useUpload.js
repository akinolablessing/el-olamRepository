import { useState } from "react";
import { uploadReceipt } from "../services/uploadService";
import toast from "react-hot-toast";

export function useUpload() {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleUpload = async (file, studentName, studentEmail) => {
        setIsSubmitting(true);
        try {
            await uploadReceipt(file, studentName, studentEmail);
            toast.success("Receipt submitted successfully!");
        } catch (error) {
            console.error("Upload error:", error);
            toast.error("Failed to send receipt. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return { handleUpload, isSubmitting };
}
