import { useEffect, useState } from "react";


 
export function useFetchData(type) {

    const [data, setData] = useState({
        character: [],
        location: [],
        episode: [],
    });

    const [quality, setQuality] = useState({ character: 1, location: 1, episode: 1 });
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(false);


    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch(
                    `https://rickandmortyapi.com/api/${type}?page=${quality[type]}`
                );
                const result = await response.json();
                setData((prevData) => ({
                    ...prevData,
                    [type]: [...prevData[type], ...result.results],
                }));
                setHasMore(result.results.length > 0);
            } catch (e) {
                console.error(e.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [quality, type])


    return {
        loading,
        data,
        quality,
        setQuality,
        hasMore,
    }
}