import {
    useState,
    useContext,
    createContext,
} from 'react';
import {
    Button,
} from '@mui/material';
import {
    logInfo,
} from '@utils/logging';

// Example context tracking a simple counter
const CounterContext = createContext();

// Example context tracking the setCounter function
const SetCounterContext = createContext();

/**
 * Example of using a basic context.
 */
const ContextReader = () => {

    // Use the counter context
    const counter = useContext(CounterContext);

    // Log whenever the component (re-)renders
    logInfo('ContextReader component has (re-)rendered.');

    // Main render
    return (
        <div className="column">
            <p>
                Count: {counter}
            </p>
        </div>
    );
};

// Function to update the context
const ContextSetter = () => {

    // Use the set counter context
    const setCounter = useContext(SetCounterContext);

    // Log whenever the component (re-)renders
    logInfo('ContextSetter component has (re-)rendered.');

    // Render the text fields for updating the theme
    return (
        <div>
            <Button variant="contained" onClick={() => setCounter(prevState => prevState + 1)}>
                Increment Count
            </Button>
        </div>
    );
};

/**
 * Custom provider.
 */
const MyProvider = ({ children }) => {
    // Track provider value in state
    const [counter, setCounter] = useState(0);

    return (
        <SetCounterContext.Provider value={setCounter}>
            <CounterContext.Provider value={counter}>
                {children}
            </CounterContext.Provider>
        </SetCounterContext.Provider>
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
                    Updating Context (Splitting Setter and Value)
                </h1>
                <h2 className="noMargin">
                    Solution Overview
                </h2>
                <p>
                    One way to negate this performance concern is to keep individual context's as small as possible.
                    When working with <code>useState</code>-controlled context's, specifically, it can make sense to
                    split the context into separate setter and value contexts that consumers can subscribe to, as needed.
                </p>
                <p>
                    First, two separate contexts should be created for a <code>useState</code>-controlled context, like
                    so:
                </p>
                <code className="block">
                    const CounterContext = createContext();
                    <br/>
                    const SetCounterContext = createContext();
                </code>
                <p>
                    Then, when creating the provider wrapper, you just need to add both providers, like so:
                </p>
                <code className="block">
                    {`const MyProvider = ({ children }) => {`}
                    <br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;{`const [counter, setCounter] = useState(0);`}
                    <br/><br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;{`return (`}
                    <br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{`<SetCounterContext.Provider value={setCounter}>`}
                    <br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{`<CounterContext.Provider value={counter}>`}
                    <br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{`{children}`}
                    <br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{`</CounterContext.Provider>`}
                    <br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{`</SetCounterContext.Provider>`}
                    <br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;{`);`}
                    <br/>
                    {`};`}
                </code>
                <p>
                    Then, a consumer component that needs to read the value can do so like this:
                </p>
                <code className="block">
                    const counter = useContext(CounterContext);
                </code>
                <p>
                    And a consumer component that only needs to set the value can do so like this:
                </p>
                <code className="block">
                    const setCounter = useContext(SetCounterContext);
                </code>
                <p>
                    And the reader component will perform the necessary re-renders while the setter component will
                    not re-render whenever the context value updates.
                </p>
                <h2 className="noMargin">
                    Note
                </h2>
                <p>
                    While this may seem like a lot of boilerplate, a lot of this can be abstracted away to simple API
                    that looks something like this (we have this solution on Webview, currently):
                </p>
                <code className="block">
                    // Create a counter context
                    <br/>
                    const CounterContext = createContextSlice(0);
                    <br/>
                    // Create a theme context
                    <br/>
                    const ThemeContext = createContextSlice(defaultTheme);
                </code>
                <p>
                    Where the <code>createContextSlice</code> would split the setter and value into separate contexts,
                    with separate providers, but grouped under a single custom <code>Provider</code> component which
                    uses the 2 separate context providers.
                </p>
                <code className="block">
                    // Create a single combined provider comprised of all providers
                    <br/>
                    // that should be exposed at a certain level of the app
                    <br/>
                    const AppLevelProvider = combineContextProviders(
                    <br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;CounterContext.Provider,
                    <br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;ThemeContext.Provider,
                    <br/>
                    );
                </code>
                <p>
                    Where the combined provider can be provided at the appropriate level of an app like so:
                </p>
                <code className="block">
                    {`<AppLevelProvider>`}
                    <br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;{`{children}`}
                    <br/>
                    {`</AppLevelProvider>`}
                </code>
                <p>
                    And then consumers can use either the value like so:
                </p>
                <code className="block">
                    const counter = CounterContext.useContext();
                    <br/>
                    const theme = ThemeContext.useContext();
                </code>
                <p>
                    Or they can use the setter function like so:
                </p>
                <code className="block">
                    const setCounter = CounterContext.useContextAPI();
                    <br/>
                    const setTheme = ThemeContext.useContextAPI();
                </code>
                <h2 className="noMargin">
                    Example
                </h2>
            </div>
            <div className="column">
                <MyProvider>
                    <ContextReader/>
                    <ContextSetter/>
                </MyProvider>
            </div>
        </>
    );
};

export default Wrapper;