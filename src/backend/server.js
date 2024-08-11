const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const randomize = require('randomatic');
const nodemailer = require('nodemailer');
const cors = require('cors'); // Import the cors module

const app = express();
const PORT = 3001;

// Use cors middleware
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb+srv://aparnabraj2019:RQ1UBMi0fod92CIG@cluster0.cdnbd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Event listeners for connection status
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error(`MongoDB connection error: ${err}`);
});

mongoose.connection.on('disconnected', () => {
  console.log('Disconnected from MongoDB');
});

// Define User model
const User = mongoose.model('User', { email: String, otp: String });

app.use(bodyParser.json());

// Route to send OTP
app.post('/send-otp', async (req, res) => {
    const { email } = req.body;
    const otp = randomize('0', 6);
  
    try {
      // Save OTP to MongoDB
      const user = new User({ email, otp });
      await user.save();
  
      // Send OTP to email
      await sendEmail(email, `Your OTP is: ${otp}`);
  
      res.json({ success: true });
    } catch (error) {
      console.error('Error sending OTP:', error);
      res.status(500).json({ success: false, message: 'Failed to send OTP' });
    }
  });
  

// Function to send email using Nodemailer
async function sendEmail(to, message) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'aparnabraj2019@gmail.com',
        pass: 'afjl dzmp mihi hqge', // Replace with the App Password
      },
    });
  
    const mailOptions = {
      from: 'aparnabraj2019@gmail.com',
      to,
      subject: 'OTP Authentication',
      text: message,
    };
  
    await transporter.sendMail(mailOptions);
  }
  
// Route to verify OTP
app.post('/verify-otp', async (req, res) => {
  const { email, otp } = req.body;

  try {
    // Check OTP from MongoDB
    const user = await User.findOne({ email, otp });

    if (user) {
      res.json({ success: true });
    } else {
      res.status(400).json({ success: false, message: 'Invalid OTP' });
    }
  } catch (error) {
    console.error(`Error verifying OTP: ${error}`);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
