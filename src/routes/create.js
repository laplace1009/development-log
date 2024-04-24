const express = require('express');
const router = express.Router();
const marked= require('marked');
const path = require('path');

router.get('/create', (req, res) => {
   res.sendFile(path.join(__dirname, '..', '..', 'public', 'index.html'));
});

router.post('/convert', async (req, res) => {
    if (!req.body) return res.sendStatus(400);
    const htmlContent = await marked.marked(req.body.toString());
    res.send(htmlContent);
});

module.exports = router;
