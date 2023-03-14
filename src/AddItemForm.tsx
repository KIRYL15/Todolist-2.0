import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react';
import s from "./Todolist.module.css";

type AddItemFormType = {
    maxLenghtUserMessage: number,
    addNewItem: (newTitle: string) => void,
}
export const AddItemForm: FC<AddItemFormType> = ({
      maxLenghtUserMessage,
      addNewItem,
}) => {
    const [titleForInput, setTitleForInput] = useState<string>('')
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTitleForInput(e.currentTarget.value)
    }
    const isUserMessageToLong: boolean = titleForInput.length > maxLenghtUserMessage
    const isAddButtonDisabled = isUserMessageToLong
        || titleForInput.length === 0
    const [error, setError] = useState(false)
    const userErrorMessage = error
        && <div style={{color: "red"}}>Title is required</div>
    const userMaxLenghtMessage = isUserMessageToLong
        && <div style={{color: "hotpink"}}>Task title is long</div>
    const inputErrorClasses = error || isUserMessageToLong ? s.InputError : ""
    const onKeyDownAddItem = (e: KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && addItem()
    const addItem = () => {
        const trimedTitle = titleForInput.trim()
        if (trimedTitle) {
            addNewItem(trimedTitle)
        } else {
            setError(true)
        }
        setTitleForInput('')
    }
    return (
        <div>
            <input
                className={inputErrorClasses}
                placeholder={"Please enter title"}
                value={titleForInput}
                onChange={onChangeHandler}
                onKeyDown={onKeyDownAddItem}
            />
            <button
                disabled={isAddButtonDisabled}
                onClick={addItem}>+
            </button>
            {userMaxLenghtMessage}
            {userErrorMessage}
        </div>
    );
};

