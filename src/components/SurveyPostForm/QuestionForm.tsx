import {PLACEHOLDERS, QUESTION_TYPES} from '../../constants/Form';
import {RootState} from '../../store/store';
import {useDispatch, useSelector} from 'react-redux';
import {
  changeQuestionTitle,
  changeQuestionType,
  resortQuestionOptions,
} from '../../features/questionFormSlice';
import {
  StyledOptionWrapper,
  StyledQuestionTitleInput,
  StyledQuestionWrapper,
} from '../../styles/Form';
import styled from 'styled-components';

import Option from './Option';
import useSortableDragNDrop from '../../hooks/useSortableDragNDrop';
import OptionOther from './OptionOther';
import OptionAddButton from './OptionAddButton';
import QuestionBottomMenu from './QuestionBottomMenu';
import IconDropDownBox from '../IconDropDownBox';
import TypeIcon from './TypeIcon';
import TextTypeForm from './TextTypeForm';
import {useState} from 'react';

const QuestionForm = ({questionIdx}: {questionIdx: number}) => {
  const formData = useSelector((state: RootState) => state.questionForm.questions[questionIdx]);

  const dispatch = useDispatch();

  const {title, type, options, isSelected, isOtherSelected} = formData;

  const dragNDropOption = useSortableDragNDrop(options);
  const {isDraggable, startDrag, enterTarget, setResortedList, mouseDown, mouseUp} =
    dragNDropOption;

  const optionTypes = Object.entries(QUESTION_TYPES).map(type => ({
    icon: <TypeIcon type={type[1]} />,
    value: type[1],
  }));

  const defaultOptionType = {
    icon: <TypeIcon type={type} />,
    value: type,
  };

  const isOptionalType =
    type === QUESTION_TYPES.multipleChoice ||
    type === QUESTION_TYPES.checkboxes ||
    type === QUESTION_TYPES.dropDown;

  const isOtherOptionSelectable =
    type === QUESTION_TYPES.multipleChoice || type === QUESTION_TYPES.checkboxes;

  const [focusedOptionIdx, setFocusedOptionIdx] = useState<null | number>(null);

  const focusOption = (optionIdx: number) => {
    if (isSelected) {
      setFocusedOptionIdx(optionIdx);
    }
  };

  const changeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch(changeQuestionTitle({questionIdx, value}));
  };

  const resortOptions = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setResortedList((list: string[]) =>
      dispatch(resortQuestionOptions({questionIdx, options: list}))
    );
  };

  return (
    <StyledQuestionWrapper>
      <StyledTopInfoWrapper>
        <StyledQuestionTitleInput
          className={isSelected ? 'selected' : undefined}
          type='text'
          value={title}
          placeholder={PLACEHOLDERS.QUESTION}
          onChange={changeTitle}
        />
        <IconDropDownBox
          options={optionTypes}
          defaultOption={defaultOptionType}
          valueChangeHandler={value => dispatch(changeQuestionType({questionIdx, value}))}
        />
      </StyledTopInfoWrapper>
      <StyledOptionList>
        {type === QUESTION_TYPES.shortAnswer && <TextTypeForm type={QUESTION_TYPES.shortAnswer} />}
        {type === QUESTION_TYPES.paragraph && <TextTypeForm type={QUESTION_TYPES.paragraph} />}
        {isOptionalType && (
          <>
            {options.map((value, optionIdx) => (
              <StyledOptionWrapper
                draggable={isDraggable}
                onDragStart={() => {
                  startDrag(optionIdx);
                }}
                onDragEnter={() => {
                  enterTarget(optionIdx);
                }}
                onDragEnd={resortOptions}
                onDragOver={e => e.preventDefault()}
                onMouseEnter={() => {
                  focusOption(optionIdx);
                }}
                onMouseLeave={() => {
                  setFocusedOptionIdx(null);
                }}
              >
                <Option
                  key={`option-${optionIdx}`}
                  type={type}
                  value={value}
                  optionIdx={optionIdx}
                  questionIdx={questionIdx}
                  selected={focusedOptionIdx === optionIdx ? true : false}
                  mouseUp={mouseUp}
                  mouseDown={mouseDown}
                  focusOption={focusOption}
                />
              </StyledOptionWrapper>
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
      {isSelected && <QuestionBottomMenu questionIdx={questionIdx} />}
    </StyledQuestionWrapper>
  );
};

export default QuestionForm;

const StyledTopInfoWrapper = styled.div`
  padding: 0 28px 0 28px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
`;

const StyledOptionList = styled.div`
  margin-left: 6px;
  margin-right: 24px;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
