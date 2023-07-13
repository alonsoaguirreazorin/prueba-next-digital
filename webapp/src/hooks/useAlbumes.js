import { useEffect, useState } from 'react';
import axios from 'axios';

const useAlbumes = (idUsuario) => {
  const [albumes, setAlbumes] = useState([]);

  useEffect(() => {
    const obtenerAlbumes = async () => {
      const resultadoAlbumes = await axios.get(`https://jsonplaceholder.typicode.com/users/${idUsuario}/albums`);
      const albumesData = resultadoAlbumes.data;

      const resultadoFotos = await Promise.all(
        albumesData.map((album) => axios.get(`https://jsonplaceholder.typicode.com/albums/${album.id}/photos`))
      );

      const albumesConMiniatura = albumesData.map((album, index) => ({
        ...album,
        miniatura: resultadoFotos[index].data[0].thumbnailUrl,
      }));

      setAlbumes(albumesConMiniatura);
    };
    obtenerAlbumes();
  }, [idUsuario]);

  return albumes;
};

export default useAlbumes;
