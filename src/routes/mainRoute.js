const express = require('express');
const {getLanguageListWithProjectList} = require("../services/developmentLog");
router = express.Router();

router.get('/main-view', async (req, res) => {
    try {
        const languageListAndProjectList = await getLanguageListWithProjectList()
        res.status(200).json(languageListAndProjectList)
    } catch (e) {
        console.error(e);
        res.status(500).send('Server Error');
    }
});

router.get('/redirect/main', async (req, res) => {
    try {
        res.redirect('/');
    } catch (e) {
        console.error(e);
        res.status(500).send('Server Error')
    }
})

module.exports = router;

