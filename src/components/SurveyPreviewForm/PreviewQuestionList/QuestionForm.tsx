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
import {Question} from '../../../interface/Form';
import {initialOther} from '../../../features/initialForms';

const QuestionForm = ({questionForm}: {questionForm: Question}) => {
  const dispatch = useDispatch();

  const {invalidQuestions, submitTryCount} = useSelector(
    (state: RootState) => state.surveyPreviewForm
  );
  const {id, title, type, isRequired} = questionForm;

  const options = 'options' in questionForm ? questionForm.options : [];
  const other = 'other' in questionForm ? questionForm.other : initialOther;
  const answer = 'answer' in questionForm ? questionForm.answer : '';
  const dropDownValue = options.find(option => option.isSelected === true)?.id || LABELS.DROP_DOWN;
  const onSelectDropDownOption = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    dispatch(selectDropDownOption({questionId: id, selectedId}));
  };

  const isInvalid = invalidQuestions.includes(id);
  const questionFormRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (invalidQuestions[0] === id) {
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
                  aria-label='answer'
                  placeholder='Your answer'
                  value={answer}
                  onChange={e =>
                    dispatch(changeTextAnswer({questionId: id, value: e.target.value}))
                  }
                />
              );
            case QUESTION_TYPES.paragraph:
              return (
                <StyledTextArea
                  aria-label='answer'
                  placeholder='Your answer'
                  value={answer}
                  onChange={e =>
                    dispatch(changeTextAnswer({questionId: id, value: e.target.value}))
                  }
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
