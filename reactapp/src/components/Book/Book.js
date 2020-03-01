import React from 'react'

class Book extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div>
                <h1>{this.props.title}</h1>
                <h3>{this.props.author}</h3>
                <p>{this.props.description}</p>
            </div>
        )
    }
}

export default Book;