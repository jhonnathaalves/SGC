import React from "react";

import { useState } from 'react';

import axios from "axios";
import { api } from "../../Utils/Config";
import Message from "../../components/Message";

import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

import "./Cadastros.css";

const CadastrosColaborador = () => {
  
  const [nome, setNome] = useState();
  const [sobrenome, setSobrenome] = useState();
  const [cpf, setCpf] = useState();
  const perfis = ["ROLE_COLABORADOR"];  
  const [email, setEmail] =useState();
  const [senha, setSenha] = useState();
  const [telefone, setTelefone] = useState(); 

  
  const [error, setError] = useState(false);
  //const token = localStorage.getItem("token").replace(/"/g, '');
  const token = sessionStorage.getItem("token").replace(/"/g, '');  
  const header = { "Content-Type": "application/json;charset=UTF-8", "Authorization": `${token}` }
  const [mensagemError, setMensagemError] = useState(""); 
  const navigate = useNavigate(); 

 
 const criarSenha = async (stringPass) => {
    setNome(stringPass);
    const stringSenha = stringPass.toLowerCase();
    setSenha(stringSenha+"123"); 
 } 

     
  const handleCriar = async (e) => {
    e.preventDefault();
    
    
    const usuario = {
        nome,
        sobrenome,
        cpf,
        email,
        telefone,
        senha,
        perfis,                          
    };    

    axios.post(api + "/users", usuario, { headers: header })
      .then((response) => {        
        setNome("");
        setSobrenome("");
        setCpf("");
        setEmail("");
        setTelefone("");
        setSenha("");       

        navigate("/cadastros/colaboradores") 
      })
      .catch(function (error) {          
        if (error.response.status === 403) {
          setError(true);
          setMensagemError("Acesso negado!");
        } else {            
          setMensagemError("Error, tente novamente mais tarde!");
        }
      });
    
     
    
  };
  return (
    <div className="User">    
    {error && <Message msg={mensagemError} type="error" sx={{ my: 5 }} />}         
    <form onSubmit={handleCriar} className="criar-unidades-form">          
      
      <p>Nome:</p>
      <div className="wrap-input">
        <input className="input" type="text" placeholder="Nome" 
           onChange={(e) =>              
            criarSenha(e.target.value)           
           }/>
      </div>
      <p>Sobrenome:</p>
      <div className="wrap-input">
        <input className="input" type="text" placeholder="Sobrenome" 
           onChange={(e) => setSobrenome(e.target.value)}/>
      </div>
      <p>CPF:</p>
      <div className="wrap-input">
        <input className="input" type="text" placeholder="CPF" 
           onChange={(e) => setCpf(e.target.value)}/>
      </div>
      <p>Email:</p>
      <div className="wrap-input">
        <input className="input" type="text" placeholder="Email" 
           onChange={(e) => setEmail(e.target.value)}/>
      </div>
      <p>Telefone:</p>
      <div className="wrap-input">
        <input className="input" type="text" placeholder="Telefone" 
           onChange={(e) => setTelefone(e.target.value)}/>
      </div>  

      <Link to={"/cadastros/colaboradores"} style={{ textDecoration: 'none' }}>
        <button className='cancelar-unidades-form-btn'>Voltar</button>
      </Link>
      <input className='criar-unidades-form-btn' type="submit" value="Criar" disabled={!nome ||!sobrenome ||!cpf  } onClick={(e) => handleCriar(e)} />                   
      
      </form>        
  </div>      
  )
}

export default CadastrosColaborador;