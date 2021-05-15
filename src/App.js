import React, { Component } from "react";
import { Route } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import Main from "./pages/Main";
import Search from "./pages/Search";
import ViewAll from "./pages/ViewAll";
import * as BooksAPI from "./utils/BooksAPI";
import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
    state = {
        currentlyReading: [],
        wantToRead: [],
        read: [],
    };

    componentDidMount() {
        BooksAPI.getAll().then((books) => {
            this.setState(() => ({
                currentlyReading: books.filter(
                    (book) => book.shelf === "currentlyReading"
                ),
                wantToRead: books.filter((book) => book.shelf === "wantToRead"),
                read: books.filter((book) => book.shelf === "read"),
            }));
        });
    }

    updateShelf = (bookId, currentShelf, moveToShelf) => {
        const book = this.state[currentShelf].filter(
            (book) => book.id === bookId
        );

        this.setState(() => ({
            currentlyReading:
                moveToShelf === "currentlyReading"
                    ? this.state.currentlyReading.concat(book[0])
                    : this.state.currentlyReading.filter(
                          (book) => book.id !== bookId
                      ),
            wantToRead:
                moveToShelf === "wantToRead"
                    ? this.state.wantToRead.concat(book[0])
                    : this.state.wantToRead.filter(
                          (book) => book.id !== bookId
                      ),
            read:
                moveToShelf === "read"
                    ? this.state.read.concat(book[0])
                    : this.state.read.filter((book) => book.id !== bookId),
        }));

        BooksAPI.update(bookId, moveToShelf);
    };

    addToShelf = (book, moveToShelf) => {
        this.setState(() => ({
            currentlyReading: ((moveToShelf === "currentlyReading") ? this.state.currentlyReading.concat(book) : this.state.currentlyReading),
            wantToRead: ((moveToShelf === "wantToRead") ? this.state.wantToRead.concat(book) : this.state.wantToRead),
            read: ((moveToShelf === "read") ? this.state.read.concat(book) : this.state.read)
        }))
    }

    render() {
        return (
            <div>
                <Container fluid>
                    <Row>
                        <Col>
                            <Route
                                exact
                                path="/"
                                render={() => (
                                    <Main
                                        currentlyReading={
                                            this.state.currentlyReading
                                        }
                                        wantToRead={this.state.wantToRead}
                                        read={this.state.read}
                                        updateShelf={this.updateShelf}
                                    ></Main>
                                )}
                            ></Route>
                            <Route
                                path="/search"
                                render={() => (
                                    <Search
                                        addToShelf={this.addToShelf}
                                    ></Search>
                                )}
                            ></Route>
                            <Route
                                path="/view_all"
                                render={() => <ViewAll></ViewAll>}
                            ></Route>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default App;
