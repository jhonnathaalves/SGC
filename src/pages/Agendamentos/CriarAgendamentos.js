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

import "./Agendamentos.css";


const CriarAgendamentos = () => {
  

  //const ID = localStorage.getItem("id").replace(/"/g, '');
  const ID = sessionStorage.getItem("id").replace(/"/g, '');

  const [clearedDate, setClearedDate] = useState();
  const [nome,setNome] = useState();
  const [title,setTitle] = useState();
  const [start,setStart] = useState();
  const [end, setEnd] = useState();
  const [value, setValue] = useState("RESERVA - Área de Lazer");
  const [colorEvento, setColorEvento] = useState();
  const [color,setColor] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  //const token = localStorage.getItem("token").replace(/"/g, '');
  const token = sessionStorage.getItem("token").replace(/"/g, '');  
  const header = { "Content-Type": "application/json;charset=UTF-8", "Authorization": `${token}` };
  //const id = localStorage.getItem("id").replace(/"/g, '');
  const id = sessionStorage.getItem("id").replace(/"/g, '');
  const [perAdmin,setPerAdmin] = useState(false);
  const [mensagemError, setMensagemError] = useState("");
  const [mensagemSuccess, setMensagemSuccess] = useState("");

  const navigate = useNavigate();

  const recuperarPermissoes = async () => {
    
    const response = await axios.get(api + "/users/" + id + "/roles", { headers: header }); ;
    const data = await response.data[0];      
    if(data === "ROLE_ADMIN"){
      setPerAdmin(true);
    } 

  }
  
  const recuperarDados = async () => {
    try {
        const response = await axios.get(api + "/users/" + ID, { headers: header });
        const data = await response.data;       
        
        const nome = data.nome;
        setNome(nome);      

        setLoading(false);
    } catch (error) {
        setError(true);
        setMensagemError("Não foi possivel recarregar os Dados do usuario!");
    }
   

  }

  useEffect(() => {    
      recuperarDados();
      recuperarPermissoes();    
  }, [])

  const formateData = (Data) => {  

    moment.locale('pt-br');
    const dataAtual = moment(Data);    
    return dataAtual.toISOString();
    
  }

  
  const handleCriar = async (e,clearedDate,start,end) => {
    e.preventDefault();

    var title = value + " - " + nome;    

    var stringStart = clearedDate.getFullYear() + "-" + 
        String(clearedDate.getMonth() + 1).padStart(2, '0') + "-" +
        String(clearedDate.getDate()).padStart(2, '0') + "T" +
        String(start.getHours()).padStart(2, '0') + ":" + 
        String(start.getMinutes()).padStart(2, '0')+ ":00";

    var start = formateData(stringStart);

    var end = clearedDate.getFullYear() + "-" + 
      String(clearedDate.getMonth() + 1).padStart(2, '0') + "-" +
      String(clearedDate.getDate()).padStart(2, '0') + "T" +
      String(end.getHours()).padStart(2, '0') + ":" + 
      String(end.getMinutes()).padStart(2, '0') + ":00";  
    
    var endDate = formateData(end);

    const agendamentos = {
      title,
      start,
      endDate,
      colorEvento,
      color,
    };

    console.log(agendamentos);

    axios.post(api + "/agendamentos", agendamentos, { headers: header })
      .then((response) => {
        console.log(response.data);
        setTitle("");
        setStart("");
        setEnd("");

        navigate("/agendamentos") 
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
    <div className="agendamento">
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel variant="standard" htmlFor="uncontrolled-native">
                  Evento
            </InputLabel>
            <NativeSelect
              defaultValue={value}
              inputProps={{
                name: 'Evento',
                id: 'uncontrolled-native',
              }}
              onChange={(e) => {
                setValue(e.target.value);
                if(e.target.value === "RESERVA - Área de Lazer"){
                  setColorEvento("blue");
                  setColor("white");
                } else if (e.target.value === "REUNIÃO - Condôminio"){
                  setColorEvento("green");
                  setColor("white");
                } else {
                  setColorEvento("purple");
                  setColor("white");
                }               
                
              }}
              >
              <option value={"RESERVA - Área de Lazer"} >RESERVA - Área de Lazer</option>
              {perAdmin? <option value={"REUNIÃO - Condôminio"} >REUNIÃO - Condôminio</option>:""}
              {perAdmin? <option value={"ASSEMBLEIA - Convocação Geral"} >ASSEMBLEIA - Convocação Geral</option>:""}
            </NativeSelect>
          </FormControl>
        </Box>        
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Stack spacing={3}>           
            <DatePicker
              label="Data do Evento"
              value={clearedDate}
              inputFormat="dd/MM/yyyy"
              onChange={(newValue) => {
                setClearedDate(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />

            <TimePicker
                renderInput={(params) => <TextField {...params} />}
                ampm={false}
                autoOk={true}
                value={start}
                label="Hora Inicial Evento"
                onChange={(newStart) => {
                  setStart(newStart);
                }}
                minTime={new Date(0, 0, 0, 9)}
                maxTime={new Date(0, 0, 0, 21)}
            />
            <TimePicker
                renderInput={(params) => <TextField {...params} />}
                ampm={false}
                autoOk={true}
                value={end}
                label="Hora Final Evento"
                onChange={(newEnd) => {
                  setEnd(newEnd);
                }}
                minTime={new Date(0, 0, 0, 9)}
                maxTime={new Date(0, 0, 0, 22)}
            />
          </Stack>
        </LocalizationProvider>
        <Link to={"/agendamentos"} style={{ textDecoration: 'none' }}>
          <button className='cancelar-agendamentos-form-btn'>Voltar</button>
        </Link> 
        <input className='criar-agendamentos-form-btn' type="submit" value="Criar" disabled={!clearedDate || !start ||!end } onClick={(e) => handleCriar(e,clearedDate,start,end,colorEvento,color)} />                  
       
    </div>      
  )
}

export default CriarAgendamentos;