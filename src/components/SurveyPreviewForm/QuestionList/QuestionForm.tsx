import {useDispatch, useSelector} from 'react-redux';
import {ChangeEvent} from 'react';
import {QUESTION_TYPES, LABELS, OTHER_IDX} from '../../../constants/Form';
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
import OptionCheckboxesItem from './Option/OptionCheckboxesItem';
import OptionMultipleChoiceItem from './Option/OptionMultipleChoiceItem';

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

  const multipleChoiceAnswer = answer.multipleChoice || {
    selectedOptionIndex: null,
    other: null,
  };

  const checkboxesAnswer = answer.checkboxes || {
    selectedOptionIndexes: [],
    other: null,
  };

  const onSelectDropDownOption = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedIdx = isNaN(Number(e.target.value)) ? null : Number(e.target.value);
    dispatch(selectDropDownOption({questionIdx, selectedIdx}));
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
                  placeholder='Your answer'
                  onChange={e => dispatch(changeTextAnswer({questionIdx, value: e.target.value}))}
                />
              );
            case QUESTION_TYPES.paragraph:
              return (
                <StyledTextArea
                  placeholder='Your answer'
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
                  defaultValue={LABELS.DROP_DOWN}
                  onChange={onSelectDropDownOption}
                >
                  <option>{LABELS.DROP_DOWN}</option>
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
    </StyledGeneralFormContainer>
  );
};

export default QuestionForm;
