import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Layout/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignIn from "./pages/SignIn";
import ProfessionSelection from "./pages/ProfessionSelection";
import LearningGoal from "./pages/LearningGoal";
import ThankYouScreen from "./pages/ThankYouScreen";
import WelcomeScreen from "./pages/WelcomeScreen";
import ForgotPassword from "./pages/ForgetPassword";
import PasswordReset from "./pages/PasswordReset";
import PasswordResetSuccess from "./pages/PasswordResetSuccess";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<><Header /><Home /></>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/profession" element={<ProfessionSelection />} />
        <Route path="/learning-goal" element={<LearningGoal />} />
        <Route path="/thank-you" element={<ThankYouScreen />} />
        <Route path="/welcome-screen" element={<WelcomeScreen />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/password-reset" element={<PasswordReset />} />
        <Route path="/password-reset-success" element={<PasswordResetSuccess />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
