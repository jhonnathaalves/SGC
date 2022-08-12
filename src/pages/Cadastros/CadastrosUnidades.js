import React from "react";

import { useState, useEffect } from 'react';


import moment from 'moment';

import axios from "axios";
import { api } from "../../Utils/Config";
import Message from "../../components/Message";

import { Link, useParams } from 'react-router-dom';

import { useNavigate } from "react-router-dom";

import "./Cadastros.css";

const CadastrosUnidades = () => {

  //const ID = localStorage.getItem("id").replace(/"/g, '');
  const ID = sessionStorage.getItem("id").replace(/"/g, '');  
  const [numero,setNumero] = useState();
  const [bloco,setBloco] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  //const token = localStorage.getItem("token").replace(/"/g, '');
  const token = sessionStorage.getItem("token").replace(/"/g, '');
  
  const header = { "Content-Type": "application/json;charset=UTF-8", "Authorization": `${token}` }
  const [mensagemError, setMensagemError] = useState("");
  const [mensagemSuccess, setMensagemSuccess] = useState("");

  const navigate = useNavigate();    
  const handleCriar = async (e) => {
    e.preventDefault();
    
    const unidade = {
      bloco,
      numero,          
    };

    axios.post(api + "/unidades", unidade, { headers: header })
      .then((response) => {        
        setBloco("");
        setNumero("");       

        navigate("/cadastros/unidades") 
      })
      .catch(function (error) {          
        if (error.response.status === 403) {
          setMensagemError("Acesso negado!")
        } else {            
          setMensagemError("Error, tente novamente mais tarde!")
        }
      });
    
     
    
  };
  return (
    <div className="Unidades">      
    <form onSubmit={handleCriar} className="criar-unidades-form">          
      
      <p>Bloco:</p>
      <div className="wrap-input">
        <input className="input" type="text" placeholder="Bloco" 
           onChange={(e) => setBloco(e.target.value)}/>
      </div>
      <p>Apartamento:</p>
      <div className="wrap-input">
        <input className="input" type="text" placeholder="Numero"
           onChange={(e) => setNumero(e.target.value)} />
      </div>      

      <Link to={"/cadastros/unidades"} style={{ textDecoration: 'none' }}>
        <button className='cancelar-unidades-form-btn'>Voltar</button>
      </Link>
      <input className='criar-unidades-form-btn' type="submit" value="Criar" disabled={!bloco ||!numero } onClick={(e) => handleCriar(e)} />                   
      
      </form>        
  </div>      
  )
}

export default CadastrosUnidades