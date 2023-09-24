import React, { useEffect } from "react";
import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import Login from "./Auth/Login";
import SignUp from "./Auth/SignUp";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    if (userInfo) {
      navigate("/chats");
    }
  }, [navigate]);
  return (
    <Container maxW="xl" centerContent>
      <Box
        display="flex"
        justifyContent="center"
        p={3}
        bg="white"
        w="100%"
        m="40px 0 15px 0"
        borderRadius="0.5rem"
        borderWidth="1px"
      >
        <Text fontSize={"4xl"} fontFamily={"Work sans"} color={"black"}>
          Talt-A-Tive
        </Text>
      </Box>

      <Box
        bg={"white"}
        w="100%"
        p={4}
        borderRadius={"0.5rem"}
        borderWidth={"1px"}
        color={"black"}
      >
        <Tabs variant="soft-rounded">
          <TabList mb="1em">
            <Tab w={"50%"}>Login</Tab>
            <Tab w={"50%"}>Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <SignUp />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default HomePage;
