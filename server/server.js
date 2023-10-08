const express = require("express");
const bodyParser = require("body-parser");
const sgMail = require('@sendgrid/mail');
const cors = require("cors")
require('dotenv').config();
const path = require('path');
const axios = require('axios');
const http = require('http');
const socketIo = require('socket.io');
const app = express();


app.use(express.static(path.join(__dirname + "/public")));
app.use(cors())

//const server = http.createServer(app);
//const io = socketIo(server);
/*app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Allows requests from any origin
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});*/

// Serve static files from the 'client/build' directory
/*
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

// Handle production environment
if (process.env.NODE_ENV === 'production') {
  // Serve the React app's HTML file for all other routes
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}
*/

app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.json());

app.use(bodyParser.json());


/*app.get('/', (req,res)=>{
  res.send("Server is working")
})*/

/*app.use(
  helmet.contentSecurityPolicy({
    directives: {
      fontSrc: ["'self'", 'https://fonts.googleapis.com'],
      // Add more directives as needed
    },
  })
);*/


const Key = process.env.APIkey;
sgMail.setApiKey(Key);


//Sending subscription email for Daily Insider
app.post('/subscribe', async (req, res) => {
  const email = req.body;
  console.log(email)

  try {
    const msg = {
      to: email,
      from: 'neginpakrooh@gmail.com',
      subject: 'Welcome to DevLink Marketplace!',
      text: 'You signed up for our daily insider! Thank you! ',
    };
    await sgMail.send(msg);
    res.send('Subscription successful. Welcome email sent.');
  }
  catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('Error sending welcome email.');
  }
});

app.post('/api/enable-2fa', async (req, res) => {
  const email_auth = req.body;
  console.log(email_auth);

  // Generate a random 6-digit code
  const verificationCode = Math.floor(100000 + Math.random() * 900000);
  console.log(verificationCode);

  // Send an email to the user with the code
  try {
    const msg_auth = {
      to: email_auth,
      from: 'neginpakrooh@gmail.com', // Sender's email
      subject: 'Enable 2FA for Your Account',
      text: `Use the following 6-digit code to enable 2FA: ${verificationCode}`,
    };

    await sgMail.send(msg_auth);
    // You can save the verificationCode in the database for future validation
    res.json( verificationCode );
  }
  catch (error) {
    res.status(500).json({ error: 'Failed to send email' });
  }
});

// Route to verify 6-digit code
app.post('/api/verify-2fa', async(req, res) => {
  const code= req.body.code;
  const savedCode = req.body.savedCode;
  const data = {
    code : code,
    savedCode : savedCode
}

  console.log(data)

  if (String(code) == String(savedCode)) {
    res.json({ success: true });
  } else {
    res.status(401).json({ error: 'Invalid code' });
  }
});

//Creating Backend part for payment page
const SKey = process.env.STRIPE_SECRET_KEY;
const PKey = process.env.STRIPE_PUBLISHABLE_KEY;
const stripe = require("stripe")(SKey);

// retrieve publishable key
app.get('/publishable_key_config', (req, res) => {
  res.json({
    publishableKey: PKey,
  });
});

// create a payment intent
app.post("/create-payment", async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1000, // 10$
      currency: "aud",
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/*

const gptKey = process.env.Chatgpt_API_KEY;
console.log(gptKey);

const apiUrl = 'https://api.openai.com/v1/completions';


app.post('/chat', async (req, res) => {
  const { message } = req.body;

  try {
    const response = await axios.post(apiUrl, {
      prompt: message,
      max_tokens: 50,
      temperature: 0.6,
      n: 1,
      model: "text-davinci-003" // Add the model parameter
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${gptKey}` // Use the correct variable name
      }
    });

    const botReply = response.data.choices[0].text.trim();
    res.send({ reply: botReply });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'An error occurred' });
  }
});
*/

const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('message', (message) => {
    // Broadcast the message to all connected clients
    io.emit('message', message);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});


const PORT = process.env.PORT || 3010;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});