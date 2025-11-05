    import axios from 'axios';
    import React, { useEffect, useState } from 'react';
    import { useParams } from 'react-router-dom';
    import AnimeCard from './Card';
    import { ChevronRight, ChevronLeft } from 'lucide-react';

    export default function PageId() {
    const {idG} = useParams()
    const [animeList, setAnimeList] = useState([])
    const [genreName, setGenreName] = useState('')
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [page, setPage] = useState(1)
    const [pagination, setPagination] = useState({ has_next_page: false })
    useEffect(() => {
        const fetchAnimeGenre = async () => {
            setLoading(true)
            setError(null)
            try {
                const url = `https://api.jikan.moe/v4/anime?genres=${idG}&page=${page}&limit=25`
                const res = await axios.get(url)
                const filteredAnime = res.data.data.filter(
                    a => a.rating !== 'Rx - Hentai' && a.rating !== 'R+ - Mild Nudity' && a.rating !== 'Boys Love'
                )
                const genresRs = await axios.get('https://api.jikan.moe/v4/genres/anime')
                const genre = genresRs.data.data.find(g => g.mal_id === parseInt(idG))
                setGenreName(genre? genre.name: "error")
            setAnimeList(filteredAnime)
            // setAnimeList(res.data.data)
            setPagination(res.data.pagination || { has_next_page: false })
        } catch (err) {
            console.error(err)
            setError('Failed to fetch anime for this genre.')
            setAnimeList([])
        } finally {
            setLoading(false)
        }
        
    }
    fetchAnimeGenre()

    }, [idG, page])

    if (loading) {
        return (
        <div className="flex items-center justify-center h-screen">
            <div className="flex space-x-2">
            <span className="w-3 h-3 bg-orange-500 rounded-full animate-bounce"></span>
            <span className="w-3 h-3 bg-orange-500 rounded-full animate-bounce [animation-delay:-0.2s]"></span>
            <span className="w-3 h-3 bg-orange-500 rounded-full animate-bounce [animation-delay:-0.4s]"></span>
            </div>
        </div>
        );
    }

    if (error) {
        return <p className="p-5 text-red-500">{error}</p>;
    }

    return (
        <div className="p-5">
        <h1 className="text-white text-3xl font-bold mb-10">{genreName}</h1>
        <div className="grid grid-cols-4 gap-4">
            {animeList.length > 0 ? (
            animeList.map((anime, i) => (
                <div key={anime.mal_id || i}>
                <AnimeCard data={anime} />
                </div>
            ))
            ) : (
            <p className="text-white">No anime found for this category.</p>
            )}
        </div>
        <div className="col-span-full flex justify-center items-center gap-6 py-10">
            <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-full shadow-lg disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors duration-200 flex items-center gap-2"
            >
            <ChevronLeft className="w-5 h-5" />
            Previous
            </button>
            <span className="text-white text-lg font-medium bg-gray-800 px-4 py-2 rounded-full">
            Page {page}
            </span>
            <button
            onClick={() => setPage((p) => p + 1)}
            disabled={!pagination.has_next_page}
            className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-full shadow-lg disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors duration-200 flex items-center gap-2"
            >
            Next
            <ChevronRight className="w-5 h-5" />
            </button>
        </div>
        </div>
    )
    }
