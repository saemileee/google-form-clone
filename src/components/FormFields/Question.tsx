import {PLACEHOLDERS, QUESTION_TYPES} from '../../constants/Form';
import {RootState} from '../../store/store';
import {useDispatch, useSelector} from 'react-redux';
import {
    addQuestionOption,
    changeOptionValue,
    resortQuestionOptions,
    changeQuestionTitle,
    deleteQuestion,
    duplicateQuestion,
    removeQuestionOption,
    toggleRequired,
    changeQuestionType,
    addOtherOption,
    removeOtherOption,
} from '../../features/questionFormSlice';
import useTextInputField from '../../hooks/useTextInputField';
import useSortableDragNDrop from '../../hooks/useSortableDragNDrop';
import {
    StyledDragButtonH,
    StyledMenuButton,
    StyledQuestionTitleInput,
    StyledTextInput,
} from '../../styles/Form';
import styled from 'styled-components';
import {MdDragIndicator} from 'react-icons/md';
import {BiDuplicate} from 'react-icons/bi';
import {RiDeleteBinLine} from 'react-icons/ri';
import {AiOutlineClose} from 'react-icons/ai';
import {useState} from 'react';
import {GrRadial} from 'react-icons/gr';
import {MdOutlineCheckBoxOutlineBlank, MdOutlineArrowDropDownCircle} from 'react-icons/md';

