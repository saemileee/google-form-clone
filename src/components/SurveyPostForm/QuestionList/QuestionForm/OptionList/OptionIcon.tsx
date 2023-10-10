import {GrRadial} from 'react-icons/gr';
import {MdOutlineCheckBoxOutlineBlank} from 'react-icons/md';
import {QUESTION_TYPES} from '../../../../../constants/Form';
import {QuestionType} from '../../../../../interface/Form';
import {color} from '../../../../../styles/variables.ts/color';
import styled from 'styled-components';

const OptionIcon = ({type, optionIdx}: {type: QuestionType; optionIdx?: number}) => {
  const getIcon = (type: QuestionType) => {
    switch (type) {
      case QUESTION_TYPES.multipleChoice:
        return <GrRadial size={22} opacity={0.2} />;
      case QUESTION_TYPES.checkboxes:
        return <MdOutlineCheckBoxOutlineBlank size={26} opacity={0.2} />;
      case QUESTION_TYPES.dropDown:
        return optionIdx !== undefined && type === QUESTION_TYPES.dropDown ? (
          <StyledIndex>{optionIdx + 1}.</StyledIndex>
        ) : (
          <></>
        );
      default:
        return <></>;
    }
  };
  return getIcon(type);
};

export default OptionIcon;

const StyledIndex = styled.span`
  font-weight: 500;
  font-family: monospace;
  font-size: 14pt;
  opacity: 0.5;
`;
