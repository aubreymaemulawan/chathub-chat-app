import { useState, useEffect, useRef } from "react";
import { getMessagesOfChatRoom, sendMessage } from "../../services/ChatService";
import {
  EllipsisHorizontalCircleIcon,
  PhoneIcon,
  VideoCameraIcon,
} from "@heroicons/react/24/solid";

import Message from "./Message";
import Contact from "./Contact";
import ChatForm from "./ChatForm";

function ChatRoom({ currentChat, user, socket, onlineUsersId, ...props }) {
  const [messages, setMessages] = useState([]);
  const [incomingMessage, setIncomingMessage] = useState(null);
  const scrollRef = useRef();

  // useEffect(() => {
  //   socket.current?.on("getMessage", (data) => {
  //     console.log("data: ", data);
  //     props.handleGetMessage(data);
  //   });
  // }, [socket]);

  const handleGetMessage = async () => {
    // e.preventDefault();
    socket.current?.on("getMessage", (data) => {
      props.handleGetMessage(data);
    });
  };

  // Handle Show of Notifications
  const handleShowNotification = (message) => {
    if ("Notification" in window) {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          new Notification("ChatHub New Message", {
            body: message,
          });
        }
      });
    }
  };

  // Handle Form Submission
  const handleFormSubmit = async (message, image) => {
    const receiverId = currentChat.members.find((member) => member !== user.id);
    // if (message != "" || image != null) {
    socket.current.emit("sendMessage", {
      senderId: user.id,
      receiverId: receiverId,
      message: message,
      image: image,
    });
    const messageBody = {
      chatRoomId: currentChat._id,
      sender: user.id,
      message: message,
      image: image,
    };
    const res = await sendMessage(messageBody);
    setMessages([...messages, res]);
    console.log(messages);
    // }
  };

  // Fetch Messages on Chat Room
  useEffect(() => {
    const fetchData = async () => {
      const res = await getMessagesOfChatRoom(currentChat._id);
      setMessages(res);
      console.log(messages);
    };
    fetchData();
  }, [currentChat._id]);

  // Scroll View to Current Data
  useEffect(() => {
    scrollRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  // Fetch Real-Time Message
  useEffect(() => {
    socket.current?.on("getMessage", (data) => {
      setIncomingMessage({
        senderId: data.senderId,
        message: data.message,
        // image: data.image,
      });
      handleShowNotification(data.message);
      const audio = new Audio("../../../public/audio/alert.mp3");
      audio.play();
    });
  }, [socket]);

  useEffect(() => {
    incomingMessage && setMessages((prev) => [...prev, incomingMessage]);
  }, [incomingMessage]);

  return (
    <div className="lg:col-span-2 lg:block">
      <div className="w-full">
        <div className="flex justify-between p-3 bg-white border-b border-gray-200 dark:bg-gray-900 dark:border-gray-700">
          <div>
            <Contact
              chatRoom={currentChat}
              user={user}
              onlineUsersId={onlineUsersId}
            />
          </div>
          <div className="space-x-2 mt-2">
            <button>
              <PhoneIcon
                className="h-5 w-5 mr-2 text-primary-600 dark:text-primary-500"
                aria-hidden="true"
              />
            </button>
            <button>
              <VideoCameraIcon
                className="h-5 w-5 mr-2 text-primary-600 dark:text-primary-500"
                aria-hidden="true"
              />
            </button>
            <button>
              <EllipsisHorizontalCircleIcon
                className="h-5 w-5 mr-2 text-primary-600 dark:text-primary-500"
                aria-hidden="true"
              />
            </button>
          </div>
        </div>

        <div className="relative w-full p-6 overflow-y-auto h-[30rem] bg-white border-b border-gray-200 dark:bg-gray-900 dark:border-gray-700">
          <ul className="space-y-2">
            {messages.length == 0 ? (
              <div className="mt-[25%] lg:col-span-2 lg:block bg-white dark:bg-gray-900">
                <div className="pl-5">
                  <div className="text-center">
                    <h2 className="text-xl text-gray-500 dark:text-gray-400">
                      Say Hello 👋 to Start the Conversation
                    </h2>
                  </div>
                </div>
              </div>
            ) : (
              messages.map((message, index) => (
                <div key={index} ref={scrollRef}>
                  <Message message={message} self={user.id} />
                </div>
              ))
            )}
          </ul>
        </div>
        <ChatForm
          handleFormSubmit={handleFormSubmit}
          handleGetMessage={handleGetMessage}
        />
      </div>
    </div>
  );
}
export default ChatRoom;
