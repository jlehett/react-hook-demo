import { useState } from 'react';
import { mockDelay } from '@unifire-js/storybook-utils';
import {
    Button,
} from '@mui/material';
import {
    logEntry,
    logInfo,
} from '@utils/logging';

/**
 * Example of state batching.
 */
const UpdateBatching = ({

}) => {
    
    // Track 2 counters with state.
    const [counter1, setCounter1] = useState(0);
    const [counter2, setCounter2] = useState(0);

    // Function to increment the specified counter
    const incrementCounter = (index) => {
        if (index === 1) {
            setCounter1(prevState => prevState + 1);
        } else if (index === 2) {
            setCounter2(prevState => prevState + 1);
        }

        logInfo(`The \`counter${index}\` variable has been updated.`);
    };

    // Function to increment both counters at the same time synchronously
    const incrementBothCounters = () => {
        incrementCounter(1);
        incrementCounter(2);
    };

    // Function to increment both counters asynchronously
    const asyncIncrementBothCounters = async () => {
        await mockDelay(300);
        incrementCounter(1);
        incrementCounter(2);
    };

    // Every time the component (re-)renders, log the new counter value
    logInfo('The component has (re-)rendered with the following state:');
    logEntry('counter1', counter1);
    logEntry('counter2', counter2);

    // Main render
    return (
        <div className="column childComponent">
            <div className="row centerAligned">
                <Button variant="contained" onClick={() => incrementCounter(1)}>
                    Increment Counter1
                </Button>
                <p>
                    Count: {counter1}
                </p>
            </div>
            <div className="row centerAligned">
                <Button variant="contained" onClick={() => incrementCounter(2)}>
                    Increment Counter2
                </Button>
                <p>
                    Count: {counter2}
                </p>
            </div>
            <div>
                <Button variant="contained" onClick={incrementBothCounters}>
                    Increment Both Counters
                </Button>
            </div>
            <div>
                <Button variant="contained" onClick={asyncIncrementBothCounters}>
                    Async Increment Both Counters
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
                <h1 className="noMargin">React State Update Batching</h1>
                <p>
                    When it can, React attempts to batch state updates. If state updates are occurring in a single
                    synchronous function, those updates will be batched to only trigger a single re-render that runs after
                    all state has been updated.
                </p>
                <p>
                    However, things can get wonky when using asynchronous functions -- and React may not be able to batch
                    those updates together. This is something to be aware of when setting state in async functions.
                </p>
            </div>
            <UpdateBatching/>
            <p>
                Trigger a re-render of the child component (above) to see what happens.
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