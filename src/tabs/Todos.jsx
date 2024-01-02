import { Component } from 'react';
import { nanoid } from 'nanoid';
import { Grid, GridItem, SearchForm, EditForm, Text, Todo } from 'components';

export class Todos extends Component {
  state = {
    todos: [],
    isDeleted: false,
  };

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
