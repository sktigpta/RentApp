import { useState } from "react";
import { useNavigate } from 'react-router-dom'
import { Link } from "react-router-dom";
import { useAuth } from "../storeing-data/auth";



const Login = () => {


    const [user, setUser] = useState({
        email: "",
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
    const { storeTokeninLocalMem } = useAuth();


    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if email and password are provided
        if (!user.email.trim() || !user.password.trim()) {
            return; // Prevent further execution
        }

        try {
            const response = await fetch('http://localhost:2005/api/auth/login', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user),
            });

            if (response.ok) {

                const res_data = await response.json();
                storeTokeninLocalMem(res_data.token);

                setUser({ email: "", password: "", })
                navigate("/")
                alert(data.message)



            } else {
                const data = await response.json();
                alert(data.message)

            }



        } catch (error) {
            console.log(error);
        }
    }





    return (<>
        <section>
            <div className="container-center">
                <div className="container">
                    <h2>Welcome back!</h2>
                    <form className="authform" onSubmit={handleSubmit}>

                        <input className="authInput" type="text"
                            name="email"
                            placeholder="Email Address"
                            autoComplete="off"
                            value={user.email}
                            onChange={handleInput}
                            autoCapitalize="no"
                        />

                        <input className="authInput" type="password"
                            name="password"
                            placeholder="Password"
                            autoComplete=" off"
                            value={user.password}
                            onChange={handleInput}
                        />

                        <button style={{ marginTop: "0.5em", width: "100%" }} type="submit">Login</button>

                    </form>
                    <div style={{ display: "flex", flexDirection: "row", gap: "0.5em"}}>
                        <p> Don't have an account</p>
                        <p className="bld"><Link className="li" to="/register">Register</Link></p>
                    </div>
                </div>
            </div>

        </section>
    </>
    )
}

export default Login;