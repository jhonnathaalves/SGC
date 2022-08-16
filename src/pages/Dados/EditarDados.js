import React from 'react'

import "./Dados.css";

// components
import Message from "../../components/Message";
import axios from "axios";
import { api } from "../../Utils/Config";

import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

// hooks
import { useEffect, useState} from "react";

const EditarDados = () => {

  const navigate = useNavigate();

  //const id = localStorage.getItem("id").replace(/"/g, '');
  //const token = localStorage.getItem("token").replace(/"/g, '');
  //const header = { "Content-Type": "application/json;charset=UTF-8", "Authorization": `${token}` }
  const token = sessionStorage.getItem("token").replace(/"/g, '');
  const header = { "Content-Type": "application/json;charset=UTF-8", "Authorization": `${token}` }
  const id = sessionStorage.getItem("id").replace(/"/g, '');
  const [mensagemError, setMensagemError] = useState("");
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [telefone,setTelefone] = useState("");
  const [senha, setSenha] = useState("");

  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const recuperarDados = async () => {
    try {
      const response = await axios.get(api + "/users/" + id, { headers: header });
      const data = await response.data;
      setUser(data);
      setNome(data.nome);
      setSobrenome(data.sobrenome);
      setCpf(data.cpf);
      setEmail(data.email);
      setTelefone(data.telefone);
      setSenha(data.senha);
      setLoading(false);
    } catch (error) {
      setError(true)
      setMensagemError("Não foi possivel recarregar os Dados do usuario!")
    }
    

  }

  const handleCancelar = () => {    
    navigate("/dados");
  }

  const handleEditar = () => {   

    const dados = {
      nome,
      sobrenome,
      cpf,
      email,
      telefone,
      senha,     
    };

    axios.put(api + "/users/" + id, dados, { headers: header })
      .then((response) => {
        if (response.status === 204) {       
            
            navigate("/dados");

        }
        

      }).catch(function (error) {
        if (error.response.status === 403) {
          setMensagemError("Acesso negado!")
        } else {
          setMensagemError("Error, tente novamente mais tarde!")
        }
      });


  }

  useEffect(() => {    
      recuperarDados();    
  }, [])

  return (
    <div className="container-d">      
      <div className="container-dados">
        <div className="wrap-dados">        
          
          {loading ? 
          <p>Carregando dados...</p> :
           <form  onSubmit={handleEditar} className="editar-comunicados-form">
            <p>Nome:</p>
            <div className="wrap-input">
              <input className="input" type="text" value={nome} onChange={(e) => setNome(e.target.value)}  />
            </div>
            <p>Sobrenome:</p>
            <div className="wrap-input">
              <input className="input" type="text" value={sobrenome} onChange={(e) => setSobrenome(e.target.value)}  />
            </div>
            <p>Telefone:</p>
            <div className="wrap-input">
              <input className="input" type="text" value={telefone} onChange={(e) => setTelefone(e.target.value)}  />
            </div>
          </form>}
          <div className="editar-comunicados-form-btn-cancelar">
            <input className='editar-comunicados-form-btn-cancelar' type="submit" value="Cancelar" onClick={() => handleCancelar()} />
          </div>
          <div className="editar-comunicados-form-btn-editar">
            <input className='editar-comunicados-form-btn-editar' disabled={!nome || !sobrenome } type="submit" value="Editar" onClick={() => handleEditar()} />
          </div>
          {mensagemError && <Message msg={mensagemError} type="error" />}
        </div>
      </div>
    </div>
  )
}

export default EditarDados