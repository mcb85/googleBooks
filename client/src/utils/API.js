import axios from "axios";
require("dotenv").config();

export default {
  getBooks: function (data) {
    console.log(data);
    return axios.get("/api/books");
  },
  
  // Deletes the book with the given id
  deleteBook: function(id) {
    return axios.delete("/api/books/" + id);
  },
  // Saves a book to the database
  saveBook: function(bookData) {
    return axios.post("/api/books", bookData);
  }
};
