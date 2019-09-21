const Fs = require('fs-extra');
const Path = require('path');
const _ = require('lodash');

const I18nMap = {
    zh: JSON.parse(Fs.readFileSync(Path.join(__dirname, './zh.json'))),
    en: JSON.parse(Fs.readFileSync(Path.join(__dirname, './en.json'))),
};

module.exports = function ({ defaultLang }) {
    return function (req, res, next) {
        res.locals = {
            lang: req.language,
            locale: req.locale,
            t(key) {
                console.log(I18nMap[req.language], key);
                return (
                    _.get(I18nMap[req.language], key)
                    || _.get(I18nMap[defaultLang], key)
                    || key
                );
            },
        };
        next();
    }
};
