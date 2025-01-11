import { useCallback, useRef, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useFetchData } from '../../shared/components/useFetchData';

export function Episodes() {
  const navigate = useNavigate();
  const { loading, hasMore, data, setQuality } = useFetchData('episode');
  // eslint-disable-next-line no-unused-vars
  const [currentPage, setCurrentPage] = useState(1);
  const observer = useRef();

  const lastNodeRef = useCallback(
    (node) => {
      if (loading) {
        return;
      }

      if (observer.current) {
        observer.current.disconnect();
      }

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setCurrentPage((prevPage) => {
            let nextPage = prevPage + 1;
            setQuality((prevState) => ({ ...prevState, episode: nextPage }));
            return nextPage;
          });
        }
      });

      if (node) {
        observer.current.observe(node);
      }
    },
    [loading, hasMore, setQuality]
  );

  return (
    <>
      <Outlet />
      <h2 className="subtitle">Эпизоды</h2>
      <div className="main_content">
        <ul className="list episode_list">
          {data.episode.map((episode, index) => {
            return (
              <li
                ref={data.episode.length === index + 1 ? lastNodeRef : null}
                key={episode.id}
                onClick={() => navigate(`/episodes/${episode.id}`)}
                className="list_item episode_item"
              >
                <h2>Episode {episode.id}</h2>
                <h3>{episode.name}</h3>
                <p>Date: {episode.air_date}</p>
              </li>
            );
          })}
        </ul>
        {loading && <div className="loading">Идет загрузка</div>}
      </div>
    </>
  );
}
