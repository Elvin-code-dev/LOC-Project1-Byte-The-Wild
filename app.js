// Import the express module
import express from 'express';

// Create an instance of an Express application
const app = express();

// Enable static file serving
app.use(express.static('public')); 
app.use(express.static('data'));   

// Allow JSON request bodies 
app.use(express.json());

// Define the port number (for now we can host on mine) where our server will listen
const PORT = 3004;

// Define a default "route" ('/')
// req: contains information about the incoming request
// res: allows us to send back a response to the client
app.get('/', (req, res) => {
  // Send the main page to the client
  res.sendFile(`${import.meta.dirname}/views/index.html`);
});

// start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
