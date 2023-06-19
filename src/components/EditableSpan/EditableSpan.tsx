import {TextField} from "@mui/material";
import React, {ChangeEvent, useState} from 'react';

type EditableSpanType = {
    value: string
    onChange: (title: string) => void
}
export const EditableSpan: React.FC<EditableSpanType> = (
    {value, onChange}) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(value)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        // error && setError(false)
        setTitle(e.currentTarget.value)
    }
    const activateEditMode = () => {

        setEditMode(true)
    }
    const activateViewMode = () => {

        setEditMode(false)
        onChange(title)
    }
    return (
        editMode //если режим редактирования тру - переходим в инпут иначе в спан (то есть в режим показа)
            ?
            <TextField
                value={title}
                variant="standard"
                onChange={onChangeHandler}
                autoFocus={true}
                onBlur={activateViewMode}
            /> //должен быть контролируемый. При нажатии должны редактировать
            : <span onDoubleClick={activateEditMode}>{title}
        </span> //режим показа
    );
};
