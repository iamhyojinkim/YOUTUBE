import { Link, useParams } from "react-router-dom";
import { FaYoutube } from "react-icons/fa";
import { IoMdSearch } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { login, logout, userChange } from "./Firebase/firebase";
import { useYoutubeApi } from "./Context/YoutubeApi";

export function Navbar() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const { keyword } = useParams();
  const { user } = useYoutubeApi();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/videos/${search}`);
  };

  useEffect(() => {
    setSearch(keyword || "");
  }, [keyword]);

  return (
    <>
      <header className="w-full flex justify-between items-center p-4 text-2xl border-b border-zinc-600">
        <Link to="/" className="flex items-center">
          <FaYoutube className="text-4xl text-red-600" />
          <h3 className="text-bold text-3xl ml-2 text-white">YouTube</h3>
        </Link>

        <form onSubmit={handleSubmit} className="flex-grow mx-8">
          <div className="flex justify-center items-center">
            <input
              className="py-2 px-4 w-full max-w-xl bg-zinc-800 text-white rounded-l-lg"
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="px-4 py-2">
              <IoMdSearch className="text-3xl" />
            </button>
          </div>
        </form>

        <div className="flex items-center space-x-4">
          <button
            onClick={user ? logout : login}
            className={`px-4 py-2 ${
              user ? "bg-red-600" : "bg-blue-600"
            } text-white rounded-lg`}
          >
            {user ? "Logout" : "Login"}
          </button>
          {user && <span className="text-white">{user.displayName}</span>}
        </div>
      </header>
    </>
  );
}
