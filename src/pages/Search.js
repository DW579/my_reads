import React, { Component } from "react";
import { Row, Col, InputGroup, FormControl } from "react-bootstrap";
import * as BooksAPI from "../utils/BooksAPI";

class Search extends Component {
    state = {
        books: [],
    };

    handleSearch = (event) => {
        if (event.code === "Enter") {
            BooksAPI.search(event.target.value).then((books) => {
                if(books.error !== "empty query") {
                    this.setState(() => ({
                        books,
                    }));
                }
            });

            event.target.value = "";
        }
    };

    render() {
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
                        <ol>
                            {this.state.books.map((book) => (
                                <li key={book.id}>{book.title}</li>
                            ))}
                        </ol>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Search;
