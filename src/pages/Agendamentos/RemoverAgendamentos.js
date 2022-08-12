import React from 'react'

import "./RemoverAgendamento.css"

import { useState, useEffect } from 'react';
import axios from "axios";
import { api } from "../../Utils/Config";
import Message from "../../components/Message";

import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';

import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

import moment from 'moment';
import 'moment/locale/pt-br';

import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DescriptionIcon from '@mui/icons-material/Description';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { cyan, green, grey, red, yellow } from '@mui/material/colors';


const RemoverAgendamentos = () => {

  const navigate = useNavigate();

  //const id = localStorage.getItem("id");
  const id = sessionStorage.getItem("id");  
  //const token = localStorage.getItem("token").replace(/"/g, '');
  const token = sessionStorage.getItem("token").replace(/"/g, '');
  const header = { "Content-Type": "application/json;charset=UTF-8", "Authorization": `${token}` }
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [error, setError] = useState(false);  
  const [mensagemError, setMensagemError] = useState("");
  const [mensagemSuccess, setMensagemSuccess] = useState("");

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);

  const recuperarAgendamentos = async () => {
    try {
      const response = await axios.get(api + "/agendamentos", { headers: header });
      const data = await response.data;      
      setItems(data);
      setLoading(false);
      
    } catch (error) {
      setError(true);
      setMensagemError("Não foi possivel recarregar todos os items!");
    }
    

  }

  useEffect(() => {    
    recuperarAgendamentos();      
    
  }, [])
  
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {    
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const setData = (data) => {
    let { id } = data;
    localStorage.setItem('ID', id);
  };
 


  const handleRemove = async (id, e) => {
    e.preventDefault();
    try {
      await axios.delete(api + "/agendamentos/" + id, { headers: header })
        .then((response) => {
          if (response.status === 204) {
            setMensagemSuccess("Removido com sucesso!");
            recuperarAgendamentos();             

          } else {
            setMensagemError("Ocorreu um erro");
          }

        })
        .catch(function (error) {
          if (error.response.status === 403) {
            setMensagemError("Acesso negado!");
          } else {
            setMensagemError("Error, tente novamente mais tarde!");
          }
        });
    } catch (error) {
      setMensagemError("Acesso negado!")
    }
  }; 

  return (
    <div className='container-agendamento-page'>      
      {loading && <p>Carregando dados...</p>}
      {error && <Message msg={mensagemError} type="error" sx={{ my: 5 }} />}             
       {mensagemSuccess && <Message msg={mensagemSuccess} type="success" sx={{ my: 5 }} />}
       {mensagemError ? <Message msg={mensagemError} type="error" />:
        <Paper sx={{ width: '100%' }}>
        <TableContainer sx={{ display: 'block' }}>
          <Table stickyHeader aria-label="sticky table" style={{fontSize:"22px"}}>          
            <TableHead>
              <TableRow>
                <TableCell>Início Evento</TableCell>
                <TableCell align="left">Fím Evento</TableCell>
                <TableCell align="left">Descrição Evento</TableCell>                               
                <TableCell align='center'>Excluir</TableCell>                                                       
              </TableRow>
            </TableHead>
            <TableBody>
              {items && items
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((agendamentos) => {
                  return (
                    < TableRow hover role="checkbox" tabIndex={-1} key={agendamentos.id}>
                        < TableCell component="th" scope="row"> {moment(agendamentos.start).format("dddd, DD/MM/YYYY HH:mm")}</ TableCell>
                        < TableCell align="left">{moment(agendamentos.end).format("dddd, DD/MM/YYYY HH:mm")}</TableCell>
                        < TableCell align="left">{agendamentos.title}</ TableCell>                                            
                        < TableCell align="center"><DeleteIcon sx={{ color: red[500], my: 2 }} onClick={(e) => handleRemove(agendamentos.id, e)}/></TableCell>
                                          
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
        rowsPerPageOptions={[3,5,10, 25, 100]}
        component="div"
        count={items.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        />
        </Paper>
      }
      <Link to={"/agendamentos"} style={{ textDecoration: 'none' }}> 
        <input className='voltar-agendamentos-form-btn' type="submit" value="Voltar" />
      </Link>
    </div>
  )
}

export default RemoverAgendamentos;