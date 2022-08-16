import React from 'react'

import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import { api } from "../../Utils/Config";
import "./CriarDespesas.css"
import { useNavigate } from "react-router-dom";
import Message from "../../components/Message";

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';

import { TextInputMask } from 'react-native-masked-text';

import moment from 'moment'

const CriarDespesas = () => {
   const navigate = useNavigate();

  const [tipoLancamento, setTipoLancamento] = useState("RECEITA");
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");  
  const [valorTmp, setValorTmp] = useState("");
  const valorRef = useRef(null); 
  const [data, setData] = useState("");
  //const token = localStorage.getItem("token").replace(/"/g, '');
  const token = sessionStorage.getItem("token").replace(/"/g, '');
  const header = { "Content-Type": "application/json;charset=UTF-8", "Authorization": `${token}` }

  const [mensagemError, setMensagemError] = useState("");
  const [mensagemSuccess, setMensagemSuccess] = useState("");
  
  
  const currentData = () => {  

    const dataAtual = moment();    
    return dataAtual.format('YYYY-MM-DD[T]HH:mm:ss');
    
  }

  useEffect(() => {
    setValor(valorRef.current.getRawValue());
  }, [valorTmp]);

  const currencyConfig = {
    locale: "pt-BR",
    formats: {
      number: {
        BRL: {
          style: "currency",
          currency: "BRL",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        },
      },
    },
  };

  const handleCriar = async (e) => {
    e.preventDefault(); 

    const lancamento = {
        tipoLancamento,
        descricao,
        valor,
        data,
    };
    
    if(valor === 0){
      setMensagemError("O valor deve ser maior do que 0")
    } else {
      axios.post(api + "/lancamentos", lancamento, { headers: header })
      .then((response) => {        
        setTipoLancamento("");
        setDescricao("");
        setValor("");
        setData("");

        navigate("/despesas") 
      })
      .catch(function (error) {          
        if (error.response.status === 403) {
          setMensagemError("Acesso negado!")
        } else {            
          setMensagemError("Error, tente novamente mais tarde!")
        }
      });

    }

    
    
     
    
  };

  return (
    <div className="container-page-criar-despesas">
      <div className="container-criar-despesas">
        <div className="wrap-criar-despesas">
          <div className="add-despesas">            
            <form onSubmit={handleCriar} className="criar-despesas-form">
                <Box sx={{ 
                  minWidth: 120           
                  
                  
                  }}>
                    <FormControl fullWidth>
                        <InputLabel variant="standard" htmlFor="uncontrolled-native">
                            Tipo Lançamento
                        </InputLabel>
                        <NativeSelect
                            defaultValue={tipoLancamento}
                            inputProps={{
                                name: 'Evento',
                                id: 'uncontrolled-native',
                            }}
                            onChange={(e) => {
                                setTipoLancamento(e.target.value);
                            }}
                            >
                            <option value={"RECEITA"}>Receita</option>
                            <option value={"DESPESA"}>Despesa</option>                    
                        </NativeSelect>
                    </FormControl>
                </Box>        
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
                  <button className="criar-despesas-form-btn-cancelar">Cancelar</button>
                </div>
              </Link>
              <div className="criar-despesas-form-btn-criar">
                <input className='criar-despesas-form-btn-criar' disabled={!descricao || !valorTmp } type="submit" value="Criar" onClick={(e) => setData(currentData())} />
              </div>
              {mensagemError && <Message msg={mensagemError} type="error" />}
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CriarDespesas