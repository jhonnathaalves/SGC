import './App.css';

// router
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Hooks
import { useAuth } from "./hooks/useAuth";

//Components
import Header from './components/Header';

//Pages
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Dados from './pages/Dados/Dados';
import Agendamentos from './pages/Agendamentos/Agendamentos';
import Despesas from './pages/Despesas/Despesas';
import Documentos from './pages/Documentos/Documentos'
import Ocorrencias from './pages/Ocorrencias/Ocorrencias'
import Comunicados from './pages/Comunicados/Comunicados';
import CriarComunicados from './pages/Comunicados/CriarComunicados';
import EditarComunicados from './pages/Comunicados/EditarComunicados';


function App() {
  const { auth, loading } = useAuth();

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="App">
      <BrowserRouter>
        {/*{window.location.pathname !== '/login' ? <Header /> : null}*/}
        {auth ? <Header /> : null}         
        <div className="container">
          <Routes>
            <Route path="/" element={auth ? <Home /> : <Navigate to="/login" />} />
            <Route path="/login" element={!auth ? <Login /> : <Navigate to="/" />} />
            <Route path="/dados" element={auth ? <Dados />: <Navigate to="/login" />} />
            <Route path="/agendamentos" element={auth ? <Agendamentos />: <Navigate to="/login" />} />
            <Route path="/despesas" element={auth ? <Despesas />: <Navigate to="/login" />} />
            <Route path="/comunicados" element={auth ? <Comunicados />: <Navigate to="/login" />} />
            <Route path="/comunicados/criar" element={auth ? <CriarComunicados />: <Navigate to="/login" />} />
            <Route path="/comunicados/editar/:id" element={auth ? <EditarComunicados />: <Navigate to="/login" />} />
            <Route path="/documentos" element={auth ?<Documentos />: <Navigate to="/login" />} />
            <Route path="/ocorrencias" element={auth ?<Ocorrencias />: <Navigate to="/login" />} />
          </Routes>
        </div>
        {/*<Footer/>*/}
      </BrowserRouter>
    </div>
  );
}

export default App;
