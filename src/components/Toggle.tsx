import styled from 'styled-components';

interface ToggleProps<T> {
  isActive: boolean;
  toggleHandler: () => T;
}

const Toggle = <T extends object>({isActive, toggleHandler}: ToggleProps<T>) => {
  return (
    <div onClick={() => toggleHandler()}>
      <StyledToggleLabel>
        <span>Required</span>
      </StyledToggleLabel>
      <StyledToggleEl>
        <StyledToggleTrack $active={isActive} />
        <StyledToggleInk className='toggle-ink ' $active={isActive} />
        <StyledToggleCircles $active={isActive}>
          <StyledToggleThumb $active={isActive} />
        </StyledToggleCircles>
      </StyledToggleEl>
    </div>
  );
};

interface Toggle {
  $active: boolean;
}
const StyledToggleLabel = styled.label`
  & > span {
    font-family: Roboto, Arial, sans-serif;
    font-size: 14px;
    font-weight: 400;
    letter-spacing: 0.2px;
    line-height: 20px;
    color: #202124;
    cursor: default;
    margin-right: 12px;
  }
`;
const StyledToggleEl = styled.div`
  box-sizing: content-box;
  cursor: pointer;
  display: inline-block;
  height: 20px;
  outline: none;
  position: relative;
  vertical-align: middle;
  width: 37px;
  div {
    box-sizing: content-box;
  }
  &:hover {
    .toggle-ink {
      opacity: 0.1;
    }
  }
`;

const StyledToggleTrack = styled.div<Toggle>`
  transition: border-color 0.3s ease;
  border: 7px solid #b9b9b9;
  border-radius: 7px;
  position: absolute;
  top: 3px;
  width: 23px;
  border-color: ${props => (props.$active ? 'rgba(219,68,55,0.25)' : '#b9b9b9')};
`;

const StyledToggleInk = styled.div<Toggle>`
  transition:
    opacity 0.15s ease,
    left 0.3s ease,
    background-color 0.3 ease;
  background-color: ${props => (props.$active ? 'rgba(219,68,55,0.5)' : 'rgba(0,0,0,0.2)')};
  border-radius: 100%;
  height: 20px;
  left: ${props => (props.$active ? '17px' : '0')};
  outline: 0.1px solid transparent;
  pointer-events: none;
  position: absolute;
  width: 20px;
  z-index: 0;
  transform: scale(2);
`;

const StyledToggleCircles = styled.div<Toggle>`
  transition: transform 0.06s ease;
  transform: ${props => (props.$active ? 'translateX(17px)' : '0')};
`;

const StyledToggleThumb = styled.div<Toggle>`
  transition: border-color 0.3s ease;
  border: 10px solid #fafafa;
  border-radius: 100%;
  position: absolute;
  box-shadow: 0px 1px 3px rgb(0 0 0 / 40%);
  border-color: ${props => (props.$active ? 'rgb(219,68,55)' : 'white')};
`;

export default Toggle;
