import React, { useState } from "react";
import { ContainerStyles } from "../../palette";
import authimage from "../assets/authimage.jpg";
import { useImageSize } from "react-image-size";
import { Box, Typography } from "@mui/material";
import FormSample from "../components/FormSample";
const Auth = () => {
  const [dimensions, { loading, error }] = useImageSize(authimage);
  const aspectRatio =
    error === null ? Number(dimensions?.height) / Number(dimensions?.width) : 0;
  const [signin, setSignIn] = useState();
  const [signup, setSignUp] = useState();
  return (
    <ContainerStyles
      sx={{
        minWidth: "100vw",
        minHeight: "100vh",
        backgroundColor:'black.main'
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
          }}
        />
        {/* sign in  */}
        <ContainerStyles
          sx={{
            minHeight: "50vh",
            minWidth: { xs: "95vw", md: "30vw" },
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h3" sx={{ color: "blue" }}>
            Sign in!!
          </Typography>
        </ContainerStyles>
      </ContainerStyles>
    </ContainerStyles>
  );
};

export default Auth;
