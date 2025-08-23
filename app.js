const express = require('express');
const mongoose = require('mongoose');
const NFT = require('./src/models/NFT');

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/nft_marketplace', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Create a new NFT
app.post('/nfts', async (req, res) => {
  try {
    const nft = new NFT(req.body);
    await nft.save();
    res.status(201).json(nft);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all NFTs
app.get('/nfts', async (req, res) => {
  try {
    const nfts = await NFT.find({});
    res.json(nfts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get NFT by tokenId
app.get('/nfts/:tokenId', async (req, res) => {
  try {
    const nft = await NFT.findOne({ tokenId: req.params.tokenId });
    if (!nft) return res.status(404).json({ error: 'NFT not found' });
    res.json(nft);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
