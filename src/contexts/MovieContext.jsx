import { createContext, useState, useContext, useEffect } from "react";

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {
    const [favorites, setFavorites] = useState(() => {
        // Load from localStorage or default to an empty array
        const storedFavs = localStorage.getItem("favorites");
        return storedFavs ? JSON.parse(storedFavs) : [];
    });

    useEffect(() => {
        // Save favorites to localStorage whenever it changes
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);

    const addToFavorites = (movie) => {
        setFavorites((prev) => [...prev, movie]);
    };

    const removeFromFavorites = (movieID) => {
        setFavorites((prev) => prev.filter((movie) => movie.id !== movieID));
    };

    const isFavorite = (movieID) => {
        return favorites.some((movie) => movie.id === movieID);
    };

    const value = {
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
    };

    return (
        <MovieContext.Provider value={value}>
            {children}
        </MovieContext.Provider>
    );
};
