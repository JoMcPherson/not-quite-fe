import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="header">
      <nav>
        <ul>
          <li>
            <Link to="/create">Create Event</Link>
          </li>
          <li>
            <Link to="/edit">Edit Event</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
