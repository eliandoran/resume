const moment = require("moment");
const config = require("./data/config.json");

function languageHelper(language) {
    return (text) => {
        if (text === undefined)
            return undefined;

        if (text[language] !== undefined)
            return text[language];
        
        return text;
    }
}

function momentHelper(language) {
    moment.locale(language);

    return (date, format) => {
        if (date === "present")
            return config.datePresent[language];  
        
        let numSegments = date.split("-").length;

        if (numSegments === 1)
            return date;

        if (numSegments === 2)
            date = date + "-01";

        console.log(date);
        return moment(date).format(format);
    }
}

function urlHelper(url) {
    return /(?<=:\/\/).+/.exec(url);
}

module.exports = {
    languageHelper,
    momentHelper,
    urlHelper
}
