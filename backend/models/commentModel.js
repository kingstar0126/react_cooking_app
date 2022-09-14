const mongoose = require("mongoose");

const commentSchema = mongoose.Schema(
  {
    recipe: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Recipe",
    },
    name: { type: String, required: true },
    comment: { type: String, required: [true, "Моля добавете коментар"] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", commentSchema);
