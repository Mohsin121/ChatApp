import React from "react";

const MessageInput = ({ message, setMessage, handleSend }) => {
  return (
    <div className="bg-white border-t border-gray-200 p-4">
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Type your message..."
          className="flex-1 border border-gray-300 rounded-l-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={handleSend}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default MessageInput;
