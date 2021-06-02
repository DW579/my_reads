import React, { Component } from "react";
import { Route } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import Main from "./pages/Main";
import Search from "./pages/Search";
import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component {

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
                                    <Main></Main>
                                )}
                            ></Route>
                            <Route
                                path="/search"
                                render={() => (
                                    <Search></Search>
                                )}
                            ></Route>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default App;
