import React, { useState } from "react";
import logo from "../assets/WhatsApp_Image_2025-08-29_at_15.54.50_068a4ff8-removebg-preview (1).png";
import "./ApplicationForm.css";
import { uploadToCloudinary } from "../services/cloudinaryService.js";
import emailjs from "@emailjs/browser";
import { jsPDF } from "jspdf";

emailjs.init(import.meta.env.VITE_APP_EMAILS_USER_ID_APPLICATION);

const ApplicationForm = () => {
    const [step, setStep] = useState(1);

    const [formData, setFormData] = useState({
        // Personal
        name: "",
        sex: "",
        dateOfBirth: "",
        placeOfBirth: "",
        nationality: "",
        stateOfOrigin: "",
        lga: "",
        homeAddress: "",
        email: "",
        passport: null,

        // Guardian
        fatherName: "",
        fatherOccupation: "",
        fatherPhone: "",
        fatherOffice: "",
        motherName: "",
        motherOccupation: "",
        motherPhone: "",
        motherOffice: "",
        religion: "",
        whoPaysFees: "",

        // Health
        disabilityAcquired: false,
        disabilityAtBirth: false,
        hearingImpaired: false,
        visuallyImpaired: false,
        physicallyChallenged: false,
        multipleChallenged: false,
        otherDisability: "",
        healthInstitution: "",
        onSpecialMedications: "",
        medicationFrequency: "",
        otherMedicalInfo: "",
        experiences: {
            restlessness: false,
            sleeplessness: false,
            convulsion: false,
            lackOfConcentration: false,
        },

        // Religious Guidance
        religiousGuidance: {
            role: "",
            name: "",
            phone: "",
            address: "",
            signature: null,
        },
    });

    // Handlers
    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        if (files && files.length > 0) {
            setFormData((prev) => ({ ...prev, [name]: files[0] }));
        } else if (type === "checkbox") {
            setFormData((prev) => ({ ...prev, [name]: checked }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleNestedChange = (section, e) => {
        const { name, value, type, checked, files } = e.target;
        setFormData((prev) => {
            const sectionData = { ...prev[section] };
            if (files && files.length > 0) {
                sectionData[name] = files[0];
            } else if (type === "checkbox") {
                sectionData[name] = checked;
            } else {
                sectionData[name] = value;
            }
            return { ...prev, [section]: sectionData };
        });
    };

    const handleExperienceChange = (e) => {
        const { name, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            experiences: { ...prev.experiences, [name]: checked },
        }));
    };

    // Navigation
    const nextStep = () => setStep((s) => Math.min(s + 1, 4));
    const prevStep = () => setStep((s) => Math.max(s - 1, 1));
    const goToStep = (n) => setStep(() => Math.max(1, Math.min(4, n)));

    // Submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Upload images
            const passportUrl = formData.passport
                ? await uploadToCloudinary(formData.passport)
                : null;
            const signatureUrl = formData.religiousGuidance.signature
                ? await uploadToCloudinary(formData.religiousGuidance.signature)
                : null;

            // Generate PDF
            const doc = new jsPDF();
            let y = 15;
            doc.setFontSize(16);
            doc.text("APPLICATION FORM", 10, y);
            y += 10;

            // Personal Data
            doc.setFontSize(12);
            doc.text("=== Personal Data ===", 10, y);
            y += 10;
            doc.text(`Name: ${formData.name}`, 10, y);
            y += 10;
            doc.text(`Sex: ${formData.sex}`, 10, y);
            y += 10;
            doc.text(`Date of Birth: ${formData.dateOfBirth}`, 10, y);
            y += 10;
            doc.text(`Place of Birth: ${formData.placeOfBirth}`, 10, y);
            y += 10;
            doc.text(`Nationality: ${formData.nationality}`, 10, y);
            y += 10;
            doc.text(`State of Origin: ${formData.stateOfOrigin}`, 10, y);
            y += 10;
            doc.text(`LGA: ${formData.lga}`, 10, y);
            y += 10;
            doc.text(`Home Address: ${formData.homeAddress}`, 10, y);
            y += 10;
            doc.text(`Email: ${formData.email}`, 10, y);
            y += 10;

            if (passportUrl) {
                const img = new Image();
                img.src = passportUrl;
                await new Promise((resolve) => {
                    img.onload = () => {
                        doc.addImage(img, "JPEG", 150, 15, 40, 40);
                        resolve();
                    };
                });
            }

            // Guardian Info
            y += 10;
            doc.text("=== Guardian Info ===", 10, y);
            y += 10;
            doc.text(`Father: ${formData.fatherName}, ${formData.fatherOccupation}, ${formData.fatherPhone}`, 10, y);
            y += 10;
            doc.text(`Father Office: ${formData.fatherOffice}`, 10, y);
            y += 10;
            doc.text(`Mother: ${formData.motherName}, ${formData.motherOccupation}, ${formData.motherPhone}`, 10, y);
            y += 10;
            doc.text(`Mother Office: ${formData.motherOffice}`, 10, y);
            y += 10;
            doc.text(`Religion: ${formData.religion}`, 10, y);
            y += 10;
            doc.text(`Who pays fees: ${formData.whoPaysFees}`, 10, y);
            y += 10;

            // Health Info
            doc.text("=== Health Info ===", 10, y);
            y += 10;
            Object.entries({
                "Disability Acquired": formData.disabilityAcquired,
                "Disability At Birth": formData.disabilityAtBirth,
                "Hearing Impaired": formData.hearingImpaired,
                "Visually Impaired": formData.visuallyImpaired,
                "Physically Challenged": formData.physicallyChallenged,
                "Multiple Challenged": formData.multipleChallenged,
            }).forEach(([key, val]) => {
                doc.text(`${key}: ${val ? "Yes" : "No"}`, 10, y);
                y += 10;
            });
            doc.text(`Other Disability: ${formData.otherDisability}`, 10, y);
            y += 10;
            doc.text(`Health Institution: ${formData.healthInstitution}`, 10, y);
            y += 10;
            doc.text(`On Special Medications: ${formData.onSpecialMedications}`, 10, y);
            y += 10;
            doc.text(`Medication Frequency: ${formData.medicationFrequency}`, 10, y);
            y += 10;
            doc.text(`Other Medical Info: ${formData.otherMedicalInfo}`, 10, y);
            y += 10;

            doc.text("Experiences:", 10, y);
            y += 10;
            Object.entries(formData.experiences).forEach(([key, value]) => {
                doc.text(`${key}: ${value ? "Yes" : "No"}`, 10, y);
                y += 10;
            });

            // Religious Guidance
            doc.text("=== Religious Guidance ===", 10, y);
            y += 10;
            doc.text(`Role: ${formData.religiousGuidance.role}`, 10, y);
            y += 10;
            doc.text(`Name: ${formData.religiousGuidance.name}`, 10, y);
            y += 10;
            doc.text(`Phone: ${formData.religiousGuidance.phone}`, 10, y);
            y += 10;
            doc.text(`Address: ${formData.religiousGuidance.address}`, 10, y);
            y += 10;

            if (signatureUrl) {
                const sig = new Image();
                sig.src = signatureUrl;
                await new Promise((resolve) => {
                    sig.onload = () => {
                        doc.addImage(sig, "JPEG", 150, y - 20, 40, 20);
                        resolve();
                    };
                });
            }

            const pdfBlob = doc.output("blob");
            const pdfFile = new File([pdfBlob], "application.pdf", { type: "application/pdf" });
            const pdfUrl = await uploadToCloudinary(pdfFile);

            // Send emails
            await emailjs.send(
                import.meta.env.VITE_APP_EMAILS_SERVICE_ID_APPLICATION,
                import.meta.env.VITE_APP_EMAILS_TEMPLATE_ID_APPLICATION,
                { parent_name: formData.name, parent_email: formData.email, pdf_link: pdfUrl }
            );

            await emailjs.send(
                import.meta.env.VITE_APP_EMAILS_SERVICE_ID_APPLICATION,
                import.meta.env.VITE_APP_EMAILS_ADMIN_TEMPLATE_ID_APPLICATION,
                { parent_name: formData.name, parent_email: formData.email, pdf_link: pdfUrl }
            );

            alert("✅ Application submitted successfully!");
        } catch (error) {
            console.error("Submission error:", error);
            alert("❌ Failed to submit application.");
        }
    };

    return (
        <div className="form-container">
            <header className="form-header">
                <div className="logo-section">
                    <img src={logo} alt="EL-OLAM Logo" className="logo" />
                </div>
                <div className="header-text">
                    <h1>EL-OLAM SPECIAL HOME AND <br /> REHABILITATION CENTER</h1>
                    <p className="cac-number">CAC IT NO: 156872</p>
                    <p className="contact-info">📞 08025613422, 08122646941 | ✉️ elolamspecialhome@gmail.com</p>
                    <p className="subtitle">APPLICATION FORM</p>
                </div>
                <div className="passport-box">
                    {formData.passport ? (
                        <img
                            src={URL.createObjectURL(formData.passport)}
                            alt="Passport Preview"
                            className="passport-preview"
                        />
                    ) : (
                        <div className="passport-placeholder">Passport</div>
                    )}
                    <input
                        type="file"
                        name="passport"
                        accept="image/*"
                        onChange={handleChange}
                    />
                </div>
            </header>

            {/* Progress Arrows */}
            <div className="progress-arrows">
                {["Personal", "Guardian", "Health", "Religious"].map((label, i) => (
                    <button
                        key={i}
                        type="button"
                        className={`step-pill ${step === i + 1 ? "active" : ""}`}
                        onClick={() => goToStep(i + 1)}
                    >
                        {label} {i < 3 ? "→" : ""}
                    </button>
                ))}
            </div>

            {/* Form Steps */}
            <form className="form-card" onSubmit={handleSubmit}>
                {/* STEP 1 - Personal */}
                {step === 1 && (
                    <section className="section">
                        <h2>PERSONAL DATA</h2>
                        <div className="grid">
                            <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
                            <div className="radio-group">
                                <label><input type="radio" name="sex" value="Male" checked={formData.sex==="Male"} onChange={handleChange} /> Male</label>
                                <label><input type="radio" name="sex" value="Female" checked={formData.sex==="Female"} onChange={handleChange} /> Female</label>
                            </div>
                            <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} />
                            <input name="placeOfBirth" placeholder="Place of Birth" value={formData.placeOfBirth} onChange={handleChange} />
                            <input name="nationality" placeholder="Nationality" value={formData.nationality} onChange={handleChange} />
                            <input name="stateOfOrigin" placeholder="State of Origin" value={formData.stateOfOrigin} onChange={handleChange} />
                            <input name="lga" placeholder="LGA" value={formData.lga} onChange={handleChange} />
                            <textarea name="homeAddress" placeholder="Home Address" value={formData.homeAddress} onChange={handleChange} />
                            <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} />
                            {/*<input type="file" name="passport" accept="image/*" onChange={handleChange} />*/}
                        </div>
                    </section>
                )}

                {/* STEP 2 - Guardian */}
                {step === 2 && (
                    <section className="section">
                        <h2>GUARDIAN</h2>
                        <div className="grid">
                            <input name="fatherName" placeholder="Father's Name" value={formData.fatherName} onChange={handleChange} />
                            <input name="fatherOccupation" placeholder="Father's Occupation" value={formData.fatherOccupation} onChange={handleChange} />
                            <input name="fatherPhone" placeholder="Father's Phone" value={formData.fatherPhone} onChange={handleChange} />
                            <input name="fatherOffice" placeholder="Father's Office" value={formData.fatherOffice} onChange={handleChange} />
                            <input name="motherName" placeholder="Mother's Name" value={formData.motherName} onChange={handleChange} />
                            <input name="motherOccupation" placeholder="Mother's Occupation" value={formData.motherOccupation} onChange={handleChange} />
                            <input name="motherPhone" placeholder="Mother's Phone" value={formData.motherPhone} onChange={handleChange} />
                            <input name="motherOffice" placeholder="Mother's Office" value={formData.motherOffice} onChange={handleChange} />
                            <input name="religion" placeholder="Religion" value={formData.religion} onChange={handleChange} />
                            <input name="whoPaysFees" placeholder="Who pays the child’s fees?" value={formData.whoPaysFees} onChange={handleChange} />
                        </div>
                    </section>
                )}

                {/* STEP 3 - Health */}
                {step === 3 && (
                    <section className="section">
                        <h2>HEALTH INFORMATION</h2>
                        <div className="inline-checkboxes">
                            <label><input type="checkbox" name="disabilityAcquired" checked={formData.disabilityAcquired} onChange={handleChange} /> Disability Acquired</label>
                            <label><input type="checkbox" name="disabilityAtBirth" checked={formData.disabilityAtBirth} onChange={handleChange} /> Disability at Birth</label>
                        </div>
                        <div className="inline-checkboxes">
                            <label><input type="checkbox" name="hearingImpaired" checked={formData.hearingImpaired} onChange={handleChange} /> Hearing Impaired</label>
                            <label><input type="checkbox" name="visuallyImpaired" checked={formData.visuallyImpaired} onChange={handleChange} /> Visually Impaired</label>
                            <label><input type="checkbox" name="physicallyChallenged" checked={formData.physicallyChallenged} onChange={handleChange} /> Physically Challenged</label>
                            <label><input type="checkbox" name="multipleChallenged" checked={formData.multipleChallenged} onChange={handleChange} /> Multiple Challenged</label>
                        </div>
                        <input name="otherDisability" placeholder="Other Disability" value={formData.otherDisability} onChange={handleChange} />
                        <input name="healthInstitution" placeholder="Health Institution Visited" value={formData.healthInstitution} onChange={handleChange} />
                        <div className="radio-group">
                            <span>On Special Medications?</span>
                            <label><input type="radio" name="onSpecialMedications" value="Yes" checked={formData.onSpecialMedications==="Yes"} onChange={handleChange} /> Yes</label>
                            <label><input type="radio" name="onSpecialMedications" value="No" checked={formData.onSpecialMedications==="No"} onChange={handleChange} /> No</label>
                        </div>
                        <input name="medicationFrequency" placeholder="Medication Frequency" value={formData.medicationFrequency} onChange={handleChange} />
                        <input name="otherMedicalInfo" placeholder="Other Medical Info" value={formData.otherMedicalInfo} onChange={handleChange} />
                        <div className="inline-checkboxes">
                            {Object.keys(formData.experiences).map((exp) => (
                                <label key={exp}>
                                    <input type="checkbox" name={exp} checked={formData.experiences[exp]} onChange={handleExperienceChange} /> {exp}
                                </label>
                            ))}
                        </div>
                    </section>
                )}

                {/* STEP 4 - Religious Guidance */}
                {step === 4 && (
                    <section className="section">
                        <h2>RELIGIOUS GUIDANCE</h2>
                        <select name="role" value={formData.religiousGuidance.role} onChange={(e)=>handleNestedChange("religiousGuidance", e)}>
                            <option value="">Select Role</option>
                            <option value="Pastor">Pastor</option>
                            <option value="Imam">Imam</option>
                        </select>
                        <input name="name" placeholder="Full Name" value={formData.religiousGuidance.name} onChange={(e)=>handleNestedChange("religiousGuidance", e)} />
                        <input name="phone" placeholder="Phone Number" value={formData.religiousGuidance.phone} onChange={(e)=>handleNestedChange("religiousGuidance", e)} />
                        <textarea name="address" placeholder="Address" value={formData.religiousGuidance.address} onChange={(e)=>handleNestedChange("religiousGuidance", e)} />
                        <input type="file" name="signature" accept="image/*" onChange={(e)=>handleNestedChange("religiousGuidance", e)} />
                    </section>
                )}

                {/* Navigation */}
                <div className="navigation">
                    <div className="nav-left">
                        {step > 1 && (
                            <button type="button" className="nav-btn" onClick={prevStep}>
                                ← Back
                            </button>
                        )}
                    </div>
                    <div className="nav-right">
                        {step < 4 ? (
                            <button type="button" className="nav-btn" onClick={nextStep}>
                                Next →
                            </button>
                        ) : (
                            <button type="submit" className="submit-btn">
                                Submit Application
                            </button>
                        )}
                    </div>
                </div>
            </form>
        </div>
    );
};

export default ApplicationForm;
