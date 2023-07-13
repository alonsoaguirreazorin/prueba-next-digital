import React from 'react';
import { Link } from 'react-router-dom';

import useUsuarios from '../../hooks/useUsuarios';
import './Users.css';

const Usuarios = () => {
  const usuarios = useUsuarios();

  return (
    <div className="usuarios">
      {usuarios.map((usuario) => (
        <div key={usuario.id} className="usuario-card">
          <Link to={`/usuario/${usuario.id}`} className="usuario-link">
            <h2>{usuario.name}</h2>
            <p>Username: {usuario.username}</p>
            <p>Email: {usuario.email}</p>
            <p>City: {usuario.address.city}</p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Usuarios;
