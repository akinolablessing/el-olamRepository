
import { Routes, Route } from "react-router-dom";
import PaymentPage from "./components/PaymentPage";
import ReceiptUpload from "./pages/uploadPage";
import ApplicationForm from "./components/applicationForm.jsx";

function App() {
    return (
        <Routes>
            <Route path="/" element={<PaymentPage />} />
            <Route path="/uploadPage" element={<ReceiptUpload />} />
            <Route path="/applicationForm" element={<ApplicationForm/>} />
        </Routes>
    );
}

export default App;
