console.log("this is the keys file");
console.log(process.env.REACT_APP_GOOGLE_BOOKS_API_KEY);


exports.googlebooks = {
  apiKey: process.env.REACT_APP_GOOGLE_BOOKS_API_KEY
};