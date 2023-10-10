import {useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import {QUESTION_TYPES} from '../../constants/Form';
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
import {PreviewQuestion} from '../../interface/Form';
import {formResultStateStorage} from '../../store/localStorage';

const QuestionForm = ({questionIdx}: {questionIdx: number}) => {
  const question: PreviewQuestion = formResultStateStorage.getItem().questions[questionIdx];

  const {title, answer, layout} = question;

  const {type, options, isOtherSelected, isRequired} = layout;

  const multipleChoiceAnswer = answer.multipleChoice || {
    selectedOptionIndex: null,
    other: null,
  };

  const checkboxesAnswer = answer.checkboxes || {
    selectedOptionIndexes: [],
    other: null,
  };

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
                      isForResult
                      key={`${questionIdx}-${optionIdx}`}
                      value={option}
                      questionIdx={questionIdx}
                      optionIdx={optionIdx}
                      questionAnswer={multipleChoiceAnswer}
                    />
                  ))}
                  {isOtherSelected && (
                    <OptionMultipleChoiceItem
                      isForResult
                      key={`${questionIdx}-other`}
                      questionIdx={questionIdx}
                      questionAnswer={multipleChoiceAnswer}
                    />
                  )}
                </StyledOptionList>
              );
            case QUESTION_TYPES.checkboxes:
              return (
                <StyledOptionList>
                  {options.map((option, optionIdx) => (
                    <OptionCheckboxesItem
                      isForResult
                      key={`${questionIdx}-${optionIdx}`}
                      value={option}
                      questionIdx={questionIdx}
                      optionIdx={optionIdx}
                      questionAnswer={checkboxesAnswer}
                    />
                  ))}
                  {isOtherSelected && (
                    <OptionCheckboxesItem
                      isForResult
                      key={`${questionIdx}-other`}
                      questionIdx={questionIdx}
                      questionAnswer={checkboxesAnswer}
                    />
                  )}
                </StyledOptionList>
              );
            case QUESTION_TYPES.dropDown: {
              const selectedIdx = answer.dropDown?.selectedOptionIndex?.toString();
              console.info(selectedIdx);

              return (
                <StyledDefaultSelectBox disabled value={selectedIdx}>
                  <option value=''>{'미응답'}</option>
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
