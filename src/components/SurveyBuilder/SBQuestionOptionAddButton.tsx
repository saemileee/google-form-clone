import {useDispatch} from 'react-redux';
import styled from 'styled-components';
import {addQuestionOption, addOtherOption} from '../../features/surveyBuilderSlice';
import useTempSave from '../../hooks/useTempSave';
import {QuestionType} from '../../interface/Form';
import {StyledOptionWrapper} from '../../styles/Form';
import {color} from '../../styles/variables.ts/color';
import SBQuestionOptionIcon from './SBQuestionOptionIcon';

const SBQuestionOptionAddButton = ({
  type,
  optionIdx,
  questionId,
  isOtherActive,
  isOtherOptionSelectable,
}: {
  type: QuestionType;
  optionIdx: number;
  questionId: string;
  isOtherActive: boolean;
  isOtherOptionSelectable: boolean;
}) => {
  const dispatch = useDispatch();
  const saveTempForm = useTempSave();

  const addQuestionOptionItem = () => {
    dispatch(addQuestionOption({questionId}));
    saveTempForm();
  };

  const addOtherOptionItem = () => {
    dispatch(addOtherOption({questionId}));
    saveTempForm();
  };

  return (
    <StyledAddOptionWrapper>
      <SBQuestionOptionIcon type={type} optionIdx={optionIdx} />
      <button
        aria-label='add-option'
        name='add-option'
        className='add-option'
        onClick={addQuestionOptionItem}
      >
        Add option
      </button>
      {!isOtherActive && isOtherOptionSelectable && (
        <span>
          {' '}
          or
          <button
            aria-label='add-other'
            name='add-other'
            onClick={addOtherOptionItem}
            className='add-other'
          >
            add "Other"
          </button>
        </span>
      )}
    </StyledAddOptionWrapper>
  );
};

export default SBQuestionOptionAddButton;

const StyledAddOptionWrapper = styled(StyledOptionWrapper)`
  padding: 0 24px 0 24px;
  box-sizing: border-box;
  height: 34px;
  span {
    padding-top: 4px;
  }

  button {
    font-size: 12pt;
  }

  .add-option {
    padding: 2px 0 2px 0;
    color: ${color.primary};
    &:hover {
      cursor: text;
      border-bottom: 1px solid ${color.lightgrey};
      margin-bottom: -1px;
    }
  }
  .add-other {
    color: ${color.primary};
  }
`;
