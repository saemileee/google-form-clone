import {Question} from '../../interface/Form';
import {StyledFormWrapper, StyledGeneralFormContainer} from '../../styles/Form';

const SurveyPreviewQuestionList = ({questions}: {questions: Question[]}) => {
  return (
    <StyledFormWrapper>
      <StyledGeneralFormContainer>
        {questions.map(question => {
          const {title, type, options, isOtherSelected, isRequired} = question;
          return (
            <>
              <p>
                {isRequired && <span>*</span>}
                {title}
              </p>
              <ul>
                {options.map(option => (
                  <li>{option}</li>
                ))}
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
