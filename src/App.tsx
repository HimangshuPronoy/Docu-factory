
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import DocumentSelect from "./pages/DocumentSelect";
import QuestionForm from "./pages/QuestionForm";
import ReviewDocument from "./pages/ReviewDocument";
import GeneratedDocument from "./pages/GeneratedDocument";
import TermsOfService from "./pages/TermsOfService";
import Contact from "./pages/Contact";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./contexts/AuthContext";
import { DocumentProvider } from "./contexts/DocumentContext";
import { Toaster } from "sonner";
import "./App.css";

function App() {
  return (
    <Router>
      <AuthProvider>
        <DocumentProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Index />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="terms-of-service" element={<TermsOfService />} />
              <Route path="contact" element={<Contact />} />
              
              <Route element={<ProtectedRoute />}>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="documents" element={<DocumentSelect />} />
                <Route path="documents/:documentId/questions" element={<QuestionForm />} />
                <Route path="documents/:documentId/review" element={<ReviewDocument />} />
                <Route path="documents/:documentId/generated" element={<GeneratedDocument />} />
              </Route>
              
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
          <Toaster position="top-right" richColors />
        </DocumentProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
