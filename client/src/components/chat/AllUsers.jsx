import { useState, useEffect } from "react";
import { createChatRoom } from "../../services/ChatService";
import Contact from "./Contact";
import UserLayout from "../layouts/UserLayout";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function AllUsers({
  users,
  chatRooms,
  setChatRooms,
  onlineUsersId,
  user,
  changeChat,
  newMessage,
  newMessageUser,
}) {
  const [selectedChat, setSelectedChat] = useState();
  const [nonContacts, setNonContacts] = useState([]);
  const [contactIds, setContactIds] = useState([]);

  // Set Contact Users
  useEffect(() => {
    const Ids = chatRooms.map((chatRoom) => {
      return chatRoom.members.find((member) => member !== user.id);
    });
    setContactIds(Ids);
  }, [chatRooms, user.id]);

  // Set Non-Contact Users
  useEffect(() => {
    setNonContacts(
      users.filter(
        (f) => f.user_id !== user.id && !contactIds.includes(f.user_id)
      )
    );
  }, [contactIds, users, user.id]);

  // Handle Selected Chat
  const changeCurrentChat = (index, chat) => {
    setSelectedChat(index);
    changeChat(chat);
  };

  // Handle Chat Room Messages
  const handleNewChatRoom = async (newUser) => {
    const members = {
      senderId: user.id,
      receiverId: newUser.user_id,
    };
    const res = await createChatRoom(members);
    setChatRooms((prev) => [...prev, res]);
    changeChat(res);
  };

  return (
    <>
      <ul className="overflow-auto h-[30rem]">
        {/* Contacts List */}
        <h2 className="my-2 mb-2 ml-2 text-gray-900 dark:text-white">
          Contacts
        </h2>
        <li>
          {chatRooms.length == 0 ? (
            <div className="my-8 lg:col-span-2 lg:block bg-white dark:bg-gray-900">
              <div className="pl-5">
                <div className="text-center">
                  <h2 className="text-md text-gray-500 dark:text-gray-400">
                    Added Contacts will appear here.
                  </h2>
                </div>
              </div>
            </div>
          ) : (
            chatRooms.map((chatRoom, index) => (
              <div
                key={index}
                className={classNames(
                  index === selectedChat
                    ? "justify-between bg-gray-100 dark:bg-gray-700"
                    : "justify-between transition duration-150 ease-in-out cursor-pointer bg-white border-b border-gray-200 hover:bg-gray-100 dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-700",
                  "flex items-center px-3 py-2 text-sm "
                )}
                onClick={() => changeCurrentChat(index, chatRoom)}
              >
                <Contact
                  chatRoom={chatRoom}
                  onlineUsersId={onlineUsersId}
                  user={user}
                  newMessage={newMessage}
                  newMessageUser={newMessageUser}
                />
              </div>
            ))
          )}
        </li>

        {/* Other Users */}
        <h2 className="my-2 mb-2 ml-2 text-gray-900 dark:text-white">
          Other Users
        </h2>
        <li>
          {nonContacts.length == 0 ? (
            <div className="my-8 lg:col-span-2 lg:block bg-white dark:bg-gray-900">
              <div className="pl-5">
                <div className="text-center">
                  <h2 className="text-md text-gray-500 dark:text-gray-400">
                    No Users Available.
                  </h2>
                </div>
              </div>
            </div>
          ) : (
            nonContacts.map((nonContact, index) => (
              <div
                key={index}
                className="justify-between flex items-center px-3 py-2 text-sm bg-white border-b border-gray-200 hover:bg-gray-100 dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-700 cursor-pointer"
              >
                <div>
                  <UserLayout user={nonContact} onlineUsersId={onlineUsersId} />
                </div>
                <button
                  onClick={() => handleNewChatRoom(nonContact)}
                  className="text-xs bg-transparent hover:bg-primary-500 text-primary-700 font-semibold hover:text-white py-1 px-2 border border-primary-500 hover:border-transparent rounded-full"
                >
                  Add +
                </button>
              </div>
            ))
          )}
        </li>
      </ul>
    </>
  );
}

export default AllUsers;
