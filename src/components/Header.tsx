import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="header bg-purple-200 p-4 shadow-md">
      <nav className="max-w-4xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-purple-600">
          Not Quite Olympians
        </h1>
        <ul className="flex space-x-4">
          <li>
            <Link
              to="/create"
              className="text-white bg-purple-500 hover:bg-purple-600 px-4 py-2 rounded-full transition-all duration-300 ease-in-out"
            >
              Create Event
            </Link>
          </li>
          <li>
            <Link
              to="/edit"
              className="text-white bg-purple-500 hover:bg-purple-600 px-4 py-2 rounded-full transition-all duration-300 ease-in-out"
            >
              Edit Event
            </Link>
          </li>
          <li>
            <Link to="/event/:id">Event Detail Page</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
