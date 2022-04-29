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

/**
 * Example of using a basic context.
 */
const ContextReader = () => {

    // Use the counter context
    const { counter } = useContext(CounterContext);

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

    // Use the counter context
    const { setCounter } = useContext(CounterContext);

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
        <CounterContext.Provider value={{ counter, setCounter }}>
            {children}
        </CounterContext.Provider>
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
                    Updating Context (More Performance Concerns)
                </h1>
                <p>
                    One issue that can come from using context for state management is that <i>any</i> change to the
                    context's value will trigger re-renders from all of that context's consumers, even if the consumer
                    is not affected by the particular part of the context value that updated.
                </p>
                <p>
                    For example, if you are using a context controlled via a <code>useState</code> hook, then the context
                    value is likely an object or array defining both the context value and the function to update the
                    context value.
                </p>
                <p>
                    If a consumer only needs to be able to set the context value, and never needs to read the value,
                    ideally, that consumer would not need to re-render whenever the context value updates. However, if
                    both the setter function and the value itself are stored in a single <code>Provider</code>, the
                    update to the context value will still trigger a re-render of the component that only relies on the
                    setter function from the context.
                </p>
                <p>
                    In the example below, the setter function and the state value are both provided via a
                    single <code>Provider</code>, causing the <code>ContextSetter</code> component to re-render whenever
                    it updates the context value, which is an unnecessary operation. 
                </p>
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