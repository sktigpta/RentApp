import { useState } from "react";
import { useAuth } from "../storeing-data/auth";
import { NavMenu } from "./NavMenu";
import { Link } from "react-router-dom";


export const Navbar = () => {

    const [menu, SetMenu] = useState()
    const { user, isLoggedIn } = useAuth();

    const handelToggle = () => {
        SetMenu(prevMenu => !prevMenu)
    }

    return (
        <>
            <header>
                <nav>
                    <div className="logo">

                    </div>
                    <div className="navlinks">


                        {isLoggedIn ?
                            <>
                                <div className="search">

                                </div>
                                <div onClick={handelToggle} className="profile">

                                </div>
                                {menu ?
                                    <>
                                        <div style={{ marginTop: "9em" }}>
                                            <div className="menu">
                                                <NavMenu />
                                            </div>
                                        </div>
                                    </>
                                    :
                                    null
                                }
                            </>
                            :
                            <>
                                <Link to="/login"><button>Login</button></Link>
                            </>}
                    </div>
                </nav>
            </header>
        </>
    )
}