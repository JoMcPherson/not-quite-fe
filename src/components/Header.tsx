import { Link } from "react-router-dom";
import { Authenticator } from "@aws-amplify/ui-react";
import Logo from "/images/NotQuiteLogo.png";

interface HeaderProps {
  username: string;
}

const Header: React.FC<HeaderProps> = ({ username }) => {
  return (
    <header className="header bg-purple-200 p-4 shadow-md">
      <nav className="flex justify-between items-center">
        <Link to="/">
          <img className="h-9 w-9 ml-4" src={Logo} alt="Not Quite's Logo" />
        </Link>
        <h1 className="text-2xl ml-24 font-bold text-purple-600">
          Not Quite Olympians
        </h1>

        <ul className="flex space-x-4 mr-3">
          <li>
            <Link
              to="/create"
              className="text-white bg-purple-500 hover:bg-purple-600 px-4 py-2 rounded-full transition-all duration-300 ease-in-out"
            >
              Create Event
            </Link>
          </li>
          <li>
            <Authenticator>
              {({ signOut }) => (
                <Link
                  to="/"
                  onClick={signOut}
                  className="text-white bg-purple-500 hover:bg-purple-600 px-4 py-2 rounded-full transition-all duration-300 ease-in-out"
                >
                  Sign out
                </Link>
              )}
            </Authenticator>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
