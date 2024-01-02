import { Text } from 'components';
import { DeleteButton, TodoWrapper } from './Todo.styled';
import { RiDeleteBinLine } from 'react-icons/ri';

export const Todo = ({ description, index, deleteTodo, id }) => {
  return (
    <>
      <TodoWrapper>
        <Text textAlign="center" marginBottom="20px">
          TODO #{index}
        </Text>
        <Text>{description}</Text>
        <DeleteButton type="button" onClick={() => deleteTodo(id)}>
          <RiDeleteBinLine size={24} />
        </DeleteButton>
      </TodoWrapper>
    </>
  );
};
