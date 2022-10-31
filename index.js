require('dotenv').config();
const express = require('express');

const {
    getSocialMediaLinks,
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


// fetch('http://10.0.0.105:3000/queryWebsite', {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json'
//     },
//     body: JSON.stringify([
//         {
//             "name": "example.com",
//             "url": "http://example.com"
//         },
//         {
//             "name": "example.com",
//             "url": "http://example.com"
//         },
//         {
//             "name": "example.com",
//             "url": "http://example.com"
//         },
//     ])
// })
// .then(data => data.json())
// .then(data => console.log(data))


app.post('/queryWebsite', (req, res) => {
    const websites = req.body;
    const promises = websites.map(website => getSocialMediaLinks(website.url));
    Promise.all(promises)
        .then(data => {
            const result = data.map((item, index) => {
                return {
                    name: websites[index].name,
                    url: websites[index].url,
                    ...item
                }
            })
            res.json(result);
        });
});

//queryWebsite route
app.get('/queryWebsite', async (req, res) => {
    const {website} = req.query;
    res.send(await getSocialMediaLinks(website));
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