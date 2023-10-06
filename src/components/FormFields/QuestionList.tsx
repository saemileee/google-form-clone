import {useDispatch, useSelector} from 'react-redux';
import Question from '../FormFields/Question';
import {RootState} from '../../store/store';
import useSortableDragNDrop from '../../hooks/useSortableDragNDrop';
import {resortQuestions, selectQuestion} from '../../features/questionFormSlice';
import QuestionAddButton from './QuestionAddButton';
import styled from 'styled-components';
import {
  StyledDragButtonW,
  StyledGeneralFormContainer,
  StyledGeneralFormWrapper,
} from '../../styles/Form';
import {MdDragIndicator} from 'react-icons/md';

const QuestionList = () => {
  const questions = useSelector((state: RootState) => state.questionForm.questions);
  const dispatch = useDispatch();
  const {isDraggable, startDrag, enterTarget, getResortedList, mouseDown, mouseUp} =
    useSortableDragNDrop(questions);
  return (
    <StyledFormWrapper>
      <QuestionAddButton />
      {questions.map((question, idx) => (
        <StyledGeneralFormContainer
          key={idx}
          onClick={() => dispatch(selectQuestion({questionIdx: idx}))}
          draggable={isDraggable}
          onDragStart={() => startDrag(idx)}
          onDragEnter={() => enterTarget(idx)}
          onDragEnd={() => {
            const questions = getResortedList();
            dispatch(resortQuestions({questions}));
          }}
        >
          {question.isSelected && <StyledSelectedLine />}
          <StyledDragButtonW
            selected={question.isSelected}
            onMouseDown={mouseDown}
            onMouseUp={mouseUp}
          >
            <MdDragIndicator fontSize={18} style={{rotate: '90deg'}} />
          </StyledDragButtonW>
          <StyledGeneralFormWrapper>
            <>
              <Question questionIdx={idx} />
            </>
          </StyledGeneralFormWrapper>
        </StyledGeneralFormContainer>
      ))}
    </StyledFormWrapper>
  );
};

export default QuestionList;

const StyledFormWrapper = styled.div`
  padding-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
`;

const StyledSelectedLine = styled.div`
  left: 0px;
  position: absolute;
  width: 8px;
  height: 100%;
  background-color: blue;
`;
