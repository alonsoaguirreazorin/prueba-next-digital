import { useEffect, useState } from 'react';
import axios from 'axios';

const useUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const obtenerUsuarios = async () => {
      const resultado = await axios.get('https://jsonplaceholder.typicode.com/users');
      setUsuarios(resultado.data);
    };
    obtenerUsuarios();
  }, []);

  return usuarios;
};

export default useUsuarios;
