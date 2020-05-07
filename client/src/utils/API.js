import axios from "axios";
require("dotenv").config();
var keys = require("../keys.js");
console.log(JSON.stringify(keys));

var apiKey ="&key=AIzaSyDRKb2uixARbYa3BVCx87IC6CRPZ9t2Vnw";/*keys.googlebooks*/ 
var url = "https://www.googleapis.com/books/v1/volumes/?q=";
console.log(apiKey);



export default {
  // search: function (query) {
  //   return axios.get(url + query + apiKey);
  // },
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
