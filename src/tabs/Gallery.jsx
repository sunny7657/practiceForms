import { Button, CardItem, Grid, GridItem, SearchForm, Text } from 'components';
import { Component } from 'react';

import * as ImageService from 'service/image-service';

export class Gallery extends Component {
  state = {
    query: '',
    page: 1,
    images: [],
    result: 0,
    error: null,
    isLoading: false,
  };

  handleSubmit = value => {
    this.setState({
      query: value,
      page: 1,
      images: [],
      result: 0,
      error: null,
      isLoading: false,
    });
  };

  componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      this.getApi(query, page);
    }
  }

  getApi = async (query, page) => {
    if (query === '') return;

    this.setState({ isLoading: true });

    try {
      const { photos, total_results } = await ImageService.getImages(
        query,
        page
      );

      this.setState(prevState => ({
        images: [...prevState.images, ...photos],
        result: total_results,
      }));
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  onClickLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { images, result, isLoading, error, query } = this.state;
    return (
      <>
        <SearchForm onSubmit={this.handleSubmit} />
        {isLoading && <Text testAlign="center">Loading...</Text>}
        {error && <Text testAlign="center">Error {error}</Text>}
        {query !== '' && images.length === 0 && isLoading === false && (
          <Text testAlign="center">There is no matches 😒</Text>
        )}
        <Grid>
          {images.map(({ alt, avg_color, id, src: { large } }) => (
            <GridItem key={id}>
              <CardItem color={avg_color}>
                <img src={large} alt={alt} />
              </CardItem>
            </GridItem>
          ))}
        </Grid>
        {images.length < result && (
          <Button onClick={this.onClickLoadMore}>Load more</Button>
        )}
      </>
    );
  }
}
