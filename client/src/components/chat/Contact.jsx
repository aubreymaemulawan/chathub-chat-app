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
    const fetchData = async () => {
      const res = await getUser(contactId);
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
}
export default Contact;
