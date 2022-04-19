import { useState } from 'react';
import {
    Button,
} from '@mui/material';
import {
    logInfo,
} from '@utils/logging';

/**
 * Example of using simple state.
 */
const SimpleState = ({

}) => {
    
    // Track a counter with state
    const [counter, setCounter] = useState(0);

    // Function to compute double the counter and log it (but not modify the counter variable)
    const logCounterDoubled = () => {
        logInfo(`\`counter\` * 2 = ${counter * 2}`);
    }

    // Function to increment the counter
    const incrementCounter = () => {
        setCounter((prevState) => {
            return prevState + 1;
        });
    };

    // Every time the component (re-)renders, log the counter value
    logInfo(`The component (re-)rendered and the \`counter\` variable is set to ${counter}.`);

    // Main render
    return (
        <div className="column childComponent">
            <div className="row centerAligned">
                <Button variant="contained" onClick={incrementCounter}>
                    Increment Count
                </Button>
                <p>
                    Count: {counter}
                </p>
            </div>
            <div>
                <Button variant="contained" onClick={logCounterDoubled}>
                    Compute Counter * 2
                </Button>
            </div>
        </div>
    );
};

/**
 * Wrapper -- ignore WHAT it does with state, for now.
 */
const Wrapper = () => {
    const [anotherCounter, setAnotherCounter] = useState(0);

    const triggerRerender = () => {
        setAnotherCounter(prevState => prevState + 1);
        logInfo('Triggered Re-Render...');
    };

    return (
        <>
            <div className="column smallGap">
                <h1 className="noMargin">
                    <code>useState</code> Hook
                </h1>
                <h2 className="noMargin">
                    Overview
                </h2>
                <p>
                    Hooks, in general, provide a way to <i>not</i> have every line of a functional component run on every
                    re-render.
                </p>
                <p>
                    The <code>useState</code> hook provides an API for setting variables that can trigger re-renders,
                    and do <i>not</i> get reset with every re-render.
                </p>
                <h2 className="noMargin">
                    API
                </h2>
                <p>
                    The <code>useState</code> hook takes in 1 parameter, which is the initial value that the state will
                    be set to when first initialized.
                </p>
                <p>
                    The <code>useState</code> hook returns an array of length 2, where the first index contains a variable
                    representing the state's current value, and the second index contains a function for updating
                    the state's value.
                </p>
                <p>
                    Why an array? Because it can be destructured with custom names (unlike an object, which must use the
                    defined property names) like so:
                </p>
                <code className="block">
                    const [counter, setCounter] = useState(0);
                    <br/><br/>
                    const [anotherCounter, setAnotherCounter] = useState(0);
                </code>
                <p>
                    The setting function (second index of the returned array) takes in 1 of 2 possible parameters. If the
                    given parameter is a function, that function should take in a parameter, <code>prevState</code>, which
                    represents the previous value in state at the time the setting function was called, and the function should
                    return the value that should be stored in state next.
                </p>
                <p>
                    If the given parameter is of any other type, that value is what the state is set to next.
                </p>
                <p>
                    The <code>prevState</code> callback function parameter should almost always be used if the new state relies
                    on the previous state. Possible errors can arise from outdated data if you try to use the state directly
                    to influence the next state value.
                </p>
                <p>
                    So, if you need to use the previous state, always use the <code>prevState</code> callback like:
                </p>
                <code className="block">
                    {
                        `setCounter((prevState) => {
                            return prevState + 1;
                        })`
                    }
                </code>
                <p>
                    Instead of trying to use the state directly like:
                </p>
                <code className="block">
                    setCounter(counter + 1);
                </code>
                <h2 className="noMargin">
                    Simple Example
                </h2>
            </div>
            <SimpleState/>
            <p>
                Trigger a re-render of the child component (above) to see what happens to the <code>counter</code> variable.
            </p>
            <div>
                <Button variant="contained" onClick={triggerRerender}>
                    Trigger re-render of children.
                </Button>
            </div>
        </>
    )
};

export default Wrapper;