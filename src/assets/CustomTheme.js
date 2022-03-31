import { createTheme } from '@mui/material/styles';
import { purple } from '@mui/material/colors';

const primaryColor = purple[600]


const CustomTheme = createTheme({
  palette: {
    primary: {
      main: primaryColor,
      darker: '#053e85',
    },
    secondary:{
        main:'#009688',
    },
     navBtnColor: {
      main:'#00000',
      darker:'#424242',
      contrastText:"White",
    },
  },
  components:{
    MuiCardHeader:{
      styleOverrides: {
        root:{     
       maxHeight:"6.5vh",
       minHeight:"6.5vh" 
      }
      },
    }
  }
});

export default CustomTheme