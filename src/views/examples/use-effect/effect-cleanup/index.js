import { useEffect, useState, useRef } from 'react';
import {
    Button,
    TextField,
} from '@mui/material';
import {
    logInfo,
} from '@utils/logging';

/**
 * Example of using an effect cleanup.
 */
const EffectCleanup = ({

}) => {
    
    // IGNORE FOR NOW
    const effectTimeoutRef = useRef();

    // Track an arbitrary counter in state
    const [counter, setCounter] = useState(0);

    // Track a mock URL in state
    const [mockURL, setMockURL] = useState('');

    // Track a mocked fetched data variable in state
    const [mockFetchedData, setMockFetchedData] = useState(null);

    // Function to mimic a long-running fetch operation
    const mockLongFetch = () => {
        logInfo('Effect is running...');
        if (mockURL) {
            effectTimeoutRef.current = setTimeout(() => {
                logInfo('Setting mocked fetched data...')
                setMockFetchedData(`${mockURL} w/ count of ${counter} successfully fetched!`);
            }, 2000);
        }
        // Cleanup function
        return () => {
            logInfo('Effect is being cleaned up...');
            if (effectTimeoutRef.current) {
                clearTimeout(effectTimeoutRef.current);
                effectTimeoutRef.current = null;
            }
        }
    };

    // Create an effect that runs whenever the mock URL updates to initiate the `mockLongFetch` function
    useEffect(mockLongFetch, [mockURL]);

    // Main render
    return (
        <div className="column childComponent">
            <div className="row centerAligned">
                <Button variant="contained" onClick={() => setCounter(prevState => prevState + 1)}>
                    Increment Count
                </Button>
                <p>
                    Count: {counter}
                </p>
            </div>
            <div className="row centerAligned">
                <TextField
                    variant="outlined"
                    label="Mock URL"
                    onChange={(event) => setMockURL(event.target.value)}
                />
                <p>
                    Result: {mockFetchedData}
                </p>
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
                <h1><code>useEffect</code> Cleanup</h1>
                <p>
                    Returning a function from the callback function that is passed as the first param
                    to <code>useEffect</code> will tell the effect to call that returned function to "clean up" the effect
                    before the effect is about to be run again or before the component unmounts.
                    <br/><br/>
                    This can be helpful if subscriptions need to be cancelled / re-created whenever specific data updates,
                    or if asynchronous effects need to be cancelled before the next asynchronous effect is initiated.
                </p>
            </div>
            <EffectCleanup/>
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