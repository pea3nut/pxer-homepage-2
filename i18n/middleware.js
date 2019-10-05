const Fs = require('fs-extra');
const Path = require('path');
const _ = require('lodash');

const I18nMap = {
    zh: JSON.parse(Fs.readFileSync(Path.join(__dirname, './zh.json'))),
    en: JSON.parse(Fs.readFileSync(Path.join(__dirname, './en.json'))),
};

module.exports = function ({ defaultLang }) {
    return function (req, res, next) {
        const lang = req.query.lang || req.cookies.lang || req.language;

        res.locals = {
            lang,
            locale: req.locale,
            t(key) {
                return (
                    _.get(I18nMap[lang], key)
                    || _.get(I18nMap[defaultLang], key)
                    || key
                );
            },
        };
        next();
    }
};
