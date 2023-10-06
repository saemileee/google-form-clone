import {QuestionType} from '../../interface/Form';
import {GrRadial} from 'react-icons/gr';
import {MdOutlineCheckBoxOutlineBlank} from 'react-icons/md';
import {QUESTION_TYPES} from '../../constants/Form';

const TypeIcon = ({type, optionIdx}: {type: QuestionType; optionIdx?: number}) => {
  return (
    <span>
      {type === QUESTION_TYPES.multipleChoice ? (
        <GrRadial size={22} />
      ) : type === QUESTION_TYPES.checkboxes ? (
        <MdOutlineCheckBoxOutlineBlank size={26} />
      ) : optionIdx !== undefined && type === QUESTION_TYPES.dropDown ? (
        <span>{optionIdx + 1}.</span>
      ) : (
        <></>
      )}
    </span>
  );
};

export default TypeIcon;
