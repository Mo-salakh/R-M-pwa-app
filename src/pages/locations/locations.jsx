import { useCallback, useRef, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useFetchData } from '../../shared/components/useFetchData';

export function Locations() {
  const navigate = useNavigate();
  const observer = useRef();
  // eslint-disable-next-line no-unused-vars
  const [currenPage, setCurrentPage] = useState(1);
  const { loading, hasMore, data, setQuality } = useFetchData('location');

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
            setQuality((prevState) => ({ ...prevState, location: nextPage }));
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
      <h2 className="subtitle">Локации</h2>
      <div className="main_content">
        <ul className="list location_list">
          {data.location.map((location, index) => {
            return (
              <li
                key={location.id}
                ref={data.location.length === index + 1 ? lastNodeRef : null}
                onClick={() => navigate(`/locations/${location.id}`)}
                className="list_item location_item"
              >
                <h2>location {location.id}</h2>
                <h3>{location.name}</h3>
                <p>Type: {location.type}</p>
              </li>
            );
          })}
        </ul>

        {loading && <div className="loading">Идет загрузка</div>}
      </div>
    </>
  );
}
