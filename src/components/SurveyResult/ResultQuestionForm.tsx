import {LABELS, QUESTION_TYPES} from '../../constants/Form';
import OptionMultipleChoiceItem from '../Global/Option/OptionMultipleChoiceItem';
import OptionCheckboxesItem from '../Global/Option/OptionCheckboxesItem';
import {
  StyledDefaultSelectBox,
  StyledGeneralFormContainer,
  StyledOptionList,
  StyledOptionWrapper,
  StyledPreviewTextInput,
  StyledQuestionTitle,
  StyledTextArea,
} from '../../styles/Form';
import {Question} from '../../interface/Form';
import {initialOther} from '../../features/initialForms';

const QuestionForm = ({questionForm}: {questionForm: Question}) => {
  const {id, title, type, isRequired} = questionForm;
  const options = 'options' in questionForm ? questionForm.options : [];
  const other = 'other' in questionForm ? questionForm.other : initialOther;
  const answer = 'answer' in questionForm ? questionForm.answer : '';
  const dropDownValue = options.find(option => option.isSelected === true)?.id || LABELS.DROP_DOWN;

  return (
    <StyledGeneralFormContainer $padding={24} $gap={24}>
      <StyledQuestionTitle>
        {title}
        {isRequired && <span className='symbol-required'> *</span>}
      </StyledQuestionTitle>
      <StyledOptionWrapper>
        {(() => {
          switch (type) {
            case QUESTION_TYPES.shortAnswer:
              return <StyledPreviewTextInput aria-label='answer' disabled value={answer} />;
            case QUESTION_TYPES.paragraph:
              return <StyledTextArea aria-label='answer' disabled value={answer} />;
            case QUESTION_TYPES.multipleChoice:
              return (
                <StyledOptionList>
                  {options.map(option => (
                    <OptionMultipleChoiceItem
                      isForResult
                      key={option.id}
                      questionId={id}
                      option={option}
                    />
                  ))}
                  <OptionMultipleChoiceItem
                    isForResult
                    isOtherItem
                    isOtherSelected={other.isSelected}
                    key='other'
                    other={other.value}
                    questionId={id}
                  />
                </StyledOptionList>
              );
            case QUESTION_TYPES.checkboxes:
              return (
                <StyledOptionList>
                  {options.map(option => (
                    <OptionCheckboxesItem
                      isForResult
                      key={option.id}
                      questionId={id}
                      option={option}
                    />
                  ))}
                  <OptionCheckboxesItem
                    isForResult
                    isOtherItem
                    isOtherSelected={other.isSelected}
                    key='other'
                    other={other.value}
                    questionId={id}
                  />
                </StyledOptionList>
              );
            case QUESTION_TYPES.dropDown: {
              return (
                <StyledDefaultSelectBox aria-label='options' disabled value={dropDownValue}>
                  <option value={LABELS.DROP_DOWN}>{'미응답'}</option>
                  {options.map(option => (
                    <option key={option.id} value={option.id}>
                      {option.value}
                    </option>
                  ))}
                </StyledDefaultSelectBox>
              );
            }

            default:
              return <></>;
          }
        })()}
      </StyledOptionWrapper>
    </StyledGeneralFormContainer>
  );
};

export default QuestionForm;
