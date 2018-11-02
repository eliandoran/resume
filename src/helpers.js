function languageHelper(language) {
    return (text) => {
        if (text === undefined)
            return undefined;

        if (text[language] !== undefined)
            return text[language];
        
        return text;
    }
}

function urlHelper(url) {
    return /(?<=:\/\/).+/.exec(url);
}

module.exports = {
    languageHelper,
    urlHelper
}
