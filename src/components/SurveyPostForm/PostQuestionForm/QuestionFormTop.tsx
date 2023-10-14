import {useDispatch} from 'react-redux';
import styled from 'styled-components';
import {QUESTION_TYPES, PLACEHOLDERS} from '../../../constants/Form';
import {changeQuestionTitle, changeQuestionType} from '../../../features/surveyPostSlice';
import {StyledQuestionTitleInput} from '../../../styles/Form';
import IconDropDownBox from './IconDropDownBox';
import TypeIcon from './TypeIcon';
import {selectAllText} from '../../../utils/textInputControllers';
import {Question, QuestionType} from '../../../interface/Form';
import useTempSave from '../../../hooks/useTempSave';

const optionTypes = Object.entries(QUESTION_TYPES).map(type => ({
  icon: <TypeIcon type={type[1] as QuestionType} />,
  value: type[1] as QuestionType,
}));

const QuestionFormTop = ({questionForm}: {questionForm: Question}) => {
  const dispatch = useDispatch();
  const saveTempForm = useTempSave();
  const {id, title, type, isFocused} = questionForm;

  const changeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch(changeQuestionTitle({questionId: id, value}));
    saveTempForm();
  };

  const selectOptionType = (value: QuestionType) => {
    dispatch(changeQuestionType({questionId: id, value}));
    saveTempForm();
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
        valueChangeHandler={selectOptionType}
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
