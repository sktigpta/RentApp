import { useState } from "react";
import { useNavigate } from 'react-router-dom'
import { Link } from "react-router-dom";



const Register = () => {


    const [user, setUser] = useState({
        fullname: "",
        username: "",
        email: "",
        phone: "",
        password: "",
    })

    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setUser({
            ...user,
            [name]: value,
        })
    }


    const navigate = useNavigate()



    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:2005/api/auth/register', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user),
            });

            if (response.ok) {

                setUser({ fullname: "", username: "", email: "", phone: "", password: "" });


                navigate("/login");
            } else {
                const data = await response.json(); // Parse error response
            }
        } catch (error) {
            console.log(error);
        }
    };



    return (<>
        <div className="parent-center">
            <section className="container">
                <div>
                    <h2>Register here</h2>
                    <form style={{margin:"1.5em 0"}} onSubmit={handleSubmit}>
                        <input type="text"
                            name="fullname"
                            placeholder="Full Name"
                            autoComplete="off"
                            value={user.fullname}
                            onChange={handleInput}
                            required="true"
                        />

                        <input type="username"
                            name="username"
                            placeholder="Username"
                            autoComplete="off"
                            value={user.username}
                            onChange={handleInput}
                            required="true"
                        />

                        <input type="email"
                            name="email"
                            placeholder="Email Address"
                            autoComplete="off"
                            value={user.email}
                            onChange={handleInput}
                            required="true"
                        />

                        <input type="text"
                            name="phone"
                            placeholder="Phone Number"
                            autoComplete="off"
                            value={user.phone}
                            onChange={handleInput}
                            required="true"
                        />

                        <input type="password"
                            name="password"
                            placeholder="Password"
                            autoComplete=" off"
                            value={user.password}
                            onChange={handleInput}
                            required="true"
                        />
                        <button style={{ marginTop: "0.5em" }} type="submit">Register</button>

                    </form>
                </div>
                <div style={{ display: "flex", flexDirection: "row", gap: "0.5em" }}>
                    <p>Already have an account</p>
                    <p className="bld"><Link className="li" to="/login">Login</Link></p>
                </div>
            </section >
        </div>
    </>
    )
}

export default Register;

