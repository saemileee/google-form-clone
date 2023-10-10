import styled from 'styled-components';
import {color} from './variables.ts/color';

interface StyledGeneralFormContainerProps {
  selected?: boolean;
  $padding?: number;
  $gap?: number;
}

// NOTE: Wrappers
export const StyledGeneralFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  box-sizing: border-box;
  padding: 18px;
`;

export const StyledGeneralFormContainer = styled.div<StyledGeneralFormContainerProps>`
  overflow: visible;
  position: relative;
  border: ${props => (props.selected ? `` : `1px solid ${color.lightgrey}`)};
  border-radius: 8px;
  background-color: white;
  box-shadow: ${props => (props.selected ? `0px 0px 5px ${color.textGrey}` : '')};
  padding: ${props => `${props.$padding}px`};
  display: flex;
  flex-direction: column;
  gap: ${props => `${props.$gap}px`};
  &:hover {
    .question-form-drag-button {
      visibility: visible;
    }
  }
`;

export const StyledFormWrapper = styled.div`
  position: relative;
  margin-top: 24px;
  display: flex;
  gap: 18px;
  flex-direction: column;
  width: 100%;
`;

export const StyledSurveyContainer = styled.div`
  margin: 0 auto;
  padding: 2rem;
  padding-top: 100px;
  padding-bottom: 48px;

  @media screen and (min-width: 768px) {
    width: 768px;
  }
`;

interface StyledQuestionWrapperProps {
  $padding?: number;
}

export const StyledQuestionWrapper = styled.div<StyledQuestionWrapperProps>`
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding-bottom: 12px;
  padding: ${props => `${props.$padding}px`};
  width: 100%;
`;

export const StyledOptionWrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;

  span {
    padding-top: 4px;
  }
`;

export const StyledPreviewOptionWrapper = styled.div`
  width: 100%;
  height: 24px;
  box-sizing: border-box;
  input[type='radio'],
  input[type='checkbox'] {
    -ms-transform: scale(1.5); /* IE 9 */
    -webkit-transform: scale(1.5); /* Chrome, Safari, Opera */
    transform: scale(1.5);
    margin-right: 12px;
  }
`;

export const StyledOptionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  font-size: 13pt;
`;

export const StyledDefaultSelectBox = styled.select`
  padding: 12px;
  width: 300px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background: url('/assets/arrow-down-filled-triangle.png') no-repeat 93% 50%;
`;

// NOTE: Text Input
export const StyledTextInput = styled.input`
  padding: 8px 0 8px 0;
  width: 100%;
  border: none;
  border-radius: 4px;
  outline: none;
  font-size: 12pt;
  &:focus {
    border-bottom: 2px solid ${color.primary};
    margin-bottom: -2px;
  }
  &:hover {
    background-color: #eff2fb;
    transition: background-color 0.3s ease;
  }
`;

export const StyledPreviewTextInput = styled(StyledTextInput)`
  border-bottom: 1px dotted ${color.border};
  height: 38px;
`;

export const StyledTextArea = styled.textarea`
  box-sizing: border-box;
  padding: 8px 0 8px 0;
  width: 100%;
  min-height: 38px;
  height: 38px;
  border: none;
  outline: none;
  font-size: 12pt;
  border-bottom: 1px dotted ${color.border};

  &:focus {
    border-bottom: 2px solid ${color.primary};
    padding-bottom: -3px;
  }
`;

export const StyledTitleInput = styled.input`
  margin-top: 12px;
  padding: 12px 0 12px 0;
  height: 32px;
  font-size: 24pt;
  font-weight: 500;
  outline: none;
  border: unset;
  &:focus {
    background-color: ${color.lightgrey};
    border-bottom: 2px solid ${color.primary};
    margin-bottom: -2px;
  }
`;

export const StyledQuestionTitleInput = styled(StyledTextInput)`
  height: 26px;
  font-weight: 400;
  &.selected {
    padding: 14px;
    background-color: ${color.lightgrey};
    border-bottom: 1px solid ${color.primary};
  }
  transition: padding-bottom 0.3s ease;
`;

export const StyledQuestionTextInput = styled(StyledTextInput)`
  box-sizing: border-box;
  padding-top: 0px;
  padding-bottom: 2px;
  margin-left: 8px;
  width: 80%;
  font-weight: 400;
  border-bottom: 1px dotted ${color.lightgrey};
`;

// NOTE: Buttons
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

// NOTE: Decorations
export const StyledFormInfoLine = styled.div`
  width: 100%;
  height: 16px;
  background-color: ${color.primary};
  border-radius: 8px 8px 0 0;
`;

// NOTE: Static texts
export const StyledTitle = styled.h1`
  padding: 12px 0 12px 0;
  font-size: 24pt;
  font-weight: 500;
`;

export const StyledDescription = styled.p`
  font-size: 12pt;
  line-height: 1.4rem;
`;

export const StyledQuestionTitle = styled.h2`
  font-size: 13pt;
  font-weight: 500;
  .symbol-required {
    color: red;
  }
`;
