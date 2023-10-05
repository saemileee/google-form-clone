import {useDispatch, useSelector} from 'react-redux';
import {PLACEHOLDERS} from '../../constants/Form';
import useTextInputField from '../../hooks/useTextInputField';
import {RootState} from '../../store/store';
import {changeDescription} from '../../features/questionFormSlice';

const Description = () => {
    const description = useSelector((state: RootState) => state.questionForm.description);
    const dispatch = useDispatch();

    const {isFocused, onFocus, onBlur} = useTextInputField();

    return (
        <>
            <input
                style={isFocused ? {outlineColor: 'red'} : undefined}
                type='text'
                value={description}
                placeholder={PLACEHOLDERS.DESCRIPTION}
                onChange={e => dispatch(changeDescription(e.target.value))}
                onFocus={onFocus}
                onBlur={onBlur}
            />
        </>
    );
};

export default Description;
