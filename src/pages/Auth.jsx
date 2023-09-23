import React, { useContext, useState } from "react";
import { ContainerStyles, StyledButton } from "../../palette";
import authimage from "../assets/authimage.jpg";
import { useImageSize } from "react-image-size";
import { Box, Typography, Button } from "@mui/material";
import FormSample from "../components/FormSample";
import FormControl from "@mui/material/FormControl";
import Signin from "../components/Signin";
import Signup from "../components/Signup";
import axios from "axios";
import { useCookies } from "react-cookie";
import { ThemeContext } from "../contexts/ContextApi";
const Auth = () => {
  const [dimensions, { loading, error }] = useImageSize(authimage);
  const { setCookie, cookies } = useContext(ThemeContext);
  const [isup, setIsup] = useState(true);
  const aspectRatio =
    error === null ? Number(dimensions?.height) / Number(dimensions?.width) : 0;
  const [signin, setSignIn] = useState({
    email: "",
    password: "",
  });
  const [errorpost, setError] = useState("");
  const [signup, setSignUp] = useState({
    name: "",
    email: "",
    password: "",
    confirmpass: "",
    dob: "",
  });
  async function handleSubmitSignin(event, endpoint) {
    event.preventDefault();
    const data = {
      email: signin.email,
      password: signin.password,
    };
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_SERVERURL}${endpoint}`,
        data
      );
      if (response.data !== undefined) {
        setCookie("AuthToken", response.data);
      }
    } catch (err) {
      console.log(err);
    }
  }
  async function handleSubmitSignup(event, endpoint) {
    event.preventDefault();
    // if (signup.password !== confirmpass) {
    //   setError("Make sure your passwords match");
    //   return;
    // }
    const data = {
      name: signup.name,
      email: signup.email,
      password: signup.password,
      confirmpass: signup.confirmpass,
      dob: signup.dob,
    };
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_SERVERURL}${endpoint}`,
        data
      );
      console.log(response)
      if (response.data !== undefined) {
        setCookie("AuthToken", response.data);
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <ContainerStyles
      sx={{
        minWidth: "100vw",
        minHeight: "100vh",
        background:
          "radial-gradient(circle, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 77%, rgba(0,78,255,1) 100%)",
      }}
    >
      <ContainerStyles
        sx={{
          minHeight: "75vh",
          minWidth: { xs: "95vw", sm: "80vw", md: "85vw" },
          flexDirection: { md: "row" },
          justifyContent: "space-around",
        }}
      >
        <Box
          src={authimage}
          component="img"
          alt=""
          sx={{
            display: { xs: "none", md: "block" },
            width: "30rem",
            height: `calc(30rem * ${aspectRatio})`,
            borderRadius: "10px",
          }}
        />
        {/* sign in  */}
        {isup ? (
          <Signup
            isup={isup}
            setIsup={setIsup}
            handleSignup={() => handleSubmitSignup(event, "/api/auth/signup")}
            signup={signup}
            setSignUp={setSignUp}
          />
        ) : (
          <Signin
            isup={isup}
            setIsup={setIsup}
            handleSignin={() => handleSubmitSignin(event, "/api/auth/signin")}
            signin={signin}
            setSignIn={setSignIn}
          />
        )}
      </ContainerStyles>
    </ContainerStyles>
  );
};

export default Auth;
