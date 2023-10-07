import {QuestionType} from '../../interface/Form';
import {GrRadial} from 'react-icons/gr';
import {MdOutlineCheckBoxOutlineBlank} from 'react-icons/md';
import {QUESTION_TYPES} from '../../constants/Form';

const TypeIcon = ({type, optionIdx}: {type: QuestionType; optionIdx?: number}) => {
  const getIcon = (type: QuestionType) => {
    switch (type) {
      case QUESTION_TYPES.multipleChoice:
        return <GrRadial size={22} />;
      case QUESTION_TYPES.checkboxes:
        return <MdOutlineCheckBoxOutlineBlank size={26} />;
      case QUESTION_TYPES.dropDown:
        return optionIdx !== undefined && type === QUESTION_TYPES.dropDown ? (
          <span>{optionIdx + 1}.</span>
        ) : (
          <></>
        );
      default:
        return <></>;
    }
  };
  return getIcon(type);
};

export default TypeIcon;
