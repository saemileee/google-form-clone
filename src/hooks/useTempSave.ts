import {useDispatch} from 'react-redux';
import {saveSurveyForm, saveTempTimer} from '../features/surveyBuilderSlice';

const DEBOUNCE_TIME = 1000 * 5;

const useTempSave = () => {
  const dispatch = useDispatch();

  const saveTempForm = () => {
    dispatch(
      saveTempTimer(
        setTimeout(() => {
          dispatch(saveSurveyForm());
        }, DEBOUNCE_TIME)
      )
    );
  };

  return saveTempForm;
};

export default useTempSave;
