import { format } from "timeago.js";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

// Change Email URL
function image(img) {
  var url = img;
  var replacedUrl = url.replace(/\\/g, "/");
  //   Use this to run on local server
  //   const url = "http://127.0.0.1:5000/";

  //   Use this to run on render.com
  const link = "https://chathub-mkw2.onrender.com/";
  return link + replacedUrl;
}

function Message({ message, self }) {
  return (
    <>
      <li
        className={classNames(
          self !== message.sender ? "justify-start" : "justify-end",
          "flex "
        )}
      >
        <div
          className={
            self !== message.sender ? "text-start mb-5" : "text-end mb-5"
          }
        >
          {message.message && (
            <span
              className={classNames(
                self !== message.sender
                  ? " text-gray-700 dark:text-gray-400 bg-white border border-gray-200 shadow-md dark:bg-gray-900 dark:border-gray-700"
                  : " bg-blue-600 dark:bg-blue-500 text-white",
                " relative max-w-xl px-4 py-2 rounded-lg shadow"
              )}
            >
              {message.message}
            </span>
          )}

          {message.image && (
            <div className="w-48 h-48 mt-3 cursor-pointer">
              <img
                src={image(message.image)}
                alt=""
                className="w-48 h-48 rounded-lg object-cover"
              />
            </div>
          )}
          <div className="mt-2 block text-sm text-gray-700 dark:text-gray-400">
            {format(message.createdAt)}
          </div>
        </div>
      </li>
    </>
  );
}
export default Message;
