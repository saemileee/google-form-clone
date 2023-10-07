import styled from 'styled-components';
import {color} from '../../styles/variables.ts/color';

const SubmitButton = () => {
  return <FormSubmitButton>Submit</FormSubmitButton>;
};

export default SubmitButton;

const FormSubmitButton = styled.button`
  padding: 12px 28px 12px 32px;
  background-color: ${color.primary};
  color: white;
  border-radius: 4px;
  font-size: 13pt;
`;
