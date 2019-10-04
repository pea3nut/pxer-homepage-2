const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/:step(install-Tampermonkey|install-pxer|exercise)?', function(req, res) {
  const step = req.params.step || 'install-Tampermonkey';

  res.render('install', { step });
});

module.exports = router;
