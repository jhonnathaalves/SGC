import React from 'react'

import { useState, useEffect } from 'react';
import { useFetch } from "../../hooks/useFetch";
import { Link, useParams } from 'react-router-dom';

import axios from "axios";

import { api, requestConfig } from "../../Utils/Config";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Message from "../../components/Message";


import "./Visitas.css"
import { updateNotice, getNoticeDetails } from '../../slices/NoticeSlice';



const EditarVisitas = () => {

  const navigate = useNavigate();
  const [horaEntrada, setHoraEntrada] = useState();
  const [nome,setNome] = useState();
  const [bloco,setBloco] = useState();
  const [unidade,setUnidade] = useState();
  const [tipoVisita, setTipoVisita] = useState();
  const [mensagemError, setMensagemError] = useState();  
  //const token = localStorage.getItem("token").replace(/"/g, '');
  const token = sessionStorage.getItem("token").replace(/"/g, '');
  const header = { "Content-Type": "application/json;charset=UTF-8", "Authorization": `${token}` }
  
  const {id} = useParams();

  if (!id){
    //const id = localStorage.getItem("ID").replace(/"/g, '');
    const id = sessionStorage.getItem("ID").replace(/"/g, '');
  }
  

  useEffect(() => {
    if (id) {
      axios.get(api + "/visitas/" + id, { headers: header })
        .then((response) => {         
          setNome(response.data.nome);
          setTipoVisita(response.data.tipoVisita);
          setHoraEntrada(response.data.horaEntrada);
          setBloco(response.data.bloco);
          setUnidade(response.data.unidade);
        })
    }
  }, [])

  const handleCancelar = () => {
    localStorage.removeItem('ID');
    navigate("/visitas");
  }

  const handleEditar = (e) => {

    e.preventDefault();

    const visita = {
        horaEntrada,
        nome,
        tipoVisita,
        bloco,
        unidade,      
      };

    console.log(visita);

    axios.put(api + "/visitas/" + id, visita, { headers: header })
      .then((response) => {
        if (response.status === 204) {         
            setNome(response.data.nome);
            setTipoVisita(response.data.tipoVisita);
            setBloco(response.data.bloco);
            setUnidade(response.data.unidade);

        }
        localStorage.removeItem('ID');
        navigate("/visitas");

      }).catch(function (error) {
        if (error.response.status === 403) {
          setMensagemError("Acesso negado!")
        } else {
          setMensagemError("Error, tente novamente mais tarde!")
        }
      });


  }


  return (
    <div className="container-page-editar-visitas">      
            <form onSubmit={handleEditar} className="editar-visitas-form">
              <div className="wrap-editar-visitas-input">
                <p>Nome do Visitante:</p>
                <input className="input-editar-visitas" type="text" value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />
              </div>
              <p>Bloco:</p>
              <div className="wrap-editar-visitas-input">
                <input className="input-editar-visitas" type="text" value={bloco}
                  onChange={(e) => setBloco(e.target.value)}
                />
              </div>
              <p>Unidade:</p>
              <div className="wrap-editar-visitas-input">
                <input className="input-editar-visitas" type="text" value={unidade}
                  onChange={(e) => setUnidade(e.target.value)}
                />
              </div>
              <Link to={"/visitas"} style={{ textDecoration: 'none' }}>
                <button className='cancelar-visitas-form-btn'>Voltar</button>
              </Link>
              <input className='criar-visitas-form-btn' type="submit" value="Editar" disabled={!nome ||!bloco ||!unidade } onClick={(e) => handleEditar(e)} />
              {mensagemError && <Message msg={mensagemError} type="error" />}
            </form>          
    </div>
  )
}

export default EditarVisitas;