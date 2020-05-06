import React, { Component } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";
import Nav from "../components/Nav";
import axios from "axios";

class Books extends Component {
  state = {
    books: [],
    title: "",
  };

  /*componentDidMount() {
    this.loadBooks();
  }*/

  search = () => {
    let query = this.state.title; 
    let base_url = "https://www.googleapis.com/books/v1/volumes?q=" + query;
    axios.get(base_url)
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
  }
    


  loadBooks = () => {
    API.getBooks()
      .then(res =>
        this.setState({ books: res.data, title: "", author: "", description: "", image: "", link: "" })
      )
      .catch(err => console.log(err));
  };

  deleteBook = id => {
    API.deleteBook(id)
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.title) {
      API.saveBook({
        title: this.state.title,
        author: this.state.author,
        description: this.state.description,
        image: this.state.image,
        link: this.state.link
      })
        .then(res => this.search())
        .catch(err => console.log(err));
    }
  };

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
                  value={this.state.title}
                  onChange={this.handleInputChange}
                  name="title"
                  placeholder="Title (required)"
                />

                <FormBtn
                  disabled={!this.state.title}
                  onClick={this.search}
                >
                  Search
                </FormBtn>
              </form>
            </Jumbotron>
            {this.state.books.length ? (
              <List>
                {this.state.books.map((book) => (
                  <ListItem key={book._id}>
                    <Link to={"/books/" + book._id}>
                      <strong>
                        {book.title} Written by {book.author}
                      </strong>
                    </Link>
                    <DeleteBtn onClick={() => this.deleteBook(book._id)} />
                  </ListItem>
                ))}
              </List>
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
