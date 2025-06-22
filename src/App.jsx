import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { manualLogin, manualLoginInit, refreshAccessToken } from "./store/authSlice";

import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProfessionSelection from "./pages/ProfessionSelection";
import ThankYouScreen from "./pages/ThankYouScreen";
import WelcomeScreen from "./pages/WelcomeScreen";
import ForgotPassword from "./pages/ForgetPassword";
import PasswordReset from "./pages/PasswordReset";
import PasswordResetSuccess from "./pages/PasswordResetSuccess";
import Courese from "./pages/Courses";
import Community from "./pages/Community/Community";
import PlatformInsights from "./pages/PlatformInsights";
import DownloadAppPage from "./pages/DownloadAppPage";
import HelpCenterPage from "./pages/HelpCenterPage";
import CheckoutPage from "./pages/CheckoutPage";
import CoursePlayer from "./pages/CoursePlayer";
import CoursePage from "./pages/CourseDetailsPage";
import LearningGoal from "./pages/LearningGoal";
import Notifications from "./pages/Notifications";
import SettingsPage from "./pages/SettingsPage";

// Student Dashboard
import Student from "./pages/Students/Student";
import StudentDashboard from "./pages/Students/StudentDashboard";
import GoalsMilestonesPage from "./pages/Students/GoalsMilestonesPage";
import StudentProfilePage from "./pages/Students/StudentProfilePage";
import BillingPage from "./pages/Students/BillingPage";
import SavedCourses from "./pages/Students/SavedCourses";
import ProtectedRoute from "./pages/ProtectedRoute";

// Instructor Dashboard
import Instructor from "./pages/Instructor/Instructor";
import InstructorDashboard from "./pages/Instructor/InstructorDashboard";
import Profile from "./pages/Instructor/Profile";
import CourseForm from "./components/Dasboard/Instructor/Course/CourseForm";
import CourseDetail from "./components/Dasboard/Instructor/Course/CourseDetail";
import CourseList from "./components/Dasboard/Instructor/Course/CourseList";

import "./App.css";
import PublicInstructorProfile from "./pages/PublicInstructorProfile";
import QuizPage from "./pages/quiz-app";

function App() {
  const dispatch = useDispatch();
  const { isInitialized } = useSelector((state) => state.auth);
  useEffect(() => {
    const interval = setInterval(() => {
      refreshAccessToken()
        .then(token => {
          console.log("Token refreshed automatically");
        })
        .catch(err => {
          console.error("Auto-refresh failed:", err.message);
          // ممكن هنا تمسح التوكن وتوجّه المستخدم لتسجيل الدخول
          localStorage.removeItem("token");
          localStorage.removeItem("refreshToken");
          // window.location.href = "/login"; // لو حبيت تطرده
        });
    }, 30 * 60 * 1000); // 30 دقيقة

    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (token && user) {
      dispatch(manualLogin({ token, user }));
    } else {
      dispatch(manualLoginInit());
    }
  }, [dispatch]);


  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<><Header /><Home /><Footer /></>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/password-reset" element={<PasswordReset />} />
        <Route path="/password-reset-success" element={<PasswordResetSuccess />} />
        <Route path="/profession" element={<ProfessionSelection />} />
        <Route path="/learning-goal" element={<LearningGoal />} />
        <Route path="/thank-you" element={<ThankYouScreen />} />
        <Route path="/welcome-screen" element={<WelcomeScreen />} />

        {/* General Pages */}
        <Route path="/courses" element={<><Header /><Courese /></>} />
        <Route path="/course-details/:courseId" element={<CoursePage />} />
        <Route path="/course-player/:id" element={<><Header /><CoursePlayer /></>} />
        <Route path="/checkout/:id" element={<CheckoutPage />} />
        <Route path="/community" element={<><Header /><Community /></>} />
        <Route path="/platform-insights" element={<PlatformInsights />} />
        <Route path="/download-app" element={<><Header /><DownloadAppPage /></>} />
        <Route path="/help-center" element={<><Header /><HelpCenterPage /></>} />
        <Route path="/quiz/:id" element={<QuizPage />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/billing" element={<BillingPage />} />
        <Route path="/instructors/:id" element={<PublicInstructorProfile />} />


        <Route path="/dashboard/student" element={<ProtectedRoute />}>
          <Route element={<Student />}>
            <Route index element={<StudentDashboard />} />
            <Route path="profile" element={<StudentProfilePage />} />
            <Route path="saved-courses" element={<SavedCourses />} />
            <Route path="goals-milestones" element={<GoalsMilestonesPage />} />
          </Route>
        </Route>

        <Route path="/dashboard/instructor" element={<ProtectedRoute />}>
          <Route element={<Instructor />}>
            <Route path="profile" element={<StudentProfilePage />} />
            <Route index element={<InstructorDashboard />} />
            <Route path="courses" element={<CourseList />} />
            <Route path="course/create" element={<CourseForm />} />
            <Route path="course/edit/:id" element={<CourseForm />} />
            <Route path="course/:id" element={<CourseDetail />} />
          </Route>
        </Route>
        <Route path="/profile/:userId" element={<Profile />} />




        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
