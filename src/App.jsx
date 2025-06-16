// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import Header from "./components/Layout/Header";
// import Home from "./pages/Home";
// import Login from "./pages/Login";
// import SignIn from "./pages/SignIn";
// import ProfessionSelection from "./pages/ProfessionSelection";
// import LearningGoal from "./pages/LearningGoal";
// import ThankYouScreen from "./pages/ThankYouScreen";
// import WelcomeScreen from "./pages/WelcomeScreen";
// import ForgotPassword from "./pages/ForgetPassword";
// import PasswordReset from "./pages/PasswordReset";
// import PasswordResetSuccess from "./pages/PasswordResetSuccess";
// import Courese from "./pages/Courses";
// import Profile from "./pages/Profile";
// import Student from "./pages/Students/StudentDashboard";
// import Instructor from "./pages/Instructor/InstructorDashboard";
// import SavedCourses from "./pages/SavedCourses";
// import Footer from "./components/Layout/Footer";
// import Community from "./pages/Community/Community";
// import StudentProfilePage from "./pages/StudentProfilePage";
// import PlatformInsights from "./pages/PlatformInsights";
// import "./App.css"
// import DownloadAppPage from "./pages/DownloadAppPage";
// import SettingsPage from "./pages/SettingsPage";
// import HelpCenterPage from "./pages/HelpCenterPage";
// import BillingPage from "./pages/BillingPage";
// import GoalsMilestonesPage from "./pages/GoalsMilestonesPage";
// import CoursePlayer from "./pages/CoursePlayer";
// import Notifications from "./pages/Notifications";
// import CheckoutPage from "./pages/CheckoutPage";
// import CoursePage from "./pages/CourseDetailsPage";
// import QuizApp from "./pages/quiz-app";
// import CourseList from "./components/Techer/Course/CourseList"
// import CourseForm from "./components/Techer/Course/CourseForm"
// import CourseDetail from "./components/Techer/Course/CourseDetail"
// import InstructorDashboard from "./pages/Instructor/InstructorDashboard";
// import StudentDashboard from "./pages/Students/StudentDashboard";
// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<><Header /><Home />  <Footer /></>} />
//         <Route path="/course-player" element={<><Header />  <CoursePlayer /></>} />

//         <Route path="/courses" element={<>
//           <Header />
//           <Courese />
//         </>} />
//         <Route path="/profile" element={<>
//           <Header />
//           <Profile />
//           <Footer />
//         </>} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/community" element={<>
//           <Header />
//           <Community />
//         </>} />
//         <Route path="/help-center" element={<>
//           <Header />
//           <HelpCenterPage />
//         </>} />
//         <Route path="/platform-insights" element={<PlatformInsights />} />
//         <Route path="/download-app" element={<><Header /><DownloadAppPage />  </>} />
//         <Route path="/saved-courses" element={<SavedCourses />} />
//         <Route path="/notifications" element={<Notifications />} />
//         <Route path="/settings" element={<>
//           <Header /><SettingsPage />
//         </>} />
//         <Route path="/billing" element={<>
//           <Header /><BillingPage />
//         </>} />
//         <Route path="/student-profile" element={<StudentProfilePage />} />
//         <Route path="/goals-milestones" element={<GoalsMilestonesPage />} />
//         <Route path="/signin" element={<SignIn />} />
//         <Route path="/dashboard" element={<Student />} />
//         <Route path="/profession" element={<ProfessionSelection />} />
//         <Route path="/checkout" element={<CheckoutPage />} />
//         <Route path="/quiz" element={<QuizApp />} />
//         <Route path="/learning-goal" element={<LearningGoal />} />
//         <Route path="/thank-you" element={<ThankYouScreen />} />
//         <Route path="/welcome-screen" element={<WelcomeScreen />} />
//         <Route path="/forgot-password" element={<ForgotPassword />} />
//           <Route path="notifications" element={<Notifications />} />
//         <Route path="/password-reset" element={<PasswordReset />} />
//         <Route path="/course-details-page" element={<CoursePage />} />
//         <Route path="/instructor" element={<Instructor />}>
//           <Route index element={<InstructorDashboard />} />
//           <Route path="courses" element={<CourseList />} />
//           <Route path="courses/create" element={<CourseForm />} />
//           <Route path="courses/:id/edit" element={<CourseForm />} />
//           <Route path="courses/:id" element={<CourseDetail />} />
//         </Route>
//         <Route path="/dashboard" element={<Student />}>
//           <Route index element={<StudentDashboard />} />
//           <Route path="profile" element={<StudentProfilePage />} />
//           <Route path="saved-courses" element={<SavedCourses />} />
//           <Route path="settings" element={<SettingsPage />} />
//           <Route path="billing" element={<BillingPage />} />
//           <Route path="goals-milestones" element={<GoalsMilestonesPage />} />
//         </Route>

