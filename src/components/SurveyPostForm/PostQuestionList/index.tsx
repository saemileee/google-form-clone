import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../store/store';
import {useEffect, useRef, useState} from 'react';
import {MdDragIndicator} from 'react-icons/md';
import styled from 'styled-components';
import {focusQuestion, resortQuestions} from '../../../features/surveyPostSlice';
import useSortableDragNDrop from '../../../hooks/useSortableDragNDrop';
import {
  StyledFormWrapper,
  StyledGeneralFormContainer,
  StyledDragButtonW,
} from '../../../styles/Form';
import {color} from '../../../styles/variables.ts/color';
import SideMenu from '../SideMenu';
import PostQuestionForm from '../PostQuestionForm';

const QuestionList = () => {
  const questions = useSelector((state: RootState) => state.questionForm.questions);
  const dispatch = useDispatch();

  const [sideMenuTopValue, setSideMenuTopValue] = useState(0);

  const questionListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (questionListRef.current) {
      setSideMenuTopValue(questionListRef.current.clientTop);
    }
  }, []);

  const onSelectedQuestion = (e: React.MouseEvent<HTMLDivElement>, id: string) => {
    dispatch(focusQuestion({questionId: id}));
    setSideMenuTopValue(e.currentTarget.offsetTop);
  };

  const {isDraggable, startDrag, enterTarget, setResortedList, mouseDown, mouseUp} =
    useSortableDragNDrop(questions);

  return (
    <StyledFormWrapper ref={questionListRef}>
      <SideMenu topValue={sideMenuTopValue} />
      {questions.map((question, idx) => (
        <StyledGeneralFormContainer
          selected={question.isFocused}
          key={question.id}
          onClick={e => !question.isFocused && onSelectedQuestion(e, question.id)}
          draggable={isDraggable}
          onDragStart={() => startDrag(idx)}
          onDragEnter={() => enterTarget(idx)}
          onDragEnd={() => {
            setResortedList(list => dispatch(resortQuestions({questions: list})));
          }}
        >
          {question.isFocused && <StyledSelectedLine />}
          <StyledDragButtonW
            aria-label='move-question'
            selected={question.isFocused}
            onMouseDown={mouseDown}
            onMouseUp={mouseUp}
          >
            <MdDragIndicator fontSize={18} style={{rotate: '90deg'}} />
          </StyledDragButtonW>
          <PostQuestionForm questionForm={question} />
        </StyledGeneralFormContainer>
      ))}
    </StyledFormWrapper>
  );
};

export default QuestionList;

const StyledSelectedLine = styled.div`
  left: 0px;
  position: absolute;
  width: 8px;
  height: 100%;
  background-color: ${color.primary};
  border-radius: 8px 0 0 8px;
`;
