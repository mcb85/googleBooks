console.log("this is the keys file");
console.log(process.env.GOOGLE_BOOKS_API_KEY);


exports.googlebooks = {
  apiKey: process.env.GOOGLE_BOOKS_API_KEY
};