import { FaSearch, FaMoon, FaSun } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const [openSearch, setOpenSearch] = useState(false);
  const [mode, setMode] = useState(false);

  useEffect(() => {
    if (mode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [mode]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = e.target[0].value;
    if (openSearch && value) {
      const searchParams = new URLSearchParams(window.location.search);
      searchParams.set("searchTerm", searchTerm);
      const searchQuery = searchParams.toString();
      navigate(`/search?${searchQuery}`);
    }
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const term = searchParams.get("searchTerm");
    if (term) {
      setSearchTerm(term);
    }
  }, [location.search]);

  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-blue-600">Rens</span>
            <span className="text-blue-400">Estate</span>
          </h1>
        </Link>

        <div className="flex gap-4 items-center text-cyan-700 dark:text-green-500">
          <ul className="flex gap-4">
            <li className="hidden sm:inline hover:underline ">
              <Link to={"/"}>Home</Link>
            </li>

            <li className="hidden sm:inline hover:underline">
              <Link to={"/about"}>About</Link>
            </li>
            {currentUser ? (
              <img
                className="rounded-full h-7 w-7 object-cover"
                src={currentUser.avatar}
                alt=""
              />
            ) : (
              <li className=" hover:underline">
                <Link to={"/profile"}>Sign in</Link>
              </li>
            )}
          </ul>
          <form
            onSubmit={handleSubmit}
            className="bg-slate-100 p-3 rounded-lg flex items-center"
          >
            <input
              type="text"
              placeholder="Search..."
              className={`${
                openSearch ? "" : "hidden"
              } bg-transparent focus:outline-none w-24 sm:w-64 h-[14px]`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={() => setOpenSearch(!openSearch)}>
              <FaSearch className="text-slate-500" />
            </button>
          </form>
          <button onClick={() => setMode(!mode)}>
            {mode ? (
              <FaSun className="text-slate-500" />
            ) : (
              <FaMoon className="text-slate-500" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
