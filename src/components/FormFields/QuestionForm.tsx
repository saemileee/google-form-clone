import {PLACEHOLDERS, QUESTION_TYPES} from '../../constants/Form';
import {RootState} from '../../store/store';
import {useDispatch, useSelector} from 'react-redux';
import {
  changeQuestionTitle,
  deleteQuestion,
  duplicateQuestion,
  toggleRequired,
  changeQuestionType,
} from '../../features/questionFormSlice';
import useTextInputField from '../../hooks/useTextInputField';
import {StyledMenuButton, StyledQuestionTitleInput} from '../../styles/Form';
import styled from 'styled-components';
import {BiDuplicate} from 'react-icons/bi';
import {RiDeleteBinLine} from 'react-icons/ri';

import Option from './Option';
import useSortableDragNDrop from '../../hooks/useSortableDragNDrop';
import OptionOther from './OptionOther';
import OptionAddButton from './OptionAddButton';
import Toggle from '../Toggle';

const QuestionForm = ({questionIdx}: {questionIdx: number}) => {
  const formData = useSelector((state: RootState) => state.questionForm.questions[questionIdx]);
  const dispatch = useDispatch();

  const {title, type, options, isRequired, isSelected, isOtherSelected} = formData;

  const {isFocused, onFocus, onBlur} = useTextInputField();
  const dragNDropOption = useSortableDragNDrop(options);

  const isOptionalType =
    type === QUESTION_TYPES.multipleChoice ||
    type === QUESTION_TYPES.checkboxes ||
    type === QUESTION_TYPES.dropDown;

  const isOtherOptionSelectable =
    type === QUESTION_TYPES.multipleChoice || type === QUESTION_TYPES.checkboxes;

  return (
    <StyledQuestionWrapper>
      <StyledTopInfoWrapper>
        <StyledQuestionTitleInput
          className={isSelected ? 'selected' : undefined}
          style={isFocused ? {outlineColor: 'red'} : undefined}
          type='text'
          value={title}
          placeholder={PLACEHOLDERS.QUESTION}
          onChange={e => {
            const value = e.target.value;
            dispatch(changeQuestionTitle({questionIdx, value}));
          }}
          onFocus={onFocus}
          onBlur={onBlur}
        />
        <select
          onChange={e => {
            const value = e.target.value;
            dispatch(changeQuestionType({questionIdx, value}));
          }}
          defaultValue={type}
        >
          {Object.entries(QUESTION_TYPES).map(([key, value]) => (
            <option key={key} value={value}>
              {value}
            </option>
          ))}
        </select>
      </StyledTopInfoWrapper>
      <StyledOptionList>
        {type === QUESTION_TYPES.shortAnswer && <p>Short answer text</p>}
        {type === QUESTION_TYPES.paragraph && <p>Long answer text</p>}
        {isOptionalType && (
          <>
            {options.map((value, optionIdx) => (
              <Option
                key={`option-${optionIdx}`}
                type={type}
                value={value}
                optionIdx={optionIdx}
                questionIdx={questionIdx}
                dragNDropOption={dragNDropOption}
              />
            ))}

            {isOtherSelected && <OptionOther type={type} questionIdx={questionIdx} />}
            {isOptionalType && (
              <OptionAddButton
                type={type}
                optionIdx={options.length}
                questionIdx={questionIdx}
                isOtherSelected={isOtherSelected}
                isOtherOptionSelectable={isOtherOptionSelectable}
              />
            )}
          </>
        )}
      </StyledOptionList>
      {isSelected && (
        <StyledMenuWrapper>
          <StyledMenuButton
            name='duplicate'
            onClick={e => {
              e.stopPropagation();
              dispatch(duplicateQuestion({questionIdx}));
            }}
          >
            <BiDuplicate size={22} />
          </StyledMenuButton>
          <StyledMenuButton
            name='delete'
            onClick={e => {
              e.stopPropagation();
              dispatch(deleteQuestion({questionIdx}));
            }}
          >
            <RiDeleteBinLine size={22} />
          </StyledMenuButton>
          <div className='divider'></div>
          <Toggle
            isActive={isRequired}
            toggleHandler={() => dispatch(toggleRequired({questionIdx}))}
          />
        </StyledMenuWrapper>
      )}
    </StyledQuestionWrapper>
  );
};

export default QuestionForm;

const StyledQuestionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-bottom: 12px;
  width: 100%;
`;

const StyledTopInfoWrapper = styled.div`
  padding: 0 28px 0 28px;
  box-sizing: border-box;
  display: flex;
  gap: 24px;
`;

const StyledOptionList = styled.div`
  margin-left: 6px;
  margin-right: 24px;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const StyledMenuWrapper = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 12px;
  padding: 12px 12px 0 12px;
  margin: 0 28px 0 28px;
  border-top: 1px solid lightgrey;
  .divider {
    margin: 0 4px 0 4px;
    width: 1px;
    height: 36px;
    background-color: lightgrey;
  }
`;
