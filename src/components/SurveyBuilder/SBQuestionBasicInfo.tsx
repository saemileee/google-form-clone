import {useDispatch} from 'react-redux';
import styled from 'styled-components';
import {QUESTION_TYPES, PLACEHOLDERS} from '../../constants/Form';
import {changeQuestionTitle, changeQuestionType} from '../../features/surveyBuilderSlice';
import useTempSave from '../../hooks/useTempSave';
import {QuestionType, Question} from '../../interface/Form';
import {StyledQuestionTitleInput} from '../../styles/Form';
import {selectAllText} from '../../utils/textInputControllers';
import QuestionTypeSelectBox from '../common/IconDropDownBox';
import SBQuestionTypeIcon from './SBQuestionTypeIcon';

const optionTypes = Object.entries(QUESTION_TYPES).map(type => ({
  icon: <SBQuestionTypeIcon type={type[1] as QuestionType} />,
  value: type[1] as QuestionType,
}));

const SBQuestionBasicInfo = ({questionForm}: {questionForm: Question}) => {
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
    icon: <SBQuestionTypeIcon type={type} />,
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
      <QuestionTypeSelectBox
        options={optionTypes}
        defaultOption={defaultOptionType}
        valueChangeHandler={selectOptionType}
      />
    </StyledTopInfoWrapper>
  );
};

export default SBQuestionBasicInfo;

const StyledTopInfoWrapper = styled.div`
  padding: 0 28px 0 28px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
`;
