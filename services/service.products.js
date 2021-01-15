const myDB = require("../database");

const getAllProduct = () => {
  return myDB
    .allProductList()
    .then((data) => {return data})
    .catch((err) => {throw err});
};

module.exports=getAllProduct