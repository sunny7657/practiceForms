import { Component } from 'react';

import { FiSearch } from 'react-icons/fi';
import { FormBtn, InputSearch, SearchFormStyled } from './SearchForm.styled';

export class SearchForm extends Component {
  state = {
    value: '',
  };
  handleInputChange = e => {
    this.setState({ value: e.currentTarget.value });
  };
  handleFormSummit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.value);
    this.setState({ value: '' });
  };
  render() {
    return (
      <SearchFormStyled onSubmit={this.handleFormSummit}>
        <FormBtn type="submit">
          <FiSearch size="16px" />
        </FormBtn>
        <InputSearch
          placeholder="What do you want to write?"
          name="search"
          required
          autoFocus
          value={this.state.value}
          onChange={this.handleInputChange}
        />
      </SearchFormStyled>
    );
  }
}
