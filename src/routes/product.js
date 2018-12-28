const express = require('express')
const router = express.Router()
const uploadS3 = require('./middleware/s3')


router.get('/', require('./../services/product/index'))
router.get('/new', require('./../services/product/new'))
router.get('/edit/:id' , require('./../services/product/show'))
router.post('/', uploadS3.array('images3', 1), require('./../services/product/create'))

router.put('/:id', require('./../services/product/update'))
router.delete('/:id', require('./../services/product/destroy'))

module.exports = router

