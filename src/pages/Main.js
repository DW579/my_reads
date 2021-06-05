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
            console.log(books);
            this.setState(() => ({
                books,
            }));
        });

        console.log("component did mount")
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

    render() {
        return (
            <div>
                <Row>
                    <Col>
                        <Navbar bg="dark" variant="dark">
                            <Navbar.Brand href="/">My Reads</Navbar.Brand>
                            <Link to="/search">Add Book</Link>
                        </Navbar>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h1>Currently Reading</h1>
                    </Col>
                </Row>
                <Row>
                    {this.state.books
                        .filter((book) => book.shelf === "currentlyReading")
                        .map((book) => (
                            <Col xs="12" sm="2" key={book.id}>
                                <div>
                                    <img
                                        src={book.imageLinks.thumbnail}
                                        alt=""
                                    />
                                    <p>{book.title}</p>
                                    {book.authors.map((author) => (
                                        <p key={author}>{author}</p>
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
                                        >
                                            Read
                                        </Dropdown.Item>
                                    </DropdownButton>
                                </div>
                            </Col>
                        ))}
                </Row>
                <Row>
                    <Col>
                        <h1>Want to Read</h1>
                    </Col>
                </Row>
                <Row>
                    {this.state.books
                        .filter((book) => book.shelf === "wantToRead")
                        .map((book) => (
                            <Col xs="12" sm="2" key={book.id}>
                                <div>
                                    <img
                                        src={book.imageLinks.thumbnail}
                                        alt=""
                                    />
                                    <p>{book.title}</p>
                                    {book.authors.map((author) => (
                                        <p key={author}>{author}</p>
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
                                        >
                                            Read
                                        </Dropdown.Item>
                                    </DropdownButton>
                                </div>
                            </Col>
                        ))}
                </Row>
                <Row>
                    <Col>
                        <h1>Read</h1>
                    </Col>
                </Row>
                <Row>
                    {this.state.books
                        .filter((book) => book.shelf === "read")
                        .map((book) => (
                            <Col xs="12" sm="2" key={book.id}>
                                <div>
                                    <img
                                        src={book.imageLinks.thumbnail}
                                        alt=""
                                    />
                                    <p>{book.title}</p>
                                    {book.authors.map((author) => (
                                        <p key={author}>{author}</p>
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

export default Main;
