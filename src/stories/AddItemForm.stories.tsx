import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions'
import { CustomInputForm } from '../components/CustomInputForm';

// More on how to set up stories at:
// https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof CustomInputForm> = {
    title: 'TODOLISTS/AddItemForm',
    component: CustomInputForm,
    // This component will have an automatically generated Autodocs entry:
    // https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes:
    // https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        callbackFn: {
            description: 'Button clicked inside form',
            action: 'clicked'
        }
    },
};

export default meta;
type Story = StoryObj<typeof CustomInputForm>;

// More on component templates:
// https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const AddItemFormStory: Story = {
    // More on args: https://storybook.js.org/docs/react/writing-stories/args
    args: {
        callbackFn: action('Button clicked inside form')
    },
};
