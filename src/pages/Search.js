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
        books: [],
        shelved_books: []
    };

    componentDidMount() {
        BooksAPI.getAll().then((shelved_books) => {
            this.setState(() => ({
                shelved_books,
            }));
        });
    }

    handleSearch = (event) => {
        this.setState(() => ({
            books: [],
        }));

        if (event.target.value !== "") {
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

    checkShelf = (book, shelf) => {
        const matched_book = this.state.shelved_books.find(shelved_book => shelved_book.id === book.id && shelved_book.shelf === shelf);
        
        if(matched_book === undefined) {
            return false;
        }
        else {
            return true;
        }
    }

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
                                            this.updateBook(
                                                book,
                                                "currentlyReading"
                                            )
                                        }
                                        disabled={this.checkShelf(book, "currentlyReading")}
                                    >
                                        Currently Reading
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                        onClick={() =>
                                            this.updateBook(book, "wantToRead")
                                        }
                                        disabled={this.checkShelf(book, "wantToRead")}
                                    >
                                        Want to Read
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                        onClick={() =>
                                            this.updateBook(book, "read")
                                        }
                                        disabled={this.checkShelf(book, "read")}
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
