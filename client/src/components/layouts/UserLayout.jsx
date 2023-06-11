function UserLayout({ user, onlineUsersId, newMessage }) {
  return (
    <>
      <div className="relative flex items-center">
        {user?.photoURL ? (
          <img
            className="w-10 h-10 rounded-full ring-2 p-1 ring-primary-400 dark:ring-primary-500"
            src={user?.photoURL}
            alt=""
          />
        ) : (
          <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 ring-2 p-1 ring-primary-400 dark:ring-primary-500">
            <svg
              className="absolute w-12 h-12 text-gray-400 -left-1 "
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

        <span className="block ml-5 text-gray-700 font-medium dark:text-gray-400">
          {user?.username ? user?.username : user?.name}
        </span>
        {onlineUsersId?.includes(user?.user_id) ? (
          <span className="bottom-0 left-7 absolute  w-3.5 h-3.5 bg-green-500 dark:bg-green-400 border-2 border-white rounded-full"></span>
        ) : (
          <span className="bottom-0 left-7 absolute  w-3.5 h-3.5 bg-gray-400 border-2 border-white rounded-full"></span>
        )}
        {newMessage && (
          <div
            id="msgUser"
            className="text-center ml-2 text-xs bg-transparent text-blue-700 font-semibold pb-1 pt-0.5 px-2 border border-blue-500 rounded-full cursor-pointer"
          >
            New Message
          </div>
        )}
      </div>
    </>
  );
}
export default UserLayout;
