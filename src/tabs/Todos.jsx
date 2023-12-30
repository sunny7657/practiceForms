import { Component } from 'react';
import { nanoid } from 'nanoid';
import { Grid, GridItem, SearchForm, EditForm, Text, Todo } from 'components';

export class Todos extends Component {
  state = {
    todos: [],
    isEditing: false,
    currentTodo: {},
  };
  handlSubmits = data => {
    const newTodo = {
      text: data,
      id: nanoid(),
    };
    const { todos } = this.state;
    const findTodo = text => text.text.toLowerCase() === data.toLowerCase();

    if (todos.some(findTodo)) {
      return alert(`${data} is already in contacts.`);
    } else {
      this.setState(prev => prev.todos.push(newTodo));
      // localStorage.setItem('todosSafe', JSON.stringify(this.state.todos));
      console.log(this.state.todos);
    }
  };
  componentDidMount() {
    let todosSafe = JSON.parse(localStorage.getItem('todosSafe'));
    if (todosSafe) {
      this.setState(() => ({ todos: todosSafe }));
    }
  }
  componentDidUpdate(prevState) {
    if (prevState.todos !== this.state.todos) {
      localStorage.setItem('todosSafe', JSON.stringify(this.state.todos));
    }
  }
  deleteTodo = id => {
    this.setState(prev => ({
      todos: prev.todos.filter(el => el.id !== id),
    }));
  };
  editTodo = id => {
    this.setState(prev => ({
      todos: prev.todos.filter(el => el.id !== id),
    }));
  };

  render() {
    const { todos, isEditing } = this.state;
    return (
      <>
        <Text>Todos</Text>
        {(!isEditing && <SearchForm onSubmit={this.handlSubmits} />) || (
          <EditForm onSubmit={this.handlEditSubmits} />
        )}
        <Grid>
          {todos.length !== 0 &&
            todos.map(({ id, text }, index) => (
              <GridItem key={id}>
                <Todo
                  id={id}
                  text={text}
                  index={index}
                  deleteTodo={this.deleteTodo}
                  editTodo={this.editTodo}
                />
              </GridItem>
            ))}
        </Grid>
      </>
    );
  }
}
