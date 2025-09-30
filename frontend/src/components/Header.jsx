import { NavLink } from "react-router-dom";

export default function Header() {
  const linkClasses = ({ isActive }) =>
    `px-3 py-2 rounded-md font-medium ${
      isActive ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-200"
    }`;

  return (
    <header className="flex items-center justify-between px-6 py-4 shadow">
      <h1 className="text-xl font-bold text-blue-700">DevPlatform</h1>
      <nav className="flex gap-3">
        <NavLink to="/" className={linkClasses}>
          Home
        </NavLink>
        <NavLink to="/search" className={linkClasses}>
          Search
        </NavLink>
        <NavLink to="/profile/1" className={linkClasses}>
          Profile
        </NavLink>
      </nav>
    </header>
  );
}
