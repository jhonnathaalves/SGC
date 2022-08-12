import React, { useState } from 'react'

import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import axios from "axios";

import { api } from "../../Utils/Config";
import { useNavigate } from "react-router-dom";
import Message from "../../components/Message";

import moment from 'moment';

import "./AtenderOcorrencia.css"

const AtenderOcorrencias = () => {
    
  const navigate = useNavigate(); 
  //const ID = localStorage.getItem("id").replace(/"/g, '');
  const token = sessionStorage.getItem("token").replace(/"/g, '');
  const ID = sessionStorage.getItem("id").replace(/"/g, '');   
  const [status,setStatus] = useState('FECHADO');
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [autor, setAutor] = useState('');
  const [resposta, setResposta ] = useState(null);
  const [data, setData ] = useState('');
  const [autorResposta, setAutorResposta] = useState("");
  const [dataResposta, setDataResposta] = useState("");
  const [mensagemError, setMensagemError] = useState("");
  const [loading, setLoading] = useState(true);
  //const token = localStorage.getItem("token").replace(/"/g, '');
  const header = { "Content-Type": "application/json;charset=UTF-8", "Authorization": `${token}` }
  const [error, setError] = useState("");
  
  const {id} = useParams();  

  if (!id){
    const id = localStorage.getItem("ID").replace(/"/g, '');
  }

  const recuperarDados = async () => {
    try {
        const response = await axios.get(api + "/users/" + ID, { headers: header });
        const data = await response.data;
        const id = data.id;
        const nome = data.nome;        
        setAutorResposta({id,nome,}); 
        setDataResposta(currentData());          
        
        setLoading(false);
    } catch (error) {
        setError(true);
        setMensagemError("Não foi possivel recarregar os Dados do usuario!");
    }
   

  }

  useEffect(() => {    
      recuperarDados();    
  }, [])
  

  const currentData = () => {  

    const dataAtual = moment();    
    return dataAtual.format('YYYY-MM-DD[T]HH:mm:ss');
    
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

  const handleAtender = (e) => {

    e.preventDefault(); 
    
    const ocorrencias = {
      status,
      titulo,
      descricao,
      autor,
      data,
      resposta,
      dataResposta,
      autorResposta,        
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
    <div className="container-page-atender-ocorrencias">
    {loading && <p>Carregando dados...</p>} 
    <div className="container-atender-ocorrencias">
        <div className="wrap-atender-ocorrencias">
            <div className="add-ocorrencias">                   
                <form onSubmit={handleAtender} className="atender-ocorrencias-form">                            
                    <div className="wrap-atender-ocorrencias-input">
                        <input readOnly className="input-atender-ocorrencias" type="text" value={titulo} placeholder='Título'
                            selectTextOnFocus={false} />
                    </div>                      
                    <div className="wrap-atender-ocorrencias-input">
                        <textarea readOnly className='textarea-atender-ocorrencias' value={descricao} editable={false} selectTextOnFocus={false} />
                    </div>
                    <div className="wrap-atender-ocorrencias-input">
                        <textarea className='textarea-atender-ocorrencias' value={resposta} placeholder='Resposta' onChange={(e) => setResposta(e.target.value)} /> 
                    </div>
                    <Link to={"/ocorrencias"} style={{ textDecoration: 'none' }}>                    
                        <button className="atender-ocorrencias-form-btn-cancelar" disabled={!descricao } onClick={(e) => localStorage.removeItem('ID')}>Cancelar</button>                    
                    </Link>                    
                    <input className='atender-ocorrencias-form-btn-atender' disabled={!resposta } type="submit" value="Atender" onClick={(e) => handleAtender(e)} />                    
                    {mensagemError && <Message msg={mensagemError} type="error" />}
                </form>
            </div>
        </div>
    </div>
</div>
  )
}

export default AtenderOcorrencias