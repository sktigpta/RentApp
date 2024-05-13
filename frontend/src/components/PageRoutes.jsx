import { Routes, Route } from "react-router-dom"
import Home from "../pages/Home"
import Login from "../pages/Login"
import Register from "../pages/Register"
import { Logout } from "../pages/Logout"
import BusinessRegistration from "../pages/BusinessRegistration"

export const PageRoutes = () => {
    return (
        <>
            <div className="main">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/logout" element={<Logout />} />
                    <Route path="/register-as-business" element={<BusinessRegistration />} />
                </Routes>
            </div>
        </>
    )
}