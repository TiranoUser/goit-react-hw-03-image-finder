import { Component } from 'react';
import { ImageForm } from './ImageForm/ImageForm';
import { fetchImages } from 'service/fetchImages';

export class App extends Component {
  state = {
    query: '',
    page: 1,
    images: [],
    isLoadMore: false,
  };
  componentDidUpdate(_, prevState) {
    const { query, page } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      fetchImages(query, page).then(({ hits, totalHits }) => {
        if (hits.lengts === 0) {
          alert('Nothing find');
          return;
        }
        this.setState(prevState => ({
          images: [...prevState.images, ...hits],
          isLoadMore: page < Math.ceil(totalHits / 12),
        }));
      });
    }
  }
  handleSubmit = ({ query }) => {
    this.setState({ query, page: 1, images: [] });
  };

  render() {
    return (
      <div>
        <ImageForm handleSubmit={this.handleSubmit} />
        <ul>
          {this.state.images.map(image => (
            <li key={image.id}>
              <img src={image.webformatURL} alt={image.tags} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
