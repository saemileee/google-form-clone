import {useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import {QUESTION_TYPES} from '../../constants/Form';
import OptionMultipleChoiceItem from './OptionMultipleChoiceItem';
import OptionCheckboxesItem from './OptionCheckboxesItem';
import {
  StyledDefaultSelectBox,
  StyledGeneralFormContainer,
  StyledOptionList,
  StyledOptionWrapper,
  StyledPreviewTextInput,
  StyledQuestionTitle,
  StyledTextArea,
} from '../../styles/Form';

const QuestionForm = ({questionIdx}: {questionIdx: number}) => {
  const question = useSelector((state: RootState) => state.surveyResult.questions[questionIdx]);
  const {title, answer, layout} = question;

  const {type, options, isOtherSelected, isRequired} = layout;

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
              return (
                <StyledPreviewTextInput
                  disabled
                  value={answer.shortAnswer?.answer ? answer.shortAnswer?.answer : ''}
                />
              );
            case QUESTION_TYPES.paragraph:
              return (
                <StyledTextArea
                  disabled
                  value={answer.paragraph?.answer ? answer.paragraph?.answer : ''}
                />
              );
            case QUESTION_TYPES.multipleChoice:
              return (
                <StyledOptionList>
                  {options.map((option, optionIdx) => (
                    <OptionMultipleChoiceItem
                      key={`${questionIdx}-${optionIdx}`}
                      value={option}
                      questionIdx={questionIdx}
                      optionIdx={optionIdx}
                      questionAnswer={answer.multipleChoice!}
                    />
                  ))}
                  {isOtherSelected && (
                    <OptionMultipleChoiceItem
                      key={`${questionIdx}-other`}
                      questionIdx={questionIdx}
                      questionAnswer={answer.multipleChoice!}
                    />
                  )}
                </StyledOptionList>
              );
            case QUESTION_TYPES.checkboxes:
              return (
                <StyledOptionList>
                  {options.map((option, optionIdx) => (
                    <OptionCheckboxesItem
                      key={`${questionIdx}-${optionIdx}`}
                      value={option}
                      questionIdx={questionIdx}
                      optionIdx={optionIdx}
                      questionAnswer={answer.checkboxes!}
                    />
                  ))}
                  {isOtherSelected && (
                    <OptionCheckboxesItem
                      key={`${questionIdx}-other`}
                      questionIdx={questionIdx}
                      questionAnswer={answer.checkboxes!}
                    />
                  )}
                </StyledOptionList>
              );
            case QUESTION_TYPES.dropDown: {
              const selectedIdx = answer.dropDown?.selectedOptionIndex
                ? answer.dropDown?.selectedOptionIndex
                : '미응답';
              return (
                <StyledDefaultSelectBox disabled defaultValue={selectedIdx?.toString()}>
                  <option>{'미응답'}</option>
                  {options.map((option, idx) => (
                    <option key={`${questionIdx}-${idx}`} value={idx}>
                      {option}
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
