import { Outlet } from 'react-router-dom';
import '@stylesheets/main.scss';
import {
    ThemeProvider,
    StyledEngineProvider,
} from '@mui/material/styles';
import { useUserContextProvider } from '@unifire-js/firebase/auth';
import muiTheme from '@stylesheets/muiTheme';

const App = ({}) => {
    const UserContextProvider = useUserContextProvider();

    return (
        <UserContextProvider>
            <StyledEngineProvider injectFirst>
                <ThemeProvider theme={muiTheme}>
                    Example App
                    <Outlet/>
                </ThemeProvider>
            </StyledEngineProvider>
        </UserContextProvider>
    );
};

export default App;
