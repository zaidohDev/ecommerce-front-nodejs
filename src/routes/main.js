const express = require('express')
const router = express.Router()


router.get('/', (req, res) => {
    return res.render('main/index', 
        {
            title : 'Teste Ecommerce',
            layout: 'layouts/base',
            user: req.user || undefined
        })
})

module.exports = router