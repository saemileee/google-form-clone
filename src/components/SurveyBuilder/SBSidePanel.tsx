import {MdAddCircleOutline} from 'react-icons/md';
import {useDispatch} from 'react-redux';
import styled from 'styled-components';
import {addQuestion} from '../../features/surveyBuilderSlice';
import {StyledMenuButton} from '../../styles/Form';

const SBSidePanel = () => {
  const dispatch = useDispatch();

  return (
    <SideMenuWrapper>
      <StyledMenuButton
        aria-label='add-question'
        name='add'
        $tooltipPosition='right'
        onClick={() => dispatch(addQuestion())}
      >
        <MdAddCircleOutline size={24} />
      </StyledMenuButton>
    </SideMenuWrapper>
  );
};
export default SBSidePanel;

const SideMenuWrapper = styled.div`
  position: sticky;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 48px;
  background-color: #fff;
  border: 1px solid #dadce0;
  border-radius: 8px;
  top: 300px;
  padding: 6px 0;
`;
