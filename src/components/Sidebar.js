import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import { useNavigate } from "react-router-dom";
import { TouchableOpacity } from 'react-native';

import axios from "axios";
import { useState, useEffect } from 'react';

import { api } from "../Utils/Config";
import { white } from '@mui/material/colors';

import './Sidebar.css';

export default props => {
  const navigate = useNavigate();
  //const token = localStorage.getItem("token").replace(/"/g, '');
  //const header = { "Content-Type": "*/*", "Authorization": `${token}` }
  //const id = localStorage.getItem("id").replace(/"/g, '');  
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
  return (
    
    <Menu {...props}>
      <ul>
        <TouchableOpacity style={{ textDecoration: 'none' }} onPress={() => { navigate("/") }} >          
        <li className="menu-item" >
            Home
        </li>
        </TouchableOpacity>
        
        <TouchableOpacity style={{ textDecoration: 'none' }} onPress={() => { navigate("/dados") }} >
        <li className="menu-item">
            Dados Pessoais
        </li>
        </TouchableOpacity>
        {perUser?
        <TouchableOpacity style={{ textDecoration: 'none' }} onPress={() => { navigate("/comunicados") }} >
        <li className="menu-item" >
            Comunicados
        </li>
        </TouchableOpacity>:""}
        {perUser?
        <TouchableOpacity style={{ textDecoration: 'none' }} onPress={() => { navigate("/despesas") }} >
        <li className="menu-item" >
            Despesas
        </li>
        </TouchableOpacity>:""}
        
        <TouchableOpacity style={{ textDecoration: 'none' }} onPress={() => { navigate("/ocorrencias") }} >
        <li className="menu-item" >
            Ocorrências
        </li>
        </TouchableOpacity>
        {perUser?
        <TouchableOpacity style={{ textDecoration: 'none' }} onPress={() => { navigate("/agendamentos") }} >
        <li className="menu-item" >
            Agendamentos
        </li>
        </TouchableOpacity>:""}
        {perUser?
        <TouchableOpacity style={{ textDecoration: 'none' }} onPress={() => { navigate("/documentos") }} >
        <li className="menu-item" >
            Documentos
        </li>
        </TouchableOpacity>:""}        
        <TouchableOpacity style={{ textDecoration: 'none' }} onPress={() => { navigate("/visitas") }} >
        <li className="menu-item" >
            Visitantes
        </li>
        </TouchableOpacity>
        {perAdmin?
        <TouchableOpacity style={{ textDecoration: 'none' }} onPress={() => { navigate("/cadastros") }} >
        <li className="menu-item" >
            Cadastros
        </li>
        </TouchableOpacity>:""}
     </ul>
    </Menu>   
    
  );
};