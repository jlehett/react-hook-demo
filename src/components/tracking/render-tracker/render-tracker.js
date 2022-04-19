import { useRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import localStyles from './render-tracker.styles.scss';

/**
 * Tracker that tracks the number of times it has re-rendered.
 */
const RenderTracker = ({

}) => {
    /*********
     * HOOKS *
     *********/

    /**
     * Track the number of times the component has rendered.
     */
    const renderCountRef = useRef(0);

    /**
     * Track a reference to the given render tracker string.
     */
    const renderStringElRef = useRef();

    console.log('Test');

    /*************
     * FUNCTIONS *
     *************/

    /********************
     * RENDER FUNCTIONS *
     ********************/

    // Whenever the component re-renders, increment the render count and set the counter string
    renderCountRef.current++;
    renderStringElRef.current ? renderStringElRef.current.innerHTML = renderCountRef.current : null;

    /**
     * Main render.
     */
    return (
        <div>
            <p ref={renderStringElRef}></p>
        </div>
    );
};

RenderTracker.propTypes = {

};

RenderTracker.defaultProps = {

};

export default RenderTracker;