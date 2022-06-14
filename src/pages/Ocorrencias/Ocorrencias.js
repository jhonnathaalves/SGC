import React from 'react'

import "./Ocorrencias.css"

import { useState, useEffect } from 'react';
import axios from "axios";
import { api } from "../../Utils/Config";
import Message from "../../components/Message";


const Ocorrencias = () => {

  const id = localStorage.getItem("id");  
  const token = localStorage.getItem("token").replace(/"/g, '');
  const header = { "Content-Type": "application/json;charset=UTF-8", "Authorization": `${token}` }
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [mensagemError, setMensagemError] = useState("");
  

  
  const recuperarOcorrencias = async () => {
    const response = await axios.get(api + "/ocorrencias", { headers: header });
    const data = await response.data;
    setItems(data);
    setLoading(false);

  }

  useEffect(() => {
    try {
      recuperarOcorrencias();        
    } catch (error) {
      setMensagemError("Não foi possivel recarregar todos os items!")
    }
  }, [])

  //const handleRemove = (id) => {
    //httpConfig(id, "DELETE");
  //};

  return (
    <div className='container-ocorrencia-page'>
      <h1>Ocorrencias</h1>
      {loading && <p>Carregando dados...</p>}
      {mensagemError ? <Message msg={mensagemError} type="error" />:
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
      </ul>}
    </div>
  )
}

export default Ocorrencias