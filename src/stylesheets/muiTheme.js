import { createTheme } from '@mui/material/styles';
import colors from '../stylesheets/colors.styles.scss';

const theme = createTheme({
    palette: {
        primary: {
            main: '#000',
            contrastText: '#fff',
        }
    },
});

export default theme;