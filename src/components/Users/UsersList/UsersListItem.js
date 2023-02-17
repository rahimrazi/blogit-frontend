import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChatAlt2Icon, ChatAltIcon, MailIcon } from "@heroicons/react/solid";
import { useDispatch, useSelector } from "react-redux";
import {
  blockUserAction,
  unBlockUserAction,
} from "../../../redux/slices/users/usersSlices";
import { ChatState } from "../../../Context/ChatProvider";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { baseUrl } from "../../../utils/baseURL";

const UsersListItem = (user) => {
  const navigate = useNavigate();
  //dispatch
  const dispatch = useDispatch();
  
  const toast = useToast();
  const { selectedChat,setSelectedChat,chats, setChats,notification,setNotification } = ChatState();
  
  console.log(user?.user?._id,4444);
  const users = useSelector(state=>state.users)
  const {userAuth} = users
  console.log(userAuth,"users from state")
  
  async function handleMessage(){
    console.log("handlemessage entered");
    console.log(user,"for token")
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userAuth?.token}`,
        },
      };
      const userId = user?.user?._id
      console.log(userId,"userID")
      const { data } = await axios.post(`${baseUrl}/api/chat`, { userId },config);
      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      navigate('/chats')
      console.log(data,1231231)
    } catch (error) {
      toast({
        title: "Error fetching the chat",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  }



  return (
    <>
      <div className="p-8 mb-4 bg-white shadow rounded">
        <div className="flex flex-wrap items-center -mx-4">
          <div className="w-full lg:w-3/12 flex px-4 mb-6 lg:mb-0">
            <img
              className="w-10 h-10 mr-4 object-cover rounded-full"
              src={user?.user?.profilePhoto}
              alt="profile "
            />
            <div>
              <p className="text-sm font-medium">
                {user?.user?.firstName} {user?.user?.lastName}
              </p>
              <p className="text-xs text-gray-500">{user?.user?.email}</p>
            </div>
          </div>
          <div className="w-1/2 lg:w-2/12 px-4 mb-6 lg:mb-0">
            <p className="py-1 px-2 text-xs text-purple-500 bg-purple-50 rounded-full">
              {user?.user?.accountType}
              {/* <span>{user?.user?.isBlocked && "Blocked"}</span> */}
            </p>
          </div>
          <div className="w-1/2 lg:w-2/12 px-4 mb-6 lg:mb-0">
            <p className="text-sm font-medium">
              <span className="text-base mr-2  text-bold text-yellow-500">
                {user.user?.followers?.length}
              </span>
              followers
            </p>
          </div>
          <div className="w-full flex lg:w-4/12 px-4  mb-6 lg:mb-0 items-center justify-between">
            <div className="flex space-x-3">
            <p className="inline-block py-1 px-2 mr-2 mb-1 lg:mb-0 text-xs border-2 rounded">
              <span className="text-base mr-2  boder-2 text-bold text-yellow-500">
                {user.user?.posts?.length} - Posts
              </span>
            </p>
            <a
              href={`/profile/${user?.user?._id}`}
              className="inline-flex items-center px-3 py-1 border border-yellow-500 rounded text-gray-600 hover:bg-green-600 hover:text-white text-xs"
            >
              Profile
            </a>
            {user?.user?.isBlocked ? (
              <button
                onClick={() => dispatch(unBlockUserAction(user?.user?._id))}
                className="inline-block py-1 px-2 text-center bg-gray-500 text-gray-300 mr-2 mb-1 lg:mb-0 text-xs border rounded"
              >
                unblock
              </button>
            ) : (
              <button
                onClick={() => dispatch(blockUserAction(user?.user?._id))}
                className="inline-block py-1 px-2 text-center bg-red-600 text-gray-300 mr-2 mb-1 lg:mb-0 text-xs border rounded"
              >
                Block
              </button>
            )}
            <div
             onClick={handleMessage}
              
              className="inline-flex items-center px-3 py-1 border border-yellow-700 bg-green-500 rounded text-gray-700 hover:bg-green-400 text-sm font-medium"
            >
              <ChatAltIcon
                className="-ml-1 mr-2 h-5 w-5 text-gray-200"
                aria-hidden="true"
              />
              Chat
            </div>{" "}
            </div>
          </div>
          <div className="w-full lg:w-1/12 px-4">
            <div className="flex items-center">
              
              {/* Send Mail */}
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UsersListItem;
