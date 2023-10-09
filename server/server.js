const express = require('express');
const bodyParser = require("body-parser");
const sgMail = require('@sendgrid/mail');
const path = require('path');

/*
****Libraries required for AI chatbot implementation ****
**Not implemented in this task due to browser security errors**
****I only implemented message box****
const axios = require('axios');
const http = require('http');
const socketIo = require('socket.io');
const openai = require('openai');
*/

const cors = require('cors')
require('dotenv').config();

const app = express();
app.use(cors());


app.use(express.static(path.join(__dirname + "/public")));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());
app.use(bodyParser.json());


app.get('/', (req,res)=>{
  res.send("Server is working")
})

//*Sending Subscription Part
const Key = process.env.APIkey;
sgMail.setApiKey(Key);


//Sending subscription email for Daily Insider
app.post('/subscribe', async (req, res) => {
  const email = req.body;
  console.log(email)

  try {
    const msg = {
      to: email,
      from: 'neginpakrooh@gmail.com',   // Sender's email
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

//*Two Factor Autho enabling and sending part
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
  console.log(data)    //Must be removed
  if (String(code) == String(savedCode)) {
    res.json({ success: true });
  } else {
    res.status(401).json({ error: 'Invalid code' });
  }
});


//*Payment Part
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
***Please ignore this part
***********AI Chatbot implementation
********Removed due to browser security issues
******Plan to implement in the future projects

const gptKey = process.env.Chatgpt_API_KEY;
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

const PORT = process.env.PORT || 3010;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});