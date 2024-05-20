import { Routes, Route } from "react-router-dom"
import Home from "../pages/Home"
import Login from "../pages/Login"
import Register from "../pages/Register"
import { Logout } from "../pages/Logout"
import BusinessRegistration from "../pages/Business/BusinessRegistration"
import UserProfile from "../pages/UserProfile"
import { Dashboard } from "../pages/Business/Dashboard"
import AddProductForm from "./AddProduct"
import ProductPage from "../pages/product/Product"
import BusinessPage from "../pages/Business/BusinessPage"
import CategoriesPage from "../pages/CategoriesPage"

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
                    <Route path="/add-product" element={<AddProductForm />} />

                    <Route path="/product/:productId" element={<ProductPage/>} />
                    <Route path="/category/:categoryName" element={<CategoriesPage />} />
                    <Route path="/business/:businessId" element={<BusinessPage />} />
                </Routes>
            </div>
        </>
    )
}