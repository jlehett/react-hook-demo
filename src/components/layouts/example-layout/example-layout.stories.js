import {
    setAsCategory
} from '@unifire-js/storybook-utils';
import ExampleLayout from './example-layout';

// Construct the argTypes object
const argTypes = {};

// Storybook default export
export default {
    title: 'Layouts/ExampleLayout',
    component: ExampleLayout,
    argTypes,
};

const Template = (args) => {
    return <ExampleLayout {...args}/>;
};

// Basic Demo
export const Basic = Template.bind({});
Basic.args = {

};