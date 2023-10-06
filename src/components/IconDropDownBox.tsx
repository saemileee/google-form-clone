import {ReactNode, useEffect, useRef, useState} from 'react';
import {MdArrowDropDown} from 'react-icons/md';
import styled from 'styled-components';

interface Option {
  icon: ReactNode;
  value: string;
}

const IconDropDownBox = <T extends object>({
  options,
  defaultOption,
  valueChangeHandler,
}: {
  options: Option[];
  defaultOption: Option;
  valueChangeHandler: (value: string) => T;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(defaultOption);

  const selectOption = (option: Option) => {
    valueChangeHandler(option.value);
    setSelectedOption(option);
    setIsOpen(false);
  };

  const closeOption = () => {
    setIsOpen(false);
  };

  const optionBoxRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (isOpen && optionBoxRef.current && !optionBoxRef.current.contains(e.target as Node)) {
        closeOption();
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [isOpen, closeOption]);

  return (
    <DropdownWrapper>
      <DropdownItem onClick={() => setIsOpen(true)} ref={optionBoxRef}>
        {selectedOption.icon}
        <span className='select-box-value'>{selectedOption.value}</span>
        <MdArrowDropDown size={26} />
      </DropdownItem>
      {isOpen && (
        <DropdownList>
          {options.map(option => (
            <DropdownItem
              isOpen={isOpen}
              isSelected={selectedOption.value === option.value}
              key={`${option.value}`}
              onClick={() => selectOption(option)}
            >
              {option.icon}
              <span className='select-box-value'>{option.value}</span>
            </DropdownItem>
          ))}
        </DropdownList>
      )}
    </DropdownWrapper>
  );
};
export default IconDropDownBox;

const DropdownWrapper = styled.div`
  border-radius: 4px;
  padding: 8px;
  border: 1px solid #dadce0;
  margin-left: 35px;
  font-size: 10pt;
  font-weight: 400;
  letter-spacing: 0.2px;
  line-height: 32px;
  color: #202124;
  width: 250px;
  position: relative;
`;

const DropdownItem = styled.div<{isOpen?: boolean; isSelected?: boolean}>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  background-color: ${props => {
    if (props.isOpen) {
      return props.isSelected ? 'rgba(26,115,232,0.078)' : 'white';
    } else {
      return 'white';
    }
  }};
  .select-box-value {
    width: 100%;
  }
  &:hover {
    background-color: ${props => {
      if (props.isOpen) {
        return props.isSelected ? 'rgba(26,115,232,0.039)' : '#eeeeee';
      } else {
        return 'white';
      }
    }};
  }
`;

const DropdownList = styled.div`
  position: absolute;
  z-index: 10;
  top: -8px;
  right: -11px;
  min-width: 190px;
  width: 100%;
  padding: 8px 0;
  border-radius: 4px;
  background-color: white;
  box-shadow: 0 0 5px grey;
  div {
    padding: 8px;
  }
`;
