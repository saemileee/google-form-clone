import {useDispatch} from 'react-redux';
import {addQuestion} from '../../features/questionFormSlice';

const QuestionAddButton = () => {
    const dispatch = useDispatch();
    return <button onClick={() => dispatch(addQuestion())}>+</button>;
};

export default QuestionAddButton;
