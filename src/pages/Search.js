import React, { Component } from "react";
import {
    Row,
    Col,
    InputGroup,
    FormControl,
    DropdownButton,
    Dropdown,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import * as BooksAPI from "../utils/BooksAPI";

class Search extends Component {
    state = {
        books: []
    };

    handleSearch = (event) => {

        this.setState(() => ({
            books: []
        }))

        if(event.target.value !== "") {
            BooksAPI.search(event.target.value).then((books) => {
                if (books.length > 1) {
                    this.setState(() => ({
                        books,
                    }));
                }
            });
        }
    };

    updateBook = (book, shelf) => {
        this.setState((currentState) => ({
            books: currentState.books.map((b) => {
                b.id === book.id && (b.shelf = shelf);
                return b;
            }),
        }));

        BooksAPI.update(book, shelf);
    };

    render() {
        return (
            <div>
                <Row>
                    <Col size="lg" className="mb-3">
                        <InputGroup>
                            <FormControl
                                size="lg"
                                aria-label="Large"
                                aria-describedby="inputGroup-sizing-sm"
                                placeholder="Search Titles or Authors"
                                // onKeyPress={(event) => this.handleSearch(event)}
                                onChange={(event) => this.handleSearch(event)}
                            />
                        </InputGroup>
                    </Col>
                </Row>
                <Row className="row-margin-below">
                    <Col>
                        <Link to="/" className="search-back">
                            Back
                        </Link>
                    </Col>
                </Row>
                <Row>
                    {this.state.books.map((book) => (
                        <Col xs="12" sm="2" key={book.id} className="book-col">
                            <div>
                                {book.imageLinks !== undefined && (
                                    <img
                                        src={book.imageLinks.thumbnail}
                                        alt=""
                                        className="book-img"
                                    />
                                )}
                                <h2 className="book-title">{book.title}</h2>
                                {book.authors !== undefined &&
                                    book.authors.map((author) => (
                                        <p key={author} className="book-author">
                                            {author}
                                        </p>
                                    ))}
                                <DropdownButton title="Move to...">
                                    <Dropdown.Item
                                        onClick={() =>
                                            // this.updateBook(
                                            //     book,
                                            //     "currentlyReading"
                                            // )
                                            console.log(book)
                                        }
                                        
                                    >
                                        Currently Reading
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                        onClick={() =>
                                            this.updateBook(book, "wantToRead")
                                        }
                                    >
                                        Want to Read
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                        onClick={() =>
                                            this.updateBook(book, "read")
                                        }
                                    >
                                        Read
                                    </Dropdown.Item>
                                </DropdownButton>
                            </div>
                        </Col>
                    ))}
                </Row>
            </div>
        );
    }
}

export default Search;
