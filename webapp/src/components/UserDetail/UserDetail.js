import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

import useAlbumes from '../../hooks/useAlbumes';
import useTodos from '../../hooks/useTodos';
import { UsuarioInfo, AlbumList, TodoList } from './UserDetailSections';
import './UserDetail.css';

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
    <div className="pageStyle">
    <header className="headerStyle">
      <Link to="/" className="backButtonStyle">← Usuarios</Link>
      <nav>
        <a href="#info">Info</a> | <a href="#albums">Álbumes</a> | <a href="#todos">TODOs</a>
      </nav>
    </header>

    {!usuario ? (
      'Cargando...'
    ) : (
      <>
        <UsuarioInfo usuario={usuario} />
        <AlbumList albumes={albumes} />
        <TodoList 
          todos={todos} 
          manejarAgregarTodo={manejarAgregarTodo} 
          manejarEliminarTodo={manejarEliminarTodo} 
          manejarActualizarTodo={manejarActualizarTodo} 
          nuevoTodo={nuevoTodo} 
          setNuevoTodo={setNuevoTodo} 
        />
      </>
    )}
  </div>
  );
};

export default DetalleUsuario;
