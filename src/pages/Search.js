import React, { Component } from "react";
import { Row, Col, InputGroup, FormControl, DropdownButton, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import * as BooksAPI from "../utils/BooksAPI";

class Search extends Component {
    state = {
        books: [],
        search_terms: ['android', 'art', 'artificial intelligence', 'astronomy', 'austen', 'baseball', 'basketball', 'bhagat', 'biography', 'brief', 'business', 'camus', 'cervantes', 'christie', 'classics', 'comics', 'cook', 'cricket', 'cycling', 'desai', 'design', 'development', 'digital marketing', 'drama', 'drawing', 'dumas', 'education', 'everything', 'fantasy', 'film', 'finance', 'first', 'fitness', 'football', 'future', 'games', 'gandhi', 'homer', 'horror', 'hugo', 'ibsen', 'journey', 'kafka', 'king', 'lahiri', 'larsson', 'learn', 'literary fiction', 'make', 'manage', 'marquez', 'money', 'mystery', 'negotiate', 'painting', 'philosophy', 'photography', 'poetry', 'production', 'programming', 'react', 'redux', 'river', 'robotics', 'rowling', 'satire', 'science fiction', 'shakespeare', 'singh', 'swimming', 'tale', 'thrun', 'time', 'tolstoy', 'travel', 'ultimate', 'virtual reality', 'web development', 'ios']
    };

    handleSearch = (event) => {
        if (event.code === "Enter" && this.state.search_terms.find(term => term === event.target.value.toLowerCase())) {
            BooksAPI.search(event.target.value).then((books) => {
                console.log(books)

                if (books.length > 1) {
                    this.setState(() => ({
                        books,
                    }));
                }
            });
        }

        if(event.code === "Enter") {
            event.target.value = "";
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
                                aria-label="Large"
                                aria-describedby="inputGroup-sizing-sm"
                                placeholder="Search Titles or Authors"
                                onKeyPress={(event) => this.handleSearch(event)}
                            />
                        </InputGroup>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Link to="/">Back</Link>
                    </Col>
                </Row>
                <Row>
                    {this.state.books.map((book) => (
                            <Col xs="12" sm="2" key={book.id}>
                                <div>
                                    <img
                                        src={book.imageLinks.thumbnail}
                                        alt=""
                                    />
                                    <p>{book.title}</p>
                                    {(book.authors !== undefined) && book.authors.map((author) => (
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

export default Search;
