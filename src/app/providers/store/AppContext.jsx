import { createContext, useContext, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const AppContext = createContext(null);

// eslint-disable-next-line react/prop-types
export function AppProvider({ children }) {


    const [data, setData] = useState({
        characters: [],
        locations: [],
        episodes: [],
    });

    const [quality, setQuality] = useState({ character: 1, location: 1, episode: 1 });
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(false);

    const fetchData = async (type) => {
        setLoading(true);
        try {
            const response = await fetch(
                `https://rickandmortyapi.com/api/${type}?page=${quality[type]}`
            );
            const result = await response.json();
            setData((prevData) => ({ ...prevData, [type]: result.results }));
            setHasMore(result.results.length > 0);
        } catch (e) {
            console.error(e.message);
        } finally {
            setLoading(false);
        }
    };

    const value = {
        loading,
        data,
        fetchData,
        quality,
        setQuality,
        hasMore,
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = () => {
    return useContext(AppContext);
};