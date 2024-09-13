const Chats = ({ name, active, onClick }) => {
  return (
    <div
      className={`flex items-center space-x-3 mb-3 py-2 px-4 rounded-md cursor-pointer ${
        active ? "bg-blue-500 text-white" : "hover:bg-gray-100"
      }`}
      onClick={onClick}
    >
      <div className="w-8 h-8 rounded-full bg-gray-300"></div>
      <span className="text-sm font-medium">{name}</span>
    </div>
  );
};

export default Chats;
