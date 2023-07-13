import { useEffect, useState } from 'react';
import axios from 'axios';

const useTodos = (idUsuario) => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const obtenerTodos = async () => {
      const resultado = await axios.get(`https://jsonplaceholder.typicode.com/users/${idUsuario}/todos`);
      setTodos(resultado.data);
    };
    obtenerTodos();
  }, [idUsuario]);

  return [todos, setTodos];
};

export default useTodos;