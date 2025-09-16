import React, { useEffect } from "react";
import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ReceiptSuccessScreen = ({ studentName }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const timeout = setTimeout(() => {
            navigate("/applicationForm");
        }, 7000);

        return () => clearTimeout(timeout);
    }, [navigate]);

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: '#ebeced',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <div style={{
                backgroundColor: 'white',
                borderRadius: '20px',
                padding: '60px 40px',
                textAlign: 'center',
                maxWidth: '400px',
                margin: '20px'
            }}>
                <CheckCircle size={100} style={{ color: '#10B981', marginBottom: '20px' }} />
                <h1 style={{
                    marginTop: '20px',
                    fontSize: '24px',
                    color: '#10B981',
                    fontWeight: 'bold',
                    margin: '20px 0 10px 0'
                }}>
                    Receipt Submitted Successfully!
                </h1>
                <p style={{ color: '#6B7280', margin: '0' }}>
                    Thank you {studentName}! Directing to Application Form...
                </p>
            </div>
        </div>
    );
};

export default ReceiptSuccessScreen;
