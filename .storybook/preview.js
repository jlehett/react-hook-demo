import '@storybook/addon-console';
import { ThemeProvider } from '@mui/material/styles';
import { StyledEngineProvider } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import theme from '@stylesheets/muiTheme';
import '@stylesheets/main.scss';

export const decorators = [
    (Story) => (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
                <Story/>
            </ThemeProvider>
        </StyledEngineProvider>
    ),
    (Story) => (
        <BrowserRouter>
            <Story/>
        </BrowserRouter>
    ),
];

export const parameters = {
    layout: 'fullscreen',
    controls: {
        expanded: true,
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
    viewport: {
        viewports: {
            phoneSmall: {
                name: 'iPhone SE',
                styles: {
                    width: '375px',
                    height: '667px',
                },
            },
            matSmall: {
                name: 'Material Small',
                styles: {
                    width: '600px',
                    height: '600px',
                },
            },
            matMedium: {
                name: 'Material Medium',
                styles: {
                    width: '960px',
                    height: '960px',
                },
            },
            matLarge: {
                name: 'Material Large',
                styles: {
                    width: '1280px',
                    height: '600px',
                },
            },
            matExtraLarge: {
                name: 'Material Extra Large',
                styles: {
                    width: '1920px',
                    height: '1080px',
                },
            },
        },
    },
};