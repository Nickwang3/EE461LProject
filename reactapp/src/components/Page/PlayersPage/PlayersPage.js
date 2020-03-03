import React from "react";
import BookItem from "../../BookItem/BookItem";
import ApiService from "../../../api/ApiService";

const apiService = new ApiService();

class PlayersPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      books: []
    };
  }

  componentDidMount() {
    apiService
      .getBooks()
      .then(result => {
        this.setState({
          isLoaded: true,
          books: result.data
        });
      })
      .catch(error => {
        this.setState({
          isLoaded: true,
          error
        });
      });
  }

  render() {
    const { error, isLoaded, books } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <h1>Hello there</h1>
          <ul>
            {books.map(book => (
              <BookItem isbn={book.isbn} title={book.title} author_id={book.author_id} description="" />
            ))}
          </ul>
        </div>
      );
    }
  }

}

export default PlayersPage;
