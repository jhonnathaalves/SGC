import React from 'react';

import "./Documentos.css";

const Documentos = () => {
  return (
      <div className="container">
        <div className="container-documentos-page">
          <div className="wrap-documentos">
            <div className="container-documentos-form-btn">
              <button className="documento-form-btn-atas">Atas</button>
            </div>
            <div className="container-documentos-form-btn">
              <button className="documento-form-btn-nf">Notas Fiscais</button>
            </div>
            <div className="container-documentos-form-btn">
              <button className="documento-form-btn-convencao">Convênção</button>
            </div>
            <div className="container-documentos-form-btn">
              <button className="documento-form-btn-documentos-importantes">Documentos Importantes</button>
            </div>                
          </div>
        </div>
      </div>
    
  )
}

export default Documentos