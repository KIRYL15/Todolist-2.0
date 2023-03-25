import s from "./Todolist.module.css";
import {Button, TextField} from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react';

type AddItemFormType = {
    maxLenghtUserMessage: number,
    addNewItem: (newTitle: string) => void,
}
export const AddItemForm: FC<AddItemFormType> = ({maxLenghtUserMessage, addNewItem}) => {
    const [titleForInput, setTitleForInput] = useState<string>('')
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTitleForInput(e.currentTarget.value)
    }
    const isUserMessageToLong: boolean = titleForInput.length > maxLenghtUserMessage
    const isAddButtonDisabled = isUserMessageToLong || titleForInput.length === 0
    const [error, setError] = useState(false)
    const userErrorMessage = error
        && <div style={{color: "red"}}>Title is required</div>
    const userMaxLenghtMessage = isUserMessageToLong
        && <div style={{color: "hotpink"}}>Task title is long</div>
    const inputErrorClasses = error || isUserMessageToLong ? s.InputError : ""
    const onKeyDownAddItem = (e: KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && addItem()
    const addItem = () => {
        const trimedTitle = titleForInput.trim()
        trimedTitle ? addNewItem(trimedTitle) : setError(true)
        setTitleForInput('')
    }
    return (
        <div>
            <TextField
                size="small"
                label="Please enter title"
                variant="outlined"
                value={titleForInput}
                onChange={onChangeHandler}
                onKeyDown={onKeyDownAddItem}
                /* className={inputErrorClasses}*//>
            <Button
                color="secondary"
                disabled={isAddButtonDisabled}
                size={"large"}
                onClick={addItem}
                endIcon={<AddCircleIcon/>}>Add
            </Button>
            {userMaxLenghtMessage}
            {userErrorMessage}
        </div>
    );
};

