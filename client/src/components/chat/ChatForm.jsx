import { useState, useEffect, useRef } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { FaceSmileIcon, PhotoIcon } from "@heroicons/react/24/outline";
import { XCircleIcon } from "@heroicons/react/24/solid";
import Picker from "emoji-picker-react";

function ChatForm(props) {
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [image, setImage] = useState(null);
  const scrollRef = useRef();

  // Handle Removing of Image
  const handleRemoveImage = () => {
    setPreviewImage(null);
  };

  // Handle Preview of Image when Selected
  const handleSelectImage = (event) => {
    const file = event.target.files[0];
    setImage(file);
    const fileReader = new FileReader();
    fileReader.addEventListener("load", () => {
      setPreviewImage(fileReader.result);
    });
    fileReader.readAsDataURL(file);
  };

  // Handle Selecting of Emoji
  const handleEmojiClick = (event, emojiObject) => {
    let newMessage = message + emojiObject.emoji;
    setMessage(newMessage);
  };

  // Handle Sending of Message
  const handleFormSubmit = (e) => {
    e.preventDefault();
    props.handleFormSubmit(message, image);
    props.handleGetMessage();
    setMessage("");
    setImage(null);
    setPreviewImage(null);
  };

  // On click Image Picker
  const onIconClick = () => {
    const input = document.getElementById("file-input");
    if (input) {
      input.click();
    }
  };

  // Scroll View to Current Data
  useEffect(() => {
    scrollRef.current?.scrollIntoView();
  }, [showEmojiPicker, previewImage]);

  return (
    <div ref={scrollRef}>
      {showEmojiPicker && (
        <Picker className="dark:bg-gray-900 " onEmojiClick={handleEmojiClick} />
      )}
      <form onSubmit={handleFormSubmit}>
        <div className="flex items-center justify-between w-full p-3 bg-white border-b border-gray-200 dark:bg-gray-900 dark:border-gray-700">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setShowEmojiPicker(!showEmojiPicker);
            }}
          >
            <FaceSmileIcon
              className="h-7 w-7 mr-2 text-primary-600 dark:text-primary-500"
              aria-hidden="true"
            />
          </button>
          <div>
            <PhotoIcon
              className="h-7 w-7 text-primary-600 dark:text-primary-500 cursor-pointer"
              aria-hidden="true"
              onClick={onIconClick}
            />
            <input
              type="file"
              accept="image/*"
              id="file-input"
              style={{ display: "none" }}
              onChange={handleSelectImage}
            />
          </div>
          <div className="block w-full py-2 pl-4 mx-3 outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
            {previewImage ? (
              <div className="relative w-24 h-24 m-3 mb-5">
                <img
                  src={previewImage}
                  alt="preview-image"
                  className="rounded-lg w-24 h-24 object-cover"
                />
                <XCircleIcon
                  className="absolute top-0 -m-2.5 h-7 w-7 mr-2 bg-white rounded-full text-primary-600 dark:text-primary-500 cursor-pointer"
                  aria-hidden="true"
                  onClick={handleRemoveImage}
                />
              </div>
            ) : null}
            <input
              type="text"
              placeholder="Write a message"
              name="message"
              className="w-full outline-none bg-transparent"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <button type="submit">
            <PaperAirplaneIcon
              className="h-6 w-6 text-primary-600 dark:text-primary-500"
              aria-hidden="true"
            />
          </button>
        </div>
      </form>
    </div>
  );
}

export default ChatForm;
