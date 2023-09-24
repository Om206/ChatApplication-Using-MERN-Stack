import { Box, Icon } from "@chakra-ui/react";
import React from "react";
import { GrFormClose } from "react-icons/gr";

const UserBadgeItem = ({ user, handleFunction }) => {
  return (
    <Box
      paddingX={2}
      paddingY={1}
      borderRadius={"0.5rem"}
      margin={1}
      marginBottom={2}
      variant={"soild"}
      fontSize={12}
      backgroundColor={"purple"}
      cursor={"pointer"}
      onClick={handleFunction}
      color={"white"}
      display={"flex"}
    >
      {user.name}
      <Icon as={GrFormClose} fontSize={20} />
    </Box>
  );
};

export default UserBadgeItem;
