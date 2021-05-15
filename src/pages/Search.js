import React, { Component } from "react";
import {
    Row,
    Col,
    InputGroup,
    FormControl,
    Card,
    DropdownButton,
    Dropdown,
} from "react-bootstrap";
import * as BooksAPI from "../utils/BooksAPI";

class Search extends Component {
    state = {
        books: [],
    };

    handleSearch = (event) => {
        if (event.code === "Enter") {
            BooksAPI.search(event.target.value).then((books) => {
                if (books.error !== "empty query") {
                    this.setState(() => ({
                        books,
                    }));
                }
            });

            event.target.value = "";
        }
    };

    updateSearchState = () => {
        console.log("update search")
    }

    render() {
        const { addToShelf } = this.props;

        return (
            <div>
                <Row>
                    <Col>
                        <InputGroup size="lg" className="mb-3">
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
                        {this.state.books.map((book) => (
                            <Card
                                style={{
                                    width: "18rem",
                                    display: "inline-block",
                                }}
                                key={book.id}
                            >
                                <Card.Img
                                    style={{ width: "128px" }}
                                    variant="top"
                                    src={book.imageLinks.thumbnail}
                                />
                                <Card.Body>
                                    <Card.Title>{book.title}</Card.Title>
                                    <Card.Text>
                                        Some quick example text to build on the
                                        card title and make up the bulk of the
                                        card's content.
                                    </Card.Text>
                                    <DropdownButton
                                        id="dropdown-basic-button"
                                        title="Move to..."
                                    >
                                        <Dropdown.Item
                                            onClick={() =>
                                                addToShelf(
                                                    book,
                                                    "currentlyReading"
                                                )
                                            }
                                        >Currently Reading</Dropdown.Item>
                                        <Dropdown.Item
                                            onClick={() =>
                                                addToShelf(
                                                    book,
                                                    "wantToRead"
                                                )
                                            }
                                        >
                                            Want to read
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                            onClick={() =>
                                                addToShelf(book, "read")
                                            }
                                        >
                                            Read
                                        </Dropdown.Item>
                                    </DropdownButton>
                                </Card.Body>
                            </Card>
                        ))}
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Search;
