import { useState, useEffect } from "react";

import { getUser } from "../../services/ChatService";
import UserLayout from "../layouts/UserLayout";

function Contact({
  chatRoom,
  onlineUsersId,
  user,
  newMessage,
  newMessageUser,
}) {
  const [contact, setContact] = useState();

  // Fetch Chat Room Member
  useEffect(() => {
    const contactId = chatRoom.members?.find((member) => member !== user.id);
    // const msg = chatRoom.members?.find((member) => member == newMessageUser);
    // setNewMsg(msg);
    const fetchData = async () => {
      const res = await getUser(contactId);
      console.log("contact: ", res);
      console.log(newMessageUser);
      setContact(res);
    };
    fetchData();
  }, [chatRoom, user]);

  return (
    <>
      {contact?.user_id == newMessageUser ? (
        <div>
          <UserLayout
            user={contact}
            onlineUsersId={onlineUsersId}
            newMessage={newMessage}
          />
        </div>
      ) : (
        <UserLayout user={contact} onlineUsersId={onlineUsersId} />
      )}
    </>
  );
  // <UserLayout user={contact} onlineUsersId={onlineUsersId} />;
}
export default Contact;
