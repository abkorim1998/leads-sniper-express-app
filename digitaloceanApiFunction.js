const fetch = require('node-fetch');
const jsdom = require("jsdom")
const { JSDOM } = jsdom
global.DOMParser = new JSDOM().window.DOMParser

const defaultValue = {
    email: ' ',
    facebook_url: ' ',
    linkedin_url: ' ',
    twitter_url: ' ',
    instagram_url: ' ',
    youtube_url: ' '
}

async function getHtml(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            return defaultValue;
        } else {
            const html = await response.text();
            const values = extractSocialMedia(html, url);
            return values;
        }
    } catch (e) {
        return defaultValue;
    }
}

function extractSocialMedia(html, url) {
    var parser = new DOMParser();
    var website = parser.parseFromString(html, "text/html");

    var linkedin = website.querySelectorAll('a[href*="linkedin"]');
    var fb = website.querySelectorAll('a[href*="facebook"]');
    var twitter = website.querySelectorAll('a[href*="twitter"]');
    var email = website.querySelectorAll('a[href*="mailto"]');
    var instagram = website.querySelectorAll('a[href*="instagram"]');
    var youtube = website.querySelectorAll('a[href*="youtube"]');

    if (linkedin.length > 0) {
        linkedin = linkedin[0].href;
    } else {
        linkedin = ' ';
    }

    if (fb.length > 0) {
        fb = fb[0].href;
    } else {
        fb = ' ';
    }

    if (twitter.length > 0) {
        twitter = twitter[0].href;
    } else {
        twitter = ' ';
    }

    if (instagram.length > 0) {
        instagram = instagram[0].href;
    } else {
        instagram = ' ';
    }

    if (youtube.length > 0) {
        youtube = youtube[0].href;
    } else {
        youtube = ' ';
    }

    if (email.length > 0) {
        email = (email[0].href).substr(7);
    } else {
        var tempEmail = website.querySelectorAll('a[href*="@' + url + '"]');

        if (tempEmail.length > 0) {
            email = tempEmail[0].href;
        } else {
            email = ' ';
        }
    }

    email = decodeURIComponent(email);
    email = cleanEmailStringFromParameters(email);

    var values = {
        'email': email,
        'facebook_url': fb,
        'linkedin_url': linkedin,
        'twitter_url': twitter,
        'instagram_url': instagram,
        'youtube_url': youtube
    };

    return values;
}



function cleanEmailStringFromParameters(string) {
    var i = string.indexOf("?");

    if (i === -1) {
        return string;
    }

    return string.substring(i, 0);
}



module.exports = {
    getHtml
};