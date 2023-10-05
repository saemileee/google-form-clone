import {useState} from 'react';
import useDragNDrop from './useDragNDrop';
import useTextInputField from './useTextInputField';
import {DEFAULT_VALUES} from '../constants/Form';
import {useDispatch, useSelector} from 'react-redux';
import {
    addQuestionOption,
    changeOptionValue,
    deleteQuestion,
    duplicateQuestion,
    removeQuestionOption,
} from '../features/questionFormSlice';
import {RootState} from '../store/store';

const useQuestionForm = () => {
    const questions = useSelector((state: RootState) => state.questionForm.questions);
    const dispatch = useDispatch();

    const [isActive, setIsActive] = useState(false);

    const {value: title, isFocused, onChange, onFocus, onBlur} = useTextInputField();
    const titleHandlers = {
        isTitleFocused: isFocused,
        changeTitle: onChange,
        focusTitle: onFocus,
        blurTitle: onBlur,
    };

    const sectionHandlers = {
        duplicateSection: (questionIdx: number) => {
            dispatch(duplicateQuestion(questionIdx));
        },
        deleteSection: (questionIdx: number) => {
            dispatch(deleteQuestion(questionIdx));
        },
    };

    const [type, setType] = useState<string>(DEFAULT_VALUES.QUESTION_TYPE);

    const changeType = (value: string) => {
        setType(value);
    };

    const [options, setOptions] = useState<string[]>(['Option 1']);

    const dragNDropOption = useDragNDrop(options, setOptions);

    const optionHandlers = {
        addOption: (questionIdx: number) => {
            dispatch(addQuestionOption(questionIdx));
        },

        removeOption: (questionIdx: number, optionIdx: number) => {
            dispatch(removeQuestionOption({questionIdx, optionIdx}));
        },

        changeOptionValue: (questionIdx: number, optionIdx: number, value: string) => {
            dispatch(changeOptionValue({questionIdx, optionIdx, value}));
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

    return {formData, titleHandlers, changeType, optionHandlers, toggleRequired, sectionHandlers};
};

export default useQuestionForm;
