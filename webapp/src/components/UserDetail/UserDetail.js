import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import useAlbumes from '../../hooks/useAlbumes';
import useTodos from '../../hooks/useTodos';


const DetalleUsuario = () => {
  const { id } = useParams();
  const [usuario, setUsuario] = useState(null);
  const albumes = useAlbumes(id);
  const todos = useTodos(id);

  useEffect(() => {
    const obtenerUsuario = async () => {
      const resultado = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
      setUsuario(resultado.data);
    };
    obtenerUsuario();
  }, [id]);

  if (!usuario) return 'Cargando...';

  return (
    <div>
      <h1>{usuario.name}</h1>
      <p>User: {usuario.username}</p>
      <p>Email: {usuario.email}</p>
      <p>City: {usuario.address.city}</p>
      <p>Website: {usuario.website}</p>
      <p>Company: {usuario.company.name}</p>

      <h2>Álbumes</h2>
      {albumes.map((album) => (
        <div key={album.id}>
          <img src={album.miniatura} alt="Miniatura del álbum" />
          <p>{album.title}</p>
        </div>
      ))}

      <h2>TODOs</h2>
      {todos.map((todo) => (
        <div key={todo.id}>
          <p>{todo.title}</p>
        </div>
      ))}
    </div>
  );
};

export default DetalleUsuario;
