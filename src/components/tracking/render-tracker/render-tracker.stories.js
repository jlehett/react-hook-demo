import { useState } from 'react';
import {
    setAsCategory
} from '@unifire-js/storybook-utils';
import RenderTracker from './render-tracker';

// Construct the argTypes object
const argTypes = {};

// Storybook default export
export default {
    title: 'Tracking/RenderTracker',
    component: RenderTracker,
    argTypes,
};

const Template = (args) => {
    const [counter, setCounter] = useState(0);

    

    return <RenderTracker {...args}/>;
};

// Basic Demo
export const Basic = Template.bind({});
Basic.args = {

};