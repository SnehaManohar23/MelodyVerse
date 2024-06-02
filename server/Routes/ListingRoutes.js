
const express = require('express');
const { createListing, getListings } = require('../Controllers/ListingController');
const { checkUser } = require('../Middlewares/authMiddleware');
const upload = require('../Middlewares/uploadMiddleware');

const router = express.Router();

router.post('/create-listing', checkUser, upload.single('image'), createListing);
router.get('/listings', checkUser, getListings);

module.exports = router;
