import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';
import {QUESTION_TYPES} from '../../../constants/Form';
import {resortQuestionOptions} from '../../../features/surveyPostSlice';
import useSortableDragNDrop from '../../../hooks/useSortableDragNDrop';
import {RootState} from '../../../store/store';
import {StyledOptionWrapper} from '../../../styles/Form';
import OptionAddButton from './OptionAddButton';
import OptionOther from './OptionOther';
import OptionItem from './OptionItem';
import TextTypeForm from '../PostGlobal/TextTypeForm';
import {Option} from '../../../interface/Form';

const OptionList = ({questionIdx}: {questionIdx: number}) => {
  const dispatch = useDispatch();

  const question = useSelector((state: RootState) => state.questionForm.questions[questionIdx]);

  const {isFocused, type} = question;

  const options = 'options' in question ? question.options : [];
  const isOtherSelected = 'isOtherSelected' in question ? question.isOtherSelected : false;

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
    if (isFocused) {
      setFocusedOptionIdx(optionIdx);
    }
  };

  const resortOptions = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setResortedList((list: Option[]) =>
      dispatch(resortQuestionOptions({questionIdx, options: list}))
    );
  };
  return (
    <StyledOptionList>
      {type === QUESTION_TYPES.shortAnswer && <TextTypeForm type={QUESTION_TYPES.shortAnswer} />}
      {type === QUESTION_TYPES.paragraph && <TextTypeForm type={QUESTION_TYPES.paragraph} />}
      {isOptionalType && (
        <>
          {options.map((option, optionIdx) => (
            <StyledOptionWrapper
              key={option.id}
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
              <OptionItem
                type={type}
                value={option.value}
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
  gap: 12px;
`;
export default OptionList;
