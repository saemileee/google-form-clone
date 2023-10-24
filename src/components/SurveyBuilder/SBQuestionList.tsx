import {MdDragIndicator} from 'react-icons/md';
import {useSelector, useDispatch} from 'react-redux';
import styled from 'styled-components';
import {focusQuestion, resortQuestions} from '../../features/surveyBuilderSlice';
import useSortableDragNDrop from '../../hooks/useSortableDragNDrop';
import useTempSave from '../../hooks/useTempSave';
import {RootState} from '../../store/store';
import {StyledFormWrapper, StyledGeneralFormContainer, StyledDragButtonW} from '../../styles/Form';
import {color} from '../../styles/variables.ts/color';
import SBSidePanel from './SBSidePanel';
import SBQuestion from './SBQuestion';

const SBQuestionList = () => {
  const questions = useSelector((state: RootState) => state.surveyBuilder.questions);
  const dispatch = useDispatch();
  const saveTempForm = useTempSave();
  const {isDraggable, startDrag, enterTarget, setResortedList, mouseDown, mouseUp} =
    useSortableDragNDrop(questions);

  const onSelectedQuestion = (e: React.MouseEvent<HTMLDivElement>, id: string) => {
    dispatch(focusQuestion({questionId: id}));
    saveTempForm();
  };

  const endSorting = () => {
    setResortedList(list => dispatch(resortQuestions({questions: list})));
    saveTempForm();
  };

  return (
    <StyledQuestionListWrapper>
      <StyledQuestionList>
        {questions.map((question, idx) => (
          <StyledGeneralFormContainer
            selected={question.isFocused}
            key={question.id}
            onClick={e => !question.isFocused && onSelectedQuestion(e, question.id)}
            draggable={isDraggable}
            onDragStart={() => startDrag(idx)}
            onDragEnter={() => enterTarget(idx)}
            onDragEnd={endSorting}
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
            <SBQuestion questionForm={question} />
          </StyledGeneralFormContainer>
        ))}
      </StyledQuestionList>
      <SBSidePanel />
    </StyledQuestionListWrapper>
  );
};

export default SBQuestionList;

const StyledSelectedLine = styled.div`
  left: 0px;
  position: absolute;
  width: 8px;
  height: 100%;
  background-color: ${color.primary};
  border-radius: 8px 0 0 8px;
`;

const StyledQuestionListWrapper = styled.div`
  position: relative;
  margin-top: 24px;
  display: flex;
  gap: 18px;
  width: 108.5%;
`;

const StyledQuestionList = styled.div`
  position: relative;
  display: flex;
  gap: 18px;
  flex-direction: column;
  width: 100%;
`;
