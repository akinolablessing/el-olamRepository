import emailjs from "@emailjs/browser";
import {uploadToCloudinary} from "./cloudinaryService.js";

emailjs.init(import.meta.env.VITE_APP_EMAILS_USER_ID);


export async function uploadReceipt(file, parentName, parentEmail) {
    if (!file) return { success: false, message: "No file provided" };

    try {
        const fileURL = await uploadToCloudinary(file);
        if (!fileURL) throw new Error("Failed to upload file");
        // console.log("SERVICE ID is:", import.meta.env.VITE_APP_EMAILS_SERVICE_ID);
        const templateParams = {
            parent_name: parentName,
            parent_email: parentEmail,
            file_name: file.name,
            file_link: fileURL
        };


        await emailjs.send(
            import.meta.env.VITE_APP_EMAILS_SERVICE_ID,
            import.meta.env.VITE_APP_EMAILS_TEMPLATE_ID,
            templateParams
        );
        const adminParams ={
            parent_name: parentName,
            parent_email: parentEmail,
            file_name: file.name,
            file_link: fileURL,
            admin_email:"elolamspecialandrehabilitation@gmail.com",
        };
        await emailjs.send(
            import.meta.env.VITE_APP_EMAILS_SERVICE_ID,
            import.meta.env.VITE_APP_EMAILS_TEMPLATE_ADMIN_ID,
            adminParams
        );

        return {
            success: true,
            message: "Receipt sent to parent and admin successfully!",
        };
    } catch (error) {
        console.error("Error in uploadReceipt: ", error);
        return { success: false, message: "Failed to send email." };
    }
}