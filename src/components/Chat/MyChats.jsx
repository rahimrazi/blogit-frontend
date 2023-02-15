import "./MyChats.css";
import { Box,  Stack, Text, useToast } from "@chakra-ui/react";
import React from "react";
import { ChatState } from "../../Context/ChatProvider";
import { baseUrl } from "../../utils/baseURL";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { AddIcon } from "@chakra-ui/icons";
import ChatLoading from "./ChatLoading";
import { getSender } from "../../utils/ChatLogics";
import {Button} from "@chakra-ui/button";
import GroupChatModal from "./MIscellaneous/GroupChatModal";


const MyChats = ({fetchAgain}) => {
  const [loggedUser, setLoggedUser] = useState();

  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();
  
  const toast = useToast();

  const fetchChats = async () => {
    // console.log(user._id);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      };

      const { data } = await axios.get(`${baseUrl}/api/chat`, config);
      setChats(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };
  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
    // eslint-disable-next-line
  }, [fetchAgain]);

  return (
    <Box
      display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      p={3}
      bg="white"
      w={{ base: "100%", md: "31%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        fontFamily="Work sans"
        display="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        My Chats
        <GroupChatModal>
          <Button
            display="flex"
            fontSize={{ base: "17px", md: "10px", lg: "17px" }}
            rightIcon={<AddIcon />}
          >
            New Group Chat
          </Button>
        </GroupChatModal>
        {/* <Button
          display="flex"
          fontSize={{ base: "17px", md: "10px", lg: "17px" }}
          rightIcon={<AddIcon />}
        >
          New Group Chat
        </Button> */}
        
      </Box>
      <Box
        display="flex"
        flexDir="column"
        p={3}
        bg="#F8F8F8"
        w="100%"
        h="100%"
        borderRadius="lg"
        overflowY="hidden"
      >
        {chats ? (
          <Stack overflowY="scroll">
            {chats?.map((chat) => (
              <Box
                onClick={() =>{
                  setSelectedChat(chat)
                  console.log(chat,"helo")
                } }
                cursor="pointer"
                bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
                color={selectedChat === chat ? "white" : "black"}
                px={3}
                py={2}
                borderRadius="lg"
                key={chat?._id}
              >
                
                  {!chat?.isGroupChat
                    ? getSender(loggedUser, chat?.users)
                    : chat?.chatName}
                
                {/* {chat?.latestMessage && (
                  <Text fontSize="xs">
                    <b>{chat?.latestMessage?.sender?.name} : </b>
                    {chat?.latestMessage?.content?.length > 50
                      ? chat?.latestMessage?.content?.substring(0, 51) + "..."
                      : chat?.latestMessage?.content}
                  </Text>
                )} */}
              </Box>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
  );
};

export default MyChats;


