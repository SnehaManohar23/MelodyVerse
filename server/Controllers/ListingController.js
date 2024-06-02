// Controllers/ListingController.js

const Listing = require('../Models/ListingModel');
const path = require('path');

module.exports.createListing = async (req, res) => {
  const { title, artist, genre, description, price } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    const listing = await Listing.create({
      title,
      artist,
      genre,
      description,
      price,
      imageUrl,
      user: req.user._id
    });
    res.status(201).json(listing);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports.getListings = async (req, res) => {
  try {
    const listings = await Listing.find().populate('user', 'username email');
    res.status(200).json(listings);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
