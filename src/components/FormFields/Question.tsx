import {DEFAULT_VALUES, PLACEHOLDERS} from '../../constants/Form';
import * as I from '../../interface/Form';
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
} from '../../features/questionFormSlice';
import useTextInputField from '../../hooks/useTextInputField';
import useSortableDragNDrop from '../../hooks/useSortableDragNDrop';

const MIN_OPTION_LENGTH = 1;
const Question = ({questionIdx}: {questionIdx: number}) => {
    const formData = useSelector((state: RootState) => state.questionForm.questions[questionIdx]);
    const dispatch = useDispatch();

    const {title, type, options, isRequired} = formData;

    const {isFocused, onFocus, onBlur} = useTextInputField();

    const dragNDropOption = useSortableDragNDrop(options);
    const {isDraggable, startDrag, enterTarget, getResortedList, mouseDown, mouseUp} =
        dragNDropOption;

    return (
        <section>
            <div>
                <input
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
                    defaultValue={DEFAULT_VALUES.QUESTION_TYPE}
                >
                    {Object.entries(I.QuestionType).map(([key, value]) => (
                        <option key={key} value={value}>
                            {value}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                {type === I.QuestionType.shortAnswer && <p>Short answer text</p>}
                {type === I.QuestionType.paragraph && <p>Long answer text</p>}
                {(type === I.QuestionType.multipleChoice ||
                    type === I.QuestionType.checkboxes ||
                    type === I.QuestionType.dropDown) && (
                    <div>
                        {options.map((value, optionIdx) => (
                            <div
                                key={`option-${optionIdx}`}
                                draggable={isDraggable}
                                onDragStart={() => startDrag(optionIdx)}
                                onDragEnter={() => enterTarget(optionIdx)}
                                onDragEnd={() => {
                                    const options = getResortedList();
                                    dispatch(resortQuestionOptions({questionIdx, options}));
                                }}
                                onDragOver={e => e.preventDefault()}
                            >
                                <button onMouseDown={mouseDown} onMouseUp={mouseUp}>
                                    drag
                                </button>
                                <div>
                                    <p>{type === I.QuestionType.dropDown && optionIdx + 1}</p>
                                </div>
                                <input
                                    type='text'
                                    value={value}
                                    onChange={e => {
                                        const value = e.target.value;
                                        dispatch(
                                            changeOptionValue({questionIdx, optionIdx, value})
                                        );
                                    }}
                                />
                                {options.length > MIN_OPTION_LENGTH ? (
                                    <button
                                        onClick={() =>
                                            dispatch(removeQuestionOption({questionIdx, optionIdx}))
                                        }
                                    >
                                        X
                                    </button>
                                ) : (
                                    questionIdx >= MIN_OPTION_LENGTH && (
                                        <button
                                            onClick={() =>
                                                dispatch(
                                                    removeQuestionOption({questionIdx, optionIdx})
                                                )
                                            }
                                        >
                                            X
                                        </button>
                                    )
                                )}
                            </div>
                        ))}
                        <button onClick={() => dispatch(addQuestionOption(questionIdx))}>
                            Add option
                        </button>
                    </div>
                )}
            </div>
            <div>
                <button onClick={() => dispatch(duplicateQuestion(questionIdx))}>Duplicate</button>
                <button onClick={() => dispatch(deleteQuestion(questionIdx))}>Delete</button>
                <div onClick={() => dispatch(toggleRequired({questionIdx}))}>
                    Required <button>{isRequired.toString()}</button>
                </div>
            </div>
        </section>
    );
};

export default Question;
