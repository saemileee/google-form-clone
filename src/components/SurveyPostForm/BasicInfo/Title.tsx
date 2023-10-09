import {useDispatch, useSelector} from 'react-redux';
import {changeTitle} from '../../../features/surveyPostSlice';
import {RootState} from '../../../store/store';
import {StyledTitleInput} from '../../../styles/Form';

const Title = () => {
  const title = useSelector((state: RootState) => state.questionForm.title);
  const dispatch = useDispatch();

  return (
    <StyledTitleInput
      type='text'
      value={title}
      onChange={e => {
        const value = e.target.value;
        dispatch(changeTitle({value}));
      }}
    />
  );
};

export default Title;
