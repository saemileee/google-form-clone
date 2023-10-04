import {PLACEHOLDERS} from '../../constants/Form';
import useTextInputField from '../../hooks/useTextInputField';

const Description = () => {
    const {value, isFocused, onChange, onFocus, onBlur} = useTextInputField();

    return (
        <>
            <input
                style={isFocused ? {outlineColor: 'red'} : undefined}
                type='text'
                value={value}
                placeholder={PLACEHOLDERS.DESCRIPTION}
                onChange={onChange}
                onFocus={onFocus}
                onBlur={onBlur}
            />
        </>
    );
};

export default Description;
