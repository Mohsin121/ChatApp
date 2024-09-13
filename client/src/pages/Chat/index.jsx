import { useState } from "react";
import Chats from "./Chats";
import Messages from "./Messages";
import MessageInput from "./MessageInput";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { getAllChatsOfUser } from "../../services/chatgroup.service";
import { getAllMessages, sendMessage } from "../../services/message.service";
import loggedInUser from "../../store";

const Chat = () => {
  const [message, setMessage] = useState("");
  const [activeChat, setActiveChat] = useState(null);
  const getOtherUserName = (chatUsers, loggedInUserId) => {
    return chatUsers.find((user) => user.id !== loggedInUserId)?.name;
  };

  const getReceiverId = (chatUsers, loggedInUserId) => {
    return chatUsers.find((user) => user.id !== loggedInUserId)?.id;
  };
  const { data: chats } = useQuery({
    queryKey: ["chats"],
    queryFn: () => getAllChatsOfUser(loggedInUser.id),
  });

  const { data: messages } = useQuery({
    queryKey: ["messages", activeChat],
    queryFn: () => getAllMessages(activeChat),
    enabled: !!activeChat,
  });

  const { mutateAsync: handleSubmit } = useMutation({
    mutationFn: (payload) => {
      return sendMessage(payload);
    },
    onSuccess: (data) => {
      console.log("Mutation result ", data);
      QueryClient.invalidateQueries(["messages", activeChat]);
    },
  });

  const handleSend = () => {
    if (message.trim() && activeChat) {
      const selectedChat = chats.find((chat) => chat._id === activeChat);

      if (selectedChat) {
        const receiverId = getReceiverId(selectedChat.users, loggedInUser.id);

        const payload = {
          chatGroup: activeChat,
          sender: loggedInUser.id,
          message: message,
          receiver: receiverId,
        };

        console.log("Sending message:", payload);

        handleSubmit(payload);
        setMessage("");
      }
    }
  };

  console.log("Active chat", activeChat);
  console.log("MEssages", messages);

  return (
    <div className="flex h-screen p-4 bg-gray-100">
      <div className="w-64 bg-white border-r border-gray-200 p-4">
        <h2 className="text-xl font-semibold mb-4">Chat Groups</h2>
        {chats?.map((chat, i) => (
          <Chats
            key={i}
            name={getOtherUserName(chat.users, loggedInUser.id)}
            active={activeChat === chat._id}
            onClick={() => {
              setActiveChat(chat._id);
              console.log("chat is active", chat._id);
            }}
          />
        ))}
      </div>

      <div className="flex-1 flex flex-col">
        <div className="bg-white border-b border-gray-200 p-4 flex items-center">
          <div className="w-10 h-10 rounded-full bg-gray-300 mr-3"></div>
          <div>
            <h2 className="text-lg font-semibold">{activeChat}</h2>
            <p className="text-sm text-gray-500">3 participants</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages?.map((msg, index) => (
            <Messages
              key={index}
              content={msg.text}
              sender={msg.sender}
              isUser={msg.sender === loggedInUser.id}
            />
          ))}
        </div>

        <MessageInput
          message={message}
          setMessage={setMessage}
          handleSend={handleSend}
        />
      </div>
    </div>
  );
};

export default Chat;
