const Messages = ({ content, sender, isUser }) => {
  return (
    <div className={`chat-message ${isUser ? "justify-end" : ""}`}>
      <div className={`flex items-end ${isUser ? "justify-end" : ""}`}>
        <div
          className={`flex flex-col space-y-2 text-xs max-w-xs mx-2 ${
            isUser ? "order-1 items-end" : "order-2 items-start"
          }`}
        >
          <div>
            <span
              className={`px-4 py-2 rounded-lg inline-block ${
                isUser
                  ? "rounded-br-none bg-blue-600 text-white"
                  : "rounded-bl-none bg-gray-300 text-gray-600"
              }`}
            >
              {content}
            </span>
          </div>
        </div>
        <img
          src={
            isUser
              ? "https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
              : "https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
          }
          alt={`${sender}'s profile`}
          className={`w-6 h-6 rounded-full ${isUser ? "order-2" : "order-1"}`}
        />
      </div>
    </div>
  );
};

export default Messages;
