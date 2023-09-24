import React from "react";
import { ChatState } from "../Context/ChatProvider";
import { Box } from "@chakra-ui/react";
import SingleChat from "./SingleChat";
const ChatBox = ({ featchAgain, setFetchAgain }) => {
  const { selectedChat } = ChatState();
  return (
    <Box
      display={{ base: selectedChat ? "flex" : "none", md: "flex" }}
      width={{ base: "100%", md: "68%" }}
      alignItems={"center"}
      flexDir={"column"}
      padding={3}
      backgroundColor={"white"}
      borderRadius={"0.5rem"}
      borderWidth={"1px"}
    >
      <SingleChat featchAgain={featchAgain} setFetchAgain={setFetchAgain} />
    </Box>
  );
};

export default ChatBox;
