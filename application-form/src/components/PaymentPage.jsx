import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "./logo.png"; // Replace with your logo path
import "./FileUpload.css";

const PaymentPage = () => {
    const navigate = useNavigate();

    const accounts = [
        { bank: "First Bank", accountName: "EL-OLAM SPECIAL HOME", accountNumber: "1234567890" },
        { bank: "UBA", accountName: "EL-OLAM SPECIAL HOME", accountNumber: "0987654321" },
        { bank: "GTBank", accountName: "EL-OLAM SPECIAL HOME", accountNumber: "2345678901" },
        { bank: "Access Bank", accountName: "EL-OLAM SPECIAL HOME", accountNumber: "1122334455" },
        { bank: "Zenith Bank", accountName: "EL-OLAM SPECIAL HOME", accountNumber: "5566778899" }
    ];

    return (
        <div className="payment-page">
            {/* Header Section */}
            <header className="header-container">
                <div className="logo-section">
                    <img src={logo} alt="EL-OLAM Logo" className="logo" />
                </div>
                <div className="header-text">
                    <h1>
                        EL-OLAM SPECIAL HOME AND <br /> REHABILITATION CENTER
                    </h1>
                    <p className="cac-number">CAC IT NO: 156872</p>
                    <p className="contact-info">
                        📞 08023613422, 08122846941 | ✉️ elolamspecialhome@gmail.com
                    </p>
                </div>
            </header>

            {/* Bank Account Details */}
            <section className="account-section">
                <h2>Bank Account Details</h2>
                <table className="account-table">
                    <thead>
                    <tr>
                        <th>Bank</th>
                        <th>Account Name</th>
                        <th>Account Number</th>
                    </tr>
                    </thead>
                    <tbody>
                    {accounts.map((acc, index) => (
                        <tr key={index}>
                            <td>{acc.bank}</td>
                            <td>{acc.accountName}</td>
                            <td>{acc.accountNumber}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </section>

            {/* Upload Button */}
            <div className="upload-btn-container">
                <button
                    className="upload-btn"
                    onClick={() => navigate("/upload-receipt")}
                >
                    Upload Your Payment Receipt
                </button>
            </div>
        </div>
    );
};

export default PaymentPage;
