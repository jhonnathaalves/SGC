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

import "./Despesas.css";
import { red, yellow } from '@mui/material/colors';

//import { Table } from '@mui/material';

const Despesas = () => {

  moment.locale('pt-br');

  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  //const token = localStorage.getItem("token").replace(/"/g, '');
  const token = sessionStorage.getItem("token").replace(/"/g, '');
  const id = sessionStorage.getItem("id").replace(/"/g, ''); 
  const header = { "Content-Type": "application/json;charset=UTF-8", "Authorization": `${token}` }
  //const id = localStorage.getItem("id").replace(/"/g, '');
  const [mensagemError, setMensagemError] = useState("");
  const [mensagemSuccess, setMensagemSuccess] = useState("");
  const [saldoAtual, setSaldoAtual] = useState("");
  const [perAdmin,setPerAdmin] = useState(false);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);

  const recuperarPermissões = async () => {
    
    const response = await axios.get(api + "/users/" + id + "/roles", { headers: header }); ;
    const data = await response.data[0];      
    if(data === "ROLE_ADMIN"){
      setPerAdmin(true);
    } 

  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {    
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const recuperarLancamentos = async () => {
    const response = await axios.get(api + "/lancamentos", { headers: header });
    const data = await response.data;
    setItems(data);
    setLoading(false);
  }

  const recuperarSaldoAtual = async () => {
    const response = await axios.get(api + "/saldos/atual", { headers: header });
    const data = await response.data;
    setSaldoAtual(data);
    setLoading(false);
  }

  useEffect(() => {
    try {
      recuperarSaldoAtual();
      recuperarLancamentos();
      recuperarPermissões();        
    } catch (error) {
      setError(true)
      setMensagemError("Não foi possivel recarregar todos os items!")
    }
  }, [])

  const handleEdit = (despesas) => {
    setData(despesas);
    navigate("/despesas/editar/" + despesas.id);

  };

  const handleRemove = async (id) => {
    try {
      await axios.delete(api + "/lancamentos/" + id, { headers: header })
        .then((response) => {
          if (response.status === 204) {
            setMensagemSuccess("Removido com sucesso!")
            recuperarSaldoAtual();
            recuperarLancamentos(); 

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
    sessionStorage.setItem('ID', id);
  };

  return (
    <div className='container-despesas-page'>
      <Link to={"/"} style={{ textDecoration: 'none' }}>           
          <button className='documento-form-btn-voltar'> Voltar </button>           
      </Link>           
      {loading && <p>Carregando dados...</p>}     
      {perAdmin?
      <Box sx={{ '& > :not(style)': {m: '45%' } }}>
        <Link to={"/despesas/criar"} style={{ textDecoration: 'none' }}>       
          <Fab size="medium" color="success" aria-label="add" sx={{ my: 1, mx: 'auto' }}>
            <AddIcon />
          </Fab>
        </Link>       
      </Box>:""}
      {mensagemError && <Message msg={mensagemError} type="error" sx={{ my: 5 }} />}
      {mensagemSuccess && <Message msg={mensagemSuccess} type="success" sx={{ my: 5 }} />}
      <div className='box'>Saldo: </div>
      <div className='box-value'>
      {new Intl.NumberFormat("pt-br", {
                          style: "currency",
                          currency: "BRL"                 
                        }).format(saldoAtual.valor || 0)}
      </div>      
        <Paper sx={{ width: '100%' }}>
          <TableContainer sx={{ display: 'block' }}>
            <Table stickyHeader aria-label="sticky table" style={{fontSize:"22px"}}>          
              <TableHead>
                <TableRow>
                  <TableCell>Valor</TableCell>
                  <TableCell align="left">Descrição</TableCell>
                  <TableCell align="left">Data</TableCell>                                    
                </TableRow>
              </TableHead>
              <TableBody>
                {items && items
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((despesas) => {
                    return (
                      < TableRow hover role="checkbox" tabIndex={-1} key={despesas.id}>
                          < TableCell component="th" scope="row">
                          {new Intl.NumberFormat("pt-br", {
                              style: "currency",
                              currency: "BRL"                 
                            }).format(despesas.valor)}
                          </ TableCell>
                          < TableCell align="left" component="th" scope="row">{despesas.descricao}</ TableCell>
                          < TableCell align="left" component="th" scope="row">{moment(despesas.data).format("dddd, MMM DD")}</TableCell>                          
                          {perAdmin?< TableCell align="center" component="th" scope="row"><ModeEditOutlineIcon sx={{ color: yellow[500] , my: 2 }} onClick={() => handleEdit(despesas)}/></TableCell>:""}                           
                          {perAdmin?< TableCell align="center" component="th" scope="row"><DeleteIcon sx={{ color: red[500], my: 2 }} onClick={() => handleRemove(despesas.id)}/></TableCell>:""}                  
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

export default Despesas;