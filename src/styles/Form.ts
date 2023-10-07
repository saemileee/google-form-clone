import styled from 'styled-components';

interface StyledGeneralFormContainerProps {
  selected?: boolean;
}
export const StyledGeneralFormContainer = styled.div<StyledGeneralFormContainerProps>`
  overflow: visible;
  position: relative;
  border: 1px solid lightgrey;
  border-radius: 8px;
  background-color: white;
  box-shadow: ${props => (props.selected ? '0px 0px 10px lightgrey' : '')};
  &:hover {
    .question-form-drag-button {
      visibility: visible;
    }
  }
  input {
    &:hover {
      border-bottom: ${props => (props.selected ? '1px solid lightgrey' : '')};
      margin-bottom: ${props => (props.selected ? '-1px' : '')};
    }
    &:focus {
      border-bottom: 2px solid blue;
      margin-bottom: -2px;
    }
  }
`;

export const StyledGeneralFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  box-sizing: border-box;
  padding: 18px;
`;

export const StyledTextInput = styled.input`
  padding: 8px 0 8px 0;
  width: 100%;
  border: none;
  outline: none;
  font-size: 12pt;
`;

export const StyledTitleInput = styled(StyledTextInput)`
  padding: 12px 0 12px 0;
  font-size: 24pt;
  font-weight: 500;
`;

export const StyledQuestionTitleInput = styled(StyledTextInput)`
  font-weight: 400;
  &.selected {
    padding: 14px;
    background-color: lightgrey;
    border-bottom: 1px solid blue;
  }
`;

interface StyledDragButtonWProps {
  selected?: boolean;
}

export const StyledDragButton = styled.button<StyledDragButtonWProps>`
  padding: 4px 0 4px 0;
  color: grey;
  cursor: all-scroll;
  visibility: ${props => (props.selected ? 'visible' : 'hidden')};
`;

StyledDragButton.shouldForwardProp = prop => prop !== 'selected';

export const StyledDragButtonW = styled(StyledDragButton)`
  width: 100%;
`;

export const StyledDragButtonH = styled(StyledDragButton)<StyledDragButtonWProps>`
  width: 24px;
  height: 100%;
`;

interface StyledMenuButtonProps {
  name: string;
  $tooltipPosition: 'bottom' | 'right';
}
export const StyledMenuButton = styled.button<StyledMenuButtonProps>`
  position: relative;
  display: flex;
  align-items: center;
  width: max-content - 2px;
  aspect-ratio: 1/1;
  border-radius: 30px;
  &:hover {
    background-color: lightgrey;
    &::after {
      content: '${props => props.name}';
      position: absolute;
      z-index: 9;
      right: ${props =>
        props.$tooltipPosition === 'bottom'
          ? '50%'
          : props.$tooltipPosition === 'right'
          ? '-4px'
          : 0};
      bottom: ${props =>
        props.$tooltipPosition === 'bottom'
          ? '-50%'
          : props.$tooltipPosition === 'right'
          ? '50%'
          : 0};
      padding: 4px 6px 4px 6px;
      border-radius: 4px;
      background-color: grey;
      transform: ${props =>
        props.$tooltipPosition === 'bottom'
          ? 'translateX(50%) translateY(25%)'
          : props.$tooltipPosition === 'right'
          ? 'translateX(100%) translateY(50%)'
          : 0};
      color: white;
    }
  }
`;

export const StyledOptionWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  span {
    padding-top: 4px;
  }
`;

export const StyledSurveyContainer = styled.div`
  margin: 0 auto;
  width: 768px;
  padding-top: 12px;
`;

export const StyledFormInfoLine = styled.div`
  width: 100%;
  height: 16px;
  background-color: blue;
  border-radius: 8px 8px 0 0;
`;

export const StyledFormWrapper = styled.div`
  position: relative;
  margin-top: 24px;
  display: flex;
  gap: 18px;
  flex-direction: column;
  width: 100%;
`;
