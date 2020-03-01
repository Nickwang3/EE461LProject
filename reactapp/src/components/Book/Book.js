import React from 'react'
// import './Book.css'
import 'bootstrap/dist/css/bootstrap.min.css';

class Book extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div className="container">
                <h1>{this.props.title}</h1>
                <h3>{this.props.author}</h3>
                <p>{this.props.description}</p>
                <button className="btn btn-primary">Click Me!</button>
            </div>
        )
    }
}

export default Book;