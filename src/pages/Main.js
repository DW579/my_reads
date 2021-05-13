import React, { Component } from "react";

class Main extends Component {

    render() {

        // Store props into variables for cleaner use of this.props
        const { books } = this.props;

        console.log(books)

        return (
            <div>
                <ol>
                    {books.map((book) => (
                        <li key={book.id}>{book.title}</li>
                    ))}
                </ol>
            </div>
        )
    }
}

export default Main;