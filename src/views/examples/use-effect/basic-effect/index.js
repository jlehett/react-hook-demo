import { useEffect, useState } from 'react';
import {
    Button,
    TextField,
} from '@mui/material';
import {
    logEntry,
    logInfo,
} from '@utils/logging';

/**
 * Example of using a basic effect.
 */
const BasicEffect = ({

}) => {
    
    // Track an arbitrary counter in state
    const [counter, setCounter] = useState(0);

    // Track a mock URL in state
    const [mockURL, setMockURL] = useState('');

    // Track a mocked fetched data variable in state
    const [mockFetchedData, setMockFetchedData] = useState(null);

    // Functon to mimic a long-running fetch operation
    const mockLongFetch = async () => {
        logInfo('Effect is running...');
        if (mockURL) {
            setTimeout(() => {
                setMockFetchedData(`${mockURL} w/ count of ${counter} successfully fetched!`);
            }, 2000);
        }
    };

    // Create an effect that runs whenever the mock URL updates to initiate the `mockLongFetch` function
    useEffect(mockLongFetch, [mockURL]);

    // Every time the component (re-)renders, log the new state variables
    logInfo('The component has (re-)rendered with the following state:');
    logEntry('counter', counter);
    logEntry('mockURL', mockURL);
    logEntry('mockFetchedData', mockFetchedData);

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
            <div className="column smallGap">
                <h1 className="noMargin">
                    <code>useEffect</code> Hook
                </h1>
                <h2 className="noMargin">
                    Overview
                </h2>
                <p>
                    The <code>useEffect</code> hook specifies an imperative "side effect" that should run as a result
                    of any updates to a list of dependencies that can be specified.
                </p>
                <p>
                    The effect will <i>always</i> run after the component first mounts and completes its first render,
                    and will then re-run anytime any of the variables in its list of dependencies receives an update.
                </p>
                <p>
                    This is helpful to maintain a separation of concerns in your code. Multiple <code>useEffect</code> hooks
                    can be used in a single component to perform some action whenever specific data has loaded,
                    without re-running actions whenever the relevant data hasn't changed, for instance.
                </p>
                <h2 className="noMargin">
                    React Rendering Pipeline Note
                </h2>
                <p>
                    The typical (simplified) React rendering pipeline goes:
                </p>
                <ol>
                    <li>Make DOM manipulations.</li>
                    <li>Browser repaints the DOM changes.</li>
                </ol>
                <p>
                    In the old class-based components, the <code>componentDidMount</code> function fell in like so:
                </p>
                <ol>
                    <li>Make DOM manipulations.</li>
                    <li className="primary"><code>componentDidMount</code> if this is the first render</li>
                    <li>Browser repaints the DOM changes.</li>
                </ol>
                <p>
                    In comparison, the <code>useEffect</code> hook falls in like so:
                </p>
                <ol>
                    <li>Make DOM manipulations.</li>
                    <li className="primary"><code>useLayoutEffect</code>s (will be discussed later)</li>
                    <li>Browser repaints the DOM changes.</li>
                    <li className="primary"><code>useEffect</code>s</li>
                </ol>
                <p>
                    As will be covered later, <code>useEffect</code> hooks can (and should) be used to
                    replace <code>componentDidMount</code> logic from class-based components. As such, it <i>may</i> be
                    important to note that the <code>useEffect</code> hook takes place in a different phase in the
                    rendering pipeline than the <code>componentDidMount</code> logic did.
                </p>
                <p>
                    In most cases, this new behavior is desired, as it prevents blocking the painting operation, and
                    delivers a smoother and more performant user experience. However, it can be nice to know that
                    the <code>useLayoutEffect</code> is available, if needed, to fill that same phase in the rendering
                    pipeline.
                </p>
                <h2 className="noMargin">
                    API
                </h2>
                <p>
                    The <code>useEffect</code> hook takes 2 parameters.
                </p>
                <p>
                    The first is the function that should be run as the "side effect" whenever any of the effect's
                    depedencies update.
                </p>
                <p>
                    The second is an array of dependencies. If any of these dependencies update, the effect will be
                    re-run. This dependencies array is optional, and if it is not specified, the effect will be run
                    after every completed render.
                </p>
                <h2 className="noMargin">
                    Example
                </h2>
            </div>
            <BasicEffect/>
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