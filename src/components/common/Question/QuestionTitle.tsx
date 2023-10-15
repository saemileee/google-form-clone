import {StyledQuestionTitle} from '../../../styles/Form';

const QuestionTitle = ({title, isRequired}: {title: string; isRequired?: boolean}) => {
  return (
    <StyledQuestionTitle>
      {title}
      {isRequired && <span className='symbol-required'> *</span>}
    </StyledQuestionTitle>
  );
};

export default QuestionTitle;
