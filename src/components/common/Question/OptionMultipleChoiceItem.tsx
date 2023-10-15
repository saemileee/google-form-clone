import {useDispatch} from 'react-redux';
import {
  toggleMultipleOption,
  toggleOtherOption,
  typeOtherOption,
} from '../../../features/surveyPreviewSlice';
import {StyledPreviewOptionWrapper, StyledQuestionTextInput} from '../../../styles/Form';
import {selectAllText} from '../../../utils/textInputControllers';
import {Option} from '../../../interface/Form';
import {LABELS} from '../../../constants/Form';

interface OptionMultipleChoiceItemProps {
  questionId: string;
  optionIdx?: number;
  isForResult?: boolean;
  isOtherItem?: boolean;
  isOtherSelected?: boolean;
  option?: Option;
  other?: string;
}

const OptionMultipleChoiceItem = ({
  questionId,
  isForResult = false,
  isOtherItem = false,
  isOtherSelected = false,
  option = {id: questionId, isSelected: false, value: ''},
  other = '',
}: OptionMultipleChoiceItemProps) => {
  const dispatch = useDispatch();

  const {id, isSelected, value} = option;
  const otherItemId = `${id}-other`;

  return (
    <StyledPreviewOptionWrapper>
      <input
        disabled={isForResult}
        type='radio'
        id={isOtherItem ? otherItemId : id}
        name={isOtherItem ? otherItemId : id}
        aria-label={value}
        value={value}
        onClick={
          isOtherItem
            ? () => dispatch(toggleOtherOption({questionId}))
            : () => dispatch(toggleMultipleOption({questionId, selectedId: id}))
        }
        onChange={() => {
          return;
        }}
        checked={isOtherItem ? isOtherSelected : isSelected}
      />
      {isOtherItem ? (
        <span>
          <label htmlFor={otherItemId}>{LABELS.OTHER_OPTION} </label>
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

export default OptionMultipleChoiceItem;
