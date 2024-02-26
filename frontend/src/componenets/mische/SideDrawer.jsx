import {
  Avatar,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Input,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Spinner,
  Text,
  Tooltip,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { AiFillBell } from "react-icons/ai";
import { FiChevronDown } from "react-icons/fi";
import { ChatState } from "../../Context/ChatProvider";
import ProfileMode from "./ProfileModel";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ChatLoading from "../ChatLoading";
import UserListItem from "../UserAvator/UserListItem";
import { getSender } from "./ChatLogics";
import NotificationBadge from "react-notification-badge";
import { Effect } from "react-notification-badge";

const SideDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();

  const {
    user,
    setSelectedChat,
    chats,
    setChats,
    notification,
    setNotification,
  } = ChatState();

  const navigate = useNavigate();
  const toast = useToast();
  // console.log(user);
  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };

  const handleSearch = async () => {
    if (!search) {
      toast({
        title: "Please Enter somthing in search",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          authorization: `Bearer ${user.data.token}`,
        },
      };

      const { data } = await axios.get(
        `chat-server-op.up.railway.app/api/user?search=${search}`,
        config
      );
      setLoading(false);
      // console.log(data);
      setSearchResult(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
    }
  };

  const accessChat = async (userId) => {
    try {
      setLoadingChat(true);
      console.log(user.data.token);
      const config = {
        headers: {
          "Content-type": "application/json",
          authorization: `Bearer ${user.data.token}`,
        },
      };

      const { data } = await axios.post(
        "chat-server-op.up.railway.app/api/chat",
        { userId },
        config
      );

      // console.log(data);

      if (!chats.find((c) => c._id === data._id)) {
        setChats([data, ...chats]);
      }

      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
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
  };
  console.log(notification, "---------------------");
  return (
    <>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        bg={"white"}
        w="100%"
        p="5px 10px 5px 10px"
        borderWidth={"5px"}
      >
        <Tooltip label="Search Users to chat" hasArrow placement="bottom-end">
          <Button variant={"ghost"} onClick={onOpen}>
            <i className="fas fa-search"></i>
            <BiSearch style={{ fontSize: "1.3rem", marginTop: "0.3rem" }} />
            <Text display={{ base: "none", md: "flex" }} px={"3"}>
              Search User
            </Text>
          </Button>
        </Tooltip>
        <Text fontSize={"2x1"} fontFamily={"Work sans"}>
          Talk-A-Tive
        </Text>
        <div>
          <Menu>
            <MenuButton
              marginRight={3}
              as={Button}
              leftIcon={<AiFillBell />}
              fontSize={"1.3rem"}
              background={"white"}
            >
              <NotificationBadge
                count={notification.length}
                effect={Effect.SCALE}
              />
            </MenuButton>
            <MenuList paddingLeft={2}>
              {!notification.length && "No New Messages"}
              {notification.map((notify) => (
                <MenuItem
                  key={notify._id}
                  onClick={() => {
                    setSelectedChat(notify.chat);
                    setNotification(
                      notification.filter((n) => n.chat._id !== notify.chat._id)
                    );
                  }}
                >
                  {notify.chat.isGroupChat
                    ? `New Message in ${notify.chat.chatName}`
                    : `New Message from ${getSender(user, notify.chat.users)}`}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton
              as={Button}
              background={"white"}
              rightIcon={<FiChevronDown />}
            >
              <Avatar
                size={"sm"}
                cursor={"pointer"}
                name={user.data.name}
                src={user.data.pic}
              ></Avatar>
            </MenuButton>
            <MenuList>
              <ProfileMode user={user.data}>
                <MenuItem>My Profile</MenuItem>
              </ProfileMode>
              <MenuDivider />
              <MenuItem onClick={logoutHandler}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>

      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerHeader borderBottomWidth={"1px"}>Search Users</DrawerHeader>
            <DrawerBody>
              <Box display={"flex"} paddingBottom={2}>
                <Input
                  placeholder="Search by name or email"
                  marginRight={2}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <Button isLoading={loading} onClick={handleSearch}>
                  Go
                </Button>
              </Box>
              {loading ? (
                <ChatLoading />
              ) : (
                searchResult?.map((userData) => (
                  <UserListItem
                    key={userData._id}
                    userData={userData}
                    handleFunction={() => accessChat(userData._id)}
                  />
                ))
              )}
              {loadingChat && <Spinner ml={"auto"} display={"flex"} />}
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
};

export default SideDrawer;
