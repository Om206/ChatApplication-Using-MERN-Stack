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
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [pic, setPic] = useState("");
  const [show, setShow] = useState(false);
  const [cshow, setCShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => setShow(!show);
  const handleClickC = () => setCShow(!cshow);
  const toast = useToast();
  const postDetails = (pics) => {
    setLoading(true);
    if (pics === undefined) {
      toast({
        title: "Please select an image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    if (
      pic.type === "image/jpeg" ||
      pics.type === "image/png" ||
      pics.type === "image/jpg"
    ) {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "chat-app");
      data.append("cloud_name", "dxqbdxgtd");

      fetch("https://api.cloudinary.com/v1_1/dxqbdxgtd/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((d) => {
          setPic(d.url.toString());
          console.log(d.url.toString());
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else {
      toast({
        title: "Please select an image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
  };
  const submitHandler = async () => {
    setLoading(true);
    if (!name || !email || !password || !cPassword) {
      toast({
        title: "Please Fill all the feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }

    if (password !== cPassword) {
      toast({
        title: "Password Do Not Match",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    try {
      const data = await axios.post("/api/user/", {
        name: name,
        email: email,
        password: password,
        cPassword: cPassword,
        pic: pic,
      });
      toast({
        title: "Registration Sccessful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      navigate("/chats");
    } catch (err) {
      toast({
        title: "Error Occured!",
        description: err.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <VStack spacing={"5px"}>
      <FormControl id="first-name" isRequired color={"black"}>
        <FormLabel>Name</FormLabel>
        <Input
          color={"black"}
          placeholder="Enter your First Name"
          _placeholder={{ opacity: 1, color: "gray.500" }}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>
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
      <FormControl id="cpassword" isRequired color={"black"}>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup>
          <Input
            color={"black"}
            type={cshow ? "text" : "password"}
            placeholder="Enter your conform password"
            _placeholder={{ opacity: 1, color: "gray.500" }}
            value={cPassword}
            onChange={(e) => setCPassword(e.target.value)}
          />
          <InputRightElement width={"4.5rem"} onClick={handleClickC}>
            <Button h="1.75rem" size={"sm"} color={"black"}>
              {cshow ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="pic" color={"black"}>
        <FormLabel>Picture</FormLabel>
        <Input
          type="file"
          p={1.5}
          accept="image/*"
          onChange={(e) => postDetails(e.target.files[0])}
        />
      </FormControl>

      <Button
        color={"white"}
        colorScheme="blue"
        width={"100%"}
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}
      >
        Sign Up
      </Button>
    </VStack>
  );
};

export default SignUp;
