    import React, { useEffect, useState } from "react"
    import axios from "axios"
    import AnimeCard from "./Card"

    export default function Search() {
    const [search, setSearch] = useState("")
    const [list, setList] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        const delay = setTimeout(() => {
        setLoading(true)
        setError(null)
        let url
        if (search.trim()) {
            url = `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(search.trim())}`
        } else {
            url = `https://api.jikan.moe/v4/top/anime?limit=25`
        }

        axios.get(url)
            .then(res => {
            const filtredHxAnime = res.data.data.filter(
                a => a.rating !== 'Rx - Hentai' && a.rating !== 'R+ - Mild Nudity'
            )
            setList(filtredHxAnime)
            // setList(res.data.data)
            setLoading(false)
            })
            .catch(err => {
            if (err.response?.status === 429) {
                setError("Rate limit exceeded. Please wait a moment and try again.")
            } else {
                setError("Failed to fetch anime. Please try again.")
            }
            console.error(err)
            setList([])
            setLoading(false)
            })
        }, 300)

        return () => clearTimeout(delay)
    }, [search])

    return (
        <div className="p-5">
        <div className="p-5 mt-5 overflow-hidden h-[50px] w-[1150px] bg-orange-500 shadow-[2px_2px_20px_rgba(0,0,0,0.08)] rounded-full flex group items-center hover:duration-300 duration-300">
            <div className="flex items-center justify-center fill-white">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                id="Isolation_Mode"
                data-name="Isolation Mode"
                viewBox="0 0 24 24"
                width="22"
                height="22"
            >
                <path d="M18.9,16.776A10.539,10.539,0,1,0,16.776,18.9l5.1,5.1L24,21.88ZM10.5,18A7.5,7.5,0,1,1,18,10.5,7.507,7.507,0,0,1,10.5,18Z"></path>
            </svg>
            </div>
            <input
            type="text"
            className="outline-none text-[20px] bg-transparent w-full text-white font-normal px-4"
            placeholder="Search anime..."
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            />
            <svg
            className="w-6 h-6 text-white dark:text-white cursor-pointer"
            onClick={() => setSearch('')}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
            >
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6"/>
            </svg>
        </div>
        {loading && (
            <div className="flex items-center justify-center h-screen">
            <div className="flex space-x-2">
                <span className="w-3 h-3 bg-orange-500 rounded-full animate-bounce"></span>
                <span className="w-3 h-3 bg-orange-500 rounded-full animate-bounce [animation-delay:-0.2s]"></span>
                <span className="w-3 h-3 bg-orange-500 rounded-full animate-bounce [animation-delay:-0.4s]"></span>
            </div>
            </div>
        )}
        {error && <p className="p-5 text-red-500">{error}</p>}

        <div className="mt-14 ml-10 grid grid-cols-4 gap-4">
            {list.length > 0 ? (
            list.map((anime, i) => (
                <div key={anime.mal_id || i}>
                <AnimeCard data={anime} />
                </div>
            ))
            ) : (
            <div className="flex items-center justify-center h-screen">
                <p className="text-white font-bold text-3xl">No results found.</p>
            </div>
            )}
        </div>
        </div>
    );
    }
