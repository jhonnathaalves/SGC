import React from 'react'

import { useState, useEffect } from 'react';
import { useFetch } from "../../hooks/useFetch";
import { Link, useParams } from 'react-router-dom';

import axios from "axios";

import { api, requestConfig } from "../../Utils/Config";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Message from "../../components/Message";


import "./EditarComunicados.css"
import { updateNotice, getNoticeDetails } from '../../slices/NoticeSlice';



const EditarComunicados = () => {

  const navigate = useNavigate();
  const [titulo, setTitulo] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [mensagemError, setMensagemError] = useState("");
  const token = localStorage.getItem("token").replace(/"/g, '');
  const header = { "Content-Type": "application/json;charset=UTF-8", "Authorization": `${token}` }
  
  const {id} = useParams();

  if (!id){
    const id = localStorage.getItem("ID").replace(/"/g, '');
  }
  

  useEffect(() => {
    if (id) {
      axios.get(api + "/comunicados/" + id, { headers: header })
        .then((response) => {         
          setTitulo(response.data.titulo);
          setMensagem(response.data.mensagem);
        })
    }
  }, [])

  const handleCancelar = () => {
    localStorage.removeItem('ID');
    navigate("/comunicados");
  }

  const handleEditar = (e) => {

    e.preventDefault();

    const comunicados = {
      titulo,
      mensagem,
    };

    axios.put(api + "/comunicados/" + id, comunicados, { headers: header })
      .then((response) => {
        if (response.status === 204) {         
          setTitulo(response.data.titulo);
          setMensagem(response.data.mensagem);

        }
        localStorage.removeItem('ID');
        navigate("/comunicados");

      }).catch(function (error) {
        if (error.response.status === 403) {
          setMensagemError("Acesso negado!")
        } else {
          setMensagemError("Error, tente novamente mais tarde!")
        }
      });


  }


  return (
    <div className="container-page-editar-comunicados">
      <div className="container-editar-comunicados">
        <div className="wrap-editar-comunicados">
          <div className="edit-comunicados">
            <form onSubmit={handleEditar} className="editar-comunicados-form">
              <div className="wrap-editar-comunicados-input">
                <input className="input-editar-comunicados" type="text" value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                />
              </div>
              <div className="wrap-editar-comunicados-input">
                <textarea className='textarea-editar-comunicados' value={mensagem} onChange={(e) => setMensagem(e.target.value)} />
              </div>
              <div className="editar-comunicados-form-btn-cancelar">
                <input className='editar-comunicados-form-btn-cancelar' type="submit" value="Cancelar" onClick={() => handleCancelar()} />
              </div>
              <div className="editar-comunicados-form-btn-editar">
                <input className='editar-comunicados-form-btn-editar' type="submit" value="Editar" onClick={() => handleEditar()} />
              </div>
              {mensagemError && <Message msg={mensagemError} type="error" />}
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditarComunicados