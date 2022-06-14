import React, { useState, useEffect, createContext } from 'react'
import { useNavigate } from 'react-router-dom';

import { api, createSession } from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [id,setId] = useState(null); 
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const recoveredUser = localStorage.getItem('user');

        if (recoveredUser) {
            setUser(JSON.parse(recoveredUser));
        }
        setLoading(false);
    }, [])

    const login = async (email, senha) => {

        //api criar uma session
        const response = await createSession(email, senha);
        console.log("login", response.data);

        console.log("id", response.data["id"]);

        const loggedUser = response.data;
        const token = response.headers.authorization;
        const id = response.data.id;

        console.log(token);

        localStorage.setItem("user", JSON.stringify(loggedUser));
        localStorage.setItem("token", token);
        localStorage.setItem("id", id)

        api.defaults.headers.Authorizarion = `${token}`;

        setUser(loggedUser);
        navigate("/");

    };

    const logout = () => {
        console.log("logout");
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        localStorage.removeItem('id');
        api.defaults.headers.Authorizarion = null;
        setUser(null);
        navigate("/login")
    };

    return (
        <AuthContext.Provider value={{ authenticated: Boolean(user), user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}