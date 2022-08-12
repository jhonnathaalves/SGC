import React from 'react'

import { useState, useRef, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from "axios";
import { api } from "../../Utils/Config";
import "./CriarDespesas.css"
import { useNavigate } from "react-router-dom";
import Message from "../../components/Message";

import { TextInputMask } from 'react-native-masked-text';

const EditarDespesas = () => {
   const navigate = useNavigate();

  const [tipoLancamento, setTipoLancamento] = useState("");
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");  
  const [valorTmp, setValorTmp] = useState("");
  const valorRef = useRef(null); 
  const [data, setData] = useState("");
  //const token = localStorage.getItem("token").replace(/"/g, '');
  const token = sessionStorage.getItem("token").replace(/"/g, '');
  
  const header = { "Content-Type": "application/json;charset=UTF-8", "Authorization": `${token}` }

  const [mensagemError, setMensagemError] = useState("");  
  
  const {id} = useParams();

  if (!id){
    //const id = localStorage.getItem("ID").replace(/"/g, '');
    const id = sessionStorage.getItem("id").replace(/"/g, ''); 
  }

  useEffect(() => {
    if (id) {
      axios.get(api + "/lancamentos/" + id, { headers: header })
        .then((response) => {          
          setTipoLancamento(response.data.tipoLancamento);                    
          setDescricao(response.data.descricao);          
          setValorTmp('' + parseFloat(response.data.valor).toFixed(2));          
          setData(response.data.data);   
 
        })
    }
  }, []);

  useEffect(() => {
    setValor(valorRef.current.getRawValue());
  }, [valorTmp]);



   const handleEditar = (e) => {

    e.preventDefault();

    const lancamento = {      
      tipoLancamento,
      descricao,
      valor,
      data,        
    };
    
    

    axios.put(api + "/lancamentos/" + id, lancamento, { headers: header })
      .then((response) => {
        if (response.status === 204) {         
           setTipoLancamento(response.data.tipoLancamento);           
           setDescricao(response.data.descricao);
           setValor(response.data.valor);

        }
        localStorage.removeItem('ID');
        navigate("/despesas");

      }).catch(function (error) {
        if (error.response.status === 403) {
          setMensagemError("Acesso negado!")
        } else {
          setMensagemError("Error, tente novamente mais tarde!")
        }
    });


  }  

  return (
    <div className="container-page-criar-despesas">
      <div className="container-criar-despesas">
        <div className="wrap-criar-despesas">
          <div className="add-despesas">            
            <form onSubmit={handleEditar} className="criar-despesas-form">                      
              <div className="wrap-criar-despesas-input">
                <input className="input-criar-despesas" type="text" value={descricao} placeholder='Descrição'
                  onChange={(e) => setDescricao(e.target.value)}
                />
              </div>              
              <TextInputMask
                    type={'money'}
                    options={{
                        precision: 2,
                        separator: ',',
                        delimiter: '.',
                        unit: 'R$',
                        suffixUnit: ''
                    }}
                    ref={valorRef}                                    
                    value={valorTmp}                    
                    onChangeText={text => {
                        setValorTmp(text);
                    }}
                    
                />                      
             
              <Link to={"/despesas"} style={{ textDecoration: 'none' }}>
                <div className="criar-despesas-form-btn-cancelar">
                  <button className="criar-despesas-form-btn-cancelar" onClick={(e) => localStorage.removeItem('ID')}>Cancelar</button>
                </div>
              </Link>
              <div className="criar-despesas-form-btn-criar">
                <input className='criar-despesas-form-btn-criar' disabled={!descricao || !valorTmp } type="submit" value="Editar" onClick={(e) => handleEditar(e)} />
              </div>
              {mensagemError && <Message msg={mensagemError} type="error" />}
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditarDespesas;