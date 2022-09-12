const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: [true, "Моля добавете име"] },
    email: {
      type: String,
      required: [true, "Моля добавете имейл"],
      unique: true,
    },
    profilePic: { type: String, required: false },
    password: { type: String, required: [true, "Моля добавете парола"] },
    postedRecipes: {type: Number, required: false},
    gender: {type: String, required: true, enum: ['male', 'female']}
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
