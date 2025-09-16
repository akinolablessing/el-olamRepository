import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/WhatsApp_Image_2025-08-29_at_15.54.50_068a4ff8-removebg-preview (1).png";
import "./PaymentPage.css";

const PaymentPage = () => {
    const navigate = useNavigate();

    const accounts = [
        { bank: "ZENITH", accountName: "EL-OLAM SPECIAL HOME AND REHABILITATION CENTER", accountNumber: "1215160248" },
        { bank: "UBA", accountName: "EL-OLAM SPECIAL HOME AND REHABILITATION CENTER", accountNumber: "1024139996" },
        { bank: "GTBank", accountName: "EL-OLAM SPECIAL HOME AND REHABILITATION CENTER", accountNumber: "0640580558" },
        { bank: "DOLLAR", accountName: "EL-OLAM SPECIAL HOME AND REHABILITATION CENTER", accountNumber: "5073175611" },
        { bank: "POUNDS", accountName: "EL-OLAM SPECIAL HOME AND REHABILITATION CENTER", accountNumber: "5060994652" },
        {bank: "EURO", accountName: "EL-OLAM SPECIAL HOME AND REHABILITATION CENTER", accountNumber: "508078848"}
    ];

    return (
        <div className="payment-page">
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
                        📞 08025613422, 08122646941 | ✉️ elolamspecialhome@gmail.com
                    </p>
                </div>
            </header>

            <section className="account-section">
                <div className="account-header">
                    <h2>Bank Account Details</h2>
                    <h2 className="form-fees">Payment Amount &#8358;40,000</h2>
                </div>
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

            <div className="upload-btn-container">
                <button
                    className="upload-btn"
                    onClick={() => navigate("/uploadPage")}
                >
                    Upload Your Payment Receipt
                </button>
            </div>
        </div>
    );
};

export default PaymentPage;
