import type {Meta, StoryObj} from '@storybook/react';
import React from "react";
import {App1} from "../app/App1";
//import {ReduxStoreProviderDecorator} from "./ReduxStoreProviderDecorator";


//дефолтное значение компонента

let meta: Meta<typeof App1> = {
    title: 'TODOLIST/AppWithRedux',
    component: App1,
    //decorators:[ReduxStoreProviderDecorator]

};
export default meta;
type Story = StoryObj<typeof App1>;

export const AppWithReduxStory: Story = {
};

