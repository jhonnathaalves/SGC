import React from 'react'

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { api } from "../../Utils/Config";
import Message from "../../components/Message";
import moment from 'moment';
import 'moment/locale/pt-br';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';

import "./Visitas.css";
import { red, yellow } from '@mui/material/colors';

const Visitas = () => {
    moment.locale('pt-br');

  const navigate = useNavigate();

  //const id = localStorage.getItem("id").replace(/"/g, '');
  const id = sessionStorage.getItem("id").replace(/"/g, '');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  //const token = localStorage.getItem("token").replace(/"/g, '');
  const token = sessionStorage.getItem("token").replace(/"/g, '');
  const header = { "Content-Type": "application/json;charset=UTF-8", "Authorization": `${token}` }
  const [mensagemError, setMensagemError] = useState("");
  const [mensagemSuccess, setMensagemSuccess] = useState("");
  const [perUser,setPerUser] = useState(false);


  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {    
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const recuperarVisitas = async () => {
    const response = await axios.get(api + "/visitas", { headers: header });
    const data = await response.data;
    setItems(data);
    setLoading(false);
  }

  const recuperarPermissoes = async () => {
    
    const response = await axios.get(api + "/users/" + id + "/roles", { headers: header }); ;
    const data = await response.data[0];      
    if(data === "ROLE_USER"){
      setPerUser(true);
    } 

  }

    useEffect(() => {
    try {     
        recuperarVisitas();
        recuperarPermissoes();        
    } catch (error) {
      setError(true)
      setMensagemError("Não foi possivel recarregar todos os items!")
    }
  }, [])

  const handleEdit = (visitas) => {
    setData(visitas);
    navigate("/visitas/editar/" + visitas.id);

  };

  const handleRemove = async (id) => {
    try {
      await axios.delete(api + "/visitas/" + id, { headers: header })
        .then((response) => {
          if (response.status === 204) {
            setMensagemSuccess("Removido com sucesso!")            
            recuperarVisitas(); 

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

  const setData = (data) => {
    let { id } = data;
    localStorage.setItem('ID', id);
  };
  return (
    <div className='container-visitas-page'>
      <Link to={"/"} style={{ textDecoration: 'none' }}>           
          <button className='documento-form-btn-voltar'> Voltar </button>           
      </Link>          
      {loading && <p>Carregando dados...</p>}
      {error && <Message msg={mensagemError} type="error" sx={{ my: 5 }} />}
      {!perUser? <Box sx={{ '& > :not(style)': {m: '45%' } }}>
        <Link to={"/visitas/criar"} style={{ textDecoration: 'none' }}>       
          <Fab size="medium" color="success" aria-label="add" sx={{ my: 1, mx: 'auto' }}>
            <AddIcon />
          </Fab>
        </Link>       
      </Box>:""}
      {mensagemError && <Message msg={mensagemError} type="error" sx={{ my: 5 }} />}
      {mensagemSuccess && <Message msg={mensagemSuccess} type="success" sx={{ my: 5 }} />}      
        <Paper sx={{ width: '100%' }}>
          <TableContainer sx={{ display: 'block' }}>
            <Table stickyHeader aria-label="sticky table" style={{fontSize:"22px"}}>          
              <TableHead>
                <TableRow>
                  <TableCell>Data</TableCell>
                  <TableCell align="left">Nome Visitante</TableCell>
                  <TableCell align="left">Tipo de Visita</TableCell>
                  <TableCell align="center">Bloco</TableCell>
                  <TableCell align="center">Apartamento</TableCell>
                  {!perUser?<TableCell align="center">Editar</TableCell>:""}  
                  {!perUser?<TableCell align="center">Excluir</TableCell>:""}                                     
                </TableRow>
              </TableHead>
              <TableBody>
                {items && items
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((visita) => {
                    return (
                      < TableRow hover role="checkbox" tabIndex={-1} key={visita.id}>
                          < TableCell align="left" component="th" scope="row">{moment(visita.horaEntrada).format("dddd, DD MMM YYYY HH:mm ")}</TableCell>                           
                          < TableCell align="left">{visita.nome}</ TableCell>
                          < TableCell align="left">{visita.tipoVisita}</ TableCell>
                          < TableCell align="center" >{visita.bloco}</ TableCell>
                          < TableCell align="center" >{visita.unidade}</ TableCell>                         
                          {!perUser? < TableCell align="center" ><ModeEditOutlineIcon sx={{ color: yellow[500] , my: 2 }} onClick={() => handleEdit(visita)}/></TableCell>:""}                           
                          {!perUser? < TableCell align="center" ><DeleteIcon sx={{ color: red[500], my: 2 }} onClick={() => handleRemove(visita.id)}/></TableCell>:""}                  
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
    </div>
  )
}

export default Visitas;