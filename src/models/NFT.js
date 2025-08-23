const mongoose = require('mongoose');

// Connect to MongoDB if not already connected
if (mongoose.connection.readyState === 0) {
  mongoose.connect('mongodb://localhost:27017/nft_marketplace', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('MongoDB connected (NFT.js)'))
  .catch(err => console.error('MongoDB connection error (NFT.js):', err));
}

const nftSchema = new mongoose.Schema({
  tokenId: { type: String, required: true, unique: true },
  name: String,
  description: String,
  image: String,
  attributes: [Object],
  owner: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.models.NFT || mongoose.model('NFT', nftSchema);
