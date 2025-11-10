import React, { useEffect, useState } from 'react'
import axios from 'axios'
import AnimeCard from './Card.jsx'
import { getFavorites, isFavorited, addID, removeID } from './getfavorite.js'

export default function Favorites() {
    const [favorites, setFavorites] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const fetchFavorites = async () => {
        setLoading(true);
        setError(null);
        try {
            const favoriteIds = getFavorites();
            console.log('Favorite IDs from localStorage:', favoriteIds)

            if (!Array.isArray(favoriteIds) || favoriteIds.length === 0) {
                setFavorites([]);
                return;
            }

            const validIds = favoriteIds.filter(id => typeof id === 'number' && id > 0)
            if (validIds.length === 0) {
                setFavorites([])
                return
            }

            // Use Promise.allSettled to handle partial failures
            const animePromises = validIds.map(id =>
                axios.get(`https://api.jikan.moe/v4/anime/${id}`)
                    .then(res => res.data.data)
                    .catch(err => {
                        console.warn(`Failed to fetch anime ${id}:`, err.message)
                        return null
                    })
            );

            const results = await Promise.allSettled(animePromises);
            const animeData = results
                .filter(result => result.status === 'fulfilled' && result.value)
                .map(result => result.value)

            // Apply filters (optional)
            const filteredAnime = animeData.filter(
                a => a && a.rating !== 'Rx - Hentai' && a.rating !== 'R+ - Mild Nudity' && a.rating !== 'Boys Love'
            )

            console.log('Fetched and filtered favorites:', filteredAnime)
            setFavorites(filteredAnime);
        } catch (err) {
            console.error('Error in fetchFavorites:', err)
            setError('Failed to load favorites. Please check your connection or try again.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFavorites();
    }, []);

    const handleRetry = () => {
        fetchFavorites()
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-900">
                <div className="flex space-x-2">
                    <span className="w-3 h-3 bg-orange-500 rounded-full animate-bounce"></span>
                    <span className="w-3 h-3 bg-orange-500 rounded-full animate-bounce [animation-delay:-0.2s]"></span>
                    <span className="w-3 h-3 bg-orange-500 rounded-full animate-bounce [animation-delay:-0.4s]"></span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-5 bg-gray-900 text-white min-h-screen">
                <p className="text-red-500 mb-4">{error}</p>
                <button
                    onClick={handleRetry}
                    className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-full"
                >
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className="p-5 bg-gray-900 min-h-screen text-white">
            <h1 className="text-3xl font-bold mb-10 text-orange-500">My Favorites</h1>
            {favorites.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {favorites.map((anime) => (
                        <AnimeCard key={anime.mal_id} data={anime} />
                    ))}
                </div>
            ) : (
                <p className="text-gray-400">No favorites yet. Start adding some anime!</p>
            )}
        </div>
    );
}
