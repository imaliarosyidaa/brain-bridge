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
import DiscussionForum from "./admin/discussion/DiscussionForum";
import Grades from "./admin/grades/Grades";
import AccountSettings from "./admin/profile/AccountSettings";
import ChangePassword from "./admin/profile/ChangePassword";
import GradeDetails from "./admin/grades/GradeDetails";
import SubmitedList from "./admin/grades/SubmitedList";
import SubmitedDetail from "./admin/grades/SubmitedDetail";
import AddMeeting from "./admin/class/AddMeeting";
import AddAssesment from "./admin/class/AddAssesment";
import {
  sampleData,
  sampleTasks,
  initialAsset
} from "./constants/Constants";
import RequireAuth from './admin/RequireAuth';
import AddClass from "./admin/class/AddClass";
import AdminUsers from "./admin/users/Admin";
import PengajarUsers from "./admin/users/Pengajar";
import SiswaUsers from "./admin/users/Siswa";
import Topics from "./admin/topics/Topics";
import CreateTopic from "./admin/topics/CreateTopic";
import PersistLogin from './components/PersistLogin';

const ROLES = {
  'ADMIN': 'ADMIN',
  'PENGAJAR': 'PENGAJAR',
  'SISWA': 'SISWA'
}

export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        {/* Route public */}
        <Route path="/" element={<Homepage />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />

        {/* Chatch all */}
        <Route path="*" element={<Pagenotfound />} />

        <Route element={<PersistLogin />}>
          <Route path="class" element={<Dashboard />}>
            <Route element={<RequireAuth allowedRoles={[ROLES.ADMIN, ROLES.PENGAJAR, ROLES.SISWA]} />} >
              <Route index element={<ClassLayout initialAsset={initialAsset} />} />
            </Route>
            <Route element={<RequireAuth allowedRoles={[ROLES.ADMIN, ROLES.PENGAJAR]} />} >
              <Route path="add" element={<AddClass />} />
            </Route>
            <Route element={<RequireAuth allowedRoles={[ROLES.ADMIN, ROLES.PENGAJAR, ROLES.SISWA]} />} >
              <Route path="meeting/:id" element={<DetailClassLayout />} />
            </Route>
            <Route element={<RequireAuth allowedRoles={[ROLES.ADMIN, ROLES.PENGAJAR, ROLES.SISWA]} />} >
              <Route path="meeting/detail/:id" element={<DetailMeetingLayout />} />
            </Route>
            <Route element={<RequireAuth allowedRoles={[ROLES.ADMIN, ROLES.PENGAJAR, ROLES.SISWA]} />} >
              <Route path="assessment/detail" element={<AssesmentDetail />} />
            </Route>
            <Route element={<RequireAuth allowedRoles={[ROLES.ADMIN, ROLES.PENGAJAR,]} />} >
              <Route path="assessment/detail/submited/:id" element={<SubmitedList />} />
            </Route>
            <Route element={<RequireAuth allowedRoles={[ROLES.ADMIN, ROLES.PENGAJAR,]} />} >
              <Route path="assessment/detail/submited/detail" element={<SubmitedDetail />} />
            </Route>
            <Route element={<RequireAuth allowedRoles={[ROLES.ADMIN, ROLES.PENGAJAR,]} />} >
              <Route path="meeting/add/:id" element={<AddMeeting />} />
            </Route>
            <Route element={<RequireAuth allowedRoles={[ROLES.ADMIN, ROLES.PENGAJAR,]} />} >
              <Route path="assesment/add/:id" element={<AddAssesment />} />
            </Route>
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.SISWA]} />} >
            <Route path="task" element={<Dashboard />}>
              <Route index element={<AssesmentList />} />
            </Route>
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.ADMIN, ROLES.PENGAJAR, ROLES.SISWA]} />} >
            <Route path="dicussion" element={<Dashboard />}>
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
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.ADMIN]} />} >
            <Route path="/users" element={<Dashboard />}>
              <Route index element={<AdminUsers />} />
              <Route path="siswa" element={<SiswaUsers />} />
              <Route path="pengajar" element={<PengajarUsers />} />
              <Route path="pengajar?delete=:id" element={<PengajarUsers />} />
            </Route>
            <Route path="topics" element={<Dashboard />}>
              <Route index element={<Topics />} />
              <Route path="create" element={<CreateTopic />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}