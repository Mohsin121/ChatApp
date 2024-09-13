import { Search, MessageCircle } from "lucide-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Spinner } from "@material-tailwind/react";
import { failureToaster } from "../../utils/swal";
import { useNavigate } from "react-router-dom";
import { getAllUsers } from "../../services/user.service";
import { useState } from "react";
import { createChatGroup } from "../../services/chatgroup.service";
import loggedInUser from "./../../store/index";

const Users = () => {
  const navigate = useNavigate();
  const { isLoading, data, error } = useQuery({
    queryKey: ["users"],
    queryFn: () => getAllUsers(),
  });

  const { mutateAsync: handleSubmit } = useMutation({
    mutationFn: (payload) => {
      return createChatGroup(payload);
    },
    onSuccess: () => {
      navigate("/chat");
    },
    onError: (error) => {
      console.log("Mutation error ", error);
    },
  });

  const [searchTerm, setSearchTerm] = useState("");
  const filteredUsers = data?.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const createChat = async (userId) => {
    try {
      const payload = {
        senderId: loggedInUser.id,
        receiverId: userId,
      };
      await handleSubmit(payload);
    } catch (error) {
      // Handle any errors from handleSubmit
      console.error("Error creating chat group: ", error);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-2xl font-semibold mb-4">Users</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Search users..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
        </div>
      </div>
      {isLoading && <Spinner />}
      {error && <p className="text-red-500 p-4">Error loading users</p>}
      {!isLoading && !error && (
        <ul className="divide-y divide-gray-200">
          {filteredUsers?.map((user) => (
            <li
              key={user.id}
              className="flex items-center justify-between p-4 hover:bg-gray-50"
            >
              <div className="flex items-center space-x-3">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <h3 className="font-medium">{user.name}</h3>
                  <p className="text-sm text-gray-500">{user.status}</p>
                </div>
              </div>
              <button
                onClick={() => createChat(user.id)}
                className="p-2 text-blue-500 hover:bg-blue-100 rounded-full transition-colors duration-200"
              >
                <MessageCircle size={24} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Users;
