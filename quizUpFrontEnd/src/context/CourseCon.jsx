import React, { createContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';

const AuthCon = createContext({});

export function AuthPro({ children }) {
    const [auth, setAuth] = useState(Cookies.get("token"));
    const [user, setUser] = useState({});

    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await fetch('http://localhost:3000/user/auth', {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${auth}`,
                    },
                });

                if (response.ok) {
                    const res = await response.json();
                    setUser(res.data);
                } else {
                    console.error('Error fetching user data:', response.status);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        getUser();
    }, [auth]);

    useEffect(() => {
        //console.log(user);
    }, [user]);

    return (
        <AuthCon.Provider value={{ auth, setAuth, user, setUser }}>{children}</AuthCon.Provider>
    );
}

export default AuthCon;
