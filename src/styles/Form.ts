import styled from 'styled-components';
import {color} from './variables.ts/color';

interface StyledGeneralFormContainerProps {
  selected?: boolean;
  $padding?: number;
  $gap?: number;
}
export const StyledGeneralFormContainer = styled.div<StyledGeneralFormContainerProps>`
  overflow: visible;
  position: relative;
  border: 1px solid ${color.lightgrey};
  border-radius: 8px;
  background-color: white;
  box-shadow: ${props => (props.selected ? '0px 0px 10px ${color.lightgrey}' : '')};
  padding: ${props => `${props.$padding}px`};
  display: flex;
  flex-direction: column;
  gap: ${props => `${props.$gap}px`};
  &:hover {
    .question-form-drag-button {
      visibility: visible;
    }
  }
  input {
    &:hover {
      border-bottom: ${props => (props.selected ? '1px solid ${color.lightgrey}' : '')};
      margin-bottom: ${props => (props.selected ? '-1px' : '')};
    }
    &:focus {
      border-bottom: 2px solid ${color.primary};
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

  &:focus {
    border-bottom: 2px solid ${color.primary};
    margin-bottom: -2px;
  }
`;

export const StyledPreviewTextInput = styled(StyledTextInput)`
  border-bottom: 1px dotted ${color.border};
`;

export const StyledTextArea = styled.textarea`
  padding: 8px 0 8px 0;
  width: 100%;
  border: none;
  outline: none;
  font-size: 12pt;
  border-bottom: 1px dotted ${color.border};

  &:focus {
    border-bottom: 2px solid ${color.primary};
    margin-bottom: -2px;
  }
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
    background-color: ${color.lightgrey};
    border-bottom: 1px solid ${color.primary};
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
    background-color: ${color.lightgrey};
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
  padding-top: 24px;
  padding-bottom: 48px;
`;

export const StyledFormInfoLine = styled.div`
  width: 100%;
  height: 16px;
  background-color: ${color.primary};
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

export const StyledTitle = styled.h1`
  padding: 12px 0 12px 0;
  font-size: 24pt;
  font-weight: 500;
`;

export const StyledDescription = styled.p`
  font-size: 12pt;
  line-height: 1.4rem;
`;

interface StyledQuestionWrapperProps {
  $padding?: number;
}

export const StyledQuestionWrapper = styled.div<StyledQuestionWrapperProps>`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-bottom: 12px;
  padding: ${props => `${props.$padding}px`};
  width: 100%;
`;

export const StyledQuestionTitle = styled.h2`
  font-size: 13pt;
  .symbol-required {
    color: red;
  }
`;

export const StyledOptionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  font-size: 13pt;
`;

export const StyledPreviewOptionWrapper = styled.div`
  width: 100%;
  box-sizing: border-box;
  input[type='radio'],
  input[type='checkbox'] {
    -ms-transform: scale(1.5); /* IE 9 */
    -webkit-transform: scale(1.5); /* Chrome, Safari, Opera */
    transform: scale(1.5);
    margin-right: 12px;
  }
`;

export const StyledQuestionTextInput = styled(StyledTextInput)`
  padding-top: 0px;
  padding-bottom: 2px;
  margin-left: 8px;
  width: 80%;
  font-weight: 400;
  border-bottom: 1px dotted ${color.lightgrey};

  &.selected {
    border-bottom: 1px solid ${color.primary};
  }
`;

export const StyledDefaultSelectBox = styled.select`
  padding: 12px;
  width: 300px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background: url('/assets/arrow-down-filled-triangle.png') no-repeat 93% 50%;
`;
