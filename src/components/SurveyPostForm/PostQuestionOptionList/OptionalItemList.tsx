import {useDispatch} from 'react-redux';
import {StyledOptionWrapper} from '../../../styles/Form';
import OptionAddButton from './OptionAddButton';
import OptionOther from './OptionOther';
import OptionItem from './OptionItem';
import {useState} from 'react';
import {QUESTION_TYPES} from '../../../constants/Form';
import {resortQuestionOptions} from '../../../features/surveyPostSlice';
import useSortableDragNDrop from '../../../hooks/useSortableDragNDrop';
import {Question, Option} from '../../../interface/Form';
import {initialOther} from '../../../features/initialForms';

const MIN_OPTION_LENGTH = 1;

const OptionalItemList = ({questionForm}: {questionForm: Question}) => {
  const dispatch = useDispatch();

  const {id: questionId, type, isFocused} = questionForm;
  const options = 'options' in questionForm ? questionForm.options : [];
  const other = 'other' in questionForm ? questionForm.other : initialOther;

  const dragNDropOption = useSortableDragNDrop(options);
  const {isDraggable, startDrag, enterTarget, setResortedList, mouseDown, mouseUp} =
    dragNDropOption;

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
      dispatch(resortQuestionOptions({questionId, options: list}))
    );
  };

  return (
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
            option={option}
            optionIdx={optionIdx}
            questionId={questionId}
            selected={focusedOptionIdx === optionIdx ? true : false}
            mouseUp={mouseUp}
            mouseDown={mouseDown}
            focusOption={focusOption}
            isRemoveBtnActive={options.length > MIN_OPTION_LENGTH}
          />
        </StyledOptionWrapper>
      ))}

      {other && other.isFormActive && <OptionOther type={type} questionId={questionId} />}
      <OptionAddButton
        type={type}
        optionIdx={options.length}
        questionId={questionId}
        isOtherActive={other.isFormActive}
        isOtherOptionSelectable={isOtherOptionSelectable}
      />
    </>
  );
};

export default OptionalItemList;
