const mongoose = require("mongoose");

const recipeSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    title: {
      type: String,
      required: [true, "Моля добавете заглавие на рецептата"],
    },
    products: {
      type: Array,
      required: [true, "Моля добавете продукти"],
    },
    preparation: { type: String, required: [true, "Моля добавете стъпки"] },
    suitableFor: { type: Number, required: true, enum: [1, 2, 4, 6] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Recipe", recipeSchema);
