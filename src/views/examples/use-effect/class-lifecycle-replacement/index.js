import { useEffect, useState, useRef } from 'react';
import {
    Button,
} from '@mui/material';
import {
    logEntry,
    logInfo,
} from '@utils/logging';

/**
 * Example of using an effect to replace class lifecycle methods.
 */
const ClassLifecycleReplacement = ({

}) => {
    
    // IGNORE FOR NOW
    const effectTimeoutRef = useRef();

    // Track an arbitrary counter in state
    const [counter, setCounter] = useState(0);

    // Track a mocked fetched data variable in state
    const [mockFetchedData, setMockFetchedData] = useState(null);

    // Track a mocked synchronous data variable in state
    const [mockData, setMockData] = useState(null);

    // Function to mimic a long-running fetch operation
    const mockLongFetch = () => {
        logInfo('Component mounted...');
        effectTimeoutRef.current = setTimeout(() => {
            logInfo('Setting mocked fetched data...')
            setMockFetchedData(`Mocked data fetched!`);
        }, 2000);
        // Cleanup function
        return () => {
            logInfo('Component unmounting...');
            if (effectTimeoutRef.current) {
                clearTimeout(effectTimeoutRef.current);
                effectTimeoutRef.current = null;
            }
        }
    };

    // componentDidMount and componentWillUnmount replacement
    useEffect(mockLongFetch, []);
    
    useEffect(() => {
        setMockData('Synchronous data set!');
    }, []);

    // Log on every (re-)render
    logInfo('The component has (re-)rendered with the following state:');
    logEntry('counter', counter);
    logEntry('mockFetchedData', mockFetchedData);
    logEntry('mockData', mockData);

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
            <p>
                Sync Result: {mockData}
            </p>
            <p>
                Async Result: {mockFetchedData}
            </p>
        </div>
    );
};

/**
 * Wrapper -- ignore WHAT it does with state, for now.
 */
const Wrapper = () => {
    const [anotherCounter, setAnotherCounter] = useState(0);
    const [childComponentOpen, setChildComponentOpen] = useState(true);

    const triggerRerender = () => {
        setAnotherCounter(prevState => prevState + 1);
        logInfo('Triggered Re-Render...');
    };

    return (
        <>
            <div>
                <h1>Class-Based Component Lifecycle Replacements</h1>
                <p>
                    The <code>useEffect</code> hook can be used to replace the <code>componentDidMount</code> and
                    the <code>componentWillUnmount</code> logic found in class-based components by providing an empty
                    dependencies array.
                    <br/><br/>
                    By passing an empty dependencies array, you tell the effect to run when the component mounts and
                    renders successfully for the first time, and then since the dependencies array is empty, it will
                    never be run again (since no dependency would ever be updated). By returning a cleanup function,
                    you can thus also mimic any <code>componentWillUnmount</code> logic.
                </p>
            </div>
            {
                childComponentOpen
                    ? <ClassLifecycleReplacement/>
                    : null
            }
            <div>
                {
                    childComponentOpen
                        ? <Button variant="contained" onClick={() => setChildComponentOpen(false)}>Unmount Child</Button>
                        : <Button variant="contained" onClick={() => setChildComponentOpen(true)}>Mount Child</Button>
                }
            </div>
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