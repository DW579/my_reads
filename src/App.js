import React, { Component } from "react";
import { Route } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import Main from "./pages/Main";
import Search from "./pages/Search";
import ViewAll from "./pages/ViewAll";
import * as BooksAPI from "./utils/BooksAPI";
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
    state = {
        current_reads: [],
        want_reads: [],
        reads: []
    };

    componentDidMount() {
        BooksAPI.getAll().then((books) => {
            this.setState(() => ({
                current_reads: books.filter((book) => book.shelf === "currentlyReading"),
                want_reads: books.filter((book) => book.shelf === "wantToRead"),
                reads: books.filter((book) => book.shelf === "read")
            }));
        });
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
                                    <Main current_reads={this.state.current_reads} want_reads={this.state.want_reads} reads={this.state.reads}></Main>
                                )}
                            ></Route>
                            <Route
                                path="/search"
                                render={() => <Search></Search>}
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
