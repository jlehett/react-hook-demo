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
    };

    // Function to increment the counter
    const incrementCounter = () => {
        counter++;
        logInfo(`The \`counter\` variable is set to ${counter}.`);
    };

    // Every time the component (re-)renders, log the new counter value
    logInfo(`The \`counter\` variable has reset to ${counter}.`);

    // Main render
    return (
        <>
            <div>
                <h1>Without State</h1>
                <p>
                    React uses state to determine when to re-render components. Variables tracked outside of a component's
                    state will not trigger re-renders when they change.
                </p>
            </div>
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
        </>
    );
};

export default NoState;