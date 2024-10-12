// const http=require("http")
// // Create an HTTP server
// const server = http.createServer((req, res) => {
//     if (req.url === '/') {
//         res.writeHead(200, { 'Content-Type': 'text/html' });
//         res.write('<h1>Home Page</h1>');
//     } else if (req.url === '/about') {
//         res.writeHead(200, { 'Content-Type': 'text/html' });
//         res.write('<h1>About Page</h1>');
//     } else {
//         res.writeHead(404, { 'Content-Type': 'text/html' });
//         res.write('<h1>404 Not Found</h1>');
//     }
//     res.end();
// });

// // Specify the port to listen on
// const port = 3000;

// // Start the server
// server.listen(port, () => {
//     console.log(`Node.js HTTP server is running on port ${port}`);
// });

const express = require('express');
const app = express();
const rateLimiter=require("express-rate-limit")
require('dotenv').config()

const taskLimiter1=rateLimiter({
    windowMs:60*1000,
    max:20,
    handler:(req,res)=>{
        return res.status(429).send("You can only send 20 requests per minute")
    }
})

const taskLimiter2=rateLimiter({
    windowMs:1000,
    max:1,
    handler:(req,res)=>{
        res.status(429).send("You can only send one request per second")
    }
})

// Middleware to parse JSON bodies
app.use(express.json());

const fs=require('fs')
const path=require('path')
const morgan=require('morgan')

// Create a writable stream for the log file in append mode
const logStream = fs.createWriteStream(path.join(__dirname, 'request.log'), { flags: 'a' });

// Set up morgan to log requests to the file using 'combined' log format
app.use(morgan('combined', { stream: logStream }));


app.get('/', (req, res) => {
    res.send('<h1>Hello, Express.js Server!</h1>');
});

const taskRoutes=require('./routes/api/tasks/task1')

app.use('/api',taskLimiter1)
app.use('/api',taskLimiter2)

app.use('/api',taskRoutes)



const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

