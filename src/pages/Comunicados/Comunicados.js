import React from 'react'

import "./Comunicados.css"

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { api } from "../../Utils/Config";
import Message from "../../components/Message";

import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import { red, yellow } from '@mui/material/colors';


const Comunicados = () => {

  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
   //const id = localStorage.getItem("id").replace(/"/g, '');
  //const token = localStorage.getItem("token").replace(/"/g, '');
  const token = sessionStorage.getItem("token").replace(/"/g, '');
  const id = sessionStorage.getItem("id").replace(/"/g, ''); 
  const header = { "Content-Type": "application/json;charset=UTF-8", "Authorization": `${token}` }   
  const [mensagemError, setMensagemError] = useState("");
  const [mensagemSuccess, setMensagemSuccess] = useState("");
  const [perAdmin,setPerAdmin] = useState(false) 

  const recuperarComunicados = async () => {
    const response = await axios.get(api + "/comunicados", { headers: header });
    const data = await response.data;
    setItems(data);
    setLoading(false);

  }

  const recuperarPermissões = async () => {
    
    const response = await axios.get(api + "/users/" + id + "/roles", { headers: header }); ;
    const data = await response.data[0];      
    if(data === "ROLE_ADMIN"){
      setPerAdmin(true);
    } 

  }
 



  useEffect(() => {
    try {
      recuperarComunicados();
      recuperarPermissões();        
    } catch (error) {
      setError(true)
      setMensagemError("Não foi possivel recarregar todos os items!")
    }
  }, [])

  const handleEdit = (comunicados) => {
    //console.log("Passou por aqui")
    setData(comunicados);
    //console.log("Setou o setData")
    navigate(`/comunicados/editar/${comunicados.id}`);
  };

  const handleRemove = async (id) => {
    try {
      await axios.delete(api + "/comunicados/" + id, { headers: header })
        .then((response) => {
          if (response.status === 204) {
            setMensagemSuccess("Removido com sucesso!")
            recuperarComunicados();

          } else {
            setMensagemError("Ocorreu um erro")
          }

        })
        .catch(function (error) {
          if (error.response.status === 403) {
            setMensagemError("Acesso negado!")
          } else {
            setMensagemError("Error, tente novamente mais tarde!")
          }
        });
    } catch (error) {
      setMensagemError("Acesso negado!")
    }

  };

  const setData = (data) => {
    let { id } = data;
    sessionStorage.setItem('ID', id);
  };



  return (
    <div className='container-comunicados-page'>
      <Link to={"/"} style={{ textDecoration: 'none' }}>           
          <button className='documento-form-btn-voltar'> Voltar </button>           
      </Link> 
      {/*<h1>Comunicados</h1>*/}
      {perAdmin?      
      <Box sx={{ '& > :not(style)': {m: '45%' } }}>
        <Link to={"/comunicados/criar"} style={{ textDecoration: 'none' }}>       
          <Fab size="medium" color="success" aria-label="add" sx={{ my: 1, mx: 'auto' }}>
            <AddIcon />
          </Fab>
        </Link>       
      </Box>
      :""}
      {mensagemError && <Message msg={mensagemError} type="error" />}
      {mensagemSuccess && <Message msg={mensagemSuccess} type="success" />}
      {loading && <p>Carregando dados...</p>}
      {error && <p>{error}</p>}
      <ul>
        {items &&
          items.map((comunicados) => (
            <li className="container-comunicados-page-items-li" key={comunicados.id}>
              <div className="container-comunicados-page-items">
                <h2>{comunicados.titulo}</h2>
                <p>{comunicados.mensagem}</p>
              </div>              
              {perAdmin ? <ModeEditOutlineIcon fontSize="large" sx={{ color: yellow[500] , mx: 5 }} onClick={() => handleEdit(comunicados)}/>:""}
              {perAdmin ? <DeleteIcon fontSize="large" sx={{ color: red[500], mx: 5 }} onClick={() => handleRemove(comunicados.id)}/>:""}
            </li>
          ))}
      </ul>      
    </div>
  )
}

export default Comunicados;