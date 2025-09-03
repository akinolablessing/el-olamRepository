import React, { useState } from "react";
import { Upload, File, X, Loader2 } from "lucide-react";
import "./FileUpload.css";

export default function FileUpload({ onUpload, isSubmitting, acceptedTypes, maxSize }) {
    const [selectedFile, setSelectedFile] = useState(null);
    const [studentName, setStudentName] = useState("");
    const [studentEmail, setStudentEmail] = useState("");
    const [isDragOver, setIsDragOver] = useState(false);
    const [errors, setErrors] = useState({});

    const validateFile = (file) => {
        const newErrors = {};
        if (!acceptedTypes.includes(file.type)) {
            newErrors.file = "Please upload a PDF, JPG, or PNG file";
        }
        if (file.size > maxSize) {
            newErrors.file = `File size must be less than ${maxSize / 1024 / 1024}MB`;
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateForm = () => {
        const newErrors = {};
        if (!studentName.trim()) {
            newErrors.name = "Student name is required";
        }
        if (!studentEmail.trim()) {
            newErrors.email = "Student email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(studentEmail)) {
            newErrors.email = "Please enter a valid email address";
        }
        if (!selectedFile) {
            newErrors.file = "Please select a file to upload";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleFileSelect = (file) => {
        if (validateFile(file)) {
            setSelectedFile(file);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragOver(false);
        const files = Array.from(e.dataTransfer.files);
        if (files.length > 0) {
            handleFileSelect(files[0]);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragOver(false);
    };

    const handleFileChange = (e) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            handleFileSelect(files[0]);
        }
    };

    const handleSubmit = async () => {
        if (!validateForm()) {
            alert("Please correct the errors before submitting.");
            return;
        }
        try {
            await onUpload(selectedFile, studentName, studentEmail);
        } catch (error) {
            console.error("Upload error:", error);
        }
    };

    const removeFile = () => {
        setSelectedFile(null);
        setErrors((prev) => ({ ...prev, file: "" }));
    };

    const formatFileSize = (bytes) => {
        if (bytes === 0) return "0 Bytes";
        const k = 1024;
        const sizes = ["Bytes", "KB", "MB", "GB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
    };

    return (
        <div className="upload-container">
            <div className="input-grid">
                <div>
                    <label>Parent Name *</label>
                    <input
                        type="text"
                        className={`input ${errors.name ? "input-error" : ""}`}
                        value={studentName}
                        onChange={(e) => setStudentName(e.target.value)}
                        disabled={isSubmitting}
                    />
                    {errors.name && <p className="error-text">{errors.name}</p>}
                </div>

                <div>
                    <label>Parent Email *</label>
                    <input
                        type="email"
                        className={`input ${errors.email ? "input-error" : ""}`}
                        value={studentEmail}
                        onChange={(e) => setStudentEmail(e.target.value)}
                        disabled={isSubmitting}
                    />
                    {errors.email && <p className="error-text">{errors.email}</p>}
                </div>
            </div>

            <div>
                <label>Payment Receipt *</label>
                {!selectedFile ? (
                    <div
                        className={`drop-area ${isDragOver ? "drag-over" : ""}`}
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                    >
                        <Upload className="icon" />
                        <p>
                            Drop your receipt here, or{" "}
                            <label className="browse-text">
                                browse files
                                <input type="file" className="hidden" accept={acceptedTypes.join(",")} onChange={handleFileChange} />
                            </label>
                        </p>
                        <p className="hint">PDF, JPG, PNG up to {maxSize / 1024 / 1024}MB</p>
                    </div>
                ) : (
                    <div className="file-preview">
                        <div className="file-info">
                            <File className="file-icon" />
                            <div>
                                <p className="file-name">{selectedFile.name}</p>
                                <p className="file-size">{formatFileSize(selectedFile.size)}</p>
                            </div>
                        </div>
                        {!isSubmitting && (
                            <button className="remove-btn" onClick={removeFile}>
                                <X />
                            </button>
                        )}
                    </div>
                )}
                {errors.file && <p className="error-text">{errors.file}</p>}
            </div>

            <button onClick={handleSubmit} disabled={isSubmitting} className="submit-btn">
                {isSubmitting ? (
                    <>
                        <Loader2 className="spinner" /> Sending Receipt...
                    </>
                ) : (
                    <>
                        <Upload /> Submit Receipt
                    </>
                )}
            </button>
        </div>
    );
}
