import React from 'react';
import { Link } from 'react-router-dom';

import "./Cadastros.css";

const Cadastros = () => {
  return (
      <div className="container">
        <Link to={"/"} style={{ textDecoration: 'none' }}>           
              <button className='documento-form-btn-voltar'> Voltar </button>           
        </Link> 
        <div className="container-cadastros-page">
          <div className="wrap-cadastros">
            <Link to={"/cadastros/unidades"} style={{ textDecoration: 'none' }}>  
              <div className="container-cadastros-form-btn">
                <button className="cadastros-form-btn-unidades">Unidades</button>
              </div>
            </Link>
            <Link to={"/cadastros/user"} style={{ textDecoration: 'none' }}> 
              <div className="container-cadastros-form-btn">
                <button className="cadastros-form-btn-usuarios">Usuarios</button>
              </div>
            </Link>
            <Link to={"/cadastros/colaboradores"} style={{ textDecoration: 'none' }}> 
              <div className="container-cadastros-form-btn">
                <button className="cadastros-form-btn-usuarios">Colaboradores</button>
              </div>
            </Link>                                    
          </div>
        </div>
      </div>    
  )
}

export default Cadastros