import styled from 'styled-components';
import {QUESTION_TYPES} from '../../../constants/Form';

import TextTypeForm from '../PostGlobal/TextTypeForm';
import {Question} from '../../../interface/Form';
import OptionalItemList from './OptionalItemList';

const OptionList = ({questionForm}: {questionForm: Question}) => {
  const {type} = questionForm;

  const isOptionalType =
    type === QUESTION_TYPES.multipleChoice ||
    type === QUESTION_TYPES.checkboxes ||
    type === QUESTION_TYPES.dropDown;

  return (
    <StyledOptionList>
      {type === QUESTION_TYPES.shortAnswer && <TextTypeForm type={QUESTION_TYPES.shortAnswer} />}
      {type === QUESTION_TYPES.paragraph && <TextTypeForm type={QUESTION_TYPES.paragraph} />}
      {isOptionalType && <OptionalItemList questionForm={questionForm} />}
    </StyledOptionList>
  );
};

const StyledOptionList = styled.div`
  margin-left: 6px;
  margin-right: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
export default OptionList;
