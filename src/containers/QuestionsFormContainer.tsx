import {useSelector} from 'react-redux';
import Description from '../components/FormFields/Description';
import Question from '../components/FormFields/Question';
import Title from '../components/FormFields/Title';
import {RootState} from '../store/store';

const QuestionsFormContainer = () => {
    const questionForm = useSelector((state: RootState) => state.questionForm);
    const {questions} = questionForm;
    return (
        <>
            <h1>QuestionsFormContainer</h1>
            <Title />
            <Description />
            {questions.map((_, idx) => (
                <Question key={idx} idx={idx} />
            ))}
        </>
    );
};

export default QuestionsFormContainer;
