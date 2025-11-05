    import { Link } from 'react-router-dom'

    export default function CardG({ genre }) {
    return (
        <Link to={`/categories/${genre.mal_id}`}>
        <div className="bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-4 text-center cursor-pointer">
            <h3 className="text-white text-lg font-semibold mb-2">{genre.name} ({genre.count})</h3>
        </div>
        </Link>
    );
    }
