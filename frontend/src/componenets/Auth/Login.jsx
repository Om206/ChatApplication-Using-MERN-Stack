import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const handleClick = () => setShow(!show);

  const submitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
      toast({
        title: "Please Fill all the fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }

    try {
      const data = await axios.post(
        "https://chat-server-op.up.railway.app/api/user/login",
        {
          email: email,
          password: password,
        }
      );
      toast({
        title: "Login Sccessful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      navigate("/chats");
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };

  return (
    <VStack spacing={"5px"}>
      <FormControl id="email" isRequired color={"black"}>
        <FormLabel>Email</FormLabel>
        <Input
          color={"black"}
          placeholder="Enter your Email ID"
          _placeholder={{ opacity: 1, color: "gray.500" }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl id="password" isRequired color={"black"}>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            color={"black"}
            type={show ? "text" : "password"}
            placeholder="Enter your Password"
            _placeholder={{ opacity: 1, color: "gray.500" }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width={"4.5rem"} onClick={handleClick}>
            <Button h="1.75rem" size={"sm"} color={"black"}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <Button
        color={"white"}
        colorScheme="blue"
        width={"100%"}
        style={{ marginTop: 15 }}
        onClick={submitHandler}
      >
        Login
      </Button>
      <Button
        color={"white"}
        colorScheme="red"
        variant={"solid"}
        width={"100%"}
        style={{ marginTop: 15 }}
        onClick={() => {
          setEmail("guest@example.com");
          setPassword("123456");
        }}
        isLoading={loading}
      >
        Get Guest User Credentials
      </Button>
    </VStack>
  );
};

export default Login;
