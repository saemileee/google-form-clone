import {AiOutlineClear, AiOutlineEye} from 'react-icons/ai';
import {BsSave} from 'react-icons/bs';
import styled from 'styled-components';
import {StyledMenuButton} from '../styles/Form';
import {color} from '../styles/variables.ts/color';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store/store';
import {clearPostForm, saveSurveyForm} from '../features/surveyPostSlice';

const Header = () => {
  const saveTime = useSelector((state: RootState) => state.questionForm.saveTime);

  const dispatch = useDispatch();

  const saveForm = () => {
    dispatch(saveSurveyForm());
  };

  const clearForm = () => {
    if (window.confirm('모든 폼이 초기화됩니다.')) {
      dispatch(clearPostForm());
    }
  };
  const openPreviewTab = () => {
    dispatch(saveSurveyForm());
    window.open(
      `${window.location.origin}${window.location.pathname}preview`,
      '_blank',
      'noopener, noreferrer'
    );
  };

  return (
    <StyledHeaderContainer>
      <div>
        <h1>Survey form</h1>
        {saveTime && (
          <div>
            <span>마지막 임시저장: {saveTime}</span>
            <StyledMenuButton
              aria-label='save'
              name='save'
              $tooltipPosition='bottom'
              onClick={saveForm}
            >
              <BsSave size={18} />
            </StyledMenuButton>
          </div>
        )}
      </div>
      <div>
        <StyledMenuButton
          aria-label='clear-all'
          name='clear'
          $tooltipPosition='bottom'
          onClick={clearForm}
        >
          <AiOutlineClear size={24} />
        </StyledMenuButton>
        <StyledMenuButton
          aria-label='preview-form'
          name='preview'
          $tooltipPosition='bottom'
          onClick={openPreviewTab}
        >
          <AiOutlineEye size={24} />
        </StyledMenuButton>
      </div>
    </StyledHeaderContainer>
  );
};

export default Header;

const StyledHeaderContainer = styled.header`
  position: fixed;
  z-index: 999;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 24px 12px 24px;
  width: 100vw;
  background-color: white;
  box-shadow: 0 0 4px ${color.lightgrey};
  div {
    display: flex;
    align-items: center;
    gap: 24px;
    h1 {
      font-size: 15pt;
      font-weight: 600;
    }
    div {
      display: flex;
      gap: 12px;
      span {
        font-size: 10pt;
      }
    }
  }
`;
