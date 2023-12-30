import { Component } from 'react';

import * as ImageService from 'service/image-service';
import { Button, SearchForm, Grid, GridItem, Text, CardItem } from 'components';

export class Gallery extends Component {
  state = {
    query: '',
    page: 1,
    images: [],
    rezalt: 0,
    error: null,
    isLoading: false,
  };
  handlSubmit = value => {
    this.setState({
      query: value,
      page: 1,
      images: [],
      rezalt: 0,
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
    if (query === '') {
      return;
    }
    this.setState({ isLoading: true });
    try {
      const { photos, total_results } = await ImageService.getImages(
        query,
        page
      );
      this.setState(prevState => ({
        images: [...prevState.images, ...photos],
        rezalt: total_results,
      }));
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ isLoading: false });
    }
  };
  pushButton = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { images, rezalt, isLoading, error, query } = this.state;
    return (
      <>
        <SearchForm onSubmit={this.handlSubmit} />
        {isLoading && <Text textAlign="center">Loading ... wait</Text>}
        {error && <Text textAlign="center">Error {error} </Text>}
        {query !== '' && images.length === 0 && (
          <Text textAlign="center">Sory no photo </Text>
        )}
        <Grid>
          {images.map(({ id, avg_color, alt, src: { large } }) => (
            <GridItem key={id}>
              <CardItem color={avg_color}>
                <img src={large} alt={alt} />
              </CardItem>
            </GridItem>
          ))}
        </Grid>
        {rezalt > images.length && (
          <Button onClick={this.pushButton}>Load more</Button>
        )}
      </>
    );
  }
}
