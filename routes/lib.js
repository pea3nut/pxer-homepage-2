var express = require('express');
var router = express.Router();
var path = require('path');
var compression = require('compression');

router.use(compression());
router.use('/bootstrap', express.static(path.resolve('./node_modules/bootstrap/dist')));
router.use('/jquery', express.static(path.resolve('./node_modules/jquery/dist')));
router.use('/font-awesome', express.static(path.resolve('./node_modules/font-awesome')));
router.use('/moveto', express.static(path.resolve('./node_modules/moveto/dist')));

module.exports = router;
