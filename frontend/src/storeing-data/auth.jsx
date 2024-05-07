import React, { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {


    const [user, setUser] = useState("");

    const [token, setToken] = useState(localStorage.getItem("token"));
    const [loading, setLoading] = useState(true); // New state to track loading state
    const authorizationToken = `Bearer ${token}`;


    const storeTokeninLocalMem = (serverToken) => {
        setToken(serverToken);
        return localStorage.setItem("token", serverToken);
    };

    let isLoggedIn = !!token;

    const LogoutUser = () => {
        setToken("");
        return localStorage.removeItem("token");
    };

    // Auth in JWT

    const userAuthentication = async () => {
        try {
            const response = await fetch("http://localhost:2005/api/auth/user", {
                method: "GET",
                headers: {
                    Authorization: authorizationToken,
                },
            });
            if (response.ok) {
                const data = await response.json();

                setUser(data.userData);
            }
        } catch (error) {
            console.log("Error while fetching User's data");
        } finally {
            setLoading(false); // Set loading to false after API call completes
        }
    }

    useEffect(() => {
        userAuthentication();
    }, [token]);

    return (
        <AuthContext.Provider
            value={{ isLoggedIn, storeTokeninLocalMem, LogoutUser, user, loading, authorizationToken}} // Pass loading state to context
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const authContextValue = useContext(AuthContext);
    if (!authContextValue)
        throw new Error("useAuth used outside of the provider");

    return authContextValue;
};
