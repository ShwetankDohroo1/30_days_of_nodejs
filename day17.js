const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  }
});

const User = mongoose.model('User', userSchema);

mongoose.connect('mongodb://localhost:27017/your_database', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error.message);
});

async function addUserToDatabase(user) {
  try{
    const newUser = new User(user);
    
    const savedUser = await newUser.save();
    
    console.log('User added successfully:', savedUser);
  } 
  catch (error){
    console.error('Error adding user:', error.message);
  } 
  finally{
    mongoose.connection.close();
  }
}

addUserToDatabase({ username: 'shwetank', email: 'shwetank_dohroo@example.com' });