//         <Route path="/password-reset-success" element={<PasswordResetSuccess />} />
//         <Route path="*" element={<Navigate to="/" />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignIn from "./pages/SignIn";
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
import QuizApp from "./pages/quiz-app";
import LearningGoal from "./pages/LearningGoal";
import Notifications from "./pages/Notifications";
import SettingsPage from "./pages/SettingsPage";

// 🧑‍🎓 Student Dashboard
import Student from "./pages/Students/Student";
import StudentDashboard from "./pages/Students/StudentDashboard";
import GoalsMilestonesPage from "./pages/Students/GoalsMilestonesPage";
import StudentProfilePage from "./pages/Students/StudentProfilePage";
import BillingPage from "./pages/Students/BillingPage";
import SavedCourses from "./pages/Students/SavedCourses";

// 👨‍🏫 Instructor Dashboard
import Instructor from './pages/Instructor/Instructor'
import InstructorDashboard from './pages/Instructor/InstructorDashboard'
import Profile from "./pages/Instructor/Profile";
import CourseForm from './components/Dasboard/Instructor/Course/CourseForm'
import CourseDetail from './components/Dasboard/Instructor/Course/CourseDetail'
import CourseList from './components/Dasboard/Instructor/Course/CourseList'


import "./App.css";







function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<><Header /><Home /><Footer /></>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/password-reset" element={<PasswordReset />} />
        <Route path="/password-reset-success" element={<PasswordResetSuccess />} />
        <Route path="/profession" element={<ProfessionSelection />} />
        <Route path="/learning-goal" element={<LearningGoal />} />
        <Route path="/thank-you" element={<ThankYouScreen />} />
        <Route path="/welcome-screen" element={<WelcomeScreen />} />

        {/* General Pages */}
        <Route path="/courses" element={<><Header /><Courese /></>} />
        <Route path="/course-details-page" element={<CoursePage />} />
        <Route path="/course-player" element={<><Header /><CoursePlayer /></>} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/community" element={<><Header /><Community /></>} />
        <Route path="/platform-insights" element={<PlatformInsights />} />
        <Route path="/download-app" element={<><Header /><DownloadAppPage /></>} />
        <Route path="/help-center" element={<><Header /><HelpCenterPage /></>} />
        <Route path="/quiz" element={<QuizApp />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="settings" element={<SettingsPage />} />

        {/* Student Dashboard */}
        <Route path="/dashboard" element={<Student />}>
          <Route index element={<StudentDashboard />} />
          <Route path="billing" element={<BillingPage />} />
          <Route path="profile" element={<StudentProfilePage />} />
          <Route path="saved-courses" element={<SavedCourses />} />
          <Route path="goals-milestones" element={<GoalsMilestonesPage />} />
        </Route>

        {/* Instructor Dashboard */}
        <Route path="/instructor" element={<Instructor />}>
          <Route index element={<InstructorDashboard />} />
          <Route path="courses" element={<CourseList />} />
          <Route path="Profile" element={<Profile />} />
          <Route path="course/create" element={<CourseForm />} />
          <Route path="course/:id/edit" element={<CourseForm />} />
          <Route path="course/:id" element={<CourseDetail />} />

        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;


