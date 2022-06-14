import React from 'react';
import { NavLink } from "react-router-dom";

//hooks
//import { useAuth } from "../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// Redux
import { logout, reset } from "../slices/AuthSlice";

import "./Header.css"

const Header = () => {
 // const { auth } = useAuth();
  //const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const dispatch = useDispatch(); 

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());

    navigate("/login");
  };

  return (
    <nav>
      <NavLink className={(navData) => navData.isActive ? "active" : "" } to="/">
        Home
      </NavLink>
      <NavLink className={(navData) => navData.isActive ? "active" : "" } to="/dados">
        Dados Pessoais
      </NavLink>
      <NavLink className={(navData) => navData.isActive ? "active" : "" } to="/comunicados">
        Comunicados
      </NavLink>
      <NavLink className={(navData) => navData.isActive ? "active" : "" } to="/despesas">
        Despesas
      </NavLink>
      <NavLink className={(navData) => navData.isActive ? "active" : "" } to="/ocorrencias">
        Ocorrências
      </NavLink>
      <NavLink className={(navData) => navData.isActive ? "active" : "" } to="/agendamentos">
        Agendamentos
      </NavLink>
      <NavLink className={(navData) => navData.isActive ? "active" : "" } to="/documentos">
        Documentos
      </NavLink> 
      <span onClick={handleLogout}>Sair</span> 
    </nav>
  )
}

export default Header