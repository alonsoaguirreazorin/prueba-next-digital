import React from 'react';
import './UserDetail.css'; 

export const UsuarioInfo = ({ usuario }) => (
    <section id="info" className="sectionStyle">
      <h1>{usuario.name}</h1>
      <p>User: {usuario.username}</p>
      <p>Email: {usuario.email}</p>
      <p>City: {usuario.address.city}</p>
      <p>Website: {usuario.website}</p>
      <p>Company: {usuario.company.name}</p>
    </section>
  );
  
  export const AlbumList = ({ albumes }) => (
    <section id="albums" className="sectionStyle">
      <h2>Álbumes</h2>
      {albumes.map((album) => (
        <div key={album.id} className="cardStyle">
          <img src={album.miniatura} alt="Miniatura del álbum" />
          <p>{album.title}</p>
        </div>
      ))}
    </section>
  );
  
  export const TodoList = ({ todos, manejarAgregarTodo, manejarEliminarTodo, manejarActualizarTodo, nuevoTodo, setNuevoTodo }) => (
    <section id="todos" className="sectionStyle">
      <h2>TODOs</h2>
      {todos.map((todo) => (
        <div key={todo.id} className="cardStyle">
          <p style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
            {todo.title}
          </p>
          <button onClick={() => manejarActualizarTodo(todo.id)}>
            {todo.completed ? 'Marcar como no completado' : 'Marcar como completado'}
          </button>
          <button onClick={() => manejarEliminarTodo(todo.id)}>Eliminar</button>
        </div>
      ))}
      <form className="todoForm" onSubmit={manejarAgregarTodo}>
        <input
          type="text"
          value={nuevoTodo}
          onChange={(e) => setNuevoTodo(e.target.value)}
        />
        <button type="submit">Añadir TODO</button>
      </form>
    </section>
  );