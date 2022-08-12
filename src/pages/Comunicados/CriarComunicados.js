import React from 'react'

import { useState } from 'react';
import { useFetch } from "../../hooks/useFetch";
import { Link } from 'react-router-dom';
import axios from "axios";
import { api } from "../../Utils/Config";
import "./CriarComunicados.css"
import { useNavigate } from "react-router-dom";
import Message from "../../components/Message";

const CriarComunicados = () => {

  const navigate = useNavigate();

  //const [comunicados, setComunicados] = useState([]);
  const { loading } = useFetch("");

  const [titulo, setTitulo] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [mensagemError, setMensagemError] = useState("");
  const [data, setData] = useState("");
  //const token = localStorage.getItem("token").replace(/"/g, '');
  const token = sessionStorage.getItem("token").replace(/"/g, ''); 
  const header = { "Content-Type": "application/json;charset=UTF-8", "Authorization": `${token}` }

  const currentData = () => {
    const date = ("0" + (new Date().getDate())).slice(-2);
    const month = ("0" + (new Date().getMonth() + 1)).slice(-2);
    const year = new Date().getFullYear();

    return (year + "-" + month + "-" + date).toString();
  }


  const handleCriar = async (e) => {
    e.preventDefault();


    const comunicados = {
      titulo,
      mensagem,
      data,
    };

    console.log(comunicados);

    axios.post(api + "/comunicados", comunicados, { headers: header })
      .then((response) => {
        console.log(response.data);
        setTitulo("");
        setMensagem("");
        setData("");

        navigate("/comunicados") 
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
    <div className="container-page-criar-comunicados">
      <div className="container-criar-comunicados">
        <div className="wrap-criar-comunicados">
          <div className="add-comunicados">
            <form onSubmit={handleCriar} className="criar-comunicados-form">
              <div className="wrap-criar-comunicados-input">
                <input className="input-criar-comunicados" type="text" value={titulo} placeholder='Titulo'
                  onChange={(e) => setTitulo(e.target.value)}
                />
              </div>
              <div className="wrap-criar-comunicados-input">
                <textarea className='textarea-criar-comunicados' value={mensagem} name="mensagem" placeholder='Mensagem' onChange={(e) => setMensagem(e.target.value)} />
              </div>
              <Link to={"/comunicados"} style={{ textDecoration: 'none' }}>
                <div className="criar-comunicados-form-btn-cancelar">
                  <button className="criar-comunicados-form-btn-cancelar">Cancelar</button>
                </div>
              </Link>
              <div className="criar-comunicados-form-btn-criar">
                {loading ? <p>Aguarde!</p> : <input className='criar-comunicados-form-btn-criar' disabled={!titulo || !mensagem } type="submit" value="Criar" onClick={(e) => setData(currentData())} />}
              </div>
              {mensagemError && <Message msg={mensagemError} type="error" />}
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CriarComunicados