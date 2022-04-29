import {
    useState,
    useContext,
    createContext,
} from 'react';
import {
    TextField,
} from '@mui/material';
import {
    logInfo,
    logEntry,
} from '@utils/logging';

// Default theme definition
const defaultTheme = {
    foreground: '#F4743B', // orange
    background: '#483C46', // lighter gray
};

// Example context tracking a theme
const ThemeContext = createContext(defaultTheme);

/**
 * Example of using a basic context.
 */
const BasicContext = () => {
    
    // Use the theme context
    const [theme, setTheme] = useContext(ThemeContext);

    // Log whenever the component (re-)renders
    logInfo('BasicContext component has (re-)rendered with the following theme values:')
    logEntry('foreground', theme.foreground);
    logEntry('background', theme.background);

    // Main render
    return (
        <div className="column">
            <p style={{ color: theme.foreground, background: theme.background, padding: '20px' }}>
                This is using the theme context!
            </p>
        </div>
    );
};

// Function to update the context
const ThemeChanger = () => {
    
    // Use the theme context
    const [theme, setTheme] = useContext(ThemeContext);

    // Track foreground and background inputs in state
    const [foreground, setForeground] = useState(theme.foreground);
    const [background, setBackground] = useState(theme.background);

    // Function for updating either foreground or background when input changes
    const onInputChanged = (inputName, value) => {
        const hexRegex = /^#(?:[0-9a-fA-F]{3}){1,2}$/g;

        // Get the desired set input function based on input name
        const setInputFn = inputName === 'foreground' ? setForeground : setBackground;

        // Always update the input value
        setInputFn(value);

        // Only update the theme context if the value matches the hex regex
        if (value.match(hexRegex)) {
            setTheme((prevState) => ({
                ...prevState,
                [inputName]: value,
            }));
        }
    };

    // Render the text fields for updating the theme
    return (
        <div className="column">
            <TextField
                label="Foreground Color"
                variant="outlined"
                value={foreground}
                onChange={(event) => onInputChanged('foreground', event.target.value)}
            />
            <TextField
                label="Background Color"
                variant="outlined"
                value={background}
                onChange={(event) => onInputChanged('background', event.target.value)}
            />
        </div>
    );
};

// Component which has nothing to do with the context
const NoContextUse = () => {
    
    // Log whenever the component (re-)renders
    logInfo('The NoContextUse component has (re-)rendered.');

    // Render function
    return (
        <div style={{ border: '1px solid black', padding: '20px' }}>
            <p>This particular component does not use context.</p>
        </div>
    );
};

/**
 * Wrapper to provide the theme context.
 */
const Wrapper = () => {
    // Track provider value in state
    const [theme, setTheme] = useState(defaultTheme);

    return (
        <>
            <div className="column">
                <h1 className="noMargin">
                    Updating Context
                </h1>
                <p>
                    Since context can hold any value, we can hook it up to a React state to be able to both use the
                    context value and <i>set</i> the context value from components consuming the context.
                </p>
                <p>
                    To do so, we first need to use the <code>useState</code> hook to create state that can be controlled
                    via the context, like so:
                </p>
                <code className="block">
                    const [theme, setTheme] = useState(defaultValue);
                </code>
                <p>
                    Then, we can define the provider's value to be the same array that the <code>useState</code> hook
                    provides, like so:
                </p>
                <code className="block">
                    {`<ThemeContext.Provider value={[theme, setTheme]}`}
                    <br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;{`<ComponentUsingContext/>`}
                    <br/>
                    {`</ThemeContext.Provider>`}
                </code>
                <p>
                    From there, the component using the context can treat the <code>useContext</code> hook almost like
                    a <code>useState</code> hook -- but with the state propagating to all consumers of the context provider.
                </p>
                <code className="block">
                    const [theme, setTheme] = useContext(ThemeContext);
                </code>
                <h2 className="noMargin">
                    Example
                </h2>
            </div>
            <div className="column">
                <ThemeContext.Provider value={[theme, setTheme]}>
                    <ThemeChanger/>
                    <BasicContext/>
                    <NoContextUse/>
                </ThemeContext.Provider>
            </div>
        </>
    )
};

export default Wrapper;