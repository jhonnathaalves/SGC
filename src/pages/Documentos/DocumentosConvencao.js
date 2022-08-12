import React from 'react'

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import { api } from "../../Utils/Config";
import Message from "../../components/Message";
import 'moment/locale/pt-br';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';


import { red, grey } from '@mui/material/colors';

const DocumentosConvencao = () => {
   
  //const id = localStorage.getItem("id").replace(/"/g, '');  
  //const token = localStorage.getItem("token").replace(/"/g, '');
  const id = sessionStorage.getItem("id").replace(/"/g, ''); 
  const token = sessionStorage.getItem("token").replace(/"/g, '');
  const header = { "Content-Type": "application/json;charset=UTF-8", "Authorization": `${token}` }
  const headerDownload = { 'Content-Type': 'application/pdf', "Authorization": `${token}` }
  const headerUpload = { 'Content-Type': 'multipart/form-data', "Authorization": `${token}` }
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);   
  const [mensagemError, setMensagemError] = useState("");
  const [mensagemSuccess, setMensagemSuccess] = useState("");
  const [perAdmin,setPerAdmin] = useState(false);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);

  const [selectedFile, SetSelectedFile] = useState(false);
  
  const recuperarConvencao = async () => {
      try {
        const response = await axios.get(api + "/documentos/list/convencoes", { headers: header });
        const data = await response.data;      
        setItems(data);
        setLoading(false);
        
      } catch (error) {        
        setMensagemError("Não foi possivel recarregar todos os items!");
      }     
  
    }

    const recuperarPermissoes = async () => {
    
      const response = await axios.get(api + "/users/" + id + "/roles", { headers: header }); ;
      const data = await response.data[0];      
      if(data === "ROLE_ADMIN"){
        setPerAdmin(true);
      } 
  
    }
  
    useEffect(() => {    
        recuperarConvencao();
        recuperarPermissoes();   
    }, [])
    
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {    
      setRowsPerPage(+event.target.value);
      setPage(0);
    };      
  
    const handleDowloand = async (id,FileName) => {
      
      try {
        await axios.get(api + "/documentos/download/" + id, { headers: headerDownload })
          
          .then((response) => {
            if (response.status === 200) {              
                
                const url = window.URL.createObjectURL(
                  new Blob([response]),
                );
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute(
                  'download',
                   FileName,
                );
            
                
                document.body.appendChild(link);            
                
                link.click();        
                
                link.parentNode.removeChild(link);
                setMensagemSuccess("Download realizado com sucesso!");
                recuperarConvencao();                         
  
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
  
    const handleRemove = async (id) => {

      setLoading(true);
      
      try {
        await axios.delete(api + "/documentos/" + id, { headers: header })
          .then((response) => {
            if (response.status === 200) {
              setPage(0);
              recuperarConvencao();
              setMensagemSuccess("Removido com sucesso!");                                     
  
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
    
         
    
    const onFileChange = event => { 
      event.preventDefault();
      SetSelectedFile(event.target.files[0]);
      setMensagemError("");
      setMensagemSuccess("");        
      
            
    }; 
     
    
    const onFileUpload = (event) => { 
      event.preventDefault();
      setLoading(true);
      const formData = new FormData(); 
     
      
      formData.append( 
        "file", 
        selectedFile, 
        selectedFile.name 
      );      
      
      try {
        axios.post(api +"/documentos/upload?path=Convencoes", formData, { headers: headerUpload }) 
          .then((response) => {
            if (response.status === 200) {
              setPage(0);
              SetSelectedFile(false);        
              
              setMensagemSuccess("Salvo com Sucesso!");              
              recuperarConvencao();                          

            } else {
              setMensagemError("Ocorreu um erro");
            }      
        })   
      } catch (error) {       
        setMensagemError("Não foi possível realizar o upload do arquivo!");
      }

    }; 
   
  return (
    <div>
        <Link to={"/documentos"} style={{ textDecoration: 'none' }}>           
              <button className='documento-form-btn-voltar'> Voltar </button>           
          </Link>        
        {loading? <p>Carregando dados...</p> :
        <div className='container-documentos-page'>                    
          {mensagemError && <Message msg={mensagemError} type="error" sx={{ my: 5 }} />}
          {mensagemSuccess && <Message msg={mensagemSuccess} type="success" sx={{ my: 5 }} />}                
          <Paper sx={{ width: '100%' }}>
            <TableContainer sx={{ display: 'block' }}>
              <Table stickyHeader aria-label="sticky table" style={{fontSize:"22px"}}>          
                <TableHead>
                  <TableRow>                  
                    <TableCell align="center">Descrição</TableCell>
                    <TableCell align="center">Baixar</TableCell>                   
                    {perAdmin? <TableCell align="center">Excluir</TableCell>:""}                                    
                  </TableRow>
                </TableHead>
                <TableBody>             
                  {items && items
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((convencao) => {
                      return (
                        < TableRow hover role="checkbox" tabIndex={-1} key={convencao.id}>
                            < TableCell align="center" component="th" scope="row">{convencao.name}</ TableCell>
                            < TableCell align="center" ><DownloadIcon sx={{ color: grey[500] , my: 2 }} onClick={() => handleDowloand(convencao.id, convencao.name)}/></TableCell>                         
                            {perAdmin? < TableCell align="center" ><DeleteIcon sx={{ color: red[500], my: 2 }} onClick={() => handleRemove(convencao.id)}/></TableCell>:""}                  
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
          {perAdmin? <input type="file" name="file" id="file" className="inputfile" onChange={onFileChange} />:""}
          {perAdmin? <label htmlFor="file">Escolha um arquivo</label>:""}
          {selectedFile? <label className='file-select'>{selectedFile.name}</label>:<p></p>}
          {selectedFile? <button className='documento-form-btn-upload'onClick={onFileUpload}> Salvar </button>:
          <p></p>}
           
        </div>               
      }                  
                                           
    </div>
  )
}

export default DocumentosConvencao