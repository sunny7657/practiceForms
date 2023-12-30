import { Text } from 'components';
import { TodoWrapper, DeleteButton, EditButton } from './Todo.styled';
import { RiDeleteBinLine, RiEdit2Line } from 'react-icons/ri';

export const Todo = ({ id, text, index, deleteTodo, editTodo }) => {
  const handleDel = () => {
    deleteTodo(id);
  };
  const handleEdit = () => {
    editTodo(id);
  };
  return (
    <>
      {/* <h2>Todo</h2> */}
      <TodoWrapper>
        <Text textAlign="center" marginBottom="20px">
          TODO #{index + 1}
        </Text>
        <Text>{text}</Text>
        <EditButton type="button" onClick={handleEdit}>
          <RiEdit2Line size={24} />
        </EditButton>
        <DeleteButton type="button" onClick={handleDel}>
          <RiDeleteBinLine size={24} />
        </DeleteButton>
      </TodoWrapper>
    </>
  );
};
