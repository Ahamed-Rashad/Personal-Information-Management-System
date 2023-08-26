const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
//const { SECRET_KEY } = require('../.env');
const secretKey = "f95ad01b36acaf93ff3c4d7228e1ccf733ede6ad4140b59e892508d58384d853";

exports.register = async (req, res) => {
    const { username, password } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({
        username,
        password: hashedPassword,
      });
      await user.save();
      console.log('User saved to the database'); 
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error('Error:', error); 
      res.status(500).json({ error: 'An error occurred' });
    }
  };
  

  exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });
      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
  };
  
