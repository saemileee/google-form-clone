import {useDispatch, useSelector} from 'react-redux';
import {BiDuplicate} from 'react-icons/bi';
import {RiDeleteBinLine} from 'react-icons/ri';
import styled from 'styled-components';
import {
  duplicateQuestion,
  deleteQuestion,
  toggleRequired,
} from '../../../../features/surveyPostSlice';
import {RootState} from '../../../../store/store';
import {StyledMenuButton} from '../../../../styles/Form';
import {color} from '../../../../styles/variables.ts/color';
import Toggle from './Toggle';

const QuestionBottomMenu = ({questionIdx}: {questionIdx: number}) => {
  const formData = useSelector((state: RootState) => state.questionForm.questions[questionIdx]);
  const dispatch = useDispatch();

  const {isRequired} = formData;
  return (
    <StyledMenuWrapper>
      <StyledMenuButton
        name='duplicate'
        $tooltipPosition='bottom'
        onClick={() => {
          dispatch(duplicateQuestion({questionIdx}));
        }}
      >
        <BiDuplicate size={22} />
      </StyledMenuButton>
      <StyledMenuButton
        name='delete'
        $tooltipPosition='bottom'
        onClick={e => {
          e.stopPropagation();
          dispatch(deleteQuestion({questionIdx}));
        }}
      >
        <RiDeleteBinLine size={22} />
      </StyledMenuButton>
      <div className='divider'></div>
      <Toggle isActive={isRequired} toggleHandler={() => dispatch(toggleRequired({questionIdx}))} />
    </StyledMenuWrapper>
  );
};

export default QuestionBottomMenu;

const StyledMenuWrapper = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 12px;
  padding: 20px 12px 0 12px;
  margin: 0 28px 0 28px;
  border-top: 1px solid ${color.lightgrey};
  .divider {
    margin: 0 4px 0 4px;
    width: 1px;
    height: 36px;
    background-color: ${color.lightgrey};
  }
`;
