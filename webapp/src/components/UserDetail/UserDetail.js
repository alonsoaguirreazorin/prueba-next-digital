import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

import useAlbumes from '../../hooks/useAlbumes';
import useTodos from '../../hooks/useTodos';


const DetalleUsuario = () => {
  const { id } = useParams();
  const [usuario, setUsuario] = useState(null);
  const [nuevoTodo, setNuevoTodo] = useState('');
  const albumes = useAlbumes(id);
  const [todos, setTodos] = useTodos(id); 

  const manejarAgregarTodo = (e) => {
    e.preventDefault();
    if (/^\D*$/.test(nuevoTodo) && nuevoTodo.trim() !== '') {
      const nuevoId = todos.length > 0 ? todos[todos.length - 1].id + 1 : 1; 
      setTodos([...todos, { id: nuevoId, title: nuevoTodo, completed: false }]);
      setNuevoTodo('');
    }
  };

  const manejarEliminarTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const manejarActualizarTodo = (id) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo))
    );
  };

  useEffect(() => {
    const obtenerUsuario = async () => {
      const resultado = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
      setUsuario(resultado.data);
    };
    obtenerUsuario();
  }, [id]);

  if (!usuario) return 'Cargando...';

  return (
    <div style={pageStyle}>
      <header style={headerStyle}>
        <Link to="/" style={backButtonStyle}>← Usuarios</Link>
        <nav>
          <a href="#info">Info</a> | <a href="#albums">Álbumes</a> | <a href="#todos">TODOs</a>
        </nav>
      </header>

    {!usuario ? (
      'Cargando...'
    ) : (
      <>
        <section id="info" style={sectionStyle}>
          <h1>{usuario.name}</h1>
          <p>User: {usuario.username}</p>
          <p>Email: {usuario.email}</p>
          <p>City: {usuario.address.city}</p>
          <p>Website: {usuario.website}</p>
          <p>Company: {usuario.company.name}</p>
        </section>

        <section id="albums" style={sectionStyle}>
          <h2>Álbumes</h2>
          {albumes.map((album) => (
            <div key={album.id} style={cardStyle}>
              <img src={album.miniatura} alt="Miniatura del álbum" />
              <p>{album.title}</p>
            </div>
          ))}
        </section>

        <section id="todos" style={sectionStyle}>
          <h2>TODOs</h2>
          {todos.map((todo) => (
            <div key={todo.id} style={cardStyle}>
              <p style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                {todo.title}
              </p>
              <button onClick={() => manejarActualizarTodo(todo.id)}>
                {todo.completed ? 'Marcar como no completado' : 'Marcar como completado'}
              </button>
              <button onClick={() => manejarEliminarTodo(todo.id)}>Eliminar</button>
            </div>
          ))}
          <form onSubmit={manejarAgregarTodo}>
            <input
              type="text"
              value={nuevoTodo}
              onChange={(e) => setNuevoTodo(e.target.value)}
            />
            <button type="submit">Añadir TODO</button>
          </form>
        </section>
      </>
    )}
  </div>
  );
};

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  margin: '30px 0 50px 0',
};

const backButtonStyle = {
  textDecoration: 'none',
  color: '#000',
};

const pageStyle = {
  maxWidth: '800px',
  margin: '0 auto',
  padding: '20px',
  fontFamily: 'Arial, sans-serif',
};

const sectionStyle = {
  marginBottom: '20px',
};

const cardStyle = {
  border: '1px solid #ddd',
  borderRadius: '10px',
  padding: '10px',
  marginBottom: '10px',
};

export default DetalleUsuario;
