import {useState} from 'react';
import {DEFAULT_VALUES, PLACEHOLDERS} from '../../constants/Form';
import useTextInputField from '../../hooks/useTextInputField';
import {QuestionType} from '../../interface/Form';

const MIN_OPTION_LENGTH = 1;
const Question = () => {
    const [isActive, setIsActive] = useState(false);
    const [type, setType] = useState<string>(DEFAULT_VALUES.QUESTION_TYPE);
    const {value: title, isFocused, onChange, onFocus, onBlur} = useTextInputField();
    const [isRequired, setIsRequired] = useState(false);
    const [options, setOptions] = useState<string[]>(['Option 1']);

    const addOption = () => {
        const nextOptionNumber = options.length + 1;
        setOptions(prev => [...prev, `Option ${nextOptionNumber}`]);
    };

    const removeOption = (idx: number) => {
        setOptions(prev => prev.filter((_, prevIdx) => prevIdx !== idx));
    };

    const changeOptionValue = (idx: number, value: string) => {
        setOptions(prev => prev.map((prevValue, prevIdx) => (prevIdx === idx ? value : prevValue)));
    };

    return (
        <section>
            <div>
                <input
                    style={isFocused ? {outlineColor: 'red'} : undefined}
                    type='text'
                    value={title}
                    placeholder={PLACEHOLDERS.QUESTION}
                    onChange={onChange}
                    onFocus={onFocus}
                    onBlur={onBlur}
                />
                <select
                    onChange={e => setType(e.target.value)}
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
                {type === QuestionType.multipleChoice && (
                    <div>
                        {options.map((value, idx) => (
                            <div key={`option-${idx}`}>
                                <button>drag</button>
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
                {type === QuestionType.checkboxes && <p>Long answer text</p>}
                {type === QuestionType.dropDown && <p>Long answer text</p>}
            </div>
            <div>
                <button>Duplicate</button>
                <button>Delete</button>
                <div>
                    Required <p>{isRequired}</p>
                </div>
            </div>
        </section>
    );
};

export default Question;
