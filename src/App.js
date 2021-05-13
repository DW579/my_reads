import React, { Component } from "react";
import { Route } from "react-router-dom";
import Main from "./pages/Main";
import Search from "./pages/Search";
import ViewAll from "./pages/ViewAll";
import * as BooksAPI from "./utils/BooksAPI";

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
                <Route exact path="/" render={() => <Main books={this.state.books}></Main>}></Route>
                <Route path="/search" render={() => <Search></Search>}></Route>
                <Route
                    path="/view_all"
                    render={() => <ViewAll></ViewAll>}
                ></Route>
            </div>
        );
    }
}

export default App;
