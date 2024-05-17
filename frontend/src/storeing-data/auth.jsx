import React, { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState("");
    const [business, setBusiness] = useState(""); // State to store business data
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [loading, setLoading] = useState(true);
    const authorizationToken = `Bearer ${token}`;

    const storeTokeninLocalMem = (serverToken) => {
        setToken(serverToken);
        return localStorage.setItem("token", serverToken);
    };

    const storeBusinessData = (businessData) => {
        setBusiness(businessData);
        // Optionally, you can store business data in localStorage if needed
    };

    let isLoggedIn = !!token;

    const LogoutUser = () => {
        setToken("");
        return localStorage.removeItem("token");
    };

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
        }
    };

    const fetchBusinessData = async () => {
        try {
            const response = await fetch("http://localhost:2005/api/business/business", {
                method: "GET",
                headers: {
                    Authorization: authorizationToken,
                },
            });
            if (response.ok) {
                const businessData = await response.json();
                storeBusinessData(businessData.business);
            }
        } catch (error) {
            console.log("Error while fetching Business data");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        userAuthentication();
    }, [token]);

    useEffect(() => {
        if (isLoggedIn) {
            fetchBusinessData();
        }
    }, [isLoggedIn]);

    // This useEffect will run only once when the component mounts, initiating the data fetching process
    useEffect(() => {
        fetchBusinessData();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn,
                storeTokeninLocalMem,
                LogoutUser,
                user,
                business,
                loading,
                authorizationToken,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const authContextValue = useContext(AuthContext);
    if (!authContextValue) throw new Error("useAuth used outside of the provider");
    return authContextValue;
};
