import {ChangeEvent} from 'react';
import {useDispatch} from 'react-redux';
import {LABELS, QUESTION_TYPES} from '../../../constants/Form';
import {initialOther} from '../../../features/initialForms';
import {selectDropDownOption, changeTextAnswer} from '../../../features/surveyPreviewSlice';
import {Question} from '../../../interface/Form';
import {
  StyledOptionWrapper,
  StyledPreviewTextInput,
  StyledTextArea,
  StyledOptionList,
  StyledDefaultSelectBox,
} from '../../../styles/Form';
import OptionCheckboxesItem from './OptionCheckboxesItem';
import OptionMultipleChoiceItem from './OptionMultipleChoiceItem';

const QuestionForm = ({
  questionForm,
  isForResult = false,
}: {
  questionForm: Question;
  isForResult?: boolean;
}) => {
  const dispatch = useDispatch();

  const {id, type} = questionForm;
  const options = 'options' in questionForm ? questionForm.options : [];
  const other = 'other' in questionForm ? questionForm.other : initialOther;
  const answer = 'answer' in questionForm ? questionForm.answer : '';
  const dropDownValue = options.find(option => option.isSelected === true)?.id || LABELS.DROP_DOWN;
  const onSelectDropDownOption = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    dispatch(selectDropDownOption({questionId: id, selectedId}));
  };

  return (
    <StyledOptionWrapper>
      {(() => {
        switch (type) {
          case QUESTION_TYPES.shortAnswer:
            return (
              <StyledPreviewTextInput
                aria-label='answer'
                placeholder='Your answer'
                value={answer}
                onChange={e => dispatch(changeTextAnswer({questionId: id, value: e.target.value}))}
                disabled={isForResult}
              />
            );
          case QUESTION_TYPES.paragraph:
            return (
              <StyledTextArea
                aria-label='answer'
                placeholder='Your answer'
                value={answer}
                onChange={e => dispatch(changeTextAnswer({questionId: id, value: e.target.value}))}
                disabled={isForResult}
              />
            );
          case QUESTION_TYPES.multipleChoice:
            return (
              <StyledOptionList>
                {options.map(option => (
                  <OptionMultipleChoiceItem
                    key={option.id}
                    questionId={id}
                    option={option}
                    isForResult={isForResult}
                  />
                ))}
                {other.isFormActive && (
                  <OptionMultipleChoiceItem
                    isOtherItem
                    isOtherSelected={other.isSelected}
                    other={other.value}
                    key='other'
                    questionId={id}
                    isForResult={isForResult}
                  />
                )}
              </StyledOptionList>
            );
          case QUESTION_TYPES.checkboxes:
            return (
              <StyledOptionList>
                {options.map(option => (
                  <OptionCheckboxesItem
                    key={option.id}
                    questionId={id}
                    option={option}
                    isForResult={isForResult}
                  />
                ))}
                {other.isFormActive && (
                  <OptionCheckboxesItem
                    isOtherItem
                    isOtherSelected={other.isSelected}
                    other={other.value}
                    key='other'
                    questionId={id}
                    isForResult={isForResult}
                  />
                )}
              </StyledOptionList>
            );
          case QUESTION_TYPES.dropDown:
            return (
              <StyledDefaultSelectBox
                disabled={isForResult}
                value={dropDownValue}
                onChange={onSelectDropDownOption}
              >
                <option value={LABELS.DROP_DOWN}>
                  {isForResult ? '미응답' : LABELS.DROP_DOWN}
                </option>
                {options.map(option => (
                  <option key={option.id} value={option.id}>
                    {option.value}
                  </option>
                ))}
              </StyledDefaultSelectBox>
            );

          default:
            return <></>;
        }
      })()}
    </StyledOptionWrapper>
  );
};

export default QuestionForm;
