import React from "react";
import { ContainerStyles } from "../../palette";
import { Box, Typography, Button } from "@mui/material";
import FormSample from "./FormSample";

const Signup = ({ handleSignup, setSignUp, signup, isup, setIsup }) => {
  console.log(signup);
  return (
    <ContainerStyles
      sx={{
        minHeight: "80vh",
        minWidth: { xs: "95vw", md: "30vw" },
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Typography variant="h3" sx={{ color: "white" }}>
        Sign up!!
      </Typography>
      <ContainerStyles
        method="post"
        style={{
          width: "100%",
          minHeight: "70vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: "column",
        }}
      >
        <FormSample
          id="email"
          label="enter your email"
          height="4rem"
          width="100%"
          type="email"
          generalcolor={"white"}
          fieldsetbgcolor={"white"}
          fieldsetborder={"2px solid white"}
          fieldsetborderradius={"5px"}
          value={signup.email}
          onChange={setSignUp}
          name={"email"}
          margin="0"
          InputLabelProps={{
            style: {
              color: "white",
              fontFamily: "Montserrat, sans-serif",
            },
          }}
          InputProps={{
            style: {
              color: "white",
              fontFamily: "Montserrat, sans-serif",
            },
          }}
        />
        <FormSample
          id="password"
          label="enter your password"
          height="4rem"
          width="100%"
          type="password"
          generalcolor={"white"}
          fieldsetbgcolor={"white"}
          fieldsetborder={"2px solid white"}
          fieldsetborderradius={"5px"}
          value={signup.password}
          onChange={setSignUp}
          name={"password"}
          margin="0"
          InputLabelProps={{
            style: {
              color: "#ffffff",
              fontFamily: "Montserrat, sans-serif",
            },
          }}
          InputProps={{
            style: {
              color: "#ffffff",
              fontFamily: "Montserrat, sans-serif",
            },
          }}
        />
        <FormSample
          id="confirmpass"
          label="confirm your password"
          height="4rem"
          width="100%"
          type="password"
          generalcolor={"white"}
          fieldsetbgcolor={"white"}
          fieldsetborder={"2px solid white"}
          fieldsetborderradius={"5px"}
          value={signup.confirmpass}
          onChange={setSignUp}
          name={"confirmpass"}
          margin="0"
          InputLabelProps={{
            style: {
              color: "#ffffff",
              fontFamily: "Montserrat, sans-serif",
            },
          }}
          InputProps={{
            style: {
              color: "#ffffff",
              fontFamily: "Montserrat, sans-serif",
            },
          }}
        />
        <FormSample
          id="name"
          label="confirm your name"
          height="4rem"
          width="100%"
          type="name"
          generalcolor={"white"}
          fieldsetbgcolor={"white"}
          fieldsetborder={"2px solid white"}
          fieldsetborderradius={"5px"}
          value={signup.name}
          onChange={setSignUp}
          name={"name"}
          margin="0"
          InputLabelProps={{
            style: {
              color: "#ffffff",
              fontFamily: "Montserrat, sans-serif",
            },
          }}
          InputProps={{
            style: {
              color: "#ffffff",
              fontFamily: "Montserrat, sans-serif",
            },
          }}
        />
        <FormSample
          id="dob"
          label=""
          height="4rem"
          width="100%"
          type="date"
          generalcolor={"white"}
          fieldsetbgcolor={"white"}
          fieldsetborder={"2px solid white"}
          fieldsetborderradius={"5px"}
          value={signup.dob}
          onChange={setSignUp}
          name={"dob"}
          margin="0"
          InputLabelProps={{
            style: {
              color: "#ffffff",
              fontFamily: "Montserrat, sans-serif",
            },
          }}
          InputProps={{
            style: {
              color: "#ffffff",
              fontFamily: "Montserrat, sans-serif",
            },
          }}
        />
        <Typography
          onClick={() => setIsup(false)}
          sx={{
            fontSize: "1rem",
            textDecoration: "underline",
            color: "white",
            cursor:'pointer'
          }}
        >
          Or Sign in instead
        </Typography>
        <Button
          onClick={() => {
            handleSignup(event, "/api/auth/signup");
          }}
          sx={{
            backgroundColor: "#4cceac",
            "&:hover": {
              backgroundColor: "#4cceac",
            },
            textTransform: "none",
            color: "black",
            width: "80%",
            height: "50px",
          }}
        >
          <Typography variant="h4" color="black.main">
            Sign Up
          </Typography>
        </Button>
      </ContainerStyles>
    </ContainerStyles>
  );
};

export default Signup;
