import axios from "axios";

require("dotenv").config();
var keys = require("../keys.js");
console.log(JSON.stringify(keys));

var apiKey = keys.googlebooks;
var query = "harry+potter";
var url = "https://www.googleapis.com/books/v1/volumes/?q=" + query + "&key=" + apiKey;
console.log(apiKey);


export default {
  // Gets all books
  getBooks: function (data) {
    return axios.get(url);
    //console.log(data);
    //return axios.get("/api/books");
    
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
