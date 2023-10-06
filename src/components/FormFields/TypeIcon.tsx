import {QuestionType} from '../../interface/Form';
import {GrRadialSelected} from 'react-icons/gr';
import {MdOutlineCheckBox, MdShortText, MdSubject} from 'react-icons/md';
import {QUESTION_TYPES} from '../../constants/Form';
import {IoIosArrowDropdown} from 'react-icons/io';

const TypeIcon = ({type}: {type: QuestionType; optionIdx?: number}) => {
  const getIcon = (type: QuestionType) => {
    switch (type) {
      case QUESTION_TYPES.shortAnswer:
        return <MdShortText size={22} />;
      case QUESTION_TYPES.paragraph:
        return <MdSubject size={22} />;
      case QUESTION_TYPES.multipleChoice:
        return <GrRadialSelected size={20} />;
      case QUESTION_TYPES.checkboxes:
        return <MdOutlineCheckBox size={22} />;
      case QUESTION_TYPES.dropDown:
        return <IoIosArrowDropdown size={22} />;
      default:
        return <></>;
    }
  };
  return getIcon(type);
};

export default TypeIcon;
