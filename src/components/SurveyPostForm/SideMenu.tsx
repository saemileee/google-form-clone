import {MdAddCircleOutline} from 'react-icons/md';
import {useDispatch} from 'react-redux';
import styled from 'styled-components';
import {addQuestion} from '../../features/surveyPostSlice';
import {StyledMenuButton} from '../../styles/Form';

const SideMenu = ({topValue = 0}) => {
  const dispatch = useDispatch();

  return (
    <SideMenuWrapper $topValue={topValue}>
      <StyledMenuButton name='add' $tooltipPosition='right' onClick={() => dispatch(addQuestion())}>
        <MdAddCircleOutline size={24} />
      </StyledMenuButton>
    </SideMenuWrapper>
  );
};
export default SideMenu;

const SideMenuWrapper = styled.div<{$topValue: number}>`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 48px;
  box-shadow:
    0 2px 1px -1px rgb(0 0 0 / 20%),
    0 1px 1px 0 rgb(0 0 0 / 14%),
    0 1px 3px 0 rgb(0 0 0 / 12%);
  transition: all 280ms cubic-bezier(0.4, 0, 0.2, 1);
  background-color: #fff;
  border: 1px solid #dadce0;
  border-radius: 8px;
  top: 0;
  right: -80px;
  padding: 6px 0;
  transform: ${props => `translateY(${props.$topValue}px)`};
`;
