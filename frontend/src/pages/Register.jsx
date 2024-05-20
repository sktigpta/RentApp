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
                alert('sucessful')
                navigate("/login");

            } else {
                const data = await response.json();
                alert(data.message)

            }
        } catch (error) {
            console.log(error);
        }
    };



    return (<>
        <section>
            <div className="container-center">
                <div className="container">
                    <h2>Register here</h2>

                    <form className="authform" onSubmit={handleSubmit}>
                        <input className="authInput" type="text"
                            name="fullname"
                            placeholder="Full Name"
                            autoComplete="off"
                            value={user.fullname}
                            onChange={handleInput}
                            required="true"
                        />

                        <input className="authInput" type="username"
                            name="username"
                            placeholder="Username"
                            autoComplete="off"
                            value={user.username}
                            onChange={handleInput}
                            required="true"
                        />

                        <input className="authInput" type="email"
                            name="email"
                            placeholder="Email Address"
                            autoComplete="off"
                            value={user.email}
                            onChange={handleInput}
                            required="true"
                        />

                        <input className="authInput" type="text"
                            name="phone"
                            placeholder="Phone Number"
                            autoComplete="off"
                            value={user.phone}
                            onChange={handleInput}
                            required="true"
                        />

                        <input className="authInput" type="password"
                            name="password"
                            placeholder="Password"
                            autoComplete=" off"
                            value={user.password}
                            onChange={handleInput}
                            required="true"
                        />
                        <button style={{ marginTop: "0.5em", width: "100%" }} type="submit">Register</button>

                    </form>
                    <div style={{ display: "flex", flexDirection: "row", gap: "0.5em"}}>
                        <p>Already have an account</p>
                        <p className="bld"><Link className="li" to="/login">Login</Link></p>
                    </div>
                </div>
            </div>
        </section >
    </>
    )
}

export default Register;

