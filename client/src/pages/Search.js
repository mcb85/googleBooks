import React, { Component } from "react";
import SaveBtn from "../components/SaveBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";

import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, FormBtn } from "../components/Form";
import Nav from "../components/Nav";
import axios from "axios";
import ViewBtn from "../components/ViewBtn";



class Books extends Component {
  constructor(props) {
    super(props);

    this.state = {
      books: [],
      query: "",
    };
  }

  search = (e) => {
    e.preventDefault();

    let query = this.state.query;
    let base_url = "https://www.googleapis.com/books/v1/volumes?q=" + query;
    axios
      .get(base_url)
      .then(
        async (res) => {
          // console.log(`result is: ${JSON.stringify(res.data)}`);
          const allBooks = [];
          res.data.items.forEach(item => {
            const book = [];
            book["_id"] = item.id;
            book["title"] = item.volumeInfo.title;
            book["authors"] = item.volumeInfo.authors;
            book["image"] = item.volumeInfo.imageLinks.thumbnail;
            book["description"] = item.volumeInfo.description;
            book["link"] = item.volumeInfo.canonicalVolumeLink;
            allBooks.push(book);
          });
          await this.setState((state, props) => ({
            books: allBooks
          }));
        },
        (error) => {
          console.log(`Error: ${error.message}`);
          this.setState((state, props) => ({
            error
          }));
        }
      );
    console.log("books" + this.state.books);
  };

  // loadBooks = () => {
  //   API.getBooks()
  //     .then(res =>
  //       this.setState({ books: res.data, title: "", author: "", description: "", image: "", link: "" })
  //     )
  //     .catch(err => console.log(err));
  // };

  // deleteBook = id => {
  //   API.deleteBook(id)
  //     .then(res => this.loadBooks())
  //     .catch(err => console.log(err));
  // };

  saveBook = id => {
    API.saveBook(id)
      .then((res) => this.loadBooks())
      .catch(err => console.log(err));
  };

  handleInputChange = async (event) => {
    const { name, value } = event.target;
    await this.setState((state, props) => ({
      query: value,
    }));
  };

  // handleFormSubmit = event => {
  //   event.preventDefault();
  //   if (this.state.title) {
  //     API.saveBook({
  //       title: this.state.title,
  //       author: this.state.author,
  //       description: this.state.description,
  //       image: this.state.image,
  //       link: this.state.link
  //     })
  //       .then(res => this.search())
  //       .catch(err => console.log(err));
  //   }
  // };

  render() {
    return (
      <Container fluid>
        <Nav />
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>(React) Google Books Search</h1>
              <h4>Search for and Save Books of Interest </h4>
            </Jumbotron>
          </Col>
          <Col size="md-12">
            <Jumbotron>
              <h3 className="d-flex justify-content start"> Book Search</h3>
              <form>
                <Input
                  value={this.state.query}
                  onChange={this.handleInputChange}
                  name="query"
                  placeholder="Title (required)"
                />

                <FormBtn disabled={!this.state.query} onClick={this.search}>
                  Search
                </FormBtn>
              </form>
            </Jumbotron>
            <h1>Results</h1>
            
              {this.state.books.length ? (
                <Col size="sm-12">
                <List>
                  {this.state.books.map((book) => (
                    <ListItem key={book["_id"]}>
                        <strong>
                          {book["title"]}
                        </strong>
                      <p> Written by {book["authors"]}</p>
                      <Row><Col size="sm-2"><img src={book["image"]} alt={book["title"]} /></Col>
                       <Col size="sm-10"><p>{book["description"]}</p></Col></Row>
                      <ViewBtn onClick={event => window.location.href = book.link}/>
                      <SaveBtn onClick={() => this.saveBook(book["_id"])} />
                    </ListItem>
                  ))}
                </List></Col>
              ) : (
                <h3>No Results to Display</h3>
              )}
            
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Books;
