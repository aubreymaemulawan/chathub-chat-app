import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/UserContext";
import { getUser } from "../../services/ChatService";
import Logout from "../accounts/Logout";
import ThemeToggler from "./ThemeToggler";

function Header() {
  const [modal, setModal] = useState(false);
  const [data, setData] = useState([{}]);
  const { user } = useAuth();

  // Fetching Avatars
  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        const res = await getUser(user.id);
        setData(res);
      };
      fetchData();
    }
  }, [user]);

  return (
    <>
      <nav className="px- px-2 sm:px-4 py-1 bg-gray-50 border-gray-200 dark:bg-gray-800 dark:border-gray-700 text-gray-900 text-sm rounded border dark:text-white">
        <div className="container mx-auto flex flex-wrap items-center justify-between">
          <Link to="/" className="flex">
            <span className="self-center text-lg font-semibold whitespace-nowrap text-gray-900 dark:text-white">
              Chat
              <span className="text-teal-400">Hub</span>
            </span>
          </Link>
          <div className="flex md:order-2">
            <ThemeToggler />
            {user && (
              <>
                <button
                  className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none rounded-lg text-sm p-2.5"
                  onClick={() => setModal(true)}
                >
                  <ArrowLeftOnRectangleIcon
                    className="h-8 w-8"
                    aria-hidden="true"
                  />
                </button>
                <Link
                  to="/profile"
                  className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none rounded-full text-sm p-2.5"
                >
                  {data.photoURL ? (
                    <img
                      className="h-8 w-8 rounded-full"
                      src={data.photoURL}
                      alt=""
                    />
                  ) : (
                    <div className="relative w-8 h-8 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 ring-1 ring-gray-400 dark:ring-gray-500">
                      <svg
                        className="absolute w-10 h-10 text-gray-400 -left-1 "
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </div>
                  )}
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
      {modal && <Logout modal={modal} setModal={setModal} />}
    </>
  );
}

export default Header;
