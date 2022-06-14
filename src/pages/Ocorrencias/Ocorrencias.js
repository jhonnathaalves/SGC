import React from 'react'

import "./Ocorrencias.css"

import { useState, useEffect } from 'react';
import { useFetch } from "../../hooks/useFetch";



const Ocorrencias = () => {

  const id = localStorage.getItem("id");
  const url = "https://sistemagestaocondominio.herokuapp.com/ocorrencias";
  const token = localStorage.getItem("token").replace(/"/g, '');
  const header = { "Content-Type": "application/json;charset=UTF-8", "Authorization": `${token}` }
  const [ocorrencias, setOcorrencias] = useState([]);

  const { data: items, httpConfig, loading, error } = useFetch(url, { header });

  const handleRemove = (id) => {
    httpConfig(id, "DELETE");
  };

  return (
    <div className='container-ocorrencia-page'>
      <h1>Ocorrencias</h1>
      {loading && <p>Carregando dados...</p>}
      {error && <p>{error}</p>}
      <ul>
        {items &&
          items.map((ocorrencias) => (
            <li key={ocorrencias.id} className="container-ocorrencia-page-items-li" >
              <div className="container-ocorrencia-page-items">
                <h2>{ocorrencias.titulo}</h2>
                <p>{ocorrencias.mensagem} - By:{ocorrencias.autor.nome} </p>
                <div className="container-ocorrencia-page-items-respostas">
                  {ocorrencias.resposta.map((resposta) => {
                    return <p>{resposta.texto} - By: {resposta.author.nome}</p>
                  })}
                </div>
              </div>
              {/*<div className="ocorrencias-form-btn">
                <button className="ocorrencias-form-btn" onClick={() => handleRemove(ocorrencias.id)}>Excluir</button>
                </div>*/}
            </li>
          ))}
      </ul>
    </div>
  )
}

export default Ocorrencias