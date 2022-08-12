import React, { useState } from 'react'

import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import axios from "axios";

import { api } from "../../Utils/Config";
import { useNavigate } from "react-router-dom";
import Message from "../../components/Message";

import "./EditarOcorrencias.css"


const EditarOcorrencias = () => {

  const navigate = useNavigate();
  const [nome,setNome] = useState("");
  const [status,setStatus] = useState('ABERTO');
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [autor, setAutor] = useState('');
  const [resposta, setResposta ] = useState(null);
  const [data, setData ] = useState('');
  const [mensagemError, setMensagemError] = useState("");
  const [disabled, setDisabled] = useState(false);
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
          setAutor(response.data.autor);
          setData(response.data.data);
          setLoading(false);          
        })
    }
  }, [])

  const handleCancelar = () => {
    localStorage.removeItem('ID');
    navigate("/ocorrencias");
  }

  const handleEditar = (e) => {

    e.preventDefault();

    const ocorrencias = {
      status,
      titulo,
      descricao,
      autor,
      data,
      resposta,        
  };

    axios.put(api + "/ocorrencias/" + id, ocorrencias, { headers: header })
      .then((response) => {
        if (response.status === 204) {         
          setTitulo(response.data.titulo);
          setDescricao(response.data.descricao);
          setResposta(response.data.resposta);

        }
        localStorage.removeItem('ID');
        navigate("/ocorrencias");

      }).catch(function (error) {
        if (error.response.status === 403) {
          setMensagemError("Acesso negado!")
        } else {
          setMensagemError("Error, tente novamente mais tarde!")
        }
      });


  }

  return (
    <div className="container-page-editar-ocorrencias">
        {loading && <p>Carregando dados...</p>} 
        <div className="container-editar-ocorrencias">
            <div className="wrap-editar-ocorrencias">
                <div className="add-ocorrencias">                   
                    <form onSubmit={handleEditar} className="editar-ocorrencias-form">                            
                        <div className="wrap-editar-ocorrencias-input">
                            { disabled ?
                            
                                <input className="input-editar-ocorrencias" type="text" value={titulo} placeholder='Título'
                                editable={false} selectTextOnFocus={false}
                                />
                            :
                            
                                <input className="input-editar-ocorrencias" type="text" value={titulo} placeholder='Título'
                                onChange={(e) => setTitulo(e.target.value)}/>
                            }
                        
                        </div>                      
                        <div className="wrap-editar-ocorrencias-input">
                            { disabled ?
                            <textarea className='textarea-editar-ocorrencias' value={descricao} editable={false} selectTextOnFocus={false} />
                            :
                            <textarea className='textarea-editar-ocorrencias' value={descricao} onChange={(e) => setDescricao(e.target.value)} />
                            }
                        </div>                        
                        <Link to={"/ocorrencias"} style={{ textDecoration: 'none' }}>                        
                          <button className="editar-ocorrencias-form-btn-cancelar" onClick={(e) => localStorage.removeItem('ID')}>Cancelar</button>                        
                        </Link>                        
                        <input className='editar-ocorrencias-form-btn-editar' disabled={!descricao } type="submit" value="Editar" onClick={(e) => handleEditar(e)} />                        
                        {mensagemError && <Message msg={mensagemError} type="error" />}
                    </form>
                </div>
            </div>
        </div>
  </div>
  )
}

export default EditarOcorrencias