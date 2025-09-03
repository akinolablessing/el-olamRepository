
import { Routes, Route } from "react-router-dom";
import PaymentPage from "./components/PaymentPage";
import ReceiptUpload from "./pages/uploadPage";

function App() {
    return (
        <Routes>
            <Route path="/" element={<PaymentPage />} />
            <Route path="/uploadPage" element={<ReceiptUpload />} />
        </Routes>
    );
}

export default App;
