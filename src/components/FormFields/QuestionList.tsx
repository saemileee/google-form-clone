import {useDispatch, useSelector} from 'react-redux';
import Question from '../FormFields/Question';
import {RootState} from '../../store/store';
import useSortableDragNDrop from '../../hooks/useSortableDragNDrop';
import {resortQuestions} from '../../features/questionFormSlice';
import QuestionAddButton from './QuestionAddButton';

const QuestionList = () => {
    const questions = useSelector((state: RootState) => state.questionForm.questions);
    const dispatch = useDispatch();
    const {isDraggable, startDrag, enterTarget, getResortedList, mouseDown, mouseUp} =
        useSortableDragNDrop(questions);
    return (
        <>
            <QuestionAddButton />
            {questions.map((_, idx) => (
                <div
                    draggable={isDraggable}
                    onDragStart={() => startDrag(idx)}
                    onDragEnter={() => enterTarget(idx)}
                    onDragEnd={() => {
                        const questions = getResortedList();
                        dispatch(resortQuestions({questions}));
                    }}
                >
                    <button onMouseDown={mouseDown} onMouseUp={mouseUp}>
                        drag section
                    </button>
                    <div>
                        <Question key={idx} questionIdx={idx} />
                    </div>
                </div>
            ))}
        </>
    );
};

export default QuestionList;
