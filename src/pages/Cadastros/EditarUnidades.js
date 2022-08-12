import React from "react";

import { useState, useEffect } from 'react';


import moment from 'moment';

import axios from "axios";
import { api } from "../../Utils/Config";
import Message from "../../components/Message";

import { Link, useParams } from 'react-router-dom';

import { useNavigate } from "react-router-dom";

import "./Cadastros.css";

const EditarUnidades = () => {
  //const ID = localStorage.getItem("ID").replace(/"/g, '');
  const ID = sessionStorage.getItem("ID").replace(/"/g, '');  
  const [numero,setNumero] = useState();
  const [bloco,setBloco] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const token = sessionStorage.getItem("token").replace(/"/g, '');
  //const token = localStorage.getItem("token").replace(/"/g, '');
  
  const header = { "Content-Type": "application/json;charset=UTF-8", "Authorization": `${token}` }
  const [mensagemError, setMensagemError] = useState("");
  const [mensagemSuccess, setMensagemSuccess] = useState("");

  const navigate = useNavigate();
  
  const recuperarDados = async () => {
    try {
        const response = await axios.get(api + "/unidades/" + ID, { headers: header });
        const data = await response.data;       
        
        const bloco = data.bloco;
        const numero = data.numero;
        setBloco(bloco);
        setNumero(numero);      

        setLoading(false);
    } catch (error) {
        setError(true);
        setMensagemError("Não foi possivel recarregar os Dados do usuario!");
    }
   

  }

  useEffect(() => {    
      recuperarDados();    
  }, [])

    
  const handleCriar = async (e) => {
    e.preventDefault();
    
    const unidade = {
      bloco,
      numero,          
    };

    axios.put(api + "/unidades/" + ID, unidade, { headers: header })
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
        <input className="input" type="text" value={bloco} placeholder="Bloco" 
           onChange={(e) => setBloco(e.target.value)}/>
      </div>
      <p>Apartamento:</p>
      <div className="wrap-input">
        <input className="input" type="text" value={numero} placeholder="Numero"
           onChange={(e) => setNumero(e.target.value)} />
      </div>      

      <Link to={"/cadastros/unidades"} style={{ textDecoration: 'none' }}>
        <button className='cancelar-unidades-form-btn'>Voltar</button>
      </Link>
      <input className='criar-unidades-form-btn' type="submit" value="Editar" disabled={!bloco ||!numero } onClick={(e) => handleCriar(e)} />                   
      
      </form>        
  </div>
  )
}

export default EditarUnidades