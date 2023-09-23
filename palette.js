import { createTheme } from '@mui/material';
import { styled } from '@mui/system';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
// import { makeStyles } from '@mui/styles';
const theme = createTheme({
  palette: {
    white: {
      main: '',
      submain: '',
    },
    green: {
      lighter: '',
      light: '',
      main: '',
      dark: '',
      darker: '',
      mix:''
    },
    orange: {
      lighter:'',
      main: '',
    },
    brown:{
      main:''
    }
  },
  typography: {
    fontFamily: "'Montserrat', sans-serif",
    h1: {
      fontSize: '4rem',
      '@media (max-width:900px)': {
        fontSize: '3rem',
      },
      '@media (max-width:450px)': {
        fontSize: '2.5rem',
      },
      fontWeight: '500',
    },
    h2: {
      fontSize: '3rem',
      fontWeight: '500',
    },
    h3: {
      fontSize: '2.5rem',
      fontWeight: '400',
    },
    h4:{
      fontSize:'1.25rem',
      fontWeight:'400',
    },
    body1: {
      fontSize: '1rem',
      color: 'green.dark',
      fontWeight: '300',
    },
    // navlinks
    body2: {
      fontSize: '1.25rem',
      fontWeight: '300',
      color: 'green.main',
    },
  },
});
const ContainerStyles = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection:'column'
})
const StyledTypography = styled(Typography)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection:'column'
})
const StyledButton = styled(Button)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection:'row'
})
export { ContainerStyles, StyledTypography, StyledButton };
export default theme;
