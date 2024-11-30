import { BrowserRouter, Routes, Route } from "react-router-dom"
import './App.css';
import Login from "./auth/Login"
import Signup from "./auth/Signup"
import Homepage from "./pages/Homepage"
import Pagenotfound from "./pages/Pagenotfound"
import Dashboard from "./admin/Dashboard"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="*" element={<Pagenotfound />} />
        <Route path="app" element={<Dashboard />}>
          {/* <Route path="class" element={<Dashboard pages={ } />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}