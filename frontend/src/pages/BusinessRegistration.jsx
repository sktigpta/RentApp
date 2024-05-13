import { useState } from "react";
import { useNavigate } from 'react-router-dom'
import { Link } from "react-router-dom";



const BusinessRegistration = () => {


    const [business, setBusiness] = useState({
        businessName: "",
        businessDiscription: "",
        businessAddress: "",
        BusinessCategories: "",
        BusinessPhone: "",

    })

    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setBusiness({
            ...business,
            [name]: value,
        })
    }


    const navigate = useNavigate()



    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:2005/api/auth/register-as-business', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(business),
            });

            if (response.ok) {

                setbusiness({
                    businessName: "",
                    businessDiscription: "",
                    businessAddress: "",
                    BusinessCategories: "",
                    BusinessPhone: "",
                });
                alert("Registration Sucessful")

                navigate("/business-dashboard");
            } else {
                const data = await response.json();
                alert("Registration Failed")

            }
        } catch (error) {
            console.log(error);
        }
    };



    return (<>
        <div className="parent-center">
            <section className="container-z">
                <div>
                    <h2>Register here</h2>
                    <form style={{ margin: "1.5em 0" }} onSubmit={handleSubmit}>
                     
                        <input type="businessname"
                            name="businessname"
                            placeholder="businessname"
                            autoComplete="off"
                            value={business.businessDiscription}
                            onChange={handleInput}
                            required="true"
                        />

                        <input type="text"
                            name="businessaddress"
                            placeholder="Business Address"
                            autoComplete="off"
                            value={business.businessAddress}
                            onChange={handleInput}
                            required="true"
                        />

                        <input type="number"
                            name="phone"
                            placeholder="Phone Number"
                            autoComplete="off"
                            value={business.businessPhone}
                            onChange={handleInput}
                            required="true"
                        />

                        <input type="BusinessCategories"
                            name="BusinessCategories"
                            placeholder="BusinessCategories"
                            autoComplete=" off"
                            value={business.BusinessCategories}
                            onChange={handleInput}
                            required="true"
                        />
                        <button style={{ marginTop: "0.5em" }} type="submit">Register</button>

                    </form>
                </div>
            </section >
        </div>
    </>
    )
}

export default BusinessRegistration;

