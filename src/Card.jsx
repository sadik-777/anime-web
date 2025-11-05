    import React from 'react';
    import { Star} from 'lucide-react'
    import {Link} from 'react-router-dom'
    export default function AnimeCard({ data }) {
    return (
            <Link to={`/${parseInt(data.mal_id)}`}>
        <div className="relative group w-64 overflow-hidden cursor-pointer">
        <img
            src={data.images?.jpg.image_url || data.images?.webp.image_url}
            alt={data.title}
            className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out flex flex-col justify-center p-4">
            <h3 className="text-white text-lg font-semibold mb-1">
            {data.title}
            </h3>
            <p className="text-white text-sm font-medium line-clamp-1">Rating:{data.rating}</p>
            <div className="flex items-center text-sm text-gray-300 mb-1">
            <Star className="w-4 h-4 mr-1 text-yellow-400" />
            <span>{data.score || 'N/A'}</span>
            <span className="ml-2 text-gray-400">
                {data.episodes ? `${data.episodes} Episodes` : ''}
            </span>
            </div>
            <p className='text-white'>
    {data.synopsis && data.synopsis.length > 100
        ? `${data.synopsis.slice(0, 100)}...`
        : data.synopsis || 'No description available'}
        </p>
            
        </div>
        <div className="mt-2">
            <p className="text-white text-sm font-medium line-clamp-1">{data.title}</p>
            
            <span className="text-gray-400 text-xs">Sub | Dub</span>
        </div>
        </div>
        </Link>
    )
    }
