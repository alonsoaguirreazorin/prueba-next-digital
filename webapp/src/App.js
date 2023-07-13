import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Usuarios from './components/Users/Users';
import DetalleUsuario from './components/UserDetail/UserDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Usuarios />} />
        <Route path="/usuario/:id" element={<DetalleUsuario />} />
      </Routes>
    </Router>
  );
}

export default App;
