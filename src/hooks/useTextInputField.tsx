import {useState} from 'react';

const useTextInputField = (defaultValue = '') => {
    const [value, setValue] = useState(defaultValue);
    const [isFocused, setIsFocused] = useState(false);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };
    const onFocus = () => setIsFocused(true);
    const onBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
        const currentValue = e.target.value;
        setIsFocused(false);

        if (currentValue === '') {
            setValue(defaultValue);
        }
    };
    const init = () => {
        setValue(defaultValue);
        setIsFocused(false);
    };

    return {value, isFocused, onChange, onFocus, onBlur, init};
};

export default useTextInputField;
