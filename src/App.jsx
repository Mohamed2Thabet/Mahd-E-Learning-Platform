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
import Footer from "./components/Layout/Footer";
import Community from "./pages/Community/Community";
import StudentProfilePage from "./pages/StudentProfilePage";
import PlatformInsights from "./pages/PlatformInsights";
import "./App.css"
import DownloadAppPage from "./pages/DownloadAppPage";
import SettingsPage from "./pages/SettingsPage";
import HelpCenterPage from "./pages/HelpCenterPage";
import BillingPage from "./pages/BillingPage";
import GoalsMilestonesPage from "./pages/GoalsMilestonesPage";
import CoursePlayer from "./pages/CoursePlayer";
import Notifications from "./pages/Notifications";
import CheckoutPage from "./pages/CheckoutPage";
import CoursePage from "./pages/CourseDetailsPage";
import QuizApp from "./pages/quiz-app";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<><Header /><Home />  <Footer /></>} />
        <Route path="/course-player" element={<><Header />  <CoursePlayer /></>} />

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
          <Header />
          <Community />
        </>} />
        <Route path="/help-center" element={<>
          <Header />
          <HelpCenterPage />
        </>} />
        <Route path="/platform-insights" element={<PlatformInsights />} />
        <Route path="/download-app" element={<><Header /><DownloadAppPage />  </>} />
        <Route path="/saved-courses" element={<SavedCourses />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/settings" element={<>
          <Header /><SettingsPage />
        </>} />
        <Route path="/billing" element={<>
          <Header /><BillingPage />
        </>} />
        <Route path="/student-profile" element={<StudentProfilePage />} />
        <Route path="/goals-milestones" element={<GoalsMilestonesPage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/instructor" element={<Instructor />} />
        <Route path="/dashboard" element={<Student />} />
        <Route path="/profession" element={<ProfessionSelection />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/quiz" element={<QuizApp />} />
        <Route path="/learning-goal" element={<LearningGoal />} />
        <Route path="/thank-you" element={<ThankYouScreen />} />
        <Route path="/welcome-screen" element={<WelcomeScreen />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />  
        <Route path="/password-reset" element={<PasswordReset />} />
        <Route path="/course-details-page" element={<CoursePage />} />

        <Route path="/password-reset-success" element={<PasswordResetSuccess />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
