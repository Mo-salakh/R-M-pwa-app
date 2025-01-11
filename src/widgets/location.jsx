import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export function Location() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      fetch(`https://rickandmortyapi.com/api/location/${id}`)
        .then((response) => response.json())
        .then((locations) => setLocation(locations));
    } catch (e) {
      console.error(e.message);
    } finally {
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return <div className="loading">Идет загрузка...</div>;
  }

  if (!location) {
    return <h1 className="not_found_title">Локация не найдена</h1>;
  }

  return (
    <div className="card">
      <div className="card_info">
        <span
          className="close"
          onClick={() => navigate('/locations')}
        >
          X
        </span>
        <h2 className="title">{location.name}</h2>
        <div className="card_text">
          <span>location dimension: {location.dimension}</span>
          <span>location type: {location.type}</span>
          <span>location created date: {location.created}</span>
        </div>
      </div>
    </div>
  );
}
