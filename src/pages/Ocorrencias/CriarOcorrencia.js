import React, { useState } from 'react';

import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import axios from "axios";

import moment from 'moment';

import "./CriarOcorrencia.css";

import { api } from "../../Utils/Config";
import { useNavigate } from "react-router-dom";
import Message from "../../components/Message";

const CriarOcorrencia = () => {
  const navigate = useNavigate();
  //const id = localStorage.getItem("id").replace(/"/g, '');
  const [nome,setNome] = useState("");
  const [status,setStatus] = useState('ABERTO');
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [resposta, setResposta ] = useState(null);
  const [data, setData ] = useState('');
  const [mensagemError, setMensagemError] = useState("");
  const [user, setUser] = useState("");  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  //const token = localStorage.getItem("token").replace(/"/g, '');
  const token = sessionStorage.getItem("token").replace(/"/g, '');
  const id = sessionStorage.getItem("id").replace(/"/g, ''); 
  const header = { "Content-Type": "application/json;charset=UTF-8", "Authorization": `${token}` }

  const recuperarDados = async () => {
    try {
        const response = await axios.get(api + "/users/" + id, { headers: header });
        const data = await response.data;
        setNome(data.nome);      
        
        setLoading(false);
    } catch (error) {
        setError(true)
        setMensagemError("Não foi possivel recarregar os Dados do usuario!")
    }
   

  }

  useEffect(() => {    
      recuperarDados();    
  }, [])
  

  const currentData = () => {  

    const dataAtual = moment();    
    return dataAtual.format('YYYY-MM-DD[T]HH:mm:ss');
    
  }

  const handleCriar = async (e) => {
    e.preventDefault(); 
    

    setNome(user.nome);

    const autor = {
        id,
        nome,              
    };

    const ocorrencias = {
        status,
        titulo,
        descricao,
        autor,
        data,
        resposta,        
    };    

    axios.post(api + "/ocorrencias", ocorrencias, { headers: header })
      .then((response) => {        
        setStatus("");
        setTitulo("");
        setDescricao("");        

        navigate("/ocorrencias") 
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
    <div className="container-page-criar-ocorrencias">        
        <div className="container-criar-ocorrencias">
            <div className="wrap-criar-ocorrencias">
                <div className="add-ocorrencias">
                {loading ? 
                        <p>Carregando dados do Usuario...</p> :                   
                    <form onSubmit={handleCriar} className="criar-ocorrencias-form">                            
                        <div className="wrap-criar-ocorrencias-input">                               
                            <input className="input-criar-ocorrencias" type="text" value={titulo} placeholder='Título'
                                onChange={(e) => setTitulo(e.target.value)}/>
                        </div>                      
                        <div className="wrap-editar-ocorrencias-input">                            
                            <textarea className='textarea-editar-ocorrencias' value={descricao} placeholder='Descrição' onChange={(e) => setDescricao(e.target.value)} />
                        </div>                        
                        <Link to={"/ocorrencias"} style={{ textDecoration: 'none' }}>
                            <button className="criar-ocorrencias-form-btn-cancelar">Voltar</button>                            
                        </Link>                      
                        <input className='criar-ocorrencias-form-btn-criar' disabled={!descricao || !titulo } type="submit" value="Criar" onClick={(e) => setData(currentData())} />
                        
                        {mensagemError && <Message msg={mensagemError} type="error" />}
                    </form>}
                    {mensagemError && <Message msg={mensagemError} type="error" />}
                </div>
            </div>
        </div>
  </div>
  )
}

export default CriarOcorrencia