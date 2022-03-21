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
    JorColor: {
      main:'#009688',
    },
  },
});

export default CustomTheme