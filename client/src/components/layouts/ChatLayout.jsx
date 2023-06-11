import { useEffect, useRef, useState } from "react";
import {
  getAllUsers,
  getChatRooms,
  initiateSocketConnection,
} from "../../services/ChatService";
import { useAuth } from "../../contexts/UserContext";
import ChatRoom from "../chat/ChatRoom";
import Welcome from "../chat/Welcome";
import AllUsers from "../chat/AllUsers";
import SearchUsers from "../chat/SearchUsers";
import Header from "../layouts/Header";

function ChatLayout() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [chatRooms, setChatRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [currentChat, setCurrentChat] = useState();
  const [onlineUsersId, setonlineUsersId] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isContact, setIsContact] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [newMessageUser, setNewMessageUser] = useState("");

  const socket = useRef();
  const { user } = useAuth();

  const handleGetMessage = (data) => {
    setNewMessage(data.message);
    setNewMessageUser(data.senderId);
    console.log("data2: " + newMessage + " " + newMessageUser);
    console.log("get data: " + data.senderId);
  };

  // Get Online Users
  useEffect(() => {
    const getSocket = async () => {
      const res = await initiateSocketConnection();
      socket.current = res;
      socket.current.emit("addUser", user.id);
      socket.current.on("getUsers", (users) => {
        const userId = users.map((u) => u[0]);
        setonlineUsersId(userId);
      });
    };

    getSocket();
  }, [user.id]);

  // Get Chat Rooms
  useEffect(() => {
    const fetchData = async () => {
      const res = await getChatRooms(user.id);
      setChatRooms(res);
    };
    fetchData();
  }, [user.id]);

  // Get All Users
  useEffect(() => {
    const fetchData = async () => {
      const res = await getAllUsers();
      setUsers(res);
    };
    fetchData();
  }, []);

  // Set Filtered Users and Rooms
  useEffect(() => {
    setFilteredUsers(users);
    setFilteredRooms(chatRooms);
  }, [users, chatRooms]);

  // Set Filtered Users and Rooms
  useEffect(() => {
    if (isContact) {
      setFilteredUsers([]);
    } else {
      setFilteredRooms([]);
    }
  }, [isContact]);

  // Handle Current Chat
  const handleChatChange = (chat) => {
    // const imgUser = document.getElementById("imgUser");
    // imgUser.classList.remove(
    //   "text-center ml-2 text-xs bg-transparent text-blue-700 font-semibold pb-1 pt-0.5 px-2 border border-blue-500 rounded-full cursor-pointer"
    // );
    // imgUser.style.display = "none";
    setCurrentChat(chat);
    const msgUser = document.getElementById("msgUser");

    // imgUser.classList.remove(
    //   "text-center ml-2 text-xs bg-transparent text-blue-700 font-semibold pb-1 pt-0.5 px-2 border border-blue-500 rounded-full cursor-pointer"
    // );
    if (msgUser) {
      msgUser.remove();
    }
  };

  // Handle Search Non-Contact Users
  const handleSearch = (newSearchQuery) => {
    setSearchQuery(newSearchQuery);
    const searchedUsers = users.filter((user) => {
      return user.name.toLowerCase().includes(newSearchQuery.toLowerCase());
    });
    const searchedUsersId = searchedUsers.map((u) => u.Id);
    if (chatRooms.length !== 0) {
      chatRooms.forEach((chatRoom) => {
        const isUserContact = chatRoom.members.some(
          (e) => e !== user.id && searchedUsersId.includes(e)
        );
        setIsContact(isUserContact);
        isUserContact
          ? setFilteredRooms([chatRoom])
          : setFilteredUsers(searchedUsers);
      });
    } else {
      setFilteredUsers(searchedUsers);
    }
  };

  return (
    <>
      <Header />
      <div className="container mx-auto">
        <div className="min-w-full bg-white border-x border-b border-gray-200 dark:bg-gray-900 dark:border-gray-700 rounded lg:grid lg:grid-cols-3">
          <div className="bg-white border-r border-gray-200 dark:bg-gray-900 dark:border-gray-700 lg:col-span-1">
            <SearchUsers handleSearch={handleSearch} />
            <AllUsers
              users={searchQuery !== "" ? filteredUsers : users}
              chatRooms={searchQuery !== "" ? filteredRooms : chatRooms}
              setChatRooms={setChatRooms}
              onlineUsersId={onlineUsersId}
              user={user}
              changeChat={handleChatChange}
              newMessage={newMessage}
              newMessageUser={newMessageUser}
            />
          </div>
          {currentChat ? (
            <ChatRoom
              currentChat={currentChat}
              user={user}
              socket={socket}
              onlineUsersId={onlineUsersId}
              handleGetMessage={handleGetMessage}
            />
          ) : (
            <Welcome />
          )}
        </div>
      </div>
    </>
  );
}

export default ChatLayout;
