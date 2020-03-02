import React from 'react'
// import './Book.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

class BookItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null
        };
    }

    render() {
        return (
            <div className="container">
                <h1>{this.props.title}</h1>
                <h3>{this.props.author_id}</h3>
                <p>{this.props.description}</p>
                <Link to={`/books/${this.props.isbn}`}>
                    <button className="btn btn-primary">Click Me!</button>
                </Link>
            </div>
        )
    }
}

export default BookItem;