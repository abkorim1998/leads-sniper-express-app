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


// const urls = `
// http://www.bacchakaccha.com.bd/
// http://www.aarong.com/
// http://oparamini.com/
// https://pizzanova.com/
// https://canadian-pizza-plus.com/
// https://order.canadian2for1pizza.com/location/richmond/?utm_source=google&utm_medium=maps&utm_campaign=website
// https://royal-canadian-pizza.com/
// http://greatcanadianpizza.ca/
// http://greatcanadianpizza.net/
// http://canadianpizzawaterloo.ca/
// http://www.canadianpizzaunlimited.com/
// http://www.blazepizza.com/locations/toronto
// https://pizzeriadefina.com/
// http://www.greatcanadianpizza.net/
// https://canmore.canadianpizzaunlimited.ca/
// http://www.pizzaprosciutto.net/
// http://www.napoletana.com/
// http://www.popularpizza.ca/
// http://davenezia.ca/
// https://altorestaurant.ca/
// https://bit.ly/37ZdxRr
// https://order.canadian2for1pizza.com/location/armstrong/
// http://www.piewoodpizza.com/
// https://famoso.ca/locations/regina-hill-centre/
// http://www.stanzione87.com/
// http://pizzaiolamiami.com/
// https://www.toasttab.com/miamislice/v3
// https://www.brickellcitypizza.com/?utm_source=gbp
// https://www.puccisonline.com/show=delivery-orders/
// https://pizzaonne.com/
// https://www.munaciello.com/mimo-district/
// https://www.lucali.com/
// https://www.newyorkromapizza.com/
// https://www.pieduckspizza.com/
// http://superpizzeriarestaurantmenu.com/
// http://www.rockboypizza.com/
// http://urbanpizzacafemenu.com/?utm_source=gbp
// http://newyorkpizzamiami.com/
// http://www.eatprincestreetpizza.com/
// http://thelocalculinary.com/
// http://www.marakaspizza.com/
// http://miami.victorianyspizza.com/
// https://littlecaesars.com/en-us/store/8963
// http://www.pizzadays.us/
// https://www.order.store/store/pizza-new-york-slice/VMy65oAgWB2ARKIAvSWg4A
// https://www.giottomenu.com/
// https://www.specialpizzagourmetmenu.com/?utm_source=gbp
// http://www.miapiacere.com/
// http://qr.codes/14TEOF
// https://locations.papajohns.com/united-states/fl/33130/miami/400-sw-8th-st?utm_source=gmb&utm_medium=organic&y_source=1_MTA2OTEyNzYtNzE1LWxvY2F0aW9uLndlYnNpdGU%3D
// http://orderimpirepizzasandwings.com/
// https://victor-cuban-pizza.business.site/?utm_source=gmb&utm_medium=referral
// http://www.pizzette-miami.com/
// https://miamidade.score.org/?utm_source=google-business-profile&utm_medium=organic-soci&utm_campaign=main-website-cta
// https://www.marriott.com/en-us/hotels/miaab-ac-hotel-miami-brickell/overview/?scid=f2ae0541-1279-4f24-b197-a979c79310b0
// https://www.pricelesscarrental.com/locations/FL/miami_MIA.html
// https://www.thecapitalgrille.com/locations/fl/miami/miami/8006?cmpid=br:tcg_ag:ie_ch:dry_ca:TCGGMB_sn:gmb_gt:miami-fl-8006_pl:locurl_rd:1004
// http://www.tclglobal.co.uk/
// http://www.dcci-dbi.edu.bd/%20http://www.dbi-college.edu.bd
// https://www.dataenvelope.com/
// https://pcappsforfree.com/
// http://braketit.com/
// https://www.gov.uk/world/bangladesh
// http://dhaka.taiwantrade.com/
// http://www.fdee.com.bd/
// https://prorepair-apple-mac-service-dhaka.business.site/?utm_source=gmb&utm_medium=referral
// https://www.ihg.com/holidayinn/hotels/us/en/dhaka/dachi/hoteldetail?cm_mmc=GoogleMaps-_-HI-_-BD-_-DACHI
// https://www.cospacebd.com/
// http://www.locusbd.com/
// http://www.workstation101.com/
// http://www.moarbd.com/
// https://www.facebook.com/Vistacoworking/
// http://www.moarbd.com/
// https://www.cospacebd.com/
// http://www.moarbd.com/
// http://bonik.biz/
// https://www.banglamart.com/
// https://www.akota.co/
// http://www.minioffice47.com/
// http://thebusinesscenterbd.com/
// https://www.regus.com/en-gb/bangladesh/dhaka/utc-building-2579?utm_source=yext_places_gmb&utm_medium=places&utm_campaign=yext_traffic&utm_content=2579

// `

// fetch('http://10.0.0.103:3000/queryWebsite', {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json'
//     },
//     body: JSON.stringify([
//         {
//             "name": "fasdf",
//             "url": "https://www.ihg.com/holidayinn/hotels/us/en/dhaka/dachi/hoteldetail?cm_mmc=GoogleMaps-_-HI-_-BD-_-DACHI"
//         },
//         {
//             "name": "fasdf",
//             "url": "https://www.cospacebd.com/",
//         },
//         {
//             "name": "fasdf",
//             "url": "http://www.locusbd.com/",
//         },
//         {
//             "name": "fasdf",
//             "url": "http://www.workstation101.com/",
//         },
//         {
//             "name": "fasdf",
//             "url": "http://www.moarbd.com/",
//         },
//         {
//             "name": "fasdf",
//             "url": "https://www.facebook.com/Vistacoworking/",
//         },
//         {
//             "name": "fasdf",
//             "url": "http://www.moarbd.com/",
//         },
//         {
//             "name": "fasdf",
//             "url": "https://www.cospacebd.com/",
//         },
//         {
//             "name": "fasdf",
//             "url": "http://www.moarbd.com/",
//         },
//         {
//             "name": "fasdf",
//             "url": "http://bonik.biz/",
//         },
//         {
//             "name": "fasdf",
//             "url": "https://www.banglamart.com/",
//         },
//         {
//             "name": "fasdf",
//             "url": "https://www.akota.co/",
//         },
//         {
//             "name": "fasdf",
//             "url": "http://www.minioffice47.com/",
//         },
//         {
//             "name": "fasdf",
//             "url": "http://thebusinesscenterbd.com/",
//         },
//         {
//             "name": "fasdf",
//             "url": "https://www.regus.com/en-gb/bangladesh/dhaka/utc-building-2579?utm_source=yext_places_gmb&utm_medium=places&utm_campaign=yext_traffic&utm_content=2579",
//         }
//     ])
// })
// .then(data => data.json())
// .then(data => console.log(data))


app.post('/queryWebsite', (req, res) => {
    // // convert urls to array
    // const list = urls;
    // const listArray = list.split('\n');
    // // remove empty string
    // const listArrayWithoutEmptyString = listArray.filter(item => item !== '');
    // // res.json(listArrayWithoutEmptyString);
    // const promises = listArrayWithoutEmptyString.map( async(e) => getSocialMediaLinks(e.trim()));
    // Promise.all(promises).then((data) => {
    //     res.json(data);
    // });



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