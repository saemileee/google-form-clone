import {useDispatch, useSelector} from 'react-redux';
import {ChangeEvent, useEffect, useRef} from 'react';
import {QUESTION_TYPES, LABELS} from '../../../constants/Form';
import {selectDropDownOption, changeTextAnswer} from '../../../features/surveyPreviewFormSlice';
import {RootState} from '../../../store/store';
import {
  StyledGeneralFormContainer,
  StyledQuestionTitle,
  StyledOptionWrapper,
  StyledPreviewTextInput,
  StyledTextArea,
  StyledOptionList,
  StyledDefaultSelectBox,
} from '../../../styles/Form';
import OptionCheckboxesItem from '../../Global/Option/OptionCheckboxesItem';
import OptionMultipleChoiceItem from '../../Global/Option/OptionMultipleChoiceItem';
import styled from 'styled-components';
import {color} from '../../../styles/variables.ts/color';
import {RiErrorWarningLine} from 'react-icons/ri';

const QuestionForm = ({questionIdx}: {questionIdx: number}) => {
  const dispatch = useDispatch();
  const title = useSelector(
    (state: RootState) => state.surveyPreviewForm.questions[questionIdx].title
  );
  const answer = useSelector(
    (state: RootState) => state.surveyPreviewForm.questions[questionIdx].answer
  );
  const layout = useSelector(
    (state: RootState) => state.surveyPreviewForm.questions[questionIdx].layout
  );
  const {type, options, isOtherSelected, isRequired} = layout;
  const {invalidQuestions, submitTryCount} = useSelector(
    (state: RootState) => state.surveyPreviewForm
  );
  const isInvalid = invalidQuestions.includes(questionIdx);

  const multipleChoiceAnswer = answer.multipleChoice || {
    selectedOptionIndex: null,
    other: null,
  };

  const checkboxesAnswer = answer.checkboxes || {
    selectedOptionIndexes: [],
    other: null,
  };

  const dropDownAnswerValue = Number.isInteger(answer.dropDown?.selectedOptionIndex)
    ? answer.dropDown?.selectedOptionIndex?.toString()
    : LABELS.DROP_DOWN;

  const onSelectDropDownOption = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedIdx = Number.isInteger(Number(e.target.value)) ? Number(e.target.value) : null;
    dispatch(selectDropDownOption({questionIdx, selectedIdx}));
  };

  const questionFormRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (invalidQuestions[0] === questionIdx) {
      if (questionFormRef.current)
        questionFormRef.current.scrollIntoView({behavior: 'smooth', block: 'start'});
    }
  }, [submitTryCount]);

  return (
    <StyledQuestionFormContainer ref={questionFormRef} $padding={24} $gap={32} $invalid={isInvalid}>
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
                  placeholder='Your answer'
                  value={(answer.shortAnswer?.answer || '').toString()}
                  onChange={e => dispatch(changeTextAnswer({questionIdx, value: e.target.value}))}
                />
              );
            case QUESTION_TYPES.paragraph:
              return (
                <StyledTextArea
                  placeholder='Your answer'
                  value={(answer.paragraph?.answer || '').toString()}
                  onChange={e => dispatch(changeTextAnswer({questionIdx, value: e.target.value}))}
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
                      questionAnswer={multipleChoiceAnswer}
                    />
                  ))}
                  {isOtherSelected && (
                    <OptionMultipleChoiceItem
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
                      key={`${questionIdx}-${optionIdx}`}
                      value={option}
                      questionIdx={questionIdx}
                      optionIdx={optionIdx}
                      questionAnswer={checkboxesAnswer}
                    />
                  ))}
                  {isOtherSelected && (
                    <OptionCheckboxesItem
                      key={`${questionIdx}-other`}
                      questionIdx={questionIdx}
                      questionAnswer={checkboxesAnswer}
                    />
                  )}
                </StyledOptionList>
              );
            case QUESTION_TYPES.dropDown:
              return (
                <StyledDefaultSelectBox
                  value={dropDownAnswerValue}
                  onChange={onSelectDropDownOption}
                >
                  <option value={LABELS.DROP_DOWN}>{LABELS.DROP_DOWN}</option>
                  {options.map((option, idx) => (
                    <option key={`${questionIdx}-${idx}`} value={idx}>
                      {option}
                    </option>
                  ))}
                </StyledDefaultSelectBox>
              );

            default:
              return <></>;
          }
        })()}
      </StyledOptionWrapper>
      {isInvalid && (
        <StyledInvalidatedMsg>
          <RiErrorWarningLine size={24} />
          This is a required question
        </StyledInvalidatedMsg>
      )}
    </StyledQuestionFormContainer>
  );
};

export default QuestionForm;

const StyledQuestionFormContainer = styled(StyledGeneralFormContainer)<{$invalid: boolean}>`
  padding-top: 40px;
  border-color: ${props => (props.$invalid ? 'red' : color.border)};
`;

const StyledInvalidatedMsg = styled.p`
  display: flex;
  align-items: center;
  gap: 8px;
  color: red;
  font-size: 10pt;
  svg {
    padding-bottom: 3px;
  }
`;
