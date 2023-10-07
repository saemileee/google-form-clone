import {useDispatch, useSelector} from 'react-redux';
import QuestionForm from './QuestionForm';
import {RootState} from '../../store/store';
import useSortableDragNDrop from '../../hooks/useSortableDragNDrop';
import {resortQuestions, selectQuestion} from '../../features/questionFormSlice';
import styled from 'styled-components';
import {
  StyledDragButtonW,
  StyledGeneralFormContainer,
  StyledGeneralFormWrapper,
} from '../../styles/Form';
import {MdDragIndicator} from 'react-icons/md';
import SideMenu from './SideMenu';
import React, {useEffect, useRef, useState} from 'react';

const QuestionList = () => {
  const questions = useSelector((state: RootState) => state.questionForm.questions);
  const dispatch = useDispatch();

  const [sideMenuTopValue, setSideMenuTopValue] = useState(0);

  const questionListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (questionListRef.current) {
      setSideMenuTopValue(questionListRef.current.offsetTop);
    }
  }, []);

  const onSelectedQuestion = (e: React.MouseEvent<HTMLDivElement>, idx: number) => {
    dispatch(selectQuestion({questionIdx: idx}));
    setSideMenuTopValue(e.currentTarget.offsetTop);
  };

  const {isDraggable, startDrag, enterTarget, getResortedList, mouseDown, mouseUp} =
    useSortableDragNDrop(questions);

  return (
    <StyledFormWrapper ref={questionListRef}>
      <SideMenu topValue={sideMenuTopValue} />
      {questions.map((question, idx) => (
        <StyledGeneralFormContainer
          selected={question.isSelected}
          key={idx}
          onClick={e => onSelectedQuestion(e, idx)}
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
          <StyledQuestionFormWrapper>
            <QuestionForm questionIdx={idx} />
          </StyledQuestionFormWrapper>
        </StyledGeneralFormContainer>
      ))}
    </StyledFormWrapper>
  );
};

export default QuestionList;

const StyledFormWrapper = styled.div`
  position: relative;
  padding-top: 12px;
  display: flex;
  gap: 18px;
  flex-direction: column;
  width: 100%;
`;

const StyledSelectedLine = styled.div`
  left: 0px;
  position: absolute;
  width: 8px;
  height: 100%;
  background-color: blue;
  border-radius: 8px 0 0 8px;
`;

const StyledQuestionFormWrapper = styled(StyledGeneralFormWrapper)`
  padding: 0;
`;
