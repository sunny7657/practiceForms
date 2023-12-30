import { RiSaveLine } from 'react-icons/ri';
import { MdOutlineCancel } from 'react-icons/md';

import { SearchFormStyled, FormBtn, InputSearch } from 'components';
import { BtnEdit } from './EditForm.styled';
// {
//   onUpdate,    onCancel, onChange, currentTodo;
// }
export const EditForm = () => {
  return (
    <SearchFormStyled>
      <BtnEdit type="button">
        <MdOutlineCancel size="16px" color="red" />
      </BtnEdit>

      <FormBtn type="submit">
        <RiSaveLine size="16px" color="green" />
      </FormBtn>

      <InputSearch
        placeholder="EDIT TODO"
        name="edit"
        required
        // defaultValue={currentTodo.text}
        autoFocus
      />
    </SearchFormStyled>
  );
};
