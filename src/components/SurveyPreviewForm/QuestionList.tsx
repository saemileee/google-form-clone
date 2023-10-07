import {QUESTION_TYPES} from '../../constants/Form';
import {AnswerMultipleChoice, PreviewQuestion} from '../../interface/Form';
import {StyledFormWrapper, StyledGeneralFormContainer} from '../../styles/Form';
import OptionMultipleChoiceItem from './OptionMultipleChoiceItem';

const SurveyPreviewQuestionList = ({questions}: {questions: PreviewQuestion[]}) => {
  return (
    <StyledFormWrapper>
      <StyledGeneralFormContainer>
        {questions.map((question, questionIdx) => {
          const {title, answer, layout} = question;
          const {
            isSelected: isQuestionSelected,
            type,
            options,
            isOtherSelected,
            isRequired,
          } = layout;

          return (
            <>
              <p>
                {isRequired && <span>*</span>}
                {title}
              </p>
              <ul>
                {options.map((option, optionIdx) =>
                  type === QUESTION_TYPES.multipleChoice ? (
                    <OptionMultipleChoiceItem
                      value={option}
                      questionIdx={questionIdx}
                      optionIdx={optionIdx}
                      questionAnswer={answer as AnswerMultipleChoice}
                    />
                  ) : null
                )}
                {isOtherSelected && (
                  <li>
                    <input type='text' />
                  </li>
                )}
              </ul>
            </>
          );
        })}
      </StyledGeneralFormContainer>
    </StyledFormWrapper>
  );
};

export default SurveyPreviewQuestionList;
