import React from 'react'

import "./Dados.css";

// components
import Message from "../../components/Message";
import axios from "axios";
import { api } from "../../Utils/Config";
import { Link } from 'react-router-dom';

// hooks
import { useEffect, useState} from "react";


const Dados = () => {
  //const id = localStorage.getItem("id").replace(/"/g, '');
  //const token = localStorage.getItem("token").replace(/"/g, '');
  //const header = { "Content-Type": "application/json;charset=UTF-8", "Authorization": `${token}` }
  const token = sessionStorage.getItem("token").replace(/"/g, '');
  const header = { "Content-Type": "*/*", "Authorization": `${token}` }
  const id = sessionStorage.getItem("id").replace(/"/g, '');
  const [mensagemError, setMensagemError] = useState("");

  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const recuperarDados = async () => {
    try {
      const response = await axios.get(api + "/users/" + id, { headers: header });
      const data = await response.data;
      setUser(data);
      setLoading(false);
    } catch (error) {
      setError(true)
      setMensagemError("Não foi possivel recarregar os Dados do usuario!")
    }
    

  }

  useEffect(() => {    
      recuperarDados();    
  }, [])

  return (
    <div className="container-d">
      <Link to={"/"} style={{ textDecoration: 'none' }}>           
          <button className='documento-form-btn-voltar'> Voltar </button>           
      </Link>  
      <div className="container-dados">
        <div className="wrap-dados">
          
          
          {loading ? 
          <p>Carregando dados...</p> :
           <form className="login-form">
            <p>Nome:</p>
            <div className="wrap-input">
              <input readOnly className="input" type="nome" placeholder="Nome" value={user.nome || ""}  />
            </div>
            <p>Sobrenome:</p>
            <div className="wrap-input">
              <input readOnly className="input" type="sobrenome" placeholder="Sobrenome" value={user.sobrenome || ""} />
            </div>
            <p>CPF:</p>
            <div className="wrap-input">
              <input readOnly className="input" type="CPF" placeholder="CPF" value={user.cpf || ""} />
            </div>
            <p>E-mail:</p>
            <div className="wrap-input">
              <input readOnly className="input" type="e-mail" placeholder="E-mail" value={user.email || ""} />
            </div>
            <p>Telefone:</p>
            <div className="wrap-input">
              <input readOnly className="input" type="telefone" placeholder="Telefone" value={user.telefone || ""} />
            </div>
          </form>}
          {mensagemError && <Message msg={mensagemError} type="error" />}
          <Link to={"/dados/editar"} style={{ textDecoration: 'none' }}>           
            <input className='editar-dados-form-btn-editar' type="submit" value="Editar"/>
          </Link> 
          
        </div>
      </div>
    </div>
  )
}

export default Dados;