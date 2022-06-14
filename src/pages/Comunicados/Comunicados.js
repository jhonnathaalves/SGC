import React from 'react'

import "./Comunicados.css"

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import { api } from "../../Utils/Config";
import Message from "../../components/Message";


const Comunicados = () => {

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const token = localStorage.getItem("token").replace(/"/g, '');
  const header = { "Content-Type": "application/json;charset=UTF-8", "Authorization": `${token}` }
  const [mensagemError, setMensagemError] = useState("");
  const [mensagemSuccess, setMensagemSuccess] = useState("");

  const recuperarComunicados = async () => {
    const response = await axios.get(api + "/comunicados", { headers: header });
    const data = await response.data;
    setItems(data);
    setLoading(false);

  }

  useEffect(() => {
    try {
      recuperarComunicados();        
    } catch (error) {
      setError(true)
      setMensagemError("Não foi possivel recarregar todos os items!")
    }
  }, [])

  const handleRemove = async (id) => {
    try {
      await axios.delete(api + "/comunicados/" + id, { headers: header })
        .then((response) => {
          if (response.status === 204) {
            setMensagemSuccess("Removido com sucesso!")
            recuperarComunicados();

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
                {!loading && <button className="comunicados-form-btn-excluir" type='button' onClick={() => handleRemove(comunicados.id)}>Excluir</button>}
                {loading && <button className="comunicados-form-btn-excluir" type='button' disabled >Aguarde...</button>}
              </div>
            </li>
          ))}
      </ul>
      {mensagemError && <Message msg={mensagemError} type="error" />}
      {mensagemSuccess && <Message msg={mensagemSuccess} type="success" />}
    </div>
  )
}

export default Comunicados;