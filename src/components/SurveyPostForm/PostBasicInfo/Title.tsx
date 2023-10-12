import {useDispatch, useSelector} from 'react-redux';
import {changeTitle} from '../../../features/surveyPostSlice';
import {RootState} from '../../../store/store';
import {StyledTitleInput} from '../../../styles/Form';
import {selectAllText} from '../../../utils/textInputControllers';

const Title = () => {
  const title = useSelector((state: RootState) => state.questionForm.title);
  const dispatch = useDispatch();

  return (
    <StyledTitleInput
      onFocus={selectAllText}
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
