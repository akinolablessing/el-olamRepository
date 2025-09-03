import emailjs from "emailjs-com";
import {uploadToCloudinary} from "./cloudinaryService.js";

emailjs.init(import.meta.env.VITE_APP_EMAILS_USER_ID);


export async function uploadReceipt(file, parentName, parentEmail) {
    if (!file) return { success: false, message: "No file provided" };

    try {
        const fileURL = await uploadToCloudinary(file);
        if (!fileURL) throw new Error("Failed to upload file");

        const templateParams = {
            parent_name: parentName,
            parent_email: parentEmail,
            file_name: file.name,
            file_link: fileURL
        };

        // console.log("Sending email with params:", templateParams);

        await emailjs.send(
            import.meta.env.VITE_APP_EMAILS_SERVICE_ID,
            import.meta.env.VITE_APP_EMAILS_TEMPLATE_ID,
            templateParams
        );

        return {
            success: true,
            message: "Receipt sent successfully via email!",
        };
    } catch (error) {
        console.error("Error in uploadReceipt: ", error);
        return { success: false, message: "Failed to send email." };
    }
}