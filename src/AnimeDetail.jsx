import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Star, Calendar, PlayCircle} from 'lucide-react'

export default function AnimeDetail() {
    const { idA } = useParams()
    const navigate = useNavigate()
    const [anime, setAnime] = useState(null)
    const [episodes, setEpisodes] = useState([])
    const [recommendations, setRecommendations] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchAnimeDetail = async () => {
            setLoading(true)
            setError(null)
            try {
                const animeRes = await axios.get(`https://api.jikan.moe/v4/anime/${idA}`)
                setAnime(animeRes.data.data)

                const episodesRes = await axios.get(`https://api.jikan.moe/v4/anime/${idA}/episodes?limit=10`)
                setEpisodes(episodesRes.data.data)

                const recRes = await axios.get(`https://api.jikan.moe/v4/anime/${idA}/recommendations`)
                setRecommendations(recRes.data.data.slice(0, 6))
            } catch (err) {
                console.error(err)
                setError('Failed to fetch anime details.')
            } finally {
                setLoading(false)
            }
        }
        fetchAnimeDetail()
    }, [idA])

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-900">
                <div className="flex space-x-2">
                    <span className="w-3 h-3 bg-orange-500 rounded-full animate-bounce"></span>
                    <span className="w-3 h-3 bg-orange-500 rounded-full animate-bounce [animation-delay:-0.2s]"></span>
                    <span className="w-3 h-3 bg-orange-500 rounded-full animate-bounce [animation-delay:-0.4s]"></span>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="p-5 bg-gray-900 text-white min-h-screen">
                <button
                    onClick={() => navigate(-1)}
                    className="mb-5 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-full flex items-center gap-2"
                >
                    <ArrowLeft className="w-5 h-5" />
                    Back
                </button>
                <p className="text-red-500">{error}</p>
            </div>
        )
    }

    if (!anime) return null

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <button
                onClick={() => navigate(-1)}
                className="fixed top-4 left-4 z-50 px-4 py-2 bg-orange-500 bg-opacity-70 hover:bg-opacity-90 text-white rounded-full flex items-center gap-2 shadow-lg"
            >
                <ArrowLeft className="w-5 h-5" />
                Back
            </button>

            <div
                className="relative h-96 bg-cover bg-center"
                style={{ backgroundImage: `url(${anime.images?.jpg?.large_image_url || anime.images?.jpg?.image_url})` }}
            >
                <div className="absolute inset-0  from-gray-900 to-transparent"></div>
                <div className="absolute bottom-8 left-8 max-w-2xl">
                    <h1 className="text-5xl font-bold mb-2 text-white drop-shadow-lg">{anime.title}</h1>
                    <div className="flex items-center gap-4 mb-4">
                        <div className="flex items-center gap-1">
                            <Star className="w-5 h-5 text-yellow-500" />
                            <span className="text-white">{anime.score || 'N/A'}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Calendar className="w-5 h-5 text-white" />
                            <span className="text-white">{anime.aired.string}</span>
                        </div>
                        <span className="px-3 py-1 bg-orange-500 rounded-full text-sm text-white">{anime.rating || 'N/A'}</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                        {anime.genres?.map((genre) => (
                            <span key={genre.mal_id} className="px-3 py-1 bg-gray-700 rounded-full text-sm text-white">
                                {genre.name}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto p-8">
                <section className="mb-12">
                    <h2 className="text-3xl font-bold mb-6 text-orange-500">Synopsis</h2>
                    <div className="bg-gray-800 p-8 rounded-lg shadow-lg border-l-4 border-orange-500">
                        <p className="text-gray-200 leading-relaxed text-lg">{anime.synopsis}</p>
                    </div>
                </section>

                {episodes.length > 0 && (
                    <section className="mb-12">
                        <h2 className="text-3xl font-bold mb-6 text-orange-500">Episodes</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {episodes.map((episode) => (
                                <div key={episode.mal_id} className="bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-700 transition shadow-lg border border-gray-700">
                                    <img
                                        src={anime.images?.jpg?.image_url || 'https://via.placeholder.com/300x200?text=No+Image'}
                                        alt={`Episode ${episode.mal_id}`}
                                        className="w-full h-32 object-cover"
                                    />
                                    <div className="p-4">
                                        <h3 className="text-lg font-semibold mb-2 text-white">Episode {episode.mal_id}: {episode.title}</h3>
                                        <p className="text-gray-300 text-sm leading-relaxed">{episode.synopsis || 'No synopsis available.'}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                <section className="mb-12">
                    <h2 className="text-3xl font-bold mb-6 flex items-center gap-2 text-orange-500">
                        Cast & Staff
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {anime.studios?.length > 0 && (
                            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                                <h3 className="text-xl font-semibold mb-4 text-white">Studios</h3>
                                <div className="flex flex-wrap gap-2">
                                    {anime.studios.map((studio) => (
                                        <span key={studio.mal_id} className="px-3 py-1 bg-orange-500 rounded-full text-sm text-white">
                                            {studio.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                        {anime.producers?.length > 0 && (
                            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                                <h3 className="text-xl font-semibold mb-4 text-white">Producers</h3>
                                <div className="flex flex-wrap gap-2">
                                    {anime.producers.map((producer) => (
                                        <span key={producer.mal_id} className="px-3 py-1 bg-orange-500 rounded-full text-sm text-white">
                                            {producer.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </section>

                {anime.trailer?.url && (
                    <section className="mb-12">
                        <h2 className="text-3xl font-bold mb-6 flex items-center gap-2 text-orange-500">
                            <PlayCircle className="w-6 h-6" />
                            Trailer
                        </h2>
                        <div className="aspect-video max-w-4xl mx-auto bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                            <iframe
                                src={anime.trailer.url.replace('watch?v=', 'embed/')}
                                title="Anime Trailer"
                                className="w-full h-full"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </section>
                )}

                {recommendations.length > 0 && (
                    <section className="mb-12">
                        <h2 className="text-3xl font-bold mb-6 flex items-center gap-2 text-orange-500">
                            More Like This
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                            {recommendations.map((rec) => (
                                <div
                                    key={rec.entry.mal_id}
                                    className="bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-700 transition cursor-pointer shadow-lg border border-gray-700"
                                    onClick={() => navigate(`/anime/${rec.entry.mal_id}`)}
                                >
                                    <img
                                        src={rec.entry.images.jpg.image_url}
                                        alt={rec.entry.title}
                                        className="w-full h-48 object-cover"
                                    />
                                    <div className="p-3">
                                        <h3 className="text-sm font-semibold truncate text-white">{rec.entry.title}</h3>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    )
}
