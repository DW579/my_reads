import React, { Component } from "react";
import { Route } from "react-router-dom";
import Main from "./pages/Main";
import Search from "./pages/Search";
import ViewAll from "./pages/ViewAll";

class App extends Component {
    render() {
        return (
            <div>
                <Route exact path="/" render={() => <Main></Main>}></Route>
                <Route path="/search" render={() => <Search></Search>}></Route>
                <Route path="/view_all" render={() => <ViewAll></ViewAll>}></Route>
            </div>
        );
    }
}

export default App;
