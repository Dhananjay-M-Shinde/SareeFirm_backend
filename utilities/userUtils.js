const connection = require('./connection'); // Replace 'user' with the correct model file

async function getUserByEmail(email) {
  try {
    console.log("inside getuserFunc1");
    let model = await connection.getAllBranch();
    console.log("inside getuserFunc2");
    const user = await model.findOne({ Email: email });
    console.log("inside getuserFunc3");
    console.log(user);
    return user;
  } catch (err) {
    console.error('Error finding user:', err);
    return null;
  }
}

module.exports = { getUserByEmail };
