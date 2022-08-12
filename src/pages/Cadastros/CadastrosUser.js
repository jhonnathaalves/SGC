import React from "react";

import { useState, useEffect } from 'react';

import axios from "axios";
import { api } from "../../Utils/Config";
import Message from "../../components/Message";

import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';

import "./Cadastros.css";

const CadastrosUser = () => {
  
  const [unidade,setUnidade] = useState();
  const [nome, setNome] = useState();
  const [sobrenome, setSobrenome] = useState();
  const [cpf, setCpf] = useState();
  const [email, setEmail] =useState();
  const [senha, setSenha] = useState();
  const [telefone, setTelefone] = useState();
  const [items, setItems] = useState();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const token = sessionStorage.getItem("token").replace(/"/g, '');  
  const header = { "Content-Type": "application/json;charset=UTF-8", "Authorization": `${token}` }
  const [mensagemError, setMensagemError] = useState("");  
  

  const recuperarUnidades = async () => {
    const response = await axios.get(api + "/unidades", { headers: header });
    const data = await response.data;    
    setItems(data);
    setLoading(false);
    }

 const recuperarUnidadesById = async (idUnidade) => {   
    const response = await axios.get(api + "/unidades/" + idUnidade, { headers: header });
    const data = await response.data;
    
    setUnidade(data);    
 }

 const criarSenha = async (stringPass) => {
    setNome(stringPass);
    const stringSenha = stringPass.toLowerCase();
    setSenha(stringSenha+"123"); 
 }

 useEffect(() => {
    try {     
        recuperarUnidades();        
    } catch (error) {
      setError(true)
      setMensagemError("Não foi possivel recarregar todos os items!")
    }
  }, [])

  const navigate = useNavigate();    
  const handleCriar = async (e) => {
    e.preventDefault();
    const stringPass = nome.toLowerCase();
    setSenha(stringPass+"123")
    
    const usuario = {
        nome,
        sobrenome,
        cpf,
        email,
        telefone,
        senha,
        unidade,          
    };    

    axios.post(api + "/users", usuario, { headers: header })
      .then((response) => {        
        setNome("");
        setSobrenome("");
        setCpf("");
        setEmail("");
        setTelefone("");
        setSenha("");       

        navigate("/cadastros/user") 
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
    <div className="User">
    {loading && <p>Carregando dados...</p>}
    {error && <Message msg={mensagemError} type="error" sx={{ my: 5 }} />}         
    <form onSubmit={handleCriar} className="criar-unidades-form">          
      
      <p>Nome:</p>
      <div className="wrap-input">
        <input className="input" type="text" placeholder="Nome" 
           onChange={(e) =>              
            criarSenha(e.target.value)           
           }/>
      </div>
      <p>Sobrenome:</p>
      <div className="wrap-input">
        <input className="input" type="text" placeholder="Sobrenome" 
           onChange={(e) => setSobrenome(e.target.value)}/>
      </div>
      <p>CPF:</p>
      <div className="wrap-input">
        <input className="input" type="text" placeholder="CPF" 
           onChange={(e) => setCpf(e.target.value)}/>
      </div>
      <p>Email:</p>
      <div className="wrap-input">
        <input className="input" type="text" placeholder="Nome" 
           onChange={(e) => setEmail(e.target.value)}/>
      </div>
      <p>Telefone:</p>
      <div className="wrap-input">
        <input className="input" type="text" placeholder="Telefone" 
           onChange={(e) => setTelefone(e.target.value)}/>
      </div>
      <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel variant="standard" htmlFor="uncontrolled-native">
                  Selecione a Unidade
            </InputLabel>
            <NativeSelect
              defaultValue={""}
              inputProps={{
                name: 'Unidade',
                id: 'uncontrolled-native',
              }}
              onChange={(e) => {              
                
                recuperarUnidadesById(e.target.value)                        
                
              }}
              
              >
              <option>  </option>
              {items && items.map((unidades) => {
                return <option value={unidades.id} > BLOCO: {unidades.bloco} - APTO: {unidades.numero}</option>
              })}          
              
              
            </NativeSelect>
          </FormControl>
        </Box>    

      <Link to={"/cadastros/user"} style={{ textDecoration: 'none' }}>
        <button className='cancelar-unidades-form-btn'>Voltar</button>
      </Link>
      <input className='criar-unidades-form-btn' type="submit" value="Criar" disabled={!nome ||!sobrenome ||!cpf ||!unidade } onClick={(e) => handleCriar(e)} />                   
      
      </form>        
  </div>      
  )
}

export default CadastrosUser;