import React, { Component } from "react";
import { DropdownButton } from "react-bootstrap";

class Book extends Component {

    render() {

        return (
            <div>
                <div className="book-image"></div>
                <div className="book-title"></div>
                <div className="book-author"></div>
                <DropdownButton>
                    <DropdownButton.Item>Currently Reading</DropdownButton.Item>
                    <DropdownButton.Item>Want to Read</DropdownButton.Item>
                    <DropdownButton.Item>Read</DropdownButton.Item>
                </DropdownButton>
            </div>
        );
    }
}

export default Book;