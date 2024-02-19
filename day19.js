const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function(v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: props => `${props.value} is not a valid email address!`
    }
  }
});

const User = mongoose.model('User', userSchema);

mongoose.connect('mongodb://localhost/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

async function addUserWithValidation(user) {
  try {
    const newUser = new User(user);
    await newUser.save();
    console.log('User added successfully');
  } catch (error) {
    console.error('Error adding user:', error.message);
  }
}
addUserWithValidation({ username: 'johndoe', email: 'john_doe.com' });
