import React, { useState } from "react";
import { Link } from "react-router-dom";
import useTheme from "../Context/theme";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const { themeMode, lightTheme, darkTheme } = useTheme();

  const toggleUserMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const onChangeBtn = () => {
    if (themeMode === "dark") {
      lightTheme();
    } else {
      darkTheme();
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div>
      <nav className="bg-white  dark:bg-gray-800">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 ">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <button
                type="button"
                onClick={toggleUserMenu}
                className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="absolute -inset-0.5"></span>
                <span className="sr-only">Open main menu</span>

                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>

                <svg
                  className="hidden h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex flex-shrink-0 items-center">
                <div className="h-8 w-auto">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={40}
                    height={30}
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="#1049ad"
                      d="M192 32c0 17.7 14.3 32 32 32c123.7 0 224 100.3 224 224c0 17.7 14.3 32 32 32s32-14.3 32-32C512 128.9 383.1 0 224 0c-17.7 0-32 14.3-32 32zm0 96c0 17.7 14.3 32 32 32c70.7 0 128 57.3 128 128c0 17.7 14.3 32 32 32s32-14.3 32-32c0-106-86-192-192-192c-17.7 0-32 14.3-32 32zM96 144c0-26.5-21.5-48-48-48S0 117.5 0 144V368c0 79.5 64.5 144 144 144s144-64.5 144-144s-64.5-144-144-144H128v96h16c26.5 0 48 21.5 48 48s-21.5 48-48 48s-48-21.5-48-48V144z"
                    />
                  </svg>
                  {/* <img
    src="https://img.freepik.com/free-vector/floral-capital-letter-r-alphabet-vector_53876-87380.jpg?ga=GA1.1.1400772433.1736257455&semt=ais_hybrid"
    alt="Logo"
    className="h-10 w-auto"
  /> */}
                </div>
              </div>
              <div className="hidden  pl-20  sm:ml-6 sm:block">
                <div className="flex space-x-6 pl-20 ml-20">
                  <Link
                    to="/home"
                    className="text-black hover:bg-gray-600 hover:text-black rounded-md px-3 py-2 text-sm font-medium dark:text-white "
                    aria-current="page"
                  >
                    Home
                  </Link>
                  <Link
                    to="/about"
                    className="text-black hover:bg-gray-600 hover:text-black rounded-md px-3 py-2 text-sm font-medium  dark:text-white"
                  >
                    About
                  </Link>
                  <Link
                    to="/contact"
                    className="text-black hover:bg-gray-600 hover:text-black rounded-md px-3 py-2 text-sm font-medium  dark:text-white"
                  >
                    Contact
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-black hover:bg-gray-600 hover:text-black rounded-md px-3 py-2 text-sm font-medium dark:text-white"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  value=""
                  className="sr-only peer"
                  checked={themeMode === "dark"}
                  onChange={onChangeBtn}
                />
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>

        {!isMenuOpen && (
          <div className={`sm:hidden `} id="mobile-menu">
            <div className="space-y-1 px-2 pb-3 pt-2">
              <Link
                to="/home"
                className="text-gray-500 hover:bg-gray-300 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
                aria-current="page"
              >
                Home
              </Link>
              <Link
                to="/about"
                className="text-gray-500 hover:bg-gray-300 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
              >
                About
              </Link>
              <Link
                to="/contact"
                className="text-gray-500 hover:bg-gray-300 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
              >
                Contact
              </Link>
              <Link
                to="/"
                className="text-gray-500 hover:bg-gray-300 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
              >
                Logout
              </Link>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
