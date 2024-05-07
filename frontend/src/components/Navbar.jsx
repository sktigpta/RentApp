import { useAuth } from "../storeing-data/auth";


export const Navbar = () => {

    const { user, isLoggedIn } = useAuth();

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
                                <div className="profile">

                                </div>
                            </>
                            :
                            <>
                                <button>Login</button>
                            </>}
                    </div>
                </nav>
            </header>
        </>
    )
}