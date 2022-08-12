import React from 'react'
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { useState, useEffect } from 'react';

import { api } from "../../Utils/Config";


import "./Home.css";

import DadosPessoais from "../../assets/dadosPessoais.png"
import Comunicados from "../../assets/comunicados.png"
import Despesas from "../../assets/despesas.png"
import Ocorrencias from "../../assets/ocorrencias.png"
import Agendamentos from "../../assets/agendamentos.png"
import Documentos from "../../assets/documentos.png"
import Visitas from "../../assets/visitas.png"
import Settings from "../../assets/settings.png"

import { TouchableOpacity } from 'react-native'

const Home = () => {
  const navigate = useNavigate();
  //const token = localStorage.getItem("token").replace(/"/g, '');
  //const header = { "Content-Type": "*/*", "Authorization": `${token}` }
  //const id = localStorage.getItem("id").replace(/"/g, '');
  const token = sessionStorage.getItem("token").replace(/"/g, '');
  const header = { "Content-Type": "*/*", "Authorization": `${token}` }
  const id = sessionStorage.getItem("id").replace(/"/g, '');
  const [perUser, setPerUser] = useState(false);
  const [perAdmin,setPerAdmin] = useState(false)  
  

  const recuperarPermissões = async () => {
    
        const response = await axios.get(api + "/users/" + id + "/roles", { headers: header }); ;
        const data = await response.data[0];      
        if(data === "ROLE_USER"){
          setPerUser(true);
        } else if(data === "ROLE_ADMIN"){
          setPerUser(true);
          setPerAdmin(true);
        } else {

        }
          

  }

  useEffect(() => {    
    recuperarPermissões();    
  }, [])

  return (
      <div className="container-dp">      
        <div className="container-dadosPessoais">
          <TouchableOpacity style={{ textDecoration: 'none' }} onPress={() => { navigate("/dados") }} >
            <img src={DadosPessoais} alt="dadospessoais" className="dadospessoais" />
            <span className="resetSenha">Dados Pessoais</span>
          </TouchableOpacity>
      </div>
     

      { perUser ? 
      <div className="container-comunicados">        
          <TouchableOpacity style={{ textDecoration: 'none' }} onPress={() => { navigate("/comunicados") }}>
            <img src={Comunicados} alt="comunicados" className="comunicados" />
            <span className="resetSenha">Comunicados</span>
          </TouchableOpacity>       
      </div>:''}
      

      { perUser ? 
        <div className="container-despesas">        
            <TouchableOpacity style={{ textDecoration: 'none' }} onPress={() => { navigate("/despesas") }}>
              <div className="container-despesas-img">
                <img src={Despesas} alt="despesas" className="despesas" />
              </div>
              <span className="resetSenha">Despesas</span>
            </TouchableOpacity>        
        </div> : ""}
      

       
        <div className="container-ocorrencias">      
            <TouchableOpacity style={{ textDecoration: 'none' }} onPress={() => { navigate("/ocorrencias") }} >
              <img src={Ocorrencias} alt="ocorrencias" className="ocorrencias" />
              <span className="resetSenha">Ocorrências</span>
            </TouchableOpacity>       
        </div>
     

        { perUser ? 
        <div className="container-agendamentos">        
            <TouchableOpacity style={{ textDecoration: 'none' }} onPress={() => { navigate("/agendamentos") }}>
              <img src={Agendamentos} alt="agendamentos" className="agendamentos" />
              <span className="resetSenha">Agendamentos</span>
            </TouchableOpacity>  
        </div>:""}
      

        { perUser ? 
        <div className="container-documentos">       
            <TouchableOpacity style={{ textDecoration: 'none' }} onPress={() => { navigate("/documentos") }} >
              <img src={Documentos} alt="documentos" className="documentos" />
              <span className="resetSenha">Documentos</span>
            </TouchableOpacity>  
        </div> : ""}      

        
        <div className="container-visitas">       
          <TouchableOpacity style={{ textDecoration: 'none' }} onPress={() => { navigate("/visitas") }} >
            <img src={Visitas} alt="visitas" className="visitas" />
            <span className="resetSenha">Visitantes</span>
          </TouchableOpacity>
        </div>
      

        { perAdmin ? 
        <div className="container-settings">       
        <TouchableOpacity style={{ textDecoration: 'none' }} onPress={() => { navigate("/cadastros") }} >
          <img src={Settings} alt="settings" className="settings" />
          <span className="resetSenha">Cadastros</span>
        </TouchableOpacity>
        </div>: ""}
     
    </div>
  )
}

export default Home