import React from 'react'

import "./Comunicados.css"

import { useState, useEffect } from 'react';
import { useFetch } from "../../hooks/useFetch";
import { Link } from 'react-router-dom';
import axios from "axios";
import { api, requestConfig } from "../../Utils/Config";
import { useNavigate } from "react-router-dom";
import Message from "../../components/Message";

const url = "https://sistemagestaocondominio.herokuapp.com/comunicados"
const headers = { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }


const Comunicados = () => {


  const navigate = useNavigate();
  const [obj, setObj] = useState([]);
  const { data: items, httpConfig, loading, error } = useFetch(url, { headers });
  const token = localStorage.getItem("token").replace(/"/g, '');
  const header = { "Content-Type": "application/json;charset=UTF-8", "Authorization": `${token}` }
  const [mensagemError, setMensagemError] = useState("");

  const handleRemove = (id) => {
    try {
      axios.delete(api + "/comunicados/" + id, { headers: header })
        .then((response) => {
          if (response.status === 204) {           
            window.location.reload(false);
          } else {
            console.log("Ocorreu um erro")
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
    localStorage.setItem('ID', id);
  };



  return (
    <div className='container-comunicados-page'>
      {/*<h1>Comunicados</h1>*/}
      <div className="container-btn-add">
        <Link to={"/comunicados/criar"} style={{ textDecoration: 'none' }}>
          <div>
            <button className="comunicados-form-btn-adicionar">Criar</button>
          </div>
        </Link>
      </div>
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
              <Link to={"/comunicados/editar/" + comunicados.id} style={{ textDecoration: 'none' }}>
                <div className="comunicados-form-btn-editar">
                  <button className="comunicados-form-btn-editar" onClick={() => setData(comunicados)}>Editar</button>
                </div>
              </Link>
              <div className="comunicados-form-btn-excluir">
                <button className="comunicados-form-btn-excluir" onClick={() => handleRemove(comunicados.id)}>Excluir</button>
              </div>
            </li>
          ))}
      </ul>
      {mensagemError && <Message msg={mensagemError} type="error" />}
    </div>
  )
}

export default Comunicados;