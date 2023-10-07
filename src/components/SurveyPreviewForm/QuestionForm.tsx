import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import {LABELS, QUESTION_TYPES} from '../../constants/Form';
import OptionMultipleChoiceItem from './OptionMultipleChoiceItem';
import OptionCheckboxesItem from './OptionCheckboxesItem';
import {selectDropDownOption, changeTextAnswer} from '../../features/surveyPreviewFormSlice';
import {
  StyledDefaultSelectBox,
  StyledGeneralFormContainer,
  StyledOptionList,
  StyledOptionWrapper,
  StyledPreviewTextInput,
  StyledQuestionTitle,
  StyledTextArea,
} from '../../styles/Form';
import {ChangeEvent} from 'react';

const QuestionForm = ({questionIdx}: {questionIdx: number}) => {
  const dispatch = useDispatch();
  const question = useSelector(
    (state: RootState) => state.surveyPreviewForm.questions[questionIdx]
  );
  const {title, answer, layout} = question;

  const {isSelected: isQuestionSelected, type, options, isOtherSelected, isRequired} = layout;

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
