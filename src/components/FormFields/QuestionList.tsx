import {useSelector} from 'react-redux';
import Question from '../FormFields/Question';
import {RootState} from '../../store/store';

const QuestionList = () => {
    const questions = useSelector((state: RootState) => state.questionForm.questions);
    return (
        <>
            {questions.map((_, idx) => (
                <Question key={idx} idx={idx} />
            ))}
        </>
    );
};

export default QuestionList;
