import React from 'react'

import "./Ocorrencias.css"

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


const Ocorrencias = () => {

  const navigate = useNavigate();

  const token = sessionStorage.getItem("token").replace(/"/g, '');
  const id = sessionStorage.getItem("id").replace(/"/g, ''); 
  //const token = localStorage.getItem("token").replace(/"/g, '');
  const header = { "Content-Type": "application/json;charset=UTF-8", "Authorization": `${token}` }
  //const id = localStorage.getItem("id").replace(/"/g, '');
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [error, setError] = useState(false);  
  const [mensagemError, setMensagemError] = useState("");
  const [mensagemSuccess, setMensagemSuccess] = useState("");
  const [perAdmin,setPerAdmin] = useState(false);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const recuperarPermissoes = async () => {
    
    const response = await axios.get(api + "/users/" + id + "/roles", { headers: header }); ;
    const data = await response.data[0];      
    if(data === "ROLE_ADMIN"){
      setPerAdmin(true);
    } 

  }

  const recuperarOcorrencias = async () => {
    try {
      const response = await axios.get(api + "/ocorrencias", { headers: header });
      const data = await response.data;      
      setItems(data);
      setLoading(false);
      
    } catch (error) {
      setError(true);
      setMensagemError("Não foi possivel recarregar todos os items!");
    }
    

  }

  useEffect(() => {    
    recuperarOcorrencias();
    recuperarPermissoes();     
    
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
    //localStorage.setItem('ID', id);
    sessionStorage.setItem('ID',id);
  };

  const handleEdit = (ocorrencias) => {
    setData(ocorrencias);
    navigate("/ocorrencias/editar/" + ocorrencias.id);

  };

  const handleView = (ocorrencias) => {
    setData(ocorrencias);
    navigate("/ocorrencias/view/" + ocorrencias.id);

  };

  const handleDone = (ocorrencias) => {
    if(perAdmin){
      setData(ocorrencias);    
      navigate("/ocorrencias/done/" + ocorrencias.id);
    }
  };

  const handleRemove = async (id, e) => {
    e.preventDefault();
    try {
      await axios.delete(api + "/ocorrencias/" + id, { headers: header })
        .then((response) => {
          if (response.status === 204) {
            setMensagemSuccess("Removido com sucesso!");
            recuperarOcorrencias();             

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
    <div className='container-ocorrencia-page'>
      <Link to={"/"} style={{ textDecoration: 'none' }}>           
          <button className='documento-form-btn-voltar'> Voltar </button>           
      </Link>       
      {loading && <p>Carregando dados...</p>}
      {error && <Message msg={mensagemError} type="error" sx={{ my: 5 }} />}
      <Box sx={{ '& > :not(style)': {m: '45%' } }}>
        <Link to={"/ocorrencias/criar"} style={{ textDecoration: 'none' }}>       
          <Fab size="medium" color="success" aria-label="add" sx={{ my: 1, mx: 'auto' }}>
            <AddIcon />
          </Fab>
        </Link>       
      </Box>        
       {mensagemSuccess && <Message msg={mensagemSuccess} type="success" sx={{ my: 5 }} />}
       {mensagemError ? <Message msg={mensagemError} type="error" />:
        <Paper sx={{ width: '100%' }}>
        <TableContainer sx={{ display: 'block' }}>
          <Table stickyHeader aria-label="sticky table" style={{fontSize:"22px"}}>          
            <TableHead>
              <TableRow>
                <TableCell>Data Abertura</TableCell>
                <TableCell align="left">Título</TableCell>
                <TableCell align="left">Aberto Por</TableCell>
                <TableCell align="left">Status</TableCell>
                <TableCell align='center'>Data Fechamento</TableCell>
                <TableCell align="center">Visualizar</TableCell>
                <TableCell align="center">Editar</TableCell>
                <TableCell align='center'>Atender</TableCell>
                {perAdmin?<TableCell align='center'>Excluir</TableCell>:""}                                                       
              </TableRow>
            </TableHead>
            <TableBody>
              {items && items
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((ocorrencias) => {
                  return (
                    < TableRow hover role="checkbox" tabIndex={-1} key={ocorrencias.id}>
                        < TableCell component="th" scope="row"> {moment(ocorrencias.data).format("DD/MM/YYYY")}</ TableCell>
                        < TableCell align="left">{ocorrencias.titulo}</ TableCell>
                        < TableCell align="left">{ocorrencias.autor.nome}</TableCell>
                        < TableCell align="left" >{ocorrencias.status}</TableCell>
                        {ocorrencias.status === "FECHADO" ? 
                          < TableCell align="center" >{ moment(ocorrencias.dataResposta).format("DD/MM/YYYY")}</TableCell>:
                          < TableCell align="center" >{"-"}</TableCell>
                        }
                        < TableCell align="center"><DescriptionIcon sx={{ color: grey[500] , my: 2 }} onClick={() => handleView(ocorrencias)}/></TableCell>
                        {ocorrencias.status === "FECHADO" ?                                                                                        
                        < TableCell align="center"><ModeEditOutlineIcon sx={{ color: grey[500] , my: 2 }}/></TableCell> :
                        < TableCell align="center"><ModeEditOutlineIcon sx={{ color: yellow[500] , my: 2 }} onClick={() => handleEdit(ocorrencias)}/></TableCell>
                        }
                        {ocorrencias.status === "FECHADO" ? 
                        < TableCell align="center"><CheckCircleIcon sx={{ color: green[500], my: 2 }}/></TableCell> :
                        < TableCell align="center"><PendingActionsIcon sx={{ color: yellow[500], my: 2 }} onClick={(e) => handleDone(ocorrencias)}/></TableCell>
                        }                      
                        {perAdmin? < TableCell align="center"><DeleteIcon sx={{ color: red[500], my: 2 }} onClick={(e) => handleRemove(ocorrencias.id, e)}/></TableCell>:""}
                                          
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
        rowsPerPageOptions={[5,10, 25, 100]}
        component="div"
        count={items.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        />
        </Paper>
      }
  
    </div>
  )
}

export default Ocorrencias;