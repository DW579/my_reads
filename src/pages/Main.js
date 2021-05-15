import React, { Component } from "react";
import {
    Row,
    Col,
    Navbar,
    Card,
    DropdownButton,
    Dropdown,
} from "react-bootstrap";
import { Link } from "react-router-dom";

class Main extends Component {
    render() {
        // Store props into variables for cleaner use of this.props
        const { currentlyReading, wantToRead, read, updateShelf } = this.props;

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
                        <h1>Current Reads</h1>
                        {currentlyReading.map((book) => (
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
                                                updateShelf(
                                                    book.id,
                                                    "currentlyReading",
                                                    "wantToRead"
                                                )
                                            }
                                        >
                                            Want to read
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                            onClick={() =>
                                                updateShelf(
                                                    book.id,
                                                    "currentlyReading",
                                                    "read"
                                                )
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
                <Row>
                    <Col>
                        <h1>Want to read</h1>
                        {wantToRead.map((book) => (
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
                                                updateShelf(
                                                    book.id,
                                                    "wantToRead",
                                                    "currentlyReading"
                                                )
                                            }
                                        >
                                            Current Reads
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                            onClick={() =>
                                                updateShelf(
                                                    book.id,
                                                    "wantToRead",
                                                    "read"
                                                )
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
                <Row>
                    <Col>
                        <h1>Read</h1>
                        {read.map((book) => (
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
                                                updateShelf(
                                                    book.id,
                                                    "read",
                                                    "currentlyReading"
                                                )
                                            }
                                        >
                                            Current Reads
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                            onClick={() =>
                                                updateShelf(
                                                    book.id,
                                                    "read",
                                                    "wantToRead"
                                                )
                                            }
                                        >
                                            Want to read
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

export default Main;
