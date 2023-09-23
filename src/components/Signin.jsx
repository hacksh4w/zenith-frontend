import React from "react";
import { ContainerStyles } from "../../palette";
import { Box, Typography, Button } from "@mui/material";
import FormSample from "./FormSample";

const Signin = ({ handleSignin, setSignIn, signin, isup, setIsup }) => {
  return (
    <ContainerStyles
      sx={{
        minHeight: "40vh",
        minWidth: { xs: "95vw", md: "30vw" },
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Typography variant="h3" sx={{ color: "white" }}>
        Sign in!!
      </Typography>
      <form
        method="post"
        onSubmit={() => {
          handleSignin(event, "/api/auth/login");
        }}
        style={{
          width: "100%",
          minHeight: "30vh",
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
          value={signin.email}
          onChange={setSignIn}
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
          value={signin.password}
          onChange={setSignIn}
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
        <Typography
          onClick={() => setIsup(true)}
          sx={{
            fontSize: "1rem",
            textDecoration: "underline",
            color: "white",
          }}
        >
          Or Sign up instead
        </Typography>
        <Button
          type="submit"
          sx={{
            backgroundColor: "white",
            "&:hover": {
              backgroundColor: "white",
            },
            textTransform: "none",
            color: "black",
            width: "80%",
            height: "50px",
          }}
        >
          <Typography variant="h4" color="black.main">
            Sign In
          </Typography>
        </Button>
      </form>
    </ContainerStyles>
  );
};

export default Signin;
