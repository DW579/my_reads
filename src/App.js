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
        books: [],
    };

    componentDidMount() {
        BooksAPI.getAll().then((books) => {
            this.setState(() => ({
                books,
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
                                    <Main books={this.state.books}></Main>
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
