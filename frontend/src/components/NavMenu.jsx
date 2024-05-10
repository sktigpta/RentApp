import { Link } from "react-router-dom";


export const NavMenu = () => {
    return (
        <>
            <div className="profile">
                <Link to="/logout"><button>Logout</button></Link>

                <p className="bld"><Link className="li" to="/business-registration">Registe as Business</Link></p>
            </div>
        </>
    )
}