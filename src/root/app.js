import { Outlet } from 'react-router-dom';
import '@stylesheets/main.scss';
import '@stylesheets/typography.scss';
import '@stylesheets/common-ui.scss';
import '@stylesheets/mixins.scss';
import {
    ThemeProvider,
    StyledEngineProvider,
} from '@mui/material/styles';
import muiTheme from '@stylesheets/muiTheme';

const App = ({}) => {

    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={muiTheme}>
                <Outlet/>
            </ThemeProvider>
        </StyledEngineProvider>
    );
};

export default App;
