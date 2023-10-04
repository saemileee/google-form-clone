import {useState} from 'react';
import useDragNDrop from './useDragNDrop';
import useTextInputField from './useTextInputField';
import {DEFAULT_VALUES} from '../constants/Form';

const useQuestionForm = () => {
    const [isActive, setIsActive] = useState(false);

    const {value: title, isFocused, onChange, onFocus, onBlur} = useTextInputField();
    const titleHandlers = {
        isTitleFocused: isFocused,
        changeTitle: onChange,
        focusTitle: onFocus,
        blurTitle: onBlur,
    };

    const [type, setType] = useState<string>(DEFAULT_VALUES.QUESTION_TYPE);

    const changeType = (value: string) => {
        setType(value);
    };

    const [options, setOptions] = useState<string[]>(['Option 1']);

    const dragNDropOption = useDragNDrop(options, setOptions);

    const optionHandlers = {
        addOption: () => {
            const nextOptionNumber = options.length + 1;
            setOptions(prev => [...prev, `Option ${nextOptionNumber}`]);
        },

        removeOption: (idx: number) => {
            setOptions(prev => prev.filter((_, prevIdx) => prevIdx !== idx));
        },

        changeOptionValue: (idx: number, value: string) => {
            setOptions(prev =>
                prev.map((prevValue, prevIdx) => (prevIdx === idx ? value : prevValue))
            );
        },
        dragNDropOption,
    };

    const [isRequired, setIsRequired] = useState(false);

    const toggleRequired = () => {
        setIsRequired(prev => !prev);
    };

    const formData = {
        isActive,
        title,
        type,
        options,
        isRequired,
    };

    return {formData, titleHandlers, changeType, optionHandlers, toggleRequired};
};

export default useQuestionForm;
