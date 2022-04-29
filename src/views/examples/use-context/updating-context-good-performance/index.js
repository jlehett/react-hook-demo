import {
    useState,
    useEffect,
    useContext,
    createContext,
} from 'react';
import {
    Button,
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
    logInfo('Basic Context component has (re-)rendered with the following theme values:')
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
 * Custom provider.
 */
const MyProvider = ({ children }) => {
    // Track provider value in state
    const [theme, setTheme] = useState(defaultTheme);

    return (
        <ThemeContext.Provider value={[theme, setTheme]}>
            {children}
        </ThemeContext.Provider>
    );
};

/**
 * Wrapper to provide the theme context.
 */
const Wrapper = () => {

    return (
        <>
            <div className="column smallGap">
                <h1 className="noMargin">
                    Updating Context (Good Performance)
                </h1>
                <p>
                    As noticed in the previous example, the <code>{`<NoContextUse/>`}</code> component was still
                    re-rendering whenever the context updated, even though it doesn't use the context. This is
                    because we are using the <code>useState</code> hook in the <code>Wrapper</code> component which
                    triggers a re-render of the <code>Wrapper</code> component whenever the state changes.
                </p>
                <p>
                    This re-render causes the <code>Wrapper</code>'s <code>return</code> statement to re-run, where
                    the child components are directly referenced. Due to how React diffs and memoizes renders, any
                    children in the <code>return</code> statement of functional components receive an update whenever
                    the component re-renders.
                </p>
                <p>
                    The solution here is to define a custom <code>Provider</code> wrapper whenever you'd like to have
                    some context controlled via a <code>useState</code> hook. The Provider wrapper must take
                    in <code>children</code> as at least one of its props, have the <code>useState</code> hook control
                    defined in itself, provide the context's <code>Provider</code>, and render the children within
                    the <code>Provider</code>, which causes React to properly diff and memoize things.
                </p>
                <p>
                    The custom wrapper should look something like this:
                </p>
                <code className="block">
                    {`const MyProvider = ({ children }) => {`}
                    <br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;{`const [theme, setTheme] = useState(defaultValue);`}
                    <br/><br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;{`return (`}
                    <br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{`<ThemeContext.Provider value={[theme, setTheme]}>`}
                    <br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{`{children}`}
                    <br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{`</ThemeContext.Provider>`}
                    <br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;{`);`}
                    <br/>
                    {`};`}
                </code>
                <p>
                    It is <i>very</i> important to note that anything rendered within the
                    context <code>Provider</code> in this wrapper <i>other than</i> the <code>children</code> prop
                    will always be re-rendered on <i>any</i> update to the state, which can cause performance issues.
                </p>
                <p>
                    In the example, below, the custom Provider wrapper is preventing the <code>NoContextUse</code> child
                    component from re-rendering whenever the context state changes, since it does not use that context
                    value.
                </p>
                <h2 className="noMargin">
                    Example
                </h2>
            </div>
            <div className="column">
                <MyProvider>
                    <ThemeChanger/>
                    <BasicContext/>
                    <NoContextUse/>
                </MyProvider>
            </div>
        </>
    );
};

export default Wrapper;