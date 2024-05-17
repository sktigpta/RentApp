import { Routes, Route } from "react-router-dom"
import Home from "../pages/Home"
import Login from "../pages/Login"
import Register from "../pages/Register"
import { Logout } from "../pages/Logout"
import BusinessRegistration from "../pages/Business/BusinessRegistration"
import UserProfile from "../pages/UserProfile"
import { Dashboard } from "../pages/Business/Dashboard"
import { Product } from "../pages/product/Product"
import AddProductForm from "./AddProduct"

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
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/profile" element={<UserProfile />} />
                    <Route path="/product-page" element={<Product />} />
                    <Route path="/add-product" element={<AddProductForm />} />
                </Routes>
            </div>
        </>
    )
}