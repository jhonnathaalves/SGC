import React, { useState } from 'react'

import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import axios from "axios";

import { api } from "../../Utils/Config";

import Message from "../../components/Message";

import "./VisualizarOcorrencias.css"

const VisualizarOcorrencias = () => {
    
   
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [resposta, setResposta ] = useState('');
    const [mensagemError, setMensagemError] = useState("");   
    const [loading, setLoading] = useState(true);
    //const token = localStorage.getItem("token").replace(/"/g, '');
    const token = sessionStorage.getItem("token").replace(/"/g, '');
    const header = { "Content-Type": "application/json;charset=UTF-8", "Authorization": `${token}` }
    
    const {id} = useParams();  

    if (!id){
        const id = localStorage.getItem("ID").replace(/"/g, '');
    }  

    useEffect(() => {
        if (id) {
          axios.get(api + "/ocorrencias/" + id, { headers: header })
            .then((response) => {           
                       
              setTitulo(response.data.titulo);
              setDescricao(response.data.descricao);
              setResposta(response.data.resposta);
              setLoading(false);              
            })
        }
      }, [])


  return (
    <div className="container-page-view-ocorrencias">
        {loading && <p>Carregando dados...</p>} 
        <div className="container-view-ocorrencias">
            <div className="wrap-view-ocorrencias">
                <div className="add-ocorrencias">                   
                    <form className="view-ocorrencias-form">  
                        <div className="wrap-view-ocorrencias-input">
                            <input className="input-view-ocorrencias" type="text" value={titulo} placeholder='Título'
                                readOnly selectTextOnFocus={false} />                     
                        </div>                      
                        <div className="wrap-view-ocorrencias-input">                            
                            <textarea className='textarea-view-ocorrencias' value={descricao} readOnly selectTextOnFocus={false} />   
                        </div>
                        <div className="wrap-view-ocorrencias-input">
                            <textarea className='textarea-view-ocorrencias' value={resposta} readOnly selectTextOnFocus={false} />
                        </div>
                        <Link to={"/ocorrencias"} style={{ textDecoration: 'none' }}>                        
                            <button className="view-ocorrencias-form-btn-cancelar" onClick={(e) => localStorage.removeItem('ID')}>Voltar</button>                        
                        </Link>                        
                        {mensagemError && <Message msg={mensagemError} type="error" />}
                    </form>
                </div>
            </div>
        </div>
  </div>
  )
}

export default VisualizarOcorrencias