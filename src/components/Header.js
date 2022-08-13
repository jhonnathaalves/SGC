import React from 'react';
import { NavLink } from "react-router-dom";

import axios from "axios";
import { useState, useEffect } from 'react';

import { api } from "../Utils/Config";

import { TouchableOpacity } from 'react-native';
import LogoutIcon from '@mui/icons-material/Logout';

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
  //const token = localStorage.getItem("token").replace(/"/g, '');  
  //const header = { "Content-Type": "*/*", "Authorization": `${token}` }  
  const token = sessionStorage.getItem("token").replace(/"/g, '');
  const header = { "Content-Type": "*/*", "Authorization": `${token}` }
  const id = sessionStorage.getItem("id").replace(/"/g, '');
  const [perUser, setPerUser] = useState(false);
  const [perAdmin,setPerAdmin] = useState(false);  
  

  const recuperarPermissões = async () => {
    
        const response = await axios.get(api + "/users/" + id + "/roles", { headers: header }); ;
        const data = await response.data[0];      
        if(data === "ROLE_USER"){
          setPerUser(true);
        } else if(data === "ROLE_ADMIN"){
          setPerUser(true);
          setPerAdmin(true);
        } else {

        }
          

  }

  useEffect(() => {    
    recuperarPermissões();    
  }, [])

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
      {perUser?
      <NavLink className={(navData) => navData.isActive ? "active" : "" } to="/comunicados">
        Comunicados
      </NavLink>:""}
      {perUser?
      <NavLink className={(navData) => navData.isActive ? "active" : "" } to="/despesas">
        Despesas
      </NavLink>:""}
      <NavLink className={(navData) => navData.isActive ? "active" : "" } to="/ocorrencias">
        Ocorrências
      </NavLink>
      {perUser?
      <NavLink className={(navData) => navData.isActive ? "active" : "" } to="/agendamentos">
        Agendamentos
      </NavLink>:""}
      {perUser?
      <NavLink className={(navData) => navData.isActive ? "active" : "" } to="/documentos">
        Documentos
      </NavLink>:""}
      <div className='botaoSair'>
      <TouchableOpacity style={{ textDecoration: 'none' }} onPress={() =>  handleLogout() } >
        <LogoutIcon sx={{ color: '#ffffff', my: 2 }} fontSize="large"/> 
      </TouchableOpacity>
      </div>
    </nav>
  )
}

export default Header