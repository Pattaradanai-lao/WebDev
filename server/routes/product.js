const express = require("express");
const router = express.Router()
//import Controller
const {create,list,read,update,remove,listby,searchFilters,createImages,removeImage} = require('../controllers/product')
//middleware
const {authCheck, adminCheck} = require('../middlewares/authCheck')

router.post('/product',create)
router.get('/products/:count',list)
router.get('/product/:id', read)
router.put('/product/:id', update)
router.delete('/product/:id',remove)
router.post('/productby',listby)
router.post('/search/filter',searchFilters)

router.post('/images',authCheck, adminCheck,createImages)
router.post('/removeimages',authCheck, adminCheck,removeImage)

module.exports = router