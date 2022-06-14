import React from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";


import "./Home.css";

import DadosPessoais from "../../assets/dadosPessoais.png"
import Comunicados from "../../assets/comunicados.png"
import Despesas from "../../assets/despesas.png"
import Ocorrencias from "../../assets/ocorrencias.png"
import Agendamentos from "../../assets/agendamentos.png"
import Documentos from "../../assets/documentos.png"


import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="container-dadosPessoais">

        <TouchableOpacity style={{ textDecoration: 'none' }} onPress={() => { navigate("/dados") }} >
          <img src={DadosPessoais} alt="dadospessoais" className="dadospessoais" />
          <span className="resetSenha">Dados Pessoais</span>
        </TouchableOpacity>

      </div>
      <div className="container-comunicados">
        
          <TouchableOpacity style={{ textDecoration: 'none' }} onPress={() => { navigate("/comunicados") }}>
            <img src={Comunicados} alt="comunicados" className="comunicados" />
            <span className="resetSenha">Comunicados</span>
          </TouchableOpacity>
       
      </div>
      <div className="container-despesas">
        
          <TouchableOpacity style={{ textDecoration: 'none' }} onPress={() => { navigate("/despesas") }}>
            <div className="container-despesas-img">
              <img src={Despesas} alt="despesas" className="despesas" />
            </div>
            <span className="resetSenha">Despesas</span>
          </TouchableOpacity>
        
      </div>
      <div className="container-ocorrencias">
      
          <TouchableOpacity style={{ textDecoration: 'none' }} onPress={() => { navigate("/ocorrencias") }} >
            <img src={Ocorrencias} alt="ocorrencias" className="ocorrencias" />
            <span className="resetSenha">Ocorrências</span>
          </TouchableOpacity>
       
      </div>
      <div className="container-agendamentos">
        
          <TouchableOpacity style={{ textDecoration: 'none' }} onPress={() => { navigate("/agendamentos") }}>
            <img src={Agendamentos} alt="agendamentos" className="agendamentos" />
            <span className="resetSenha">Agendamentos</span>
          </TouchableOpacity>
  
      </div>
      <div className="container-documentos">
       
          <TouchableOpacity style={{ textDecoration: 'none' }} onPress={() => { navigate("/documentos") }} >
            <img src={Documentos} alt="documentos" className="documentos" />
            <span className="resetSenha">Documentos</span>
          </TouchableOpacity>
  
      </div>
    </div>
  )
}

export default Home