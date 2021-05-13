import React, { Component } from "react";

class Main extends Component {
    render() {
        // Store props into variables for cleaner use of this.props
        const { books } = this.props;

        console.log(books);

        // Filter from books all Current Reads
        let current_reads = books.filter(book => book.shelf === "currentlyReading");

        // Filter from books all Want to Reads
        let want_reads = books.filter(book => book.shelf === "wantToRead");

        // Filter from books all Reads
        let reads = books.filter(book => book.shelf === "read")

        return (
            <div>
                <h1>Current Reads</h1>
                <ol>
                    {current_reads.map((book) => (
                        <li key={book.id}>{book.title}</li>
                    ))}
                </ol>
                <h1>Want to read</h1>
                <ol>
                    {want_reads.map((book) => (
                        <li key={book.id}>{book.title}</li>
                    ))}
                </ol>
                <h1>Read</h1>
                <ol>
                    {reads.map((book) => (
                        <li key={book.id}>{book.title}</li>
                    ))}
                </ol>
            </div>
        );
    }
}

export default Main;
