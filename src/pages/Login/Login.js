import "./Login.css";

import Predio from "../../assets/predio.png"

// Components
import { Link } from "react-router-dom";
import Message from "../../components/Message";

// Hooks
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// Redux
import { login, reset } from "../../slices/AuthSlice";
//import { useAuthentication } from "../../hooks/useAuthentication";

import { AuthContext } from "../../contexts/auth";

const Login = () => {
  //Autenticacao
  //const { authenticated, login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  //const [error, setError] = useState("");

  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.auth);



  //const { login, error: authError, loading } = useAuthentication();

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      email,
      senha,
    };

    //console.log(user);

    dispatch(login(user));



    //login(email,senha); //integracao com o meu contexto / api
    // const user = {
    //email,
    //senha,
    //};

    //const res = await login(user);

    //console.log(user);


  };

  // Clean all auth states
  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);

  //useEffect(() => {
  //    console.log(authError);
  //    if (authError) {
  //    setError(authError);
  //    }
  //}, [authError]);

  return (
    <div id="login">
      <img src={Predio} alt="imageLogo" className="imageLogo" />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="E-mail"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <input
          type="password"
          placeholder="Senha"
          onChange={(e) => setSenha(e.target.value)}
          value={senha}
        />
        {!loading && <input type="submit" className="entrar" value="Entrar" />}
        {loading && <input type="submit" className="entrar" disabled value="Aguarde..." />}
        {error && <Message msg={error} type="error" />}
      </form>
      <p>
        Esqueceu a senha? <Link to="/reset">Clique aqui</Link>
      </p>
    </div>
  );
};


export default Login