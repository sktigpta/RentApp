import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../storeing-data/auth";

const BusinessRegistration = () => {
    const [business, setBusiness] = useState({
        businessName: "",
        businessDescription: "",
        businessAddress: {
            area: "",
            district: "",
            postalCode: "",
            otherDetails: ""
        },
        businessCategories: "",
        businessPhone: ""
    });

    const { authorizationToken } = useAuth();

    const handleInput = (e) => {
        const { name, value } = e.target;

        // For nested objects like businessAddress
        if (name.includes(".")) {
            const [parent, child] = name.split(".");
            setBusiness({
                ...business,
                [parent]: {
                    ...business[parent],
                    [child]: value
                }
            });
        } else {
            setBusiness({
                ...business,
                [name]: value
            });
        }
    };

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:2005/api/business/register", {
                method: "POST",
                headers: {
                    Authorization: authorizationToken,
                }
            });

            if (response.ok) {
                setBusiness({
                    businessName: "",
                    businessDescription: "",
                    businessAddress: {
                        area: "",
                        district: "",
                        postalCode: "",
                        otherDetails: ""
                    },
                    businessCategories: "",
                    businessPhone: ""
                });
                alert("Registration Successful");

                navigate("/business-dashboard");
            } else {
                alert("Registration Failed");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="parent-center">
            <section className="container-z">
                <div>
                    <h2>Register here</h2>
                    <form style={{ margin: "1.5em 0" }} onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="businessName"
                            placeholder="Business Name"
                            autoComplete="off"
                            value={business.businessName}
                            onChange={handleInput}
                            required
                        />
                        <input
                            type="text"
                            name="businessDescription"
                            placeholder="Business Description"
                            autoComplete="off"
                            value={business.businessDescription}
                            onChange={handleInput}
                            required
                        />
                        <input
                            type="text"
                            name="businessAddress.area"
                            placeholder="Area"
                            autoComplete="off"
                            value={business.businessAddress.area}
                            onChange={handleInput}
                            required
                        />
                        <input
                            type="text"
                            name="businessAddress.district"
                            placeholder="District"
                            autoComplete="off"
                            value={business.businessAddress.district}
                            onChange={handleInput}
                            required
                        />
                        <input
                            type="text"
                            name="businessAddress.postalCode"
                            placeholder="Postal Code"
                            autoComplete="off"
                            value={business.businessAddress.postalCode}
                            onChange={handleInput}
                            required
                        />
                        <input
                            type="text"
                            name="businessAddress.otherDetails"
                            placeholder="Other Address Details"
                            autoComplete="off"
                            value={business.businessAddress.otherDetails}
                            onChange={handleInput}
                        />
                        <input
                            type="text"
                            name="businessCategories"
                            placeholder="Business Categories"
                            autoComplete="off"
                            value={business.businessCategories}
                            onChange={handleInput}
                            required
                        />
                        <input
                            type="text"
                            name="businessPhone"
                            placeholder="Phone Number"
                            autoComplete="off"
                            value={business.businessPhone}
                            onChange={handleInput}
                            required
                        />
                        <button style={{ marginTop: "0.5em" }} type="submit">
                            Register
                        </button>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default BusinessRegistration;
