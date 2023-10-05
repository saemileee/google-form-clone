import {DEFAULT_VALUES, PLACEHOLDERS} from '../../constants/Form';
import * as I from '../../interface/Form';
import useQuestionForm from '../../hooks/useQuestionForm';
import {RootState} from '../../store/store';
import {useSelector} from 'react-redux';

const MIN_OPTION_LENGTH = 1;
const Question = ({idx}: {idx: number}) => {
    const formData = useSelector((state: RootState) => state.questionForm.questions[idx]);

    const {titleHandlers, changeType, optionHandlers, toggleRequired, sectionHandlers} =
        useQuestionForm();

    const {duplicateSection, deleteSection} = sectionHandlers;
    const {title, type, options, isRequired} = formData;

    const {isTitleFocused, changeTitle, focusTitle, blurTitle} = titleHandlers;
    const {addOption, removeOption, changeOptionValue, dragNDropOption} = optionHandlers;
    const {isDraggable, startDrag, enterTarget, endDrag, mouseDown, mouseUp} = dragNDropOption;

    return (
        <section>
            <div>
                <input
                    style={isTitleFocused ? {outlineColor: 'red'} : undefined}
                    type='text'
                    value={title}
                    placeholder={PLACEHOLDERS.QUESTION}
                    onChange={changeTitle}
                    onFocus={focusTitle}
                    onBlur={blurTitle}
                />
                <select
                    onChange={e => changeType(e.target.value)}
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
                                onDragStart={() => startDrag(idx)}
                                onDragEnter={() => enterTarget(idx)}
                                onDragEnd={endDrag}
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
                                    onChange={e =>
                                        changeOptionValue(idx, optionIdx, e.target.value)
                                    }
                                />
                                {options.length > MIN_OPTION_LENGTH ? (
                                    <button onClick={() => removeOption(idx, optionIdx)}>X</button>
                                ) : (
                                    idx >= MIN_OPTION_LENGTH && (
                                        <button onClick={() => removeOption(idx, optionIdx)}>
                                            X
                                        </button>
                                    )
                                )}
                            </div>
                        ))}
                        <button onClick={() => addOption(idx)}>Add option</button>
                    </div>
                )}
            </div>
            <div>
                <button onClick={() => duplicateSection(idx)}>Duplicate</button>
                <button onClick={() => deleteSection(idx)}>Delete</button>
                <div onClick={toggleRequired}>
                    Required <button>{isRequired.toString()}</button>
                </div>
            </div>
        </section>
    );
};

export default Question;
