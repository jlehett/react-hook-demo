import {
    useState,
    useEffect,
    useContext,
    createContext,
} from 'react';
import {
    Button,
} from '@mui/material';
import {
    logInfo,
} from '@utils/logging';

// Default theme definition
const defaultTheme = {
    foreground: '#F4743B', // orange
    background: '#483C46', // lighter gray
};

// Theme from provider
const providerTheme = {
    foreground: '#D9FFF5', // mint green
    background: '#1D1E18', // darker gray
};

// Example context tracking a theme
const ThemeContext = createContext(defaultTheme);

/**
 * Example of using a basic context.
 */
const BasicContext = ({

}) => {
    
    // Use the theme context
    const theme = useContext(ThemeContext);

    // Main render
    return (
        <div className="column">
            <p style={{ color: theme.foreground, background: theme.background, padding: '20px' }}>
                This is using the theme context!
            </p>
        </div>
    );
};

/**
 * Wrapper to provide the theme context.
 */
const Wrapper = () => {
    const [useProvider, setUseProvider] = useState(true);

    useEffect(() => {
        if (useProvider) {
            logInfo('Theme Provider is in use.');
        } else {
            logInfo('Theme Provider is not in use.');
        }
    }, [useProvider]);

    return (
        <>
            <div className="column smallGap">
                <h1 className="noMargin">
                    <code>useContext</code> Hook
                </h1>
                <h2 className="noMargin">
                    Creating a Context
                </h2>
                <p>
                    To use a context, a context must first be created with React's <code>createContext</code> function.
                    This function takes in one parameter, which is a default value for the created context.
                </p>
                <p>
                    The default value is what will be provided to components using the context if their tree doesn't have
                    a provider given for the context.
                </p>
                <p>
                    The return value from the <code>createContext</code> function is the context object that will be used
                    in providing the context and in using the context.
                </p>
                <h2 className="noMargin">
                    Providing the Context
                </h2>
                <p>
                    In order to provide the context, you must wrap the particular React tree of components that may want
                    to use the context in a Provider that comes from the created context. If you create the context like
                    so:
                </p>
                <code className="block">
                    const ThemeContext = createContext(defaultValue);
                </code>
                <p>
                    Then you can use the provider for the context like so:
                </p>
                <code className="block">
                    {`<ThemeContext.Provider value={valueToProvide}>`}
                    <br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;{`<div>`}
                    <br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{`<ComponentThatUsesContext/>`}
                    <br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;{`</div>`}
                    <br/>
                    {`</ThemeContext.Provider>`}
                </code>
                <p>
                    Where the <code>value</code> prop is the value that you would like to provide to any components
                    using the context in that tree.
                </p>
                <h2 className="noMargin">
                    Using the Context
                </h2>
                <p>
                    In order to use context in a functional component, you can use the <code>useContext</code> hook.
                    This hook accepts 1 parameter, which is the context object that was created via
                    the <code>createContext</code> function.
                </p>
                <p>
                    The return value for the <code>useContext</code> hook is the value of the context, which is either
                    the default value for the context if no Provider was found for the component's parent tree, or
                    the value from the nearest parent Provider of the context.
                </p>
                <h2 className="noMargin">
                    Example
                </h2>
            </div>
            {
                useProvider
                    ? (
                        <ThemeContext.Provider value={providerTheme}>
                            <BasicContext/>
                        </ThemeContext.Provider>
                    )
                    : <BasicContext/>
            }
            <div>
                <Button variant="contained" onClick={() => setUseProvider(prevState => !prevState)}>
                    { useProvider ? 'Remove Provider' : 'Use Provider' }
                </Button>
            </div>
        </>
    )
};

export default Wrapper;