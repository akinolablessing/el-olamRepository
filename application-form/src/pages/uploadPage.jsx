import React, {useState} from "react";
import FileUpload from "../components/FileUploads.jsx";
import { useUpload } from "../hooks/useUpload";
import { Toaster } from "react-hot-toast";
import "../styles/index.css";
import logo from "../assets/WhatsApp_Image_2025-08-29_at_15.54.50_068a4ff8-removebg-preview (1).png";
import {uploadReceipt} from "../services/uploadService.js";

export default function UploadPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleUpload = async (file, parentName, parentEmail) => {
        setIsSubmitting(true);
        try {
            await uploadReceipt(file, parentName, parentEmail);
            alert("Receipt sent successfully!");
        } catch (error) {
            console.error("Error sending receipt:", error);
            alert("Failed to send receipt. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };
    return (
        <div className="upload-container">
            <div className="upload-card">
                <div className="logo-container">
                    <img src={logo} alt="University Logo" className="university-logo"/>
                </div>
                <h1 className="upload-title">Upload Your Payment Receipt</h1>
                <FileUpload
                    onUpload={handleUpload}
                    isSubmitting={isSubmitting}
                    acceptedTypes={["application/pdf", "image/jpeg", "image/png"]}
                    maxSize={5 * 1024 * 1024}
                />
                <Toaster position="top-right" reverseOrder={false}/>
            </div>
        </div>
    );
}
