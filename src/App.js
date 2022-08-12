import './App.css';

// router
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Hooks
import { useAuth } from "./hooks/useAuth";

//Components
import Header from './components/Header';
import Sidebar from './components/Sidebar';

//Pages
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Dados from './pages/Dados/Dados';
import Agendamentos from './pages/Agendamentos/Agendamentos';
import CriarAgendamentos from './pages/Agendamentos/CriarAgendamentos';
import Despesas from './pages/Despesas/Despesas';
import Documentos from './pages/Documentos/Documentos'
import Ocorrencias from './pages/Ocorrencias/Ocorrencias'
import Comunicados from './pages/Comunicados/Comunicados';
import CriarComunicados from './pages/Comunicados/CriarComunicados';
import EditarComunicados from './pages/Comunicados/EditarComunicados';
import VisualizarOcorrencias from './pages/Ocorrencias/VisualizarOcorrencias';
import CriarDespesas from './pages/Despesas/CriarDespesas';
import EditarDespesas from './pages/Despesas/EditarDespesas';
import EditarOcorrencias from './pages/Ocorrencias/EditarOcorrencias';
import CriarOcorrencia from './pages/Ocorrencias/CriarOcorrencia';
import AtenderOcorrencias from './pages/Ocorrencias/AtenderOcorrencias';
import RemoverAgendamentos from './pages/Agendamentos/RemoverAgendamentos';
import DocumentosAtas from './pages/Documentos/DocumentosAtas';
import DocumentosNotas from './pages/Documentos/DocumentosNotas';
import DocumentosConvencao from './pages/Documentos/DocumentosConvencao';
import DocumentosImportantes from './pages/Documentos/DocumentosImportantes';
import Cadastros from './pages/Cadastros/Cadastros';
import Visitas from './pages/Visitas/Visitas';
import CriarVisitas from './pages/Visitas/CriarVisitas';
import EditarVisitas from './pages/Visitas/EditarVisitas';
import Unidades from './pages/Cadastros/Unidades';
import CadastrosUnidades from './pages/Cadastros/CadastrosUnidades';
import EditarUnidades from './pages/Cadastros/EditarUnidades';
import Colaboradores from './pages/Cadastros/Colaboradores';
import User from './pages/Cadastros/User';
import CadastrosUser from './pages/Cadastros/CadastrosUser';
import CadastrosColaborador from './pages/Cadastros/CadastrosColaboradores';
import EditarDados from './pages/Dados/EditarDados';
import Reset from './pages/Login/Reset';

function App() {
  const { auth, loading } = useAuth();
  
  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="App">
      <BrowserRouter>
       
        {auth ? <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} /> : null}
        {auth ? <Header /> : null}         
        <div className="container">
          <Routes>
            <Route path="/" element={auth ? <Home /> : <Navigate to="/login" />} />
            <Route path="/login" element={!auth ? <Login /> : <Navigate to="/" />} />
            <Route path="/reset" element={!auth ? <Reset/> :<Navigate to="/" />} />
            <Route path="/dados" element={auth ? <Dados />: <Navigate to="/login" />} />
            <Route path="/dados/editar" element={auth ? <EditarDados />: <Navigate to="/login" />} />
            <Route path="/agendamentos" element={auth ? <Agendamentos />: <Navigate to="/login" />} />
            <Route path="/agendamentos/criar" element={auth ? <CriarAgendamentos />: <Navigate to="/login" />} />
            <Route path="/agendamentos/remover" element={auth ? <RemoverAgendamentos />: <Navigate to="/login" />} />
            <Route path="/despesas" element={auth ? <Despesas />: <Navigate to="/login" />} />
            <Route path="/despesas/criar" element={auth ? <CriarDespesas />: <Navigate to="/login" />} />
            <Route path="/despesas/editar/:id" element={auth ? <EditarDespesas />: <Navigate to="/login" />} />
            <Route path="/comunicados" element={auth ? <Comunicados />: <Navigate to="/login" />} />
            <Route path="/comunicados/criar" element={auth ? <CriarComunicados />: <Navigate to="/login" />} />
            <Route path="/comunicados/editar/:id" element={auth ? <EditarComunicados />: <Navigate to="/login" />} />            
            <Route path="/documentos" element={auth ?<Documentos />: <Navigate to="/login" />} />
            <Route path="/documentos/atas" element={auth ?<DocumentosAtas />: <Navigate to="/login" />} />
            <Route path="/documentos/notas" element={auth ?<DocumentosNotas />: <Navigate to="/login" />} />
            <Route path="/documentos/convencao" element={auth ?<DocumentosConvencao />: <Navigate to="/login" />} />
            <Route path="/documentos/docimportante" element={auth ?<DocumentosImportantes />: <Navigate to="/login" />} />
            <Route path="/ocorrencias" element={auth ?<Ocorrencias />: <Navigate to="/login" />} />
            <Route path="/ocorrencias/criar" element={auth ?<CriarOcorrencia />: <Navigate to="/login" />} />
            <Route path="/ocorrencias/editar/:id" element={auth ?<EditarOcorrencias />: <Navigate to="/login" />} />
            <Route path="/ocorrencias/view/:id" element={auth ? <VisualizarOcorrencias />: <Navigate to="/login" />} />
            <Route path="/ocorrencias/done/:id" element={auth ? <AtenderOcorrencias />: <Navigate to="/login" />} />
            <Route path="/cadastros" element={auth ?<Cadastros />: <Navigate to="/login" />} />
            <Route path="/cadastros/unidades" element={auth ?<Unidades />: <Navigate to="/login" />} />
            <Route path="/cadastros/unidades/criar" element={auth ?<CadastrosUnidades />: <Navigate to="/login" />} />
            <Route path="/cadastros/unidades/editar/:id" element={auth ?<EditarUnidades />: <Navigate to="/login" />} />
            <Route path="/cadastros/user" element={auth ?<User />: <Navigate to="/login" />} />
            <Route path="/cadastros/user/criar" element={auth ?< CadastrosUser />: <Navigate to="/login" />} />
            <Route path="/cadastros/colaboradores" element={auth ?<Colaboradores />: <Navigate to="/login" />} />
            <Route path="/cadastros/colaboradores/criar" element={auth ? <CadastrosColaborador />: <Navigate to="/login" />} />
            <Route path="/visitas" element={auth ?<Visitas />: <Navigate to="/login" />} />
            <Route path="/visitas/criar" element={auth ?<CriarVisitas />: <Navigate to="/login" />} />
            <Route path="/visitas/editar/:id" element={auth ?<EditarVisitas />: <Navigate to="/login" />} />            
          </Routes>
        </div>
        {/*<Footer/>*/}
      </BrowserRouter>
    </div>
  );
}

export default App;
