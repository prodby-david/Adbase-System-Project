import mongoose from 'mongoose';

const FavoriteSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  productIds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  }],
}, { timestamps: true });

const Favorites =  mongoose.model('Favorite', FavoriteSchema);

export default Favorites;
