import {DEFAULT_VALUES} from '../../constants/Form';
import useTextInputField from '../../hooks/useTextInputField';

const Title = () => {
    const {value, isFocused, onChange, onFocus, onBlur} = useTextInputField(DEFAULT_VALUES.TITLE);

    return (
        <>
            <input
                style={isFocused ? {outlineColor: 'red'} : undefined}
                type='text'
                value={value}
                onChange={onChange}
                onFocus={onFocus}
                onBlur={onBlur}
            />
        </>
    );
};

export default Title;