const MIN_OPTION_LENGTH = 1;
const Question = ({questionIdx}: {questionIdx: number}) => {
    const formData = useSelector((state: RootState) => state.questionForm.questions[questionIdx]);
    const dispatch = useDispatch();

    const {title, type, options, isRequired, isSelected, isOtherSelected} = formData;

    const {isFocused, onFocus, onBlur} = useTextInputField();

    const dragNDropOption = useSortableDragNDrop(options);
    const {isDraggable, startDrag, enterTarget, getResortedList, mouseDown, mouseUp} =
        dragNDropOption;

    const [focusedOptionIdx, setFocusedOptionIdx] = useState<null | number>(null);

    const focusOption = (optionIdx: number) => {
        if (isSelected) {
            setFocusedOptionIdx(optionIdx);
        }
    };

    return (
        <StyledQuestionWrapper>
            <StyledTopInfoWrapper>
                <StyledQuestionTitleInput
                    className={isSelected ? 'selected' : undefined}
                    style={isFocused ? {outlineColor: 'red'} : undefined}
                    type='text'
                    value={title}
                    placeholder={PLACEHOLDERS.QUESTION}
                    onChange={e => {
                        const value = e.target.value;
                        dispatch(changeQuestionTitle({questionIdx, value}));
                    }}
                    onFocus={onFocus}
                    onBlur={onBlur}
                />
                <select
                    onChange={e => {
                        const value = e.target.value;
                        dispatch(changeQuestionType({questionIdx, value}));
                    }}
                    defaultValue={type}
                >
                    {Object.entries(QUESTION_TYPES).map(([key, value]) => (
                        <option key={key} value={value}>
                            {value}
                        </option>
                    ))}
                </select>
            </StyledTopInfoWrapper>
            <div>
                {type === QUESTION_TYPES.shortAnswer && <p>Short answer text</p>}
                {type === QUESTION_TYPES.paragraph && <p>Long answer text</p>}
                {(type === QUESTION_TYPES.multipleChoice ||
                    type === QUESTION_TYPES.checkboxes ||
                    type === QUESTION_TYPES.dropDown) && (
                    <StyledOptionList>
                        {options.map((value, optionIdx) => (
                            <div key={`option-${optionIdx}`}>
                                <StyledOptionWrapper
                                    draggable={isDraggable}
                                    onDragStart={() => {
                                        startDrag(optionIdx);
                                    }}
                                    onDragEnter={() => {
                                        enterTarget(optionIdx);
                                    }}
                                    onDragEnd={e => {
                                        e.stopPropagation();
                                        const options = getResortedList();
                                        dispatch(resortQuestionOptions({questionIdx, options}));
                                    }}
                                    onDragOver={e => e.preventDefault()}
                                    onMouseEnter={() => {
                                        focusOption(optionIdx);
                                    }}
                                    onMouseLeave={() => {
                                        setFocusedOptionIdx(null);
                                    }}
                                >
                                    <StyledDragButtonH
                                        selected={focusedOptionIdx === optionIdx ? true : false}
                                        onMouseDown={mouseDown}
                                        onMouseUp={mouseUp}
                                    >
                                        <MdDragIndicator size={16} />
                                    </StyledDragButtonH>
                                    <span>
                                        {type === QUESTION_TYPES.multipleChoice && (
                                            <GrRadial size={22} />
                                        )}
                                    </span>
                                    <span>
                                        {type === QUESTION_TYPES.checkboxes && (
                                            <MdOutlineCheckBoxOutlineBlank size={26} />
                                        )}
                                    </span>
                                    <span>{type === QUESTION_TYPES.dropDown && optionIdx + 1}</span>
                                    <StyledTextInput
                                        type='text'
                                        value={value}
                                        onChange={e => {
                                            const value = e.target.value;
                                            dispatch(
                                                changeOptionValue({questionIdx, optionIdx, value})
                                            );
                                        }}
                                        onFocus={() => setFocusedOptionIdx(optionIdx)}
                                    />
                                    {options.length > MIN_OPTION_LENGTH && (
                                        <StyledMenuButton
                                            name='remove'
                                            onClick={() =>
                                                dispatch(
                                                    removeQuestionOption({questionIdx, optionIdx})
                                                )
                                            }
                                        >
                                            <AiOutlineClose size={22} />
                                        </StyledMenuButton>
                                    )}
                                </StyledOptionWrapper>
                                {isOtherSelected && (
                                    <StyledAddOptionWrapper>
                                        <span>Other...</span>
                                        <StyledMenuButton
                                            name='remove'
                                            onClick={() =>
                                                dispatch(removeOtherOption({questionIdx}))
                                            }
                                        >
                                            <AiOutlineClose size={22} />
                                        </StyledMenuButton>
                                    </StyledAddOptionWrapper>
                                )}

                                {isSelected && optionIdx + 1 === options.length && (
                                    <StyledAddOptionWrapper>
                                        <span>
                                            {type === QUESTION_TYPES.multipleChoice && (
                                                <GrRadial size={22} />
                                            )}
                                        </span>
                                        <span>
                                            {type === QUESTION_TYPES.checkboxes && (
                                                <MdOutlineCheckBoxOutlineBlank size={26} />
                                            )}
                                        </span>
                                        <span>
                                            {type === QUESTION_TYPES.dropDown && optionIdx + 1}
                                        </span>
                                        <button
                                            className='add-option'
                                            onClick={() =>
                                                dispatch(addQuestionOption({questionIdx}))
                                            }
                                        >
                                            Add option
                                        </button>
                                        {!isOtherSelected && (
                                            <span>
                                                {' '}
                                                or
                                                <button
                                                    onClick={() =>
                                                        dispatch(addOtherOption({questionIdx}))
                                                    }
                                                    className='add-other'
                                                >
                                                    add "Other"
                                                </button>
                                            </span>
                                        )}
                                    </StyledAddOptionWrapper>
                                )}
                            </div>
                        ))}
                    </StyledOptionList>
                )}
            </div>
            {isSelected && (
                <StyledMenuWrapper>
                    <StyledMenuButton
                        name='duplicate'
                        onClick={e => {
                            e.stopPropagation();
                            dispatch(duplicateQuestion({questionIdx}));
                        }}
                    >
                        <BiDuplicate size={22} />
                    </StyledMenuButton>
                    <StyledMenuButton
                        name='delete'
                        onClick={e => {
                            e.stopPropagation();
                            dispatch(deleteQuestion({questionIdx}));
                        }}
                    >
                        <RiDeleteBinLine size={22} />
                    </StyledMenuButton>
                    <div onClick={() => dispatch(toggleRequired({questionIdx}))}>
                        Required <button>{isRequired.toString()}</button>
                    </div>
                </StyledMenuWrapper>
            )}
        </StyledQuestionWrapper>
    );
};

export default Question;

const StyledQuestionWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 100%;
`;

const StyledTopInfoWrapper = styled.div`
    display: flex;
    gap: 24px;
`;

const StyledMenuWrapper = styled.div`
    display: flex;
    justify-content: end;
    gap: 24px;
    padding-top: 12px;
    border-top: 1px solid lightgrey;
`;

const StyledOptionList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

const StyledOptionWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
    width: 100%;
    span {
        padding-top: 4px;
    }
`;

const StyledAddOptionWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
    span {
        padding-top: 4px;
    }

    .add-option {
        padding: 2px 0 2px 0;
        color: grey;
        &:hover {
            cursor: text;
            border-bottom: 1px solid lightgrey;
            margin-bottom: -1px;
        }
    }
    .add-other {
        color: blue;
    }
`;
