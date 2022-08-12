import React from 'react'

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { api } from "../../Utils/Config";
import Message from "../../components/Message";

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

import { red, yellow } from '@mui/material/colors';

const Unidades = () => {  

  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState(false);
  const token = sessionStorage.getItem("token").replace(/"/g, '');
  //const token = localStorage.getItem("token").replace(/"/g, '');
  const header = { "Content-Type": "application/json;charset=UTF-8", "Authorization": `${token}` }
  const [mensagemError, setMensagemError] = useState("");
  const [mensagemSuccess, setMensagemSuccess] = useState("");


  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {    
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const recuperarUnidades = async () => {
    const response = await axios.get(api + "/unidades", { headers: header });
    const data = await response.data;
    setItems(data);
    setLoading(false);
  }

    useEffect(() => {
    try {     
        recuperarUnidades();        
    } catch (error) {
      setError(true)
      setMensagemError("Não foi possivel recarregar todos os items!")
    }
  }, [])

  const handleEdit = (unidade) => {
    setData(unidade);
    navigate("/cadastros/unidades/editar/" + unidade.id);

  }; 

  const handleRemove = async (id) => {
    try {
      await axios.delete(api + "/unidades/" + id, { headers: header })
        .then((response) => {
          if (response.status === 204) {
            setMensagemSuccess("Removido com sucesso!")            
            recuperarUnidades();
            setPage(0); 

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
    sessionStorage.setItem('ID',id);
    //localStorage.setItem('ID', id);
  };
  return (
    <div className='container-unidades-page'>
       <Link to={"/cadastros"} style={{ textDecoration: 'none' }}>           
              <button className='documento-form-btn-voltar'> Voltar </button>           
       </Link>           
      {loading && <p>Carregando dados...</p>}
      {error && <Message msg={mensagemError} type="error" sx={{ my: 5 }} />}
      <Box sx={{ '& > :not(style)': {m: '45%' } }}>
        <Link to={"/cadastros/unidades/criar"} style={{ textDecoration: 'none' }}>       
          <Fab size="medium" color="success" aria-label="add" sx={{ my: 1, mx: 'auto' }}>
            <AddIcon />
          </Fab>
        </Link>       
      </Box>
      {mensagemError && <Message msg={mensagemError} type="error" sx={{ my: 5 }} />}
      {mensagemSuccess && <Message msg={mensagemSuccess} type="success" sx={{ my: 5 }} />}      
        <Paper sx={{ width: '100%' }}>
          <TableContainer sx={{ display: 'block' }}>
            <Table stickyHeader aria-label="sticky table" style={{fontSize:"22px"}}>          
              <TableHead>
                <TableRow>                 
                  <TableCell align="center" component="th" scope="row">Bloco</TableCell>
                  <TableCell align="center">Apartamento</TableCell>                                   
                  <TableCell align="center">Editar</TableCell>  
                  <TableCell align="center">Excluir</TableCell>                                     
                </TableRow>
              </TableHead>
              <TableBody>
                {items && items
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((unidades) => {
                    return (
                      < TableRow hover role="checkbox" tabIndex={-1} key={unidades.id}>                                                
                          < TableCell align="center">{unidades.bloco}</ TableCell>
                          < TableCell align="center">{unidades.numero}</ TableCell>                                                                                                              
                          < TableCell align="center" ><ModeEditOutlineIcon sx={{ color: yellow[500] , my: 2 }} onClick={() => handleEdit(unidades)}/></TableCell>                           
                          < TableCell align="center" ><DeleteIcon sx={{ color: red[500], my: 2 }} onClick={() => handleRemove(unidades.id)}/></TableCell>                  
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

export default Unidades;