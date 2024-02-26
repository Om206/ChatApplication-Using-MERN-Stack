import React, { useEffect, useState } from "react";
import { ChatState } from "../Context/ChatProvider";
import { Box, Button, Stack, Text, useToast } from "@chakra-ui/react";
import axios from "axios";
import { AiOutlinePlus } from "react-icons/ai";
import ChatLoading from "./ChatLoading";
import { getSender } from "./mische/ChatLogics";
import GroupChatModal from "./mische/GroupChatModal";

const MyChats = ({ featchAgain }) => {
  const [loggedUser, setLoggedUser] = useState();
  const { user, selectedChat, setSelectedChat, chats, setChats } = ChatState();
  const toast = useToast();

  const fetchChat = async () => {
    try {
      // console.log(user.data.token);
      const config = {
        headers: {
          authorization: `Bearer ${user.data.token}`,
        },
      };
      const { data } = await axios.get(
        "chat-server-op.up.railway.app/api/chat",
        config
      );
      console.log(data);
      setChats(data);
    } catch (error) {
      toast({
        title: "Erro while fetching chat",
        status: "Failed to Load the chats",
        duration: 9000,
        isClosable: true,
        position: "top-left",
      });
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChat();
  }, [featchAgain]);

  return (
    <Box
      display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDirection={"column"}
      alignItems={"center"}
      padding={3}
      bg={"white"}
      width={{ base: "100%", md: "31%" }}
      borderRadius={"0.5rem"}
      borderWidth={"1px"}
    >
      <Box
        paddingBottom={3}
        paddingX={3}
        fontSize={{ base: "15px", md: "30px" }}
        fontFamily={"Work sans"}
        display={"flex"}
        width={"100%"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        My Chats
        <GroupChatModal>
          <Button
            display={"flex"}
            fontSize={{ base: "13px", md: "15px", lg: "17px" }}
            rightIcon={<AiOutlinePlus />}
          >
            New Group
          </Button>
        </GroupChatModal>
      </Box>
      <Box
        display={"flex"}
        flexDirection={"column"}
        padding={3}
        bg="#F8F8F8"
        width={"100%"}
        height={"100%"}
        borderRadius={"0.5rem"}
        overflowY={"hidden"}
        className="messages"
      >
        {chats ? (
          <Stack overflowY="scroll">
            {chats.map((chat) => (
              <Box
                onClick={() => setSelectedChat(chat)}
                cursor={"pointer"}
                bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
                color={selectedChat === chat ? "white" : "black"}
                paddingX={3}
                paddingY={2}
                borderRadius={"0.5rem"}
                key={chat._id}
              >
                <Text>
                  {loggedUser && !chat.isGroupChat
                    ? getSender(loggedUser, chat.users)
                    : chat.chatName}
                </Text>
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
