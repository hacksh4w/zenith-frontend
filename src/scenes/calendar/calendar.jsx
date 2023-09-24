import { useState } from "react";
// import FullCalendar, { formatDate } from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import timeGridPlugin from "@fullcalendar/timegrid";
// import interactionPlugin from "@fullcalendar/interaction";
// import listPlugin from "@fullcalendar/list";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
  Button,
} from "@mui/material";
import { useContext } from "react";
import { ThemeContext } from "../../contexts/ContextApi";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import { ContainerStyles } from "../../../palette";
// import { useState } from "react";
import FormSample from "../../components/FormSample";
import axios from "axios";
const Calendar = () => {
  const { setCookie, cookies } = useContext(ThemeContext);
  const authToken = cookies.AuthToken;
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [chat, setChat] = useState([
    {bot:'Hello there!!, give me a prompt'}
  ]);
  const [user, setUser] = useState({
    user: "",
  });
  async function handleSubmit(event) {
    event.preventDefault();
    setChat((preValue) => {
      return (
        [
            ...preValue, 
            {person: user.user}
        ]
      );
    });
    setUser({
        user:''
      })
    // console.log(chat)
    // console.log(user)
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_SERVERURL}/api/urge`,
        { userItem: user.user },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken.token}`,
          },
        }
      );
      const reply = response.data;
      setChat((preValue) => {
        return (
          [
              ...preValue, 
              {bot: `It is a ${reply}`}
          ]
        );
      });
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <Box m="20px">
      <Header
        title="Chatbot"
        subtitle="Ask whether if it is a want or a need!"
      />
      <Box display="flex" justifyContent="space-between">
        <ContainerStyles
          sx={{
            height: "75vh",
            width: "80vw",
          }}
        >
          <form
            method="post"
            onSubmit={handleSubmit}
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                height: "50vh",
                width: "100%",
                padding: "50px",
              }}
            >
              {chat.map((value, index) => {
                const keys = Object.keys(value);
                if (keys[0] === "bot") {
                  return (
                    <Box
                      sx={{
                        width: "100%",
                        alignItems: "center",
                        height: "2.5rem",
                        justifyContent: "flex-start",
                      }}
                    >
                      <Typography sx={{ color: "white", fontSize: "1.5rem", textAlign:'left' }}>
                        {value.bot}
                      </Typography>
                    </Box>
                  );
                }
                if (keys[0] === "person") {
                  return (
                    <Box
                      sx={{
                        width: "100%",
                        alignItems: "flex-end",
                        height: "2.5rem",
                        justifyContent: "flex-end",
                      }}
                    >
                      <Typography sx={{ color: "white", fontSize: "1.5rem", textAlign:'right' }}>
                        {value.person}
                      </Typography>
                    </Box>
                  );
                }
              })}
            </Box>
            <FormSample
              req={true}
              id="title"
              label="Enter One Word Prompt"
              height="2.5rem"
              width="100%"
              // type="number"
              generalcolor={"#fff"}
              fieldsetbgcolor={"transparent"}
              fieldsetborder={"2px solid white"}
              fieldsetborderradius={"5px"}
              InputLabelProps={{
                style: {
                  color: "#ffffff",
                  fontStyle: "montserrat",
                  fontSize: "0.8rem",
                },
              }}
              InputProps={{
                style: {
                  color: "#ffffff",
                  fontStyle: "montserrat",
                  fontSize: "1rem",
                },
              }}
              value={user.user}
              onChange={setUser}
              name="user"
              margin="0"
            />
            <Button
              type="submit"
              sx={{
                backgroundColor: "#43b1b6",
                "&:hover": {
                  backgroundColor: "#43b1b6",
                },
                textTransform: "none",
                width: "10rem",
                height: "3rem",
              }}
            >
              <Typography
                sx={{
                  color: "black.main",
                  fontSize: "1.2rem",
                }}
              >
                Submit
              </Typography>
            </Button>
          </form>
        </ContainerStyles>
      </Box>
    </Box>
  );
};
export default Calendar;
