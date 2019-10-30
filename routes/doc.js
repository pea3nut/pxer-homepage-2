const Fs = require('fs-extra');
const Path = require('path');
const Marked = require('marked');
const Express = require('express');

const router = Express.Router();
const debug = require('debug')('pxer-homepage-2:router');

// Render a markdown file from ./views/doc/*.{lang}.md
router.get(/^\/([\w-]+)$/, async function(req, res, next) {
    const filename = `${req.params[0]}.${res.locals.lang}.md`;
    const filepath = Path.join(__dirname, '../views/doc', filename);

    if (!await Fs.pathExists(filepath)) {
        debug(`Doc file not found for ${filepath}`);
        return next();
    }

    const fileContent = await Fs.readFile(filepath);

    res.render('doc', { docContent: Marked(fileContent.toString()) });
});

module.exports = router;
