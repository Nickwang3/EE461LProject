import React from "react";
import ApiService from "../../../api/ApiService";

const apiService = new ApiService();

class DetailedBookPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      book: null,
      authorFirst: null,
      authorLast: null
    };
  }

  componentDidMount() {
      apiService
        .getBookByIsbn(this.props.match.params.isbn)
        .then(result => {
            this.setState({
                isLoaded: true,
                book: result.data
            })
        })

  }

  render() {
    const { error, isLoaded, book } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <h1>Title: {book.title}</h1>
          <h5>Author id: {book.author_id}</h5>
          <h5>ISBN: {book.isbn}</h5>
        </div>
      );
    }
  }

}

export default DetailedBookPage;