import {useDispatch, useSelector} from 'react-redux';
import {DEFAULT_VALUES} from '../../constants/Form';
import useTextInputField from '../../hooks/useTextInputField';
import {changeTitle} from '../../features/questionFormSlice';
import {RootState} from '../../store/store';
import {StyledTitleInput} from '../../styles/Form';

const Title = () => {
    const title = useSelector((state: RootState) => state.questionForm.title);
    const dispatch = useDispatch();

    const {isFocused, onFocus, onBlur} = useTextInputField(DEFAULT_VALUES.TITLE);

    return (
        <>
            <StyledTitleInput
                style={isFocused ? {outlineColor: 'red'} : undefined}
                type='text'
                value={title}
                onChange={e => {
                    const value = e.target.value;
                    dispatch(changeTitle({value}));
                }}
                onFocus={onFocus}
                onBlur={onBlur}
            />
        </>
    );
};

export default Title;
