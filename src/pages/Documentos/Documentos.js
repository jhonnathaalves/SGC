import React from 'react';
import { Link } from 'react-router-dom';

import "./Documentos.css";

const Documentos = () => {
  return (
      <div className="container">
        <Link to={"/"} style={{ textDecoration: 'none' }}>           
          <button className='documento-form-btn-voltar'> Voltar </button>           
        </Link> 
        <div className="container-documentos-page">
          <div className="wrap-documentos">
            <Link to={"/documentos/atas"} style={{ textDecoration: 'none' }}>  
              <div className="container-documentos-form-btn">
                <button className="documento-form-btn-atas">Atas</button>
              </div>
            </Link>
            <Link to={"/documentos/notas"} style={{ textDecoration: 'none' }}> 
              <div className="container-documentos-form-btn">
                <button className="documento-form-btn-nf">Notas Fiscais</button>
              </div>
            </Link>
            <Link to={"/documentos/convencao"} style={{ textDecoration: 'none' }}> 
              <div className="container-documentos-form-btn">
                <button className="documento-form-btn-convencao">Convênção</button>
              </div>
            </Link>
            <Link to={"/documentos/docimportante"} style={{ textDecoration: 'none' }}> 
              <div className="container-documentos-form-btn">
                <button className="documento-form-btn-documentos-importantes">Documentos Importantes</button>
              </div>
            </Link>                
          </div>
        </div>
      </div>    
  )
}

export default Documentos