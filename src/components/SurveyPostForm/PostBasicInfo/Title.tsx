import {useDispatch, useSelector} from 'react-redux';
import {changeTitle} from '../../../features/surveyPostSlice';
import {RootState} from '../../../store/store';
import {StyledTitleInput} from '../../../styles/Form';
import {selectAllText} from '../../../utils/textInputControllers';
import useTempSave from '../../../hooks/useTempSave';
import React from 'react';

const Title = () => {
  const title = useSelector((state: RootState) => state.questionForm.title);
  const dispatch = useDispatch();
  const saveTempForm = useTempSave();

  const typeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch(changeTitle({value}));
    saveTempForm();
  };

  return (
    <StyledTitleInput
      aria-label='title'
      onFocus={selectAllText}
      type='text'
      value={title}
      onChange={typeTitle}
    />
  );
};

export default Title;
