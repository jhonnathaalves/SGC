import React from "react";

import { useState, useEffect } from 'react';

import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from "axios";
import { api } from "../../Utils/Config";
import Message from "../../components/Message";
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

import { Link } from 'react-router-dom';

import "./Agendamentos.css";


const Agendamentos = () => { 

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  //const token = localStorage.getItem("token").replace(/"/g, '');
  const token = sessionStorage.getItem("token").replace(/"/g, '');
  const header = { "Content-Type": "application/json;charset=UTF-8", "Authorization": `${token}` }
  const [mensagemError, setMensagemError] = useState("");
  const [mensagemSuccess, setMensagemSuccess] = useState("");

  moment.locale('pt-br');
  const localizer = momentLocalizer(moment);
  
  const recuperarAgendamentos = async () => {
    const response = await axios.get(api + "/agendamentos", { headers: header });
    const data = await response.data;
    data.forEach(item => {
      item.start = new Date(item.start);
      item.end = new Date(item.end);
    });
    setItems(data);      
    setLoading(false);
  }
  
  useEffect(() => {
    try {
      recuperarAgendamentos();             
    } catch (error) {
      setError(true)
      setMensagemError("Não foi possivel recarregar todos os items!")
    }
  }, [])

  const onSelectEvent =  async (pEvent) => {
    const r = window.confirm("Would you like to remove this event?")
    if(r === true){
      
      this.setState((prevState, props) => {
        const events = [...prevState.events]
        const idx = events.indexOf(pEvent)
        events.splice(idx, 1);
        return { events };
      });
    }
  }

  const newLocal = "Remover Agendamento";
  return (
    <div className="agendamento">
      <Link to={"/"} style={{ textDecoration: 'none' }}>           
          <button className='documento-form-btn-voltar'> Voltar </button>           
      </Link> 
        {loading && <p>Carregando dados...</p>}
        {error && <p>{error}</p>}
        <Box sx={{ '& > :not(style)': {m: '45%' } }}>
          <Link to={"/agendamentos/criar"} style={{ textDecoration: 'none' }}>       
            <Fab size="medium" color="success" aria-label="add" sx={{ my: 1, mx: 'auto' }}>
              <AddIcon />
            </Fab>
          </Link>       
        </Box>
        {mensagemSuccess && <Message msg={mensagemSuccess} type="success" sx={{ my: 5 }} />}
        {mensagemError ? <Message msg={mensagemError} type="error" />:                                  
        <Calendar
            localizer={localizer}
            //onSelectEvent = {event => onSelectEvent(event)}           
            startAccessor="start"
            endAccessor="end"
            style={{ height: '70vh'}}
            events={items}
            messages={{
              next: "Próximo",
              previous: "Anterior",
              today: "Hoje",
              month: "Mês",
              week: "Semana",
              day: "Dia",
              allDay: "Dia Inteiro",
              date: "Data",
              time: "Hora",
              event: "Evento"
            }}
            BackgroundWrapper = "red"
            eventPropGetter={(items) => {
              const backgroundColor = items.colorEvento ;
              const color = items.color;
              return { style: { backgroundColor ,color} }
            }}
      />
      }
      <Link to={"/agendamentos/remover"} style={{ textDecoration: 'none' }}> 
        <input className='remover-agendamentos-form-btn' type="submit" value={newLocal} />
      </Link>   
    </div>
        
  )
}

export default Agendamentos;