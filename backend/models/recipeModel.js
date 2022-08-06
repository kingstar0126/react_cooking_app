const mongoose = require("mongoose");

const recipeSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Моля добавете заглавие на рецептата"],
    },
    products: {
      type: Array,
      required: [true, "Моля добавете продукти"],
    },
    preparation: { type: String, required: [true, "Моля добавете стъпки"] },
    suitableFor: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Recipe", recipeSchema);
