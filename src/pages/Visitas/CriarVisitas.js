import React from "react";

import { useState, useEffect } from 'react';


import moment from 'moment';

import axios from "axios";
import { api } from "../../Utils/Config";
import Message from "../../components/Message";

import { Link, useParams } from 'react-router-dom';

import AlarmIcon from '@mui/icons-material/Alarm';
import SnoozeIcon from '@mui/icons-material/Snooze';
import TextField from '@mui/material/TextField';
import ClockIcon from '@mui/icons-material/AccessTime';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker , TimePicker , DatePicker } from '@mui/x-date-pickers';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import Stack from '@mui/material/Stack';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';

import { useNavigate } from "react-router-dom";

import "./Visitas.css";


const CriarVisitas = () => {
  

  const ID = sessionStorage.getItem("id").replace(/"/g, '');

  const [horaEntrada, setHoraEntrada] = useState(new Date());
  const [nome,setNome] = useState();
  const [bloco,setBloco] = useState();
  const [unidade,setUnidade] = useState();
  const [tipoVisita, setTipoVisita] = useState("VISITANTE")  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const token = sessionStorage.getItem("token").replace(/"/g, '');
  
  const header = { "Content-Type": "application/json;charset=UTF-8", "Authorization": `${token}` }
  const [mensagemError, setMensagemError] = useState("");
  const [mensagemSuccess, setMensagemSuccess] = useState("");

  const navigate = useNavigate();
  
  //const recuperarDados = async () => {
    //try {
        //const response = await axios.get(api + "/visitas/" + ID, { headers: header });
        //const data = await response.data;       
        
        //const nome = data.nome;
        //setNome(nome);      

        //setLoading(false);
    //} catch (error) {
        //setError(true);
        //setMensagemError("Não foi possivel recarregar os Dados do usuario!");
    //}
   

  //}

  //useEffect(() => {    
      //recuperarDados();    
  //}, [])

  const formateData = (Data) => {  

    moment.locale('pt-br');
    const dataAtual = moment(Data);    
    return dataAtual.toISOString();
    
  }

  
  const handleCriar = async (e) => {
    e.preventDefault();
    
    const visita = {
      horaEntrada,
      nome,
      tipoVisita,
      bloco,
      unidade,      
    };
    

    axios.post(api + "/visitas", visita, { headers: header })
      .then((response) => {        
        setHoraEntrada("");
        setNome("");
        setBloco("");
        setUnidade("");

        navigate("/visitas") 
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
    <div className="visitas">      
      <form onSubmit={handleCriar} className="criar-visitas-form">               
        
        <p>Nome do visitante:</p>
        <div className="wrap-input">
          <input className="input" type="nome" placeholder="Nome" 
             onChange={(e) => setNome(e.target.value)}/>
        </div>
        <p>Bloco:</p>
        <div className="wrap-input">
          <input className="input" type="Bloco" placeholder="Bloco"
             onChange={(e) => setBloco(e.target.value)} />
        </div>
        <p>Unidade:</p>
        <div className="wrap-input">
          <input className="input" type="Unidade" placeholder="Unidade"
            onChange={(e) => setUnidade(e.target.value)} />
        </div>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel variant="standard" htmlFor="uncontrolled-native">
                  Tipo de Visita
            </InputLabel>
            <NativeSelect
              defaultValue={tipoVisita}
              inputProps={{
                name: 'Tipo Visita',
                id: 'uncontrolled-native',
              }}
              onChange={(e) => {
                setTipoVisita(e.target.value);                           
                
              }}
              >
              <option value={"VISITANTE"} >Visitante</option>
              <option value={"PRESTADOR_SERVICO"} >Prestador de Serviço</option>
              
            </NativeSelect>
          </FormControl>
        </Box>

        <Link to={"/visitas"} style={{ textDecoration: 'none' }}>
          <button className='cancelar-visitas-form-btn'>Voltar</button>
        </Link>
        <input className='criar-visitas-form-btn' type="submit" value="Criar" disabled={!nome ||!bloco ||!unidade } onClick={(e) => handleCriar(e)} />                   
        
        </form>        
    </div>      
  )
}

export default CriarVisitas;