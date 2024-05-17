import React from "react";
import { useAuth } from "../storeing-data/auth";

const UserProfile = () => {
    const { user, businessData, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>;
    }

    return (

        <>
            <div style={{ width: "80%", justifyContent: "space-between" }} className="parent-cont">
                <section>
                    <div>
                        <h1>User Profile</h1>
                        {user && (
                            <div>
                                <p>Username: {user.username}</p>
                                <p>Fullname: {user.fullname}</p>
                                <p>Email: {user.email}</p>
                                <p>Phone: {user.phone}</p>
                            </div>
                        )}
                    </div>
                </section>
                <aside>

                </aside>
            </div>
        </>



    );
};

export default UserProfile;
