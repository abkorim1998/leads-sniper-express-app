require('dotenv').config();
const express = require('express');

const {
    getHtml
} = require("./digitaloceanApiFunction.js");

const app = express()
const port = 3000;

//body parser middleware
app.use(express.json());
app.use(express.static('public'))
// cross origin resource sharing allow all
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});



//html routes
app.get('/', (req, res) => {
    res.send("it's runing");
});


//queryWebsite route
app.get('/queryWebsite', async (req, res) => {
    const {website} = req.query;
    res.send(await getHtml(website));
});



app.listen(port, () => {
    //get the ip address of the server
    const ifaces = require('os').networkInterfaces();
    const ip = Object.keys(ifaces).reduce((prev, curr) => {
        ifaces[curr].forEach(iface => {
            if (iface.family === 'IPv4' && iface.internal === false) {
                prev = iface.address;
            }
        });
        return prev;
    }, null);
    console.log(`Server is running on ${ip}:${port}`);
})