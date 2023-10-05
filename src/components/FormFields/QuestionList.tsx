import {useDispatch, useSelector} from 'react-redux';
import Question from '../FormFields/Question';
import {RootState} from '../../store/store';
import useSortableDragNDrop from '../../hooks/useSortableDragNDrop';
import {resortQuestions, selectQuestion} from '../../features/questionFormSlice';
import QuestionAddButton from './QuestionAddButton';

const QuestionList = () => {
    const questions = useSelector((state: RootState) => state.questionForm.questions);
    const dispatch = useDispatch();
    const {isDraggable, startDrag, enterTarget, getResortedList, mouseDown, mouseUp} =
        useSortableDragNDrop(questions);
    return (
        <>
            <QuestionAddButton />
            {questions.map((question, idx) => (
                <div
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
                    <p>{question.isSelected && 'selected'}</p>
                    <button onMouseDown={mouseDown} onMouseUp={mouseUp}>
                        drag section
                    </button>
                    <div>
                        <Question questionIdx={idx} />
                    </div>
                </div>
            ))}
        </>
    );
};

export default QuestionList;
