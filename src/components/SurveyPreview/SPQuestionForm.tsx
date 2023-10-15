import {type} from '@testing-library/user-event/dist/type';
import {QUESTION_TYPES, LABELS} from '../../constants/Form';
import {changeTextAnswer, selectDropDownOption} from '../../features/surveyPreviewFormSlice';
import {
  StyledOptionWrapper,
  StyledPreviewTextInput,
  StyledTextArea,
  StyledOptionList,
  StyledDefaultSelectBox,
} from '../../styles/Form';
import OptionCheckboxesItem from '../common/Option/OptionCheckboxesItem';
import OptionMultipleChoiceItem from '../common/Option/OptionMultipleChoiceItem';
import {Question} from '../../interface/Form';
import {ChangeEvent} from 'react';
import {initialOther} from '../../features/initialForms';
import {useDispatch} from 'react-redux';

const SPQuestionForm = ({questionForm}: {questionForm: Question}) => {
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
              />
            );
          case QUESTION_TYPES.paragraph:
            return (
              <StyledTextArea
                aria-label='answer'
                placeholder='Your answer'
                value={answer}
                onChange={e => dispatch(changeTextAnswer({questionId: id, value: e.target.value}))}
              />
            );
          case QUESTION_TYPES.multipleChoice:
            return (
              <StyledOptionList>
                {options.map(option => (
                  <OptionMultipleChoiceItem key={option.id} questionId={id} option={option} />
                ))}
                {other.isFormActive && (
                  <OptionMultipleChoiceItem
                    isOtherItem
                    isOtherSelected={other.isSelected}
                    other={other.value}
                    key='other'
                    questionId={id}
                  />
                )}
              </StyledOptionList>
            );
          case QUESTION_TYPES.checkboxes:
            return (
              <StyledOptionList>
                {options.map(option => (
                  <OptionCheckboxesItem key={option.id} questionId={id} option={option} />
                ))}
                {other.isFormActive && (
                  <OptionCheckboxesItem
                    isOtherItem
                    isOtherSelected={other.isSelected}
                    other={other.value}
                    key='other'
                    questionId={id}
                  />
                )}
              </StyledOptionList>
            );
          case QUESTION_TYPES.dropDown:
            return (
              <StyledDefaultSelectBox value={dropDownValue} onChange={onSelectDropDownOption}>
                <option value={LABELS.DROP_DOWN}>{LABELS.DROP_DOWN}</option>
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

export default SPQuestionForm;
