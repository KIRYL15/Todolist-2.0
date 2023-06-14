import type {Meta, StoryObj} from '@storybook/react';
import {AddItemForm} from "../components/AddItemForm/AddItemForm";
import {action} from "@storybook/addon-actions";

//дефолтное значение компонента
let meta: Meta<typeof AddItemForm> = {
    title: 'TODOLIST/AddItemForm',
    component: AddItemForm,
};

export default meta;
type Story = StoryObj<typeof AddItemForm>;

export const AddItemFormStory: Story = {
    args: {
        addItem: action("Button clicked inside form"),
    },
};

