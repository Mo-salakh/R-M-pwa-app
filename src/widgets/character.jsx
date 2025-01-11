import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export function Character() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const response = await fetch(
          `https://rickandmortyapi.com/api/character/${id}`
        );
        if (!response.ok) {
          throw new Error('Character not found');
        }
        const data = await response.json();
        setCharacter(data);
      } catch (error) {
        console.error(error.message);
        setCharacter(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacter();
  }, [id]);

  if (loading) {
    return <h1 className="loading">Идет загрузка...</h1>;
  }

  if (!character) {
    return <h1 className="not_found_title">Персонаж не найден</h1>;
  }

  return (
    <>
      <h2 className="title"> Информация о персонаже </h2>
      <div className="card">
        <div className="card_info">
          <span
            className="close"
            onClick={() => navigate('/characters')}
          >
            X
          </span>
          <img
            src={character?.image}
            alt={character?.name}
          />
          <div className="card_text">
            <h2 className="title">name: {character?.name}</h2>
            <span>Gender: {character?.gender}</span>
            {character?.type ? <span>Type: ${character?.type}</span> : null}
            <span>status: {character?.status}</span>
            <span>species: {character?.species}</span>
            <p>created: {character?.created}</p>
          </div>
        </div>
      </div>
    </>
  );
}
