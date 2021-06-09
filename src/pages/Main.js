import React, { Component } from "react";
import { Row, Col, DropdownButton, Dropdown, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import * as BooksAPI from "../utils/BooksAPI";

class Main extends Component {
    // state store books
    state = {
        books: [],
    };

    // componentDidMount getAllBooks from API and store in state
    componentDidMount() {
        BooksAPI.getAll().then((books) => {
            this.setState(() => ({
                books,
            }));
        });
    }

    // On move, update book in state, setState, and then in API. UI will re render on setState.
    updateBook = (book, shelf) => {
        this.setState((currentState) => ({
            books: currentState.books.map((b) => {
                b.id === book.id && (b.shelf = shelf);
                return b;
            }),
        }));

        BooksAPI.update(book, shelf);
    };

    // Remove book from shelf
    removeBook = (book) => {
        // Filter out the selected book
        this.setState((currentState) => ({
            books: currentState.books.filter((b) => b.id !== book.id)
        }));

        // Update API to set book shelf to none
        BooksAPI.update(book, "none")
    }

    render() {
        return (
            <div>
                <Row className="row-margin-below">
                    <Col>
                        <Navbar bg="dark" variant="dark">
                            <Navbar.Brand href="/">My Reads</Navbar.Brand>
                            <Link to="/search">Add Book</Link>
                        </Navbar>
                    </Col>
                </Row>
                <Row className="row-margin-below">
                    <Col>
                        <h1>Currently Reading</h1>
                    </Col>
                </Row>
                <Row>
                    {this.state.books
                        .filter((book) => book.shelf === "currentlyReading")
                        .map((book) => (
                            <Col
                                xs="12"
                                sm="2"
                                key={book.id}
                                className="book-col"
                            >
                                <div>
                                    {book.imageLinks !== undefined && (
                                        <img
                                            src={book.imageLinks.thumbnail}
                                            alt=""
                                            className="book-img"
                                        />
                                    )}
                                    <h2 className="book-title">{book.title}</h2>
                                    {book.authors.map((author) => (
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
                                            disabled="true"
                                        >
                                            Currently Reading
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                            onClick={() =>
                                                this.updateBook(
                                                    book,
                                                    "wantToRead"
                                                )
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
                                        <Dropdown.Item onClick={() => this.removeBook(book)}>
                                            None
                                        </Dropdown.Item>
                                    </DropdownButton>
                                </div>
                            </Col>
                        ))}
                </Row>
                <Row>
                    <Col>
                        <div className="seperation-line"></div>
                    </Col>
                </Row>
                <Row className="row-margin-below">
                    <Col>
                        <h1>Want to Read</h1>
                    </Col>
                </Row>
                <Row>
                    {this.state.books
                        .filter((book) => book.shelf === "wantToRead")
                        .map((book) => (
                            <Col
                                xs="12"
                                sm="2"
                                key={book.id}
                                className="book-col"
                            >
                                <div>
                                    {book.imageLinks !== undefined && (
                                        <img
                                            src={book.imageLinks.thumbnail}
                                            alt=""
                                            className="book-img"
                                        />
                                    )}
                                    <h2 className="book-title">{book.title}</h2>
                                    {book.authors.map((author) => (
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
                                        >
                                            Currently Reading
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                            onClick={() =>
                                                this.updateBook(
                                                    book,
                                                    "wantToRead"
                                                )
                                            }
                                            disabled="true"
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
                                        <Dropdown.Item onClick={() => this.removeBook(book)}>
                                            None
                                        </Dropdown.Item>
                                    </DropdownButton>
                                </div>
                            </Col>
                        ))}
                </Row>
                <Row>
                    <Col>
                        <div className="seperation-line"></div>
                    </Col>
                </Row>
                <Row className="row-margin-below">
                    <Col>
                        <h1>Read</h1>
                    </Col>
                </Row>
                <Row>
                    {this.state.books
                        .filter((book) => book.shelf === "read")
                        .map((book) => (
                            <Col
                                xs="12"
                                sm="2"
                                key={book.id}
                                className="book-col"
                            >
                                <div>
                                    {book.imageLinks !== undefined && (
                                        <img
                                            src={book.imageLinks.thumbnail}
                                            alt=""
                                            className="book-img"
                                        />
                                    )}
                                    <h2 className="book-title">{book.title}</h2>
                                    {book.authors.map((author) => (
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
                                        >
                                            Currently Reading
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                            onClick={() =>
                                                this.updateBook(
                                                    book,
                                                    "wantToRead"
                                                )
                                            }
                                        >
                                            Want to Read
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                            onClick={() =>
                                                this.updateBook(book, "read")
                                            }
                                            disabled="true"
                                        >
                                            Read
                                        </Dropdown.Item>
                                        <Dropdown.Item onClick={() => this.removeBook(book)}>
                                            None
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

export default Main;
