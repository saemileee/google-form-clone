import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';
import {QUESTION_TYPES} from '../../../../../constants/Form';
import {resortQuestionOptions} from '../../../../../features/surveyPostSlice';
import useSortableDragNDrop from '../../../../../hooks/useSortableDragNDrop';
import {RootState} from '../../../../../store/store';
import {StyledOptionWrapper} from '../../../../../styles/Form';
import OptionAddButton from './OptionAddButton';
import OptionOther from './OptionOther';
import Option from './Option';
import TextTypeForm from '../../../Global/TextTypeForm';

const OptionList = ({questionIdx}: {questionIdx: number}) => {
  const dispatch = useDispatch();

  const isSelected = useSelector(
    (state: RootState) => state.questionForm.questions[questionIdx].isSelected
  );
  const type = useSelector((state: RootState) => state.questionForm.questions[questionIdx].type);
  const options = useSelector(
    (state: RootState) => state.questionForm.questions[questionIdx].options
  );

  const isOtherSelected = useSelector(
    (state: RootState) => state.questionForm.questions[questionIdx].isOtherSelected
  );

  const dragNDropOption = useSortableDragNDrop(options);
  const {isDraggable, startDrag, enterTarget, setResortedList, mouseDown, mouseUp} =
    dragNDropOption;

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

  const resortOptions = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setResortedList((list: string[]) =>
      dispatch(resortQuestionOptions({questionIdx, options: list}))
    );
  };
  return (
    <StyledOptionList>
      {type === QUESTION_TYPES.shortAnswer && <TextTypeForm type={QUESTION_TYPES.shortAnswer} />}
      {type === QUESTION_TYPES.paragraph && <TextTypeForm type={QUESTION_TYPES.paragraph} />}
      {isOptionalType && (
        <>
          {options.map((value, optionIdx) => (
            <StyledOptionWrapper
              key={`option-${optionIdx}`}
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
  );
};

const StyledOptionList = styled.div`
  margin-left: 6px;
  margin-right: 24px;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
export default OptionList;
