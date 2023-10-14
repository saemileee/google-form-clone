import {useDispatch} from 'react-redux';
import styled from 'styled-components';
import {QUESTION_TYPES, PLACEHOLDERS} from '../../../constants/Form';
import {changeQuestionTitle, changeQuestionType} from '../../../features/surveyPostSlice';
import {StyledQuestionTitleInput} from '../../../styles/Form';
import IconDropDownBox from './IconDropDownBox';
import TypeIcon from './TypeIcon';
import {selectAllText} from '../../../utils/textInputControllers';
import {Question} from '../../../interface/Form';

const optionTypes = Object.entries(QUESTION_TYPES).map(type => ({
  icon: <TypeIcon type={type[1]} />,
  value: type[1],
}));

const QuestionFormTop = ({questionForm}: {questionForm: Question}) => {
  const dispatch = useDispatch();
  const {id, title, type, isFocused} = questionForm;

  const changeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch(changeQuestionTitle({questionId: id, value}));
  };

  const defaultOptionType = {
    icon: <TypeIcon type={type} />,
    value: type,
  };

  return (
    <StyledTopInfoWrapper>
      <StyledQuestionTitleInput
        aria-label='question-title'
        onFocus={selectAllText}
        className={isFocused ? 'selected' : undefined}
        type='text'
        value={title}
        placeholder={PLACEHOLDERS.QUESTION}
        onChange={changeTitle}
      />
      <IconDropDownBox
        options={optionTypes}
        defaultOption={defaultOptionType}
        valueChangeHandler={value => dispatch(changeQuestionType({questionId: id, value}))}
      />
    </StyledTopInfoWrapper>
  );
};

export default QuestionFormTop;

const StyledTopInfoWrapper = styled.div`
  padding: 0 28px 0 28px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
`;
