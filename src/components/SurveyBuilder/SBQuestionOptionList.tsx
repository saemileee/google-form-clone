import {useState} from 'react';
import {useDispatch} from 'react-redux';
import styled from 'styled-components';
import {QUESTION_TYPES} from '../../constants/Form';
import {initialOther} from '../../features/initialForms';
import {resortQuestionOptions} from '../../features/surveyBuilderSlice';
import useSortableDragNDrop from '../../hooks/useSortableDragNDrop';
import useTempSave from '../../hooks/useTempSave';
import {Question, Option} from '../../interface/Form';
import {StyledOptionWrapper} from '../../styles/Form';
import OptionOther from './SBQuestionOptionOther';
import SBQuestionOption from './SBQuestionOption';
import SBQuestionOptionAddButton from './SBQuestionOptionAddButton';

const MIN_OPTION_LENGTH = 1;

const SBQuestionOptionList = ({questionForm}: {questionForm: Question}) => {
  const dispatch = useDispatch();
  const saveTempForm = useTempSave();

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
    setResortedList((list: Option[]) => {
      dispatch(resortQuestionOptions({questionId, options: list}));
      saveTempForm();
    });
  };

  return (
    <StyledOptionList>
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
          <SBQuestionOption
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
      <SBQuestionOptionAddButton
        type={type}
        optionIdx={options.length}
        questionId={questionId}
        isOtherActive={other.isFormActive}
        isOtherOptionSelectable={isOtherOptionSelectable}
      />
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
export default SBQuestionOptionList;
