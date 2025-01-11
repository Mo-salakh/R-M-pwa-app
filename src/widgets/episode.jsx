import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export function Episode() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [episode, setEpisode] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      fetch(`https://rickandmortyapi.com/api/episode/${id}`)
        .then((response) => response.json())
        .then((ep) => setEpisode(ep));
    } catch (e) {
      console.error(e.message);
      setEpisode(null);
    } finally {
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return <div className="loading">Идет загрузка...</div>;
  }

  if (!episode) {
    return <h1 className="not_found_title">Эпизод не найден</h1>;
  }

  return (
    <div className="card">
      <div className="card_info">
        <span
          className="close"
          onClick={() => navigate('/episodes')}
        >
          X
        </span>
        <h2 className="title">{episode.name}</h2>
        <div className="card_text">
          <span>episode code: {episode.episode}</span>
          <span>episode date: {episode.air_date}</span>
          <span>episode created date: {episode.created}</span>
        </div>
      </div>
    </div>
  );
}
