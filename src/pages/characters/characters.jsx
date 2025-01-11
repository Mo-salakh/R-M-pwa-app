import { useCallback, useRef, useState } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { useFetchData } from "../../shared/components/useFetchData"

export function Characters() {

    const navigate = useNavigate()
    const { loading, hasMore, data, setQuality } = useFetchData('character')
    // eslint-disable-next-line no-unused-vars
    const [currentPage, setCurrentPage] = useState(1)


    const observer = useRef()

    const lastNodeRef = useCallback(
      (node) => {
        if (loading) return;
    
        if (observer.current) observer.current.disconnect();
    
        observer.current = new IntersectionObserver((entries) => {
          if (entries[0].isIntersecting && hasMore) {
            setCurrentPage((prevPage = 1) => {
                let nextPage = prevPage + 1
                setQuality(prevState => ({...prevState, character: nextPage}))
                return nextPage
            })
          }
        });
    
        if (node) observer.current.observe(node);
      },
      [loading, hasMore, setQuality]
    );

    return (
        <>
            <Outlet />
            <h2 className="subtitle">Персонажи</h2>
            <div className="main_content">
                <ul className="list heroes_list">
                    { data.character && data.character.map((charact, index) => {
                        return <li ref={data.character.length === index + 1 ? lastNodeRef : null} key={charact.id} onClick={() => navigate(`/characters/${charact.id}`, {
                            state: charact.id
                        })} className="list_item heroy_item"><img className="img" src={charact.image} alt={charact.name} /><p>{charact.name}</p>
                        </li>
                    })}    
                </ul>    
                {loading && <div className="loading">Идет загрузка</div>}  
            </div>
        </>
    )
}