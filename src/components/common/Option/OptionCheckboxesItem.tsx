import {useDispatch} from 'react-redux';
import {
  toggleOtherOption,
  toggleCheckboxOption,
  typeOtherOption,
} from '../../../features/surveyPreviewFormSlice';
import {StyledPreviewOptionWrapper, StyledQuestionTextInput} from '../../../styles/Form';
import {Option} from '../../../interface/Form';
import {selectAllText} from '../../../utils/textInputControllers';

interface OptionCheckboxesItemProps {
  questionId: string;
  optionIdx?: number;
  isForResult?: boolean;
  isOtherItem?: boolean;
  isOtherSelected?: boolean;
  option?: Option;
  other?: string;
}

const OptionCheckboxesItem = ({
  questionId,
  isForResult = false,
  isOtherItem = false,
  isOtherSelected = false,
  option = {id: questionId, isSelected: false, value: ''},
  other = '',
}: OptionCheckboxesItemProps) => {
  const dispatch = useDispatch();

  const {id, isSelected, value} = option;
  const otherItemId = `${id}-other`;

  return (
    <StyledPreviewOptionWrapper>
      <input
        disabled={isForResult}
        type='checkbox'
        id={isOtherItem ? otherItemId : id}
        name={isOtherItem ? otherItemId : id}
        aria-label={value}
        value={value}
        onChange={
          isOtherItem
            ? () => dispatch(toggleOtherOption({questionId}))
            : () => dispatch(toggleCheckboxOption({questionId, selectedId: id}))
        }
        checked={isOtherItem ? isOtherSelected : isSelected}
      />
      {isOtherItem ? (
        <span>
          <label htmlFor={otherItemId}>Other: </label>
          <StyledQuestionTextInput
            id={otherItemId}
            name={otherItemId}
            disabled={isForResult}
            value={other}
            type='text'
            onChange={e => dispatch(typeOtherOption({questionId, value: e.target.value}))}
            onFocus={selectAllText}
          />
        </span>
      ) : (
        <label htmlFor={isOtherItem ? otherItemId : id}>{value}</label>
      )}
    </StyledPreviewOptionWrapper>
  );
};

export default OptionCheckboxesItem;
