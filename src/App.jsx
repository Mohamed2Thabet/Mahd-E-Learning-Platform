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
import Courese from "./pages/Courses";
import Profile from "./pages/Profile";
import Student from "./pages/Students/Student";
import Instructor from "./pages/Instructor/Instructor";
import SavedCourses from "./pages/SavedCourses";
import CourseCatalog from "./pages/CourseCatalog";
import Footer from "./components/Layout/Footer";
import Community from "./pages/Community/Community";
import StudentProfilePage from "./pages/StudentProfilePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<><Header /><Home />  <Footer/></>} />
        
        <Route path="/courses" element={<>
          <Header />
          <Courese />
        </>} />
        <Route path="/profile" element={<>
          <Header />
          <Profile />
          <Footer />
        </>} />
        <Route path="/login" element={<Login />} />
        <Route path="/community" element={<>
          <Header/>
          <Community />
        </>} />
        <Route path="/saved-courses" element={<SavedCourses />} />
        <Route path="/student-profile-page" element={<StudentProfilePage />} />
        <Route path="/course-catalog" element={<><Header /><CourseCatalog /></>} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/instructor" element={<Instructor />} />
        <Route path="/dashboard" element={<Student />} />
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
