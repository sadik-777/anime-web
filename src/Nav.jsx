import { Link } from "react-router-dom"
import logoC from "./images/my-logo.svg"


export default function Nav() {

    return (
        <nav className="from-gray-900 via-black to-gray-950 dark:from-gray-950 dark:via-black dark:to-gray-900 border-b border-gray-700 mb-40">
            <div className="flex flex-wrap items-center justify-between mx-auto p-4">
                <Link to="/">
                    <img src={logoC} alt="logo" className="md:h-24" />
                </Link>

                <div className="hidden md:flex items-center space-x-8">
                    <ul className="flex space-x-8 text-white font-medium">
                        <li>
                            <Link to="/new" className="hover:text-orange-500 transition-colors duration-200">
                                New
                            </Link>
                        </li>
                        <li>
                            <Link to="/popular" className="hover:text-orange-500 transition-colors duration-200">
                                Popular
                            </Link>
                        </li>
                        <li>
                                <Link to="/categories" className="hover:text-orange-500 transition-colors duration-200 ">
                                    Categories 
                                </Link>
                        </li>
                    </ul>
                    <Link to="/search">
                    <div className="flex items-center justify-center fill-white hover:text-orange-500 transition-colors duration-200">
                    <svg xmlns="http://www.w3.org/2000/svg" id="Isolation_Mode" data-name="Isolation Mode" viewBox="0 0 24 24" width="22" height="22">
                    <path d="M18.9,16.776A10.539,10.539,0,1,0,16.776,18.9l5.1,5.1L24,21.88ZM10.5,18A7.5,7.5,0,1,1,18,10.5,7.507,7.507,0,0,1,10.5,18Z"></path>
                </svg>
                </div>
                        </Link>
                </div>
            </div>
        </nav>
    );
}
