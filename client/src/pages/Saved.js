import React, { Component } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import Nav from "../components/Nav";
//import axios from "axios";

class Saved extends Component {
  state = {
    books: [],
  };

  componentDidMount() {
    this.loadBooks();
  }


  loadBooks = () => {
    API.getBooks()
      .then((res) =>
        this.setState({
          books: res.data,
          title: "",
          author: "",
          description: "",
          image: "",
          link: "",
        })
      )
      .catch((err) => console.log(err));
  };

  deleteBook = (id) => {
    API.deleteBook(id)
      .then((res) => this.loadBooks())
      .catch((err) => console.log(err));
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  /*handleFormSubmit = (event) => {
    event.preventDefault();
    if (this.state.title) {
      API.saveBook({
        title: this.state.title,
        author: this.state.author,
        description: this.state.description,
        image: this.state.image,
        link: this.state.link,
      })
        .then((res) => this.search())
        .catch((err) => console.log(err));
    }
  };*/

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
           
              <h3 className="d-flex justify-content start"> Saved Books</h3>
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
                      
                      <DeleteBtn onClick={() => this.deleteBook(book["_id"])} />
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

export default Saved;
