import React from "react";
import Book from "../../Book/Book";
import BookService from "../../../api/BookService";

const bookService = new BookService();

class BookPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      books: []
    };
  }

  componentDidMount() {
    bookService
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
            {this.state.books.map(book => (
              <Book title={book.title} author={book.author} description="" />
            ))}
          </ul>
        </div>
      );
    }
  }

  // componentDidMount() {

  //   bookService.getBooks()
  //     .then(
  //       result => {
  //         this.setState({
  //           isLoaded: true,
  //           items: result.items
  //         });
  //       },

  //       error => {
  //         this.setState({
  //           isLoaded: true,
  //           error
  //         });
  //       }
  //     );
  // }

  // render() {
  //   const { error, isLoaded, items } = this.state;
  //   if (error) {
  //     return <div>Error: {error.message}</div>;
  //   } else if (!isLoaded) {
  //     return <div>Loading...</div>;
  //   } else {
  //     return (
  //       <ul>
  //         {items.map(item => (
  //           <li key={item.title}>
  //             {item.title} {item.author}
  //           </li>
  //         ))}
  //       </ul>
  //     );
  //   }
  // }
}

export default BookPage;
