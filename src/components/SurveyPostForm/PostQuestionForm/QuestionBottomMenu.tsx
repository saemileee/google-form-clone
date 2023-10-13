import {useDispatch, useSelector} from 'react-redux';
import {BiDuplicate} from 'react-icons/bi';
import {RiDeleteBinLine} from 'react-icons/ri';
import styled from 'styled-components';
import {duplicateQuestion, deleteQuestion, toggleRequired} from '../../../features/surveyPostSlice';
import {RootState} from '../../../store/store';
import {StyledMenuButton} from '../../../styles/Form';
import {color} from '../../../styles/variables.ts/color';
import Toggle from './Toggle';

const QuestionBottomMenu = ({
  questionId,
  isRequired,
}: {
  questionId: string;
  isRequired: boolean;
}) => {
  const dispatch = useDispatch();

  return (
    <StyledMenuWrapper>
      <StyledMenuButton
        name='duplicate'
        aria-label='duplicate-question'
        $tooltipPosition='bottom'
        onClick={() => {
          dispatch(duplicateQuestion({questionId}));
        }}
      >
        <BiDuplicate size={22} />
      </StyledMenuButton>
      <StyledMenuButton
        name='delete'
        aria-label='delete-question'
        $tooltipPosition='bottom'
        onClick={e => {
          e.stopPropagation();
          dispatch(deleteQuestion({questionId}));
        }}
      >
        <RiDeleteBinLine size={22} />
      </StyledMenuButton>
      <div className='divider'></div>
      <Toggle isActive={isRequired} toggleHandler={() => dispatch(toggleRequired({questionId}))} />
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
