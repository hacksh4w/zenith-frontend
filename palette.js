import { createTheme } from '@mui/material';
import { styled } from '@mui/system';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
// import { makeStyles } from '@mui/styles';
const theme = createTheme({
  palette: {
    black: {
      main: '#161616',
      submain: '',
    },
    blue: {
      lighter: '#3DBAC1',
      light: '#258EC9 ',
      main: '#3340C4',
      dark: '',
      darker: '',
      mix:''
    },
    purple: {
      lighter:'#8B7FBD f',
      main :'#4E24C9',
      dark: '#381D8A',
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
