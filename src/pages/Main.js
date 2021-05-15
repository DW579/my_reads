import React, { Component } from "react";
import { Row, Col, Navbar, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

class Main extends Component {
    render() {
        // Store props into variables for cleaner use of this.props
        const { books } = this.props;

        // Filter from books all Current Reads
        let current_reads = books.filter(
            (book) => book.shelf === "currentlyReading"
        );

        // Filter from books all Want to Reads
        let want_reads = books.filter((book) => book.shelf === "wantToRead");

        // Filter from books all Reads
        let reads = books.filter((book) => book.shelf === "read");

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
                        {current_reads.map((book) => (
                            <Card
                                style={{
                                    width: "18rem",
                                    display: "inline-block",
                                }}
                            >
                                <Card.Img
                                    style={{ width: "128px" }}
                                    variant="top"
                                    src={book.imageLinks.thumbnail}
                                />
                                <Card.Body>
                                    <Card.Title>Card Title</Card.Title>
                                    <Card.Text>
                                        Some quick example text to build on the
                                        card title and make up the bulk of the
                                        card's content.
                                    </Card.Text>
                                    <Button variant="primary">
                                        Go somewhere
                                    </Button>
                                </Card.Body>
                            </Card>
                        ))}
                    </Col>
                </Row>
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
