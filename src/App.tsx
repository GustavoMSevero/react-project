import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ListUsers from "./components/ListUsers";
import CreateUser from "./components/CreateUser";
import EditUser from "./components/EditUser";

function App() {
  return (
    <>
      <div className="App">
        <h5>React CRUD operations using PHP API and MySQL</h5>
        <BrowserRouter>
          <nav>
            <ul>
              <li>
                <Link to="/">Listar Usuários</Link>
              </li>
              <li>
                <Link to="user/create">Criar Usuário</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route index element={<ListUsers />} />
            <Route path="user/create" element={<CreateUser />} />
            <Route path="user/:id/edit" element={<EditUser />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
