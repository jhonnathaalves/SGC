import React from 'react'
import Predio from "../../assets/predio.png"

const Reset = () => {
  return (
    <div id="login">
    <img src={Predio} alt="imageLogo" className="imageLogo" />
    <p><b>Prezados</b></p>
    <br/>
    <p> Para realizar o seu reset de senha favor procurar o seu síndico</p>
    <br/>
    <p> Atenciosamente,</p>
    <br/>
    <p><b>Direção do Condôminio</b> </p></div>
  )
}

export default Reset