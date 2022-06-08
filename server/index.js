const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = 3001;
const cors = require('cors');

const UserModel = require('./models/Users');

app.use(express.json());
app.use(cors());

mongoose.connect(
  'mongodb+srv://UserMongoDB:<Password>@cluster0.enznt.mongodb.net/<Database></Database>?retryWrites=true&w=majority'
);

app.get('/getUsers', (req, res) => {
  UserModel.find({}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

app.post('/createUser', async (req, res) => {
  const user = req.body;
  const newUser = new UserModel(user);
  await newUser.save();

  res.json(user);
});

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
