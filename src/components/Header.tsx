import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "/images/NotQuiteLogo.png";
import background from "/images/background.jpeg";
import MyAuthenticator from "./MyAuthenticator";

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="w-full">
      <nav
        className="relative w-full bg-cover bg-center bg-no-repeat text-white shadow-md"
        style={{ backgroundImage: `url(${background})` }}
      >
        <div className="flex flex-wrap justify-between items-center mx-auto px-4 lg:px-6 py-2.5 w-full max-w-screen-xl">
          <Link to="/" className="flex items-center">
            <img
              src={Logo}
              className="mr-3 h-12 sm:h-16"
              alt="Not Quite Olympians Logo"
            />
            <h1 className="text-center text-3xl font-bold text-white my-8 headline">
              Not Quite Olympians
            </h1>
          </Link>
          <button
            onClick={toggleMenu}
            type="button"
            className="inline-flex items-center p-2 ml-1 text-sm text-white rounded-lg lg:hidden hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300"
            aria-controls="mobile-menu"
            aria-expanded={isOpen}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className={`w-6 h-6 ${isOpen ? "hidden" : "block"}`}
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
            <svg
              className={`w-6 h-6 ${isOpen ? "block" : "hidden"}`}
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
          <div
            className={`w-full lg:flex lg:w-auto lg:order-1 ${
              isOpen ? "block" : "hidden"
            }`}
            id="mobile-menu"
          >
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <li>
                <Link
                  to="/create"
                  className="block py-2 pr-4 pl-3  text-xl text-white border-b border-gray-100 hover:bg-gray-700 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Create Event
                </Link>
              </li>
              <li>
                <Link
                  to="/my_events"
                  className="block py-2 pr-4 pl-3 text-xl text-white border-b border-gray-100 hover:bg-gray-700 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                >
                  My Events
                </Link>
              </li>
              <li>
                <MyAuthenticator>
                  {({ signOut }) => (
                    <Link
                      to="/"
                      onClick={signOut}
                      className="block py-2 pr-4 text-xl pl-3 text-white border-b border-gray-100 hover:bg-gray-700 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                    >
                      Sign out
                    </Link>
                  )}
                </MyAuthenticator>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
