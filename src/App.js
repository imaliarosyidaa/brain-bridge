import { BrowserRouter, Routes, Route } from "react-router-dom"
import './App.css';
import Login from "./auth/Login"
import Signup from "./auth/Signup"
import Homepage from "./pages/Homepage"
import Pagenotfound from "./pages/Pagenotfound"
import Dashboard from "./admin/Dashboard"
import AssesmentList from './admin/class/AssesmentList'
import ClassLayout from "./admin/ClassLayout";
import DetailClassLayout from "./admin/DetailClassLayout";
import DetailMeetingLayout from "./admin/DetailMeetingLayout";
import AssesmentDetail from "./admin/class/AsssesmentDetail";
import Library from "./admin/library/Library";
import DiscussionForum from "./admin/discussion/DiscussionForum";
import Grades from "./admin/grades/Grades";
import AccountSettings from "./admin/profile/AccountSettings";
import ChangePassword from "./admin/profile/ChangePassword";
import GradeDetails from "./admin/grades/GradeDetails";
import AppLayout from "./admin/app/AppLayout";
import AddMeeting from "./admin/class/AddMeeting";
import AddAssesment from "./admin/class/AddAssesment";
import {
  initialClass,
  initialMeeting,
  initialAssesment,
  initialVideos,
  initialMaterials,
  initialBooks,
  sampleData,
  sampleTasks
} from "./constants/Constants";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="*" element={<Pagenotfound />} />
        <Route path="app" element={<Dashboard />}>
          <Route index element={<AppLayout />} />
        </Route>
        <Route path="class" element={<Dashboard />}>
          <Route index element={<ClassLayout topics={initialClass} />} />
          <Route path="meeting" element={<DetailClassLayout meetings={initialMeeting} assessment={initialAssesment} />} />
          <Route path="meeting/detail" element={<DetailMeetingLayout videos={initialVideos} materials={initialMaterials} />} />
          <Route path="assesment/detail" element={<AssesmentDetail />} />
          <Route path="meeting/add" element={<AddMeeting />} />
          <Route path="assesment/add" element={<AddAssesment />} />
        </Route>
        <Route path="task" element={<Dashboard />}>
          <Route index element={<AssesmentList assessment={initialAssesment} />} />
        </Route>
        <Route path="library" element={<Library books={initialBooks} />} />
        <Route path="forum" element={<Dashboard />}>
          <Route index element={<DiscussionForum />} />
        </Route>
        <Route path="profile" element={<Dashboard />}>
          <Route index element={<AccountSettings />} />
        </Route>
        <Route path="change/password" element={<Dashboard />}>
          <Route index element={<ChangePassword />} />
        </Route>
        <Route path="grades" element={<Dashboard />}>
          <Route index element={<Grades data={sampleData} />} />
          <Route path="detail/:id" element={<GradeDetails tasks={sampleTasks} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}