import React, {ChangeEvent, FC, useState} from 'react';

type EditableSpanType = {
    title: string,
    taskClasses?: string,
    changeTitle: (title: string) => void
}
export const EditableSpan: FC<EditableSpanType> = (
    {
        title,
        taskClasses,
        changeTitle
    }
) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [titleForInput, setTitleForInput] = useState<string>(title)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        //debugger
        // error && setError(false)
        setTitleForInput(e.currentTarget.value)
    }
    const onEditMode = () => {
        setEditMode(true)
    }
    const offEditMode = () => {
        //debugger
        setEditMode(false)
        changeTitle(titleForInput)
    }
    console.log(title)

    return (
        editMode //если режим редактирования тру - переходим в инпут иначе в спан (то есть в режим показа)
            ? <input
                value={titleForInput}
                onChange={onChangeHandler}
                autoFocus={true}
                onBlur={offEditMode}
            /> //должен быть контролируемый. При нажатии должны редактировать
            : <span
                onDoubleClick={onEditMode}
                className={taskClasses}>{title}</span> //режим показа
    );
};
