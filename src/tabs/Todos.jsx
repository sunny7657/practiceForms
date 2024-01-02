import { Component } from 'react';
import { nanoid } from 'nanoid';
import { Grid, GridItem, SearchForm, Text, Todo } from 'components';

export class Todos extends Component {
  state = {
    todos: [],
    isDeleted: false,
  };

  componentDidMount() {
    const localData = localStorage.getItem('todo');
    if (localData && JSON.parse(localData).length > 0) {
      this.setState({ todos: JSON.parse(localData) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.todos.length !== this.state.todos.length)
      localStorage.setItem('todo', JSON.stringify(this.state.todos));

    if (prevState.todos.length > this.state.todos.length) {
      this.setState({ isDeleted: true });
    }
  }

  handleSubmit = value => {
    this.setState(prevState => ({
      todos: [...prevState.todos, { id: nanoid(), text: value }],
    }));
  };

  deleteTodo = id => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo.id !== id),
    }));
  };

  render() {
    const { todos } = this.state;
    return (
      <>
        <SearchForm onSubmit={this.handleSubmit} />
        {todos.length === 0 && (
          <Text style={{ textAlign: 'center' }}>
            There are no todos here...
          </Text>
        )}
        <Grid>
          {todos.map(({ id, text }, index) => (
            <GridItem key={id}>
              <Todo
                description={text}
                index={index + 1}
                id={id}
                deleteTodo={this.deleteTodo}
              />
            </GridItem>
          ))}
        </Grid>
      </>
    );
  }
}
