import styled from 'styled-components';
import {
  StyledDragButtonH,
  StyledMenuButton,
  StyledOptionWrapper,
  StyledTextInput,
} from '../../styles/Form';

import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {MdDragIndicator} from 'react-icons/md';
import {AiOutlineClose} from 'react-icons/ai';

import {
  changeOptionValue,
  removeQuestionOption,
  resortQuestionOptions,
} from '../../features/questionFormSlice';
import {RootState} from '../../store/store';
import {QuestionType} from '../../interface/Form';
import TypeIcon from './TypeIcon';

const MIN_OPTION_LENGTH = 1;

const Option = ({
  type,
  value,
  optionIdx,
  questionIdx,
  dragNDropOption,
}: {
  type: QuestionType;
  value: string;
  optionIdx: number;
  questionIdx: number;
  dragNDropOption: any;
}) => {
  const formData = useSelector((state: RootState) => state.questionForm.questions[questionIdx]);
  const {options, isSelected} = formData;

  const {isDraggable, startDrag, enterTarget, getResortedList, mouseDown, mouseUp} =
    dragNDropOption;

  const [focusedOptionIdx, setFocusedOptionIdx] = useState<null | number>(null);
  const dispatch = useDispatch();

  const focusOption = (optionIdx: number) => {
    if (isSelected) {
      setFocusedOptionIdx(optionIdx);
    }
  };

  return (
    <StyledOptionWrapper
      draggable={isDraggable}
      onDragStart={() => {
        startDrag(optionIdx);
      }}
      onDragEnter={() => {
        enterTarget(optionIdx);
      }}
      onDragEnd={e => {
        e.stopPropagation();
        const options = getResortedList();
        dispatch(resortQuestionOptions({questionIdx, options}));
      }}
      onDragOver={e => e.preventDefault()}
      onMouseEnter={() => {
        focusOption(optionIdx);
      }}
      onMouseLeave={() => {
        setFocusedOptionIdx(null);
      }}
    >
      <StyledLeftIconsWrapper>
        <StyledDragButtonH
          selected={focusedOptionIdx === optionIdx ? true : false}
          onMouseDown={mouseDown}
          onMouseUp={mouseUp}
        >
          <MdDragIndicator size={16} />
        </StyledDragButtonH>
        <span>
          <TypeIcon type={type} optionIdx={optionIdx} />
        </span>
      </StyledLeftIconsWrapper>
      <StyledTextInput
        type='text'
        value={value}
        onChange={e => {
          const value = e.target.value;
          dispatch(changeOptionValue({questionIdx, optionIdx, value}));
        }}
        onFocus={() => setFocusedOptionIdx(optionIdx)}
      />
      {options.length > MIN_OPTION_LENGTH && (
        <StyledMenuButton
          name='remove'
          onClick={() => dispatch(removeQuestionOption({questionIdx, optionIdx}))}
        >
          <AiOutlineClose size={22} />
        </StyledMenuButton>
      )}
    </StyledOptionWrapper>
  );
};

export default Option;

const StyledLeftIconsWrapper = styled.div`
  display: flex;
  align-items: center;
`;
