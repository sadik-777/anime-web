import React from "react";
import { Link } from "react-router-dom"
import logoC from "./images/my-logo.svg"

export default function Footer() {
  return (
    <footer className="from-gray-900 via-black to-gray-950 dark:via-black dark:to-gray-900 border-b m-4">
            <div className="w-full max-w-screen-7xl mx-auto p-4 md:py-8">

        <div className="sm:flex sm:items-center sm:justify-between">
          <Link to="/" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
            <img src={logoC} className="h-20" alt="AnimeHub Logo" />
          </Link>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
              <Link to="/new" className="hover:underline me-4 md:me-6">New</Link>
            </li>
            <li>
              <Link to="/popular" className="hover:underline me-4 md:me-6">Popular</Link>
            </li>
            <li>
              <Link to="/search" className="hover:underline me-4 md:me-6">Search</Link>
            </li>
            <li>
              <a href="#" className="hover:underline">Contact</a>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2026 <Link to="/" className="hover:underline">Sadik-kun</Link>. All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}
