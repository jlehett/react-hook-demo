import { useState } from 'react';
import {
    Button,
} from '@mui/material';
import {
    logInfo,
} from '@utils/logging';

/**
 * Example of not using state.
 */
const NoState = ({

}) => {
    
    // Track a counter w/o state
    let counter = 0;

    // Function to compute double the counter and log it (but not modify the counter variable)
    const logCounterDoubled = () => {
        logInfo(`\`counter\` * 2 = ${counter * 2}`);
    }

    // Function to increment the counter
    const incrementCounter = () => {
        counter++;
        logInfo(`The \`counter\` variable is set to ${counter}.`);
    };

    // Every time the component (re-)renders, log the new counter value
    logInfo(`The \`counter\` variable has reset to ${counter}.`);

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
            <div>
                <h1>Re-Rendering Effects on Local Variables</h1>
                <p>
                    When a React component re-renders, if not considering any hooks within the
                    function, <i>everything</i> within that component will be re-run.
                </p>
            </div>
            <NoState/>
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