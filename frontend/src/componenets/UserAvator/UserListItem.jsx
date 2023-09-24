import { Avatar, Box, Text } from "@chakra-ui/react";
import React from "react";

const UserListItem = ({ userData, handleFunction }) => {
  return (
    <Box
      onClick={handleFunction}
      cursor={"pointer"}
      backgroundColor={"#E8E8E8"}
      _hover={{
        background: "#38B2AC",
        color: "white",
      }}
      w="100%"
      display={"flex"}
      alignItems={"center"}
      color={"black"}
      paddingX={3}
      paddingY={2}
      marginBottom={2}
      borderRadius={"lg"}
    >
      <Avatar
        marginRight={2}
        size={"sm"}
        cursor={"pointer"}
        name={userData.name}
        src={userData.pic}
      />
      <Box>
        <Text>{userData.name}</Text>
        <Text fontSize={"xs"}>
          <b>Email:</b>
          {userData.email}
        </Text>
      </Box>
    </Box>
  );
};

export default UserListItem;
