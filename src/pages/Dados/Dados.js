import React from 'react'

import "./Dados.css";

// components
import Message from "../../components/Message";
import { Link } from "react-router-dom";

// hooks
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

// Redux
import { getUserDetails } from "../../slices/userSlice";

const Dados = () => {
  const id = localStorage.getItem("id").replace(/"/g, '');
  //const token = localStorage.getItem("token").replace(/"/g, '');

  const dispatch = useDispatch();

  const { user, loading } = useSelector((state) => state.user);
  const { user: userAuth } = useSelector((state) => state.auth);

  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");

  // Load user data
  useEffect(() => {   
    dispatch(getUserDetails(id));
  }, [dispatch, id]);

  // Reset component message
  //function resetComponentMessage() {
    //setTimeout(() => {
    //  dispatch(resetMessage());
   // }, 2000);
  //}

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="container">
      <div className="container-dados">
        <div className="wrap-dados">
          <form className="login-form">
            {/*{loading && <p>Carregando dados...</p>}
            {error && <p>{error}</p>}*/}
            <p>Nome:</p>
            <div className="wrap-input">
              <input readOnly className="input" type="nome" placeholder="Nome" value={user.nome || ""} />
            </div>
            <p>Sobrenome:</p>
            <div className="wrap-input">
              <input readOnly className="input" type="sobrenome" placeholder="Sobrenome" value={user.sobrenome || ""}/>
            </div>
            <p>CPF:</p>
            <div className="wrap-input">
              <input readOnly className="input" type="CPF" placeholder="CPF" value={user.cpf || ""} />
            </div>
            <p>E-mail:</p>
            <div className="wrap-input">
              <input readOnly className="input" type="e-mail" placeholder="E-mail" value={user.email || ""} />
            </div>
            <p>Telefone:</p>
            <div className="wrap-input">
              <input readOnly className="input" type="telefone" placeholder="Telefone" value={user.telefone || ""} />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Dados;