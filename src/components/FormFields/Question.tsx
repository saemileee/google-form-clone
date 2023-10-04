import {DEFAULT_VALUES, PLACEHOLDERS} from '../../constants/Form';
import {QuestionType} from '../../interface/Form';
import useQuestionForm from '../../hooks/useQuestionForm';

const MIN_OPTION_LENGTH = 1;
const Question = () => {
    const {formData, titleHandlers, changeType, optionHandlers, toggleRequired} = useQuestionForm();
    const {isActive, title, type, options, isRequired} = formData;

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
                    {Object.entries(QuestionType).map(([key, value]) => (
                        <option key={key} value={value}>
                            {value}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                {type === QuestionType.shortAnswer && <p>Short answer text</p>}
                {type === QuestionType.paragraph && <p>Long answer text</p>}
                {(type === QuestionType.multipleChoice ||
                    type === QuestionType.checkboxes ||
                    type === QuestionType.dropDown) && (
                    <div>
                        {options.map((value, idx) => (
                            <div
                                key={`option-${idx}`}
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
                                    <p>{type === QuestionType.dropDown && idx + 1}</p>
                                </div>
                                <input
                                    type='text'
                                    value={value}
                                    onChange={e => changeOptionValue(idx, e.target.value)}
                                />
                                {options.length > MIN_OPTION_LENGTH ? (
                                    <button onClick={() => removeOption(idx)}>X</button>
                                ) : (
                                    idx >= MIN_OPTION_LENGTH && (
                                        <button onClick={() => removeOption(idx)}>X</button>
                                    )
                                )}
                            </div>
                        ))}
                        <button onClick={addOption}>Add option</button>
                    </div>
                )}
            </div>
            <div>
                <button>Duplicate</button>
                <button>Delete</button>
                <div onClick={toggleRequired}>
                    Required <button>{isRequired.toString()}</button>
                </div>
            </div>
        </section>
    );
};

export default Question;
