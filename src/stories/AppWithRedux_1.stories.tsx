import type {Meta, StoryObj} from '@storybook/react';
import React from "react";
import {App} from "../App";
import {ReduxStoreProviderDecorator} from "./ReduxStoreProviderDecorator";


//дефолтное значение компонента

let meta: Meta<typeof App> = {
    title: 'TODOLIST/AppWithRedux',
    component: App,
    decorators:[ReduxStoreProviderDecorator]

};
export default meta;
type Story = StoryObj<typeof App>;

export const AppWithReduxStory: Story = {
};

