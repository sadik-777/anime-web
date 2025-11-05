import axios from 'axios'
import React, { useEffect, useState } from 'react'
import AnimeCard from './Card'
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function New() {
    const [newAnime, setNewAnime] = useState([])
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(true)
    const [pagination, setPagination] = useState({ has_next_page: false })
    
    useEffect(() => {
        axios.get(`https://api.jikan.moe/v4/seasons/now?page=${page}`)
            .then(res => {
                setNewAnime(res.data.data)
                setPagination(res.data.pagination)
                setLoading(false)
            })
            .catch(err => console.log(err))
    }, [page])
    if(loading){
        return ( 
<div className="flex items-center justify-center h-screen">
  <div className="flex space-x-2">
    <span className="w-3 h-3 bg-orange-500 rounded-full animate-bounce"></span>
    <span className="w-3 h-3 bg-orange-500 rounded-full animate-bounce [animation-delay:-0.2s]"></span>
    <span className="w-3 h-3 bg-orange-500 rounded-full animate-bounce [animation-delay:-0.4s]"></span>
  </div>
</div>

        )
      }
    return (
        <div className='ml-10 grid grid-cols-4 gap-4'>
            <h1 className='text-white text-3xl col-span-full flex justify-center items-center gap-6 py-10'>Newly Added Anime</h1>
            {newAnime.filter(n=>n.rating !== 'Rx - Hentai' && n.rating !== 'R+ - Mild Nudity').map((a, i) => (
                <div key={i}>
                    <AnimeCard data={a} />
                </div>
            ))}
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